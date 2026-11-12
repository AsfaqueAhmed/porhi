import 'dart:async';

import 'package:flutter/material.dart';
import 'package:flutter_math_fork/flutter_math.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:flutter_tts/flutter_tts.dart';
import 'package:get/get.dart';
import 'package:mocktail/mocktail.dart';
import 'package:porhi/app/env.dart';
import 'package:porhi/core/content/media_url_resolver.dart';
import 'package:porhi/core/content/rich_content_parser.dart';
import 'package:porhi/core/widgets/interactive_lab/interactive_lab_card.dart';
import 'package:porhi/core/widgets/lesson_audio_player.dart';
import 'package:porhi/core/widgets/rich_content/audio_player_tile.dart';
import 'package:porhi/core/widgets/rich_content/image_lightbox_viewer.dart';
import 'package:porhi/core/widgets/rich_content/rich_content_tokenizer.dart';
import 'package:porhi/core/widgets/rich_content/rich_content_view.dart';
import 'package:porhi/core/widgets/rich_content/video_player_tile.dart';
import 'package:video_player/video_player.dart';
import 'package:webview_flutter/webview_flutter.dart';

class _FakeAudioBackend implements LessonAudioBackend {
  final StreamController<Duration> _positionController =
      StreamController<Duration>.broadcast();
  final StreamController<Duration?> _durationController =
      StreamController<Duration?>.broadcast();
  final StreamController<bool> _playingController =
      StreamController<bool>.broadcast();

  String? loadedUrl;
  double currentSpeed = 1.0;
  Duration? lastSeek;
  bool isDisposed = false;
  bool playCalled = false;
  bool pauseCalled = false;

  @override
  Stream<Duration> get positionStream => _positionController.stream;

  @override
  Stream<Duration?> get durationStream => _durationController.stream;

  @override
  Stream<bool> get playingStream => _playingController.stream;

  @override
  Future<Duration?> setUrl(String url) async {
    loadedUrl = url;
    const dur = Duration(seconds: 90);
    _durationController.add(dur);
    return dur;
  }

  @override
  Future<void> play() async {
    playCalled = true;
    _playingController.add(true);
  }

  @override
  Future<void> pause() async {
    pauseCalled = true;
    _playingController.add(false);
  }

  @override
  Future<void> seek(Duration position) async {
    lastSeek = position;
    _positionController.add(position);
  }

  @override
  Future<void> setSpeed(double speed) async {
    currentSpeed = speed;
  }

  @override
  Future<void> dispose() async {
    isDisposed = true;
    await _positionController.close();
    await _durationController.close();
    await _playingController.close();
  }
}

class _FakeTtsBackend implements LessonTtsBackend {
  String? lastLanguage;
  double? lastRate;
  String? lastSpokenText;
  bool stopCalled = false;
  void Function()? onComplete;

  @override
  void setCompletionHandler(void Function() handler) {
    onComplete = handler;
  }

  @override
  Future<void> setLanguage(String language) async {
    lastLanguage = language;
  }

  @override
  Future<void> setSpeechRate(double rate) async {
    lastRate = rate;
  }

  @override
  Future<void> speak(String text) async {
    lastSpokenText = text;
  }

  @override
  Future<void> stop() async {
    stopCalled = true;
  }
}

void main() {
  tearDown(() {
    Get.reset();
  });

  group('rich_content_parser (pure Dart)', () {
    test(
      'parseRichTokens extracts <audio>, <video>, <iframe>, and ![alt](url) in exact sequence',
      () {
        const raw = '''
গতির সমীকরণ শুরু:
<audio controls src="/audio/motion-intro.mp3" title="গতির পরিচয়"></audio>
মধ্যবর্তী লেখা
![বেগ-সময় লেখচিত্র](/uploads/images/vt-graph.png)
<video controls src="/uploads/video/projectile.mp4" title="প্রাস গতি"></video>
<iframe src="/uploads/interactive/pendulum.html" title="দোলক ল্যাব"></iframe>
সমাপ্তি।
''';

        final tokens = parseRichTokens(raw);
        expect(tokens.length, 9);
        expect(tokens[0].type, RichContentTokenType.text);
        expect(tokens[0].text.trim(), 'গতির সমীকরণ শুরু:');

        expect(tokens[1].type, RichContentTokenType.audio);
        expect(tokens[1].src, '/audio/motion-intro.mp3');
        expect(tokens[1].title, 'গতির পরিচয়');

        expect(tokens[2].type, RichContentTokenType.text);
        expect(tokens[2].text.trim(), 'মধ্যবর্তী লেখা');

        expect(tokens[3].type, RichContentTokenType.image);
        expect(tokens[3].src, '/uploads/images/vt-graph.png');
        expect(tokens[3].alt, 'বেগ-সময় লেখচিত্র');

        expect(tokens[4].type, RichContentTokenType.text);

        expect(tokens[5].type, RichContentTokenType.video);
        expect(tokens[5].src, '/uploads/video/projectile.mp4');
        expect(tokens[5].title, 'প্রাস গতি');

        expect(tokens[6].type, RichContentTokenType.text);

        expect(tokens[7].type, RichContentTokenType.interactive);
        expect(tokens[7].src, '/uploads/interactive/pendulum.html');
        expect(tokens[7].title, 'দোলক ল্যাব');

        expect(tokens[8].type, RichContentTokenType.text);
        expect(tokens[8].text.trim(), 'সমাপ্তি।');
      },
    );

    test(
      'parseRichTokens supports [IMAGE:], [AUDIO:], [VIDEO:], [YOUTUBE:], and [INTERACTIVE:] markers',
      () {
        const raw = '''
[IMAGE: /uploads/fig1.png | চিত্র ১: বল ও ত্বরণ]
[AUDIO: /audio/clip.wav | অডিও ক্লিপ]
[VIDEO: /uploads/demo.mp4 | ডেমো ভিডিও]
[YOUTUBE: https://www.youtube.com/watch?v=dQw4w9WgXcQ | নিউটনের সূত্র]
[INTERACTIVE: /uploads/sim/ohms-law.html | ওহমের সূত্র সিমুলেশন]
[INTERACTIVE: <html><body><h1>Lab</h1></body></html> | ইনলাইন ল্যাব]
''';
        final tokens = parseRichTokens(raw)
            .where((t) => t.type != RichContentTokenType.text || t.text.trim().isNotEmpty)
            .toList();

        expect(tokens.length, 6);
        expect(tokens[0].type, RichContentTokenType.image);
        expect(tokens[0].src, '/uploads/fig1.png');
        expect(tokens[0].alt, 'চিত্র ১: বল ও ত্বরণ');

        expect(tokens[1].type, RichContentTokenType.audio);
        expect(tokens[1].src, '/audio/clip.wav');
        expect(tokens[1].title, 'অডিও ক্লিপ');

        expect(tokens[2].type, RichContentTokenType.video);
        expect(tokens[2].src, '/uploads/demo.mp4');
        expect(tokens[2].title, 'ডেমো ভিডিও');

        expect(tokens[3].type, RichContentTokenType.youtube);
        expect(tokens[3].videoId, 'dQw4w9WgXcQ');
        expect(tokens[3].title, 'নিউটনের সূত্র');

        expect(tokens[4].type, RichContentTokenType.interactive);
        expect(tokens[4].src, '/uploads/sim/ohms-law.html');
        expect(tokens[4].html, isEmpty);
        expect(tokens[4].title, 'ওহমের সূত্র সিমুলেশন');

        expect(tokens[5].type, RichContentTokenType.interactive);
        expect(tokens[5].src, isEmpty);
        expect(tokens[5].html, '<html><body><h1>Lab</h1></body></html>');
        expect(tokens[5].title, 'ইনলাইন ল্যাব');
      },
    );

    test('extractYouTubeVideoId handles IDs, watch, short, embed, and shorts URLs', () {
      expect(extractYouTubeVideoId('dQw4w9WgXcQ'), 'dQw4w9WgXcQ');
      expect(
        extractYouTubeVideoId('https://www.youtube.com/watch?v=dQw4w9WgXcQ&t=42s'),
        'dQw4w9WgXcQ',
      );
      expect(extractYouTubeVideoId('https://youtu.be/dQw4w9WgXcQ'), 'dQw4w9WgXcQ');
      expect(
        extractYouTubeVideoId('https://www.youtube.com/embed/dQw4w9WgXcQ'),
        'dQw4w9WgXcQ',
      );
      expect(
        extractYouTubeVideoId('https://www.youtube.com/shorts/dQw4w9WgXcQ'),
        'dQw4w9WgXcQ',
      );
      expect(extractYouTubeVideoId('not a valid url'), isNull);
    });

    test('parseRichTokens handles malformed/unclosed tags cleanly without throwing', () {
      const malformed =
          'Start <audio src="/a.mp3" ![broken](unclosed [IMAGE: /x.png End';
      final tokens = parseRichTokens(malformed);
      expect(tokens, hasLength(1));
      expect(tokens.first.type, RichContentTokenType.text);
      expect(tokens.first.text, malformed);
    });

    test(
      r'parseMarkdownBlocks handles headings, callouts, Bangla ordered lists, tables, $$...$$ math, and unclosed fences',
      () {
        const markdown = '''
# গতি অধ্যায়
### সমত্বরণ

> **সংজ্ঞা:** সময়ের সাথে বেগের পরিবর্তনের হারকে ত্বরণ বলে।

> **টিপস:** একক সবসময় SI পদ্ধতিতে রাখো।

> **সতর্কতা:** বেগ ও দ্রুতি এক নয়।

- প্রথম পয়েন্ট
* দ্বিতীয় পয়েন্ট

১. প্রথম ধাপ
২. দ্বিতীয় ধাপ

| রাশি | প্রতীক | একক |
|---|---|---|
| বেগ | \$v\$ | \$m s^{-1}\$ |
| ত্বরণ | \$a\$ | \$m s^{-2}\$ |

\$\$
v = u + at
\$\$

---

```dart
final x = 1;
```

\$\$x_{unclosed} + y
''';

        final blocks = parseMarkdownBlocks(markdown);

        expect(blocks.whereType<HeadingBlock>().map((h) => h.level), [1, 3]);
        expect(
          blocks.whereType<BlockquoteBlock>().map((b) => b.calloutKind),
          [
            CalloutKind.definition,
            CalloutKind.tip,
            CalloutKind.warning,
          ],
        );
        final uList = blocks.whereType<UnorderedListBlock>().single;
        expect(uList.items, ['প্রথম পয়েন্ট', 'দ্বিতীয় পয়েন্ট']);

        final oList = blocks.whereType<OrderedListBlock>().single;
        expect(oList.items.map((e) => e.num), ['১', '২']);

        final table = blocks.whereType<TableBlock>().single;
        expect(table.headers, ['রাশি', 'প্রতীক', 'একক']);
        expect(table.rows.length, 2);

        final mathBlocks = blocks.whereType<MathBlock>().toList();
        expect(mathBlocks.length, 2);
        expect(mathBlocks[0].math, 'v = u + at');
        expect(mathBlocks[1].math, 'x_{unclosed} + y');

        expect(blocks.whereType<DividerBlock>(), hasLength(1));
        expect(blocks.whereType<CodeBlock>().single.code, 'final x = 1;');
      },
    );

    test('parseMarkdownBlocks handles unclosed ``` code fence without throwing', () {
      const text = '```\nline 1\nline 2';
      final blocks = parseMarkdownBlocks(text);
      expect(blocks, hasLength(1));
      expect(blocks.first, isA<CodeBlock>());
      expect((blocks.first as CodeBlock).code, 'line 1\nline 2');
    });

    test('parseLatexSegments & parseInlineTokens handle unclosed \$ safely', () {
      final segs = parseLatexSegments('দাম \$50 এবং \$a + b = c\$');
      expect(segs.any((s) => s.type == LatexSegmentType.inline && s.math == 'a + b = c'), isTrue);

      final unclosedOnly = parseLatexSegments('দাম \$50 মাত্র');
      expect(unclosedOnly, hasLength(1));
      expect(unclosedOnly.first.type, LatexSegmentType.text);

      final inline = parseInlineTokens('**\$F = ma\$** ও *বেগ* ও `code` ও [লিংক](https://porhi.app)');
      expect(inline.any((t) => t.type == InlineTokenType.bold), isTrue);
      expect(inline.any((t) => t.type == InlineTokenType.italic), isTrue);
      expect(inline.any((t) => t.type == InlineTokenType.code), isTrue);
      expect(inline.any((t) => t.type == InlineTokenType.link), isTrue);

      final inlineUnclosedDollar = parseInlineTokens('মূল্য \$100 এবং **গুরুত্বপূর্ণ** ও *বেগ*');
      expect(inlineUnclosedDollar.any((t) => t.type == InlineTokenType.math), isFalse);
      expect(inlineUnclosedDollar.any((t) => t.type == InlineTokenType.bold && t.content == 'গুরুত্বপূর্ণ'), isTrue);
      expect(inlineUnclosedDollar.any((t) => t.type == InlineTokenType.italic && t.content == 'বেগ'), isTrue);
    });

    test('re-exported tokenizer exposes identical functions', () {
      expect(
        parseRichTokens('![alt](/img.png)').first.type,
        RichContentTokenType.image,
      );
      expect(
        parseMarkdownBlocks('## শিরোনাম').first,
        isA<HeadingBlock>(),
      );
    });
  });

  group('RichContentView & Media Widgets', () {
    testWidgets('RichContentView renders fallback text on invalid TeX syntax without throwing', (
      tester,
    ) async {
      await tester.pumpWidget(
        const MaterialApp(
          home: Scaffold(
            body: SingleChildScrollView(
              child: RichContentView(
                content: r'''
# গণিত পরীক্ষা
ইনলাইন ত্রুটি $\frac{1}{$ এবং বৈধ $x^2 + y^2$.

$$
\unknowninvalidcommand{abc}
$$
''',
              ),
            ),
          ),
        ),
      );
      await tester.pumpAndSettle();

      expect(tester.takeException(), isNull);
      expect(find.text('গণিত পরীক্ষা'), findsOneWidget);
      expect(find.textContaining(r'\frac{1}{'), findsOneWidget);
      expect(find.textContaining(r'\unknowninvalidcommand{abc}'), findsOneWidget);
      expect(find.byType(Math), findsWidgets);
    });

    testWidgets('RichContentView resolves relative media URLs via EnvConfig and renders mixed blocks', (
      tester,
    ) async {
      const env = EnvConfig(apiBaseUrl: 'https://api.porhi.app');
      final capturedImageUrls = <String>[];
      final capturedAudioUrls = <String>[];
      final capturedVideoUrls = <String>[];
      final capturedInteractiveUrls = <String>[];

      await tester.pumpWidget(
        MaterialApp(
          home: Scaffold(
            body: SingleChildScrollView(
              child: RichContentView(
                envConfig: env,
                content: '''
> **সংজ্ঞা:** নিউটনের দ্বিতীয় সূত্র।

![চিত্র](/uploads/force.png)
<audio controls src="/audio/newton.mp3" title="অডিও ব্যাখ্যা"></audio>
<video controls src="/uploads/newton.mp4" title="ভিডিও ডেমো"></video>
[INTERACTIVE: /uploads/sim/motion.html | গতি সিমুলেশন]
[YOUTUBE: dQw4w9WgXcQ | ভিডিও লেকচার]
''',
                imageBuilder: (context, resolvedUrl, alt) {
                  capturedImageUrls.add(resolvedUrl);
                  return Text('IMG:$resolvedUrl|$alt');
                },
                audioBuilder: (context, resolvedUrl, title) {
                  capturedAudioUrls.add(resolvedUrl);
                  return Text('AUD:$resolvedUrl|$title');
                },
                videoBuilder: (context, resolvedUrl, title) {
                  capturedVideoUrls.add(resolvedUrl);
                  return Text('VID:$resolvedUrl|$title');
                },
                interactiveBuilder: (context, resolvedUrl, html, title) {
                  capturedInteractiveUrls.add(resolvedUrl ?? '');
                  return Text('SIM:$resolvedUrl|$title');
                },
              ),
            ),
          ),
        ),
      );
      await tester.pumpAndSettle();

      expect(capturedImageUrls, ['https://api.porhi.app/uploads/force.png']);
      expect(capturedAudioUrls, ['https://api.porhi.app/audio/newton.mp3']);
      expect(capturedVideoUrls, ['https://api.porhi.app/uploads/newton.mp4']);
      expect(capturedInteractiveUrls, ['https://api.porhi.app/uploads/sim/motion.html']);
      expect(find.text('ভিডিও লেকচার'), findsOneWidget);
    });

    testWidgets('ImageLightboxViewer opens and closes InteractiveViewer lightbox dialog', (
      tester,
    ) async {
      Get.put<EnvConfig>(const EnvConfig(apiBaseUrl: 'https://cdn.porhi.app'));

      await tester.pumpWidget(
        MaterialApp(
          home: Scaffold(
            body: ImageLightboxViewer(
              src: '/uploads/diagram.png',
              alt: 'কোষের গঠন',
              imageBuilder: (context, url) => Container(
                key: ValueKey('img-$url'),
                width: 120,
                height: 80,
                color: Colors.indigo,
              ),
            ),
          ),
        ),
      );

      expect(find.byKey(const ValueKey('img-https://cdn.porhi.app/uploads/diagram.png')), findsOneWidget);
      expect(find.text('কোষের গঠন'), findsOneWidget);

      await tester.tap(find.byTooltip('জুম করুন'));
      await tester.pumpAndSettle();

      expect(find.byType(InteractiveViewer), findsOneWidget);

      await tester.tap(find.byTooltip('বন্ধ করুন'));
      await tester.pumpAndSettle();

      expect(find.byType(InteractiveViewer), findsNothing);
    });

    testWidgets('AudioPlayerTile plays, pauses, restarts, and disposes cleanly', (
      tester,
    ) async {
      final audio = _FakeAudioBackend();
      await tester.pumpWidget(
        MaterialApp(
          home: Scaffold(
            body: AudioPlayerTile(
              src: '/audio/lesson.mp3',
              title: 'তরঙ্গ অডিও',
              envConfig: const EnvConfig(apiBaseUrl: 'https://api.porhi.app'),
              backendFactory: () => audio,
            ),
          ),
        ),
      );
      await tester.pumpAndSettle();

      expect(audio.loadedUrl, 'https://api.porhi.app/audio/lesson.mp3');
      expect(find.text('তরঙ্গ অডিও'), findsOneWidget);

      await tester.tap(find.byTooltip('শুনুন'));
      await tester.pump();
      expect(audio.playCalled, isTrue);

      await tester.tap(find.byTooltip('থামান'));
      await tester.pump();
      expect(audio.pauseCalled, isTrue);

      await tester.tap(find.byTooltip('পুনরায় শুরু'));
      await tester.pump();
      expect(audio.lastSeek, Duration.zero);

      // Unmount and ensure backend is disposed cleanly
      await tester.pumpWidget(const MaterialApp(home: SizedBox.shrink()));
      expect(audio.isDisposed, isTrue);
    });

    testWidgets('VideoPlayerTile renders title and disposes safely', (tester) async {
      var disposed = false;
      await tester.pumpWidget(
        MaterialApp(
          home: Scaffold(
            body: VideoPlayerTile(
              src: '/uploads/clip.mp4',
              title: 'অণু পরমাণু',
              envConfig: const EnvConfig(apiBaseUrl: 'https://api.porhi.app'),
              playerBuilder: (context, resolvedUrl, onRegisterDispose) {
                onRegisterDispose(() {
                  disposed = true;
                });
                return Center(child: Text('VIDEO:$resolvedUrl'));
              },
            ),
          ),
        ),
      );
      await tester.pumpAndSettle();

      expect(find.text('অণু পরমাণু'), findsOneWidget);
      expect(find.text('VIDEO:https://api.porhi.app/uploads/clip.mp4'), findsOneWidget);

      await tester.pumpWidget(const MaterialApp(home: SizedBox.shrink()));
      expect(disposed, isTrue);
    });

    testWidgets('InteractiveLabCard supports relative URLs, offline file paths, reload, and fullscreen', (
      tester,
    ) async {
      var reloadCount = 0;
      String? seenSource;
      bool? seenIsLocalFile;

      await tester.pumpWidget(
        MaterialApp(
          home: Scaffold(
            body: SingleChildScrollView(
              child: InteractiveLabCard(
                widgetUrl: '/uploads/interactive/motion.html',
                title: 'গতি ল্যাব',
                envConfig: const EnvConfig(apiBaseUrl: 'https://api.porhi.app'),
                webViewBuilder: (context, source, {required isLocalFile, required isHtml}) {
                  seenSource = source;
                  seenIsLocalFile = isLocalFile;
                  return Text('WEBVIEW:$source');
                },
                onReloadCallback: () => reloadCount++,
              ),
            ),
          ),
        ),
      );
      await tester.pumpAndSettle();

      expect(seenSource, 'https://api.porhi.app/uploads/interactive/motion.html');
      expect(seenIsLocalFile, isFalse);
      expect(find.text('গতি ল্যাব'), findsOneWidget);

      await tester.tap(find.byTooltip('পুনরায় শুরু'));
      await tester.pump();
      expect(reloadCount, 1);

      await tester.tap(find.byTooltip('পূর্ণস্ক্রীন'));
      await tester.pumpAndSettle();
      expect(find.byTooltip('পূর্ণস্ক্রীন বন্ধ'), findsOneWidget);

      await tester.tap(find.byTooltip('পূর্ণস্ক্রীন বন্ধ'));
      await tester.pumpAndSettle();
      expect(find.byTooltip('পূর্ণস্ক্রীন বন্ধ'), findsNothing);
    });

    testWidgets('LessonAudioPlayer controls audio playback, speed, and Bangla TTS safely', (
      tester,
    ) async {
      final audio = _FakeAudioBackend();
      final tts = _FakeTtsBackend();

      await tester.pumpWidget(
        MaterialApp(
          home: Scaffold(
            body: LessonAudioPlayer(
              audioUrl: '/audio/ch1.mp3',
              audioDurationSeconds: 120,
              title: 'ভৌত রাশি',
              narrationText: 'ভৌত রাশি পরিমাপের জন্য **একক** প্রয়োজন \$F=ma\$.',
              envConfig: const EnvConfig(apiBaseUrl: 'https://api.porhi.app'),
              audioBackendFactory: () => audio,
              ttsBackendFactory: () => tts,
            ),
          ),
        ),
      );
      await tester.pumpAndSettle();

      expect(audio.loadedUrl, 'https://api.porhi.app/audio/ch1.mp3');

      await tester.tap(find.text('1.25x'));
      await tester.pump();
      expect(audio.currentSpeed, 1.25);

      await tester.tap(find.text('অডিও চালাও'));
      await tester.pump();
      expect(audio.playCalled, isTrue);

      await tester.tap(find.text('ভয়েস পাঠ শুরু'));
      await tester.pump();
      expect(tts.lastLanguage, 'bn-BD');
      expect(tts.lastRate, 1.25);
      expect(tts.lastSpokenText, isNot(contains(r'$F=ma$')));
      expect(tts.lastSpokenText, contains('ভৌত রাশি'));

      await tester.pumpWidget(const MaterialApp(home: SizedBox.shrink()));
      expect(audio.isDisposed, isTrue);
      expect(tts.stopCalled, isTrue);
    });

    testWidgets('InteractiveLabCard handles local file:// paths and inline HTML', (
      tester,
    ) async {
      String? seenSource;
      bool? seenLocal;
      bool? seenHtml;

      await tester.pumpWidget(
        MaterialApp(
          home: Scaffold(
            body: InteractiveLabWebView(
              widgetUrl: 'file:///data/user/0/com.porhi.app/files/lab/index.html',
              webViewBuilder: (context, source, {required isLocalFile, required isHtml}) {
                seenSource = source;
                seenLocal = isLocalFile;
                seenHtml = isHtml;
                return const SizedBox.shrink();
              },
            ),
          ),
        ),
      );
      expect(seenSource, '/data/user/0/com.porhi.app/files/lab/index.html');
      expect(seenLocal, isTrue);
      expect(seenHtml, isFalse);

      await tester.pumpWidget(
        MaterialApp(
          home: Scaffold(
            body: InteractiveLabWebView(
              htmlContent: '<html><body>Sim</body></html>',
              webViewBuilder: (context, source, {required isLocalFile, required isHtml}) {
                seenSource = source;
                seenLocal = isLocalFile;
                seenHtml = isHtml;
                return const SizedBox.shrink();
              },
            ),
          ),
        ),
      );
      expect(seenSource, '<html><body>Sim</body></html>');
      expect(seenLocal, isFalse);
      expect(seenHtml, isTrue);
    });

    testWidgets('AudioPlayerTile handles setUrl failure and post-dispose completion safely', (
      tester,
    ) async {
      final delayedCompleter = Completer<Duration?>();
      final slowAudio = _DelayedAudioBackend(delayedCompleter);

      await tester.pumpWidget(
        MaterialApp(
          home: Scaffold(
            body: AudioPlayerTile(
              src: '/audio/slow.mp3',
              backendFactory: () => slowAudio,
            ),
          ),
        ),
      );

      // Unmount before setUrl completes, then reject future.
      await tester.pumpWidget(const MaterialApp(home: SizedBox.shrink()));
      delayedCompleter.completeError(Exception('network error'));
      await tester.pump();
      expect(tester.takeException(), isNull);
    });

    testWidgets('LessonAudioPlayer uses en-US for English content when audioUrl is null', (
      tester,
    ) async {
      final tts = _FakeTtsBackend();

      await tester.pumpWidget(
        MaterialApp(
          home: Scaffold(
            body: LessonAudioPlayer(
              audioUrl: null,
              title: 'Newton Laws',
              narrationText: 'Every action has an equal and opposite reaction.',
              ttsBackendFactory: () => tts,
            ),
          ),
        ),
      );
      await tester.pumpAndSettle();

      expect(find.text('অডিও চালাও'), findsNothing);
      await tester.tap(find.text('ভয়েস পাঠ শুরু'));
      await tester.pump();
      expect(tts.lastLanguage, 'en-US');
    });

    testWidgets('RichContentView handles empty content, short table rows, and onLinkTap', (
      tester,
    ) async {
      String? tappedHref;

      await tester.pumpWidget(
        const MaterialApp(
          home: Scaffold(body: RichContentView(content: '')),
        ),
      );
      expect(find.byType(Column), findsNothing);

      await tester.pumpWidget(
        MaterialApp(
          home: Scaffold(
            body: SingleChildScrollView(
              child: RichContentView(
                content: '''
| A | B | C |
|---|---|---|
| 1 | 2 |

দেখো [উইকি](https://porhi.app/wiki) এবং `inlineCode`।

\$\$E = mc^2\$\$
''',
                onLinkTap: (href) => tappedHref = href,
              ),
            ),
          ),
        ),
      );
      await tester.pumpAndSettle();

      expect(tester.takeException(), isNull);
      await tester.tap(find.text('উইকি'));
      await tester.pump();
      expect(tappedHref, 'https://porhi.app/wiki');
    });

    test('divider parser handles worst-case non-matching line without ReDoS', () {
      final adversarial = '${'-' * 2000}!';
      final sw = Stopwatch()..start();
      final blocks = parseMarkdownBlocks(adversarial);
      sw.stop();

      expect(blocks, hasLength(1));
      expect(blocks.first, isA<ParagraphBlock>());
      expect(sw.elapsedMilliseconds, lessThan(200));
    });

    test('parseRichTokens handles [INTERACTIVE:] with JS brackets/|| and unclosed <audio', () {
      const raw = '''
<audio src="/a.mp3"
পরবর্তী প্যারাগ্রাফ
[INTERACTIVE: <html><script>const x = arr[0] || 1;</script></html> | সিমুলেশন]
''';
      final tokens = parseRichTokens(raw);
      final interactive = tokens.whereType<InteractiveContentToken>().single;
      expect(interactive.html, contains('arr[0] || 1'));
      expect(interactive.title, 'সিমুলেশন');
      expect(tokens.whereType<AudioContentToken>(), isEmpty);
    });

    test('tryParseLocalFilePath and tryParseAllowedWebUri handle malformed and dangerous URIs', () {
      expect(
        tryParseLocalFilePath('file:///data/user/0/lab/index.html'),
        '/data/user/0/lab/index.html',
      );
      expect(tryParseLocalFilePath('file://localhost/etc/passwd'), isNull);
      expect(tryParseLocalFilePath('file:///%E0%A4%A'), isNull);
      expect(tryParseLocalFilePath('https://porhi.app/img.png'), isNull);

      expect(tryParseAllowedWebUri('javascript:alert(1)'), isNull);
      expect(tryParseAllowedWebUri('intent://scan/#Intent;end'), isNull);
      expect(tryParseAllowedWebUri('data:text/html,<script>1</script>'), isNull);
      expect(tryParseAllowedWebUri('file:///etc/passwd'), isNull);
      expect(
        tryParseAllowedWebUri('//cdn.porhi.app/a.png')?.toString(),
        'https://cdn.porhi.app/a.png',
      );
    });

    test('InteractiveLab & YouTube WebView navigation guards reject unsafe schemes and origins', () {
      expect(
        resolveInteractiveLabSource(widgetUrl: 'javascript:alert(1)').isEmpty,
        isTrue,
      );
      expect(
        resolveInteractiveLabSource(widgetUrl: 'intent://foo').isEmpty,
        isTrue,
      );
      expect(
        resolveInteractiveLabSource(widgetUrl: 'data:text/html,hi').isEmpty,
        isTrue,
      );
      expect(
        resolveInteractiveLabSource(
          widgetUrl: 'file:///data/lab/index.html',
          allowLocalFile: false,
        ).isEmpty,
        isTrue,
      );

      final initialUri = Uri.parse('https://api.porhi.app/uploads/sim/index.html');
      expect(
        decideInteractiveLabNavigation(
          'https://api.porhi.app/uploads/sim/app.js',
          initialUri: initialUri,
          isLocalFile: false,
          isHtml: false,
        ),
        NavigationDecision.navigate,
      );
      expect(
        decideInteractiveLabNavigation(
          'https://evil.example/phish',
          initialUri: initialUri,
          isLocalFile: false,
          isHtml: false,
        ),
        NavigationDecision.prevent,
      );
      expect(
        decideInteractiveLabNavigation(
          'intent://launch',
          initialUri: initialUri,
          isLocalFile: false,
          isHtml: false,
        ),
        NavigationDecision.prevent,
      );
      expect(
        decideInteractiveLabNavigation(
          'file:///data/lab/sub/asset.js',
          initialLocalFilePath: '/data/lab/index.html',
          isLocalFile: true,
          isHtml: false,
        ),
        NavigationDecision.navigate,
      );
      expect(
        decideInteractiveLabNavigation(
          'file:///etc/passwd',
          initialLocalFilePath: '/data/lab/index.html',
          isLocalFile: true,
          isHtml: false,
        ),
        NavigationDecision.prevent,
      );

      expect(buildYoutubeEmbedUri('bad?id=1'), isNull);
      expect(
        buildYoutubeEmbedUri('dQw4w9WgXcQ')?.toString(),
        'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1',
      );
      expect(
        decideYoutubeNavigation('https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ'),
        NavigationDecision.navigate,
      );
      expect(
        decideYoutubeNavigation('http://www.youtube.com/watch?v=dQw4w9WgXcQ'),
        NavigationDecision.prevent,
      );
      expect(
        decideYoutubeNavigation('https://evil.example/watch'),
        NavigationDecision.prevent,
      );
    });

    testWidgets('LatexText groups inline text and \$...\$ on one RichText alongside \$\$...\$\$', (
      tester,
    ) async {
      await tester.pumpWidget(
        const MaterialApp(
          home: Scaffold(
            body: LatexText(
              content: r'যদি $u = 0$ হয় তবে $$v = at$$ এবং বেগ $v$ হবে।',
              style: TextStyle(fontSize: 15),
            ),
          ),
        ),
      );
      await tester.pumpAndSettle();

      expect(tester.takeException(), isNull);
      // Should be 2 Text.rich runs (before and after $$v = at$$) + 3 Math widgets, not 5 separate lines.
      expect(
        find.byWidgetPredicate((w) => w is Text && w.textSpan != null),
        findsNWidgets(2),
      );
      expect(find.byType(Math), findsNWidgets(3));
    });

    testWidgets('RichContentView ignores unsafe javascript: links and unclickable links', (
      tester,
    ) async {
      var tapped = false;
      await tester.pumpWidget(
        MaterialApp(
          home: Scaffold(
            body: RichContentView(
              content: 'এখানে [XSS](javascript:alert(1)) এবং [নিরাপদ](https://porhi.app)',
              onLinkTap: (_) => tapped = true,
            ),
          ),
        ),
      );
      await tester.pumpAndSettle();

      // Unsafe link is rendered as plain inline text (not a clickable Text('XSS') GestureDetector).
      expect(find.text('XSS'), findsNothing);
      await tester.tap(find.textContaining('XSS'));
      expect(tapped, isFalse);

      await tester.tap(find.text('নিরাপদ'));
      expect(tapped, isTrue);
    });

    testWidgets('InteractiveLabCard fullscreen dialog rebuilds on reload inside fullscreen', (
      tester,
    ) async {
      var buildCount = 0;
      await tester.pumpWidget(
        MaterialApp(
          home: Scaffold(
            body: InteractiveLabCard(
              widgetUrl: '/uploads/sim/motion.html',
              envConfig: const EnvConfig(apiBaseUrl: 'https://api.porhi.app'),
              webViewBuilder: (context, source, {required isLocalFile, required isHtml}) {
                buildCount++;
                return Text('BUILD:$buildCount');
              },
            ),
          ),
        ),
      );
      await tester.pumpAndSettle();
      expect(buildCount, 1);

      await tester.tap(find.byTooltip('পূর্ণস্ক্রীন'));
      await tester.pumpAndSettle();
      expect(find.text('BUILD:2'), findsOneWidget);

      await tester.tap(find.byTooltip('পুনরায় শুরু').last);
      await tester.pumpAndSettle();
      expect(find.text('BUILD:3'), findsOneWidget);
    });

    testWidgets('YoutubeVideoTile opens embed on tap and resets on videoId change', (
      tester,
    ) async {
      Uri? seenEmbed;
      await tester.pumpWidget(
        MaterialApp(
          home: Scaffold(
            body: YoutubeVideoTile(
              videoId: 'dQw4w9WgXcQ',
              title: 'প্রথম ভিডিও',
              embedBuilder: (_, uri) {
                seenEmbed = uri;
                return Text('EMBED:$uri');
              },
            ),
          ),
        ),
      );

      await tester.tap(find.textContaining('ভিডিও চালাতে ট্যাপ করুন'));
      await tester.pump();
      expect(
        seenEmbed?.toString(),
        'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1',
      );

      await tester.pumpWidget(
        MaterialApp(
          home: Scaffold(
            body: YoutubeVideoTile(
              videoId: 'abcDEF12345',
              title: 'দ্বিতীয় ভিডিও',
              embedBuilder: (_, uri) => Text('EMBED:$uri'),
            ),
          ),
        ),
      );
      await tester.pump();
      expect(find.textContaining('abcDEF12345'), findsOneWidget);
      expect(find.textContaining('EMBED:'), findsNothing);
    });

    testWidgets('VideoPlayerTile discards stale controller when src updates mid-init', (
      tester,
    ) async {
      final firstInit = Completer<void>();
      final secondInit = Completer<void>();
      final firstController = _FakeVideoController(firstInit.future);
      final secondController = _FakeVideoController(secondInit.future);

      await tester.pumpWidget(
        MaterialApp(
          home: Scaffold(
            body: VideoPlayerTile(
              src: '/uploads/v1.mp4',
              envConfig: const EnvConfig(apiBaseUrl: 'https://api.porhi.app'),
              controllerFactory: (_, _, _) => firstController,
            ),
          ),
        ),
      );

      await tester.pumpWidget(
        MaterialApp(
          home: Scaffold(
            body: VideoPlayerTile(
              src: '/uploads/v2.mp4',
              envConfig: const EnvConfig(apiBaseUrl: 'https://api.porhi.app'),
              controllerFactory: (_, _, _) => secondController,
            ),
          ),
        ),
      );

      firstInit.complete();
      await tester.pump();
      expect(firstController.disposed, isTrue);

      secondInit.completeError(Exception('no platform'));
      await tester.pumpAndSettle();
      expect(secondController.disposed, isTrue);
    });

    test('FlutterTtsLessonBackend maps 1.0x rate to 0.5 flutter_tts scale', () async {
      final mockTts = _MockFlutterTts();
      when(() => mockTts.setSpeechRate(any())).thenAnswer((_) async => 1);
      final backend = FlutterTtsLessonBackend(tts: mockTts);

      await backend.setSpeechRate(1.0);
      verify(() => mockTts.setSpeechRate(0.5)).called(1);

      await backend.setSpeechRate(1.5);
      verify(() => mockTts.setSpeechRate(0.75)).called(1);
    });

    testWidgets('LessonAudioPlayer and AudioPlayerTile ignore stale async loads on src update', (
      tester,
    ) async {
      final firstLoadCompleter = Completer<Duration?>();
      final racingAudio = _RacingAudioBackend(firstLoadCompleter);

      await tester.pumpWidget(
        MaterialApp(
          home: Scaffold(
            body: AudioPlayerTile(
              src: '/audio/one.mp3',
              envConfig: const EnvConfig(apiBaseUrl: 'https://api.porhi.app'),
              backendFactory: () => racingAudio,
            ),
          ),
        ),
      );

      await tester.pumpWidget(
        MaterialApp(
          home: Scaffold(
            body: AudioPlayerTile(
              src: '/audio/two.mp3',
              envConfig: const EnvConfig(apiBaseUrl: 'https://api.porhi.app'),
              backendFactory: () => racingAudio,
            ),
          ),
        ),
      );
      await tester.pump();

      // First (stale) load fails after second load already completed.
      firstLoadCompleter.completeError(Exception('stale failure'));
      await tester.pumpAndSettle();
      expect(racingAudio.loadedUrl, 'https://api.porhi.app/audio/two.mp3');
      expect(find.text('অডিও লোড করা যায়নি'), findsNothing);

      final lessonAudio = _FakeAudioBackend();
      await tester.pumpWidget(
        MaterialApp(
          home: Scaffold(
            body: LessonAudioPlayer(
              audioUrl: '/audio/ch1.mp3',
              title: 'পাঠ ১',
              narrationText: 'বিষয়বস্তু',
              envConfig: const EnvConfig(apiBaseUrl: 'https://api.porhi.app'),
              audioBackendFactory: () => lessonAudio,
              ttsBackendFactory: _FakeTtsBackend.new,
            ),
          ),
        ),
      );
      await tester.pump();
      expect(find.text('অডিও চালাও'), findsOneWidget);

      await tester.pumpWidget(
        MaterialApp(
          home: Scaffold(
            body: LessonAudioPlayer(
              audioUrl: null,
              title: 'পাঠ ১',
              narrationText: 'বিষয়বস্তু',
              envConfig: const EnvConfig(apiBaseUrl: 'https://api.porhi.app'),
              audioBackendFactory: () => lessonAudio,
              ttsBackendFactory: _FakeTtsBackend.new,
            ),
          ),
        ),
      );
      await tester.pump();
      expect(lessonAudio.pauseCalled, isTrue);
      expect(find.text('অডিও চালাও'), findsNothing);
    });
  });
}

class _MockFlutterTts extends Mock implements FlutterTts {}

class _FakeVideoController extends Fake implements VideoPlayerController {
  final Future<void> _initFuture;
  bool disposed = false;

  _FakeVideoController(this._initFuture);

  @override
  VideoPlayerValue get value => const VideoPlayerValue(
        duration: Duration(seconds: 10),
        size: Size(160, 90),
        isInitialized: true,
      );

  @override
  Future<void> initialize() => _initFuture;

  @override
  Future<void> dispose() async {
    disposed = true;
  }
}

class _DelayedAudioBackend extends _FakeAudioBackend {
  final Completer<Duration?> _completer;

  _DelayedAudioBackend(this._completer);

  @override
  Future<Duration?> setUrl(String url) => _completer.future;
}

class _RacingAudioBackend extends _FakeAudioBackend {
  final Completer<Duration?> _firstCompleter;
  int _calls = 0;

  _RacingAudioBackend(this._firstCompleter);

  @override
  Future<Duration?> setUrl(String url) {
    _calls++;
    if (_calls == 1) {
      return _firstCompleter.future;
    }
    return super.setUrl(url);
  }
}
