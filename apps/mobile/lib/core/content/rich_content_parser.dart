/// Pure Dart rich-content, Markdown, and LaTeX parser mirroring poRi web's
/// `RichContentRenderer` and `LatexRenderer` semantics.
library;

enum RichContentTokenType {
  text,
  audio,
  video,
  image,
  youtube,
  interactive,
}

sealed class RichContentToken {
  const RichContentToken();

  RichContentTokenType get type;

  String get text => '';
  String get src => '';
  String get title => '';
  String get alt => '';
  String get videoId => '';
  String get html => '';

  const factory RichContentToken.text(String text) = TextContentToken;
  const factory RichContentToken.audio({
    required String src,
    String title,
  }) = AudioContentToken;
  const factory RichContentToken.video({
    required String src,
    String title,
  }) = VideoContentToken;
  const factory RichContentToken.image({
    required String src,
    String alt,
  }) = ImageContentToken;
  const factory RichContentToken.youtube({
    required String videoId,
    String src,
    String title,
  }) = YoutubeContentToken;
  const factory RichContentToken.interactive({
    String src,
    String html,
    String title,
  }) = InteractiveContentToken;
}

final class TextContentToken extends RichContentToken {
  @override
  final String text;

  const TextContentToken(this.text);

  @override
  RichContentTokenType get type => RichContentTokenType.text;

  @override
  bool operator ==(Object other) =>
      identical(this, other) ||
      other is TextContentToken && other.text == text;

  @override
  int get hashCode => Object.hash(type, text);
}

final class AudioContentToken extends RichContentToken {
  @override
  final String src;
  @override
  final String title;

  const AudioContentToken({required this.src, this.title = ''});

  @override
  RichContentTokenType get type => RichContentTokenType.audio;

  @override
  bool operator ==(Object other) =>
      identical(this, other) ||
      other is AudioContentToken && other.src == src && other.title == title;

  @override
  int get hashCode => Object.hash(type, src, title);
}

final class VideoContentToken extends RichContentToken {
  @override
  final String src;
  @override
  final String title;

  const VideoContentToken({required this.src, this.title = ''});

  @override
  RichContentTokenType get type => RichContentTokenType.video;

  @override
  bool operator ==(Object other) =>
      identical(this, other) ||
      other is VideoContentToken && other.src == src && other.title == title;

  @override
  int get hashCode => Object.hash(type, src, title);
}

final class ImageContentToken extends RichContentToken {
  @override
  final String src;
  @override
  final String alt;

  const ImageContentToken({required this.src, this.alt = ''});

  @override
  RichContentTokenType get type => RichContentTokenType.image;

  @override
  bool operator ==(Object other) =>
      identical(this, other) ||
      other is ImageContentToken && other.src == src && other.alt == alt;

  @override
  int get hashCode => Object.hash(type, src, alt);
}

final class YoutubeContentToken extends RichContentToken {
  @override
  final String videoId;
  @override
  final String src;
  @override
  final String title;

  const YoutubeContentToken({
    required this.videoId,
    this.src = '',
    this.title = '',
  });

  @override
  RichContentTokenType get type => RichContentTokenType.youtube;

  @override
  bool operator ==(Object other) =>
      identical(this, other) ||
      other is YoutubeContentToken &&
          other.videoId == videoId &&
          other.src == src &&
          other.title == title;

  @override
  int get hashCode => Object.hash(type, videoId, src, title);
}

final class InteractiveContentToken extends RichContentToken {
  @override
  final String src;
  @override
  final String html;
  @override
  final String title;

  const InteractiveContentToken({
    this.src = '',
    this.html = '',
    this.title = '',
  });

  @override
  RichContentTokenType get type => RichContentTokenType.interactive;

  @override
  bool operator ==(Object other) =>
      identical(this, other) ||
      other is InteractiveContentToken &&
          other.src == src &&
          other.html == html &&
          other.title == title;

  @override
  int get hashCode => Object.hash(type, src, html, title);
}

enum CalloutKind { normal, definition, tip, warning }

sealed class MarkdownBlock {
  const MarkdownBlock();
}

final class HeadingBlock extends MarkdownBlock {
  final int level;
  final String text;

  const HeadingBlock({required this.level, required this.text});
}

final class DividerBlock extends MarkdownBlock {
  const DividerBlock();
}

final class BlockquoteBlock extends MarkdownBlock {
  final String text;

  const BlockquoteBlock({required this.text});

  CalloutKind get calloutKind {
    final lower = text.toLowerCase();
    if (text.contains('**সংজ্ঞা:**') ||
        text.contains('সংজ্ঞা:') ||
        lower.contains('definition')) {
      return CalloutKind.definition;
    }
    if (text.contains('**মনে রাখবে:**') ||
        text.contains('**টিপস:**') ||
        lower.contains('tip')) {
      return CalloutKind.tip;
    }
    if (text.contains('**সতর্কতা:**') || lower.contains('warning')) {
      return CalloutKind.warning;
    }
    return CalloutKind.normal;
  }
}

final class UnorderedListBlock extends MarkdownBlock {
  final List<String> items;

  const UnorderedListBlock({required this.items});
}

final class OrderedListItem {
  final String num;
  final String text;

  const OrderedListItem({required this.num, required this.text});
}

final class OrderedListBlock extends MarkdownBlock {
  final List<OrderedListItem> items;

  const OrderedListBlock({required this.items});
}

final class MathBlock extends MarkdownBlock {
  final String math;

  const MathBlock({required this.math});
}

final class CodeBlock extends MarkdownBlock {
  final String language;
  final String code;

  const CodeBlock({this.language = '', required this.code});
}

final class TableBlock extends MarkdownBlock {
  final List<String> headers;
  final List<List<String>> rows;

  const TableBlock({required this.headers, required this.rows});
}

final class ParagraphBlock extends MarkdownBlock {
  final String text;

  const ParagraphBlock({required this.text});
}

enum LatexSegmentType { text, inline, block }

final class LatexSegment {
  final LatexSegmentType type;
  final String raw;
  final String math;

  const LatexSegment({
    required this.type,
    required this.raw,
    this.math = '',
  });
}

enum InlineTokenType { text, bold, italic, code, math, link }

final class InlineToken {
  final InlineTokenType type;
  final String raw;
  final String content;
  final String href;

  const InlineToken({
    required this.type,
    this.raw = '',
    this.content = '',
    this.href = '',
  });
}

final RegExp _attrRegex = RegExp(
  r'''([a-zA-Z0-9_-]+)\s*=\s*(?:"([^"]*)"|'([^']*)')''',
);

final RegExp _richTokenPattern = RegExp(
  r'<audio\b[^\n>]*>(?:[^\n<]*</audio>)?'
  r'|<video\b[^\n>]*>(?:[^\n<]*</video>)?'
  r'|<iframe\b[^\n>]*>(?:[^\n<]*</iframe>)?'
  r'|!\[([^\]]*)\]\(([^)\n]+)\)'
  r'|\[(IMAGE|AUDIO|VIDEO|YOUTUBE)\s*:\s*([^\n\]]+)\]'
  r'|\[(INTERACTIVE)\s*:\s*((?:<html\b[^>]*>[\s\S]*?</html>|[^\n\]]+)(?:\s*\|\s*[^\n\]]*)?)\]',
  caseSensitive: false,
);

final RegExp _youtubeIdOnlyRegex = RegExp(r'^[a-zA-Z0-9_-]{11}$');
final RegExp _youtubeUrlRegex = RegExp(
  r'(?:youtube\.com/(?:watch\?(?:[^#\s]*&)?v=|embed/|shorts/|v/)|youtu\.be/)([a-zA-Z0-9_-]{11})',
  caseSensitive: false,
);

final RegExp _dividerRegex = RegExp(r'^\s*(?:[-*_]\s*){3,}$');
final RegExp _headingRegex = RegExp(r'^(#{1,4})\s+(.+)$');
final RegExp _unorderedListRegex = RegExp(r'^\s*[-*]\s+');
final RegExp _orderedListRegex = RegExp(r'^\s*(\d+|[০-৯]+)\.\s+(.*)$');
final RegExp _tableSeparatorRegex = RegExp(r'^\|[\s\-:|]+\|$');
final RegExp _codeFenceRegex = RegExp(r'^```([a-zA-Z0-9_-]*)\s*$');

final RegExp _latexSegmentRegex = RegExp(
  r'\$\$([\s\S]+?)\$\$|\$(?!\s)([^$\n]*?\S)\$',
);

final RegExp _inlineTokenRegex = RegExp(
  r'(\*\*[^*]+?\*\*)'
  r'|(`[^`\n]+?`)'
  r'|(\$(?!\s)[^$\n]*?\S\$)'
  r'|(?:\*([^*]+?)\*)'
  r'|(\[([^\]]+)\]\(([^)\n]+)\))',
);

/// Parses HTML tag attributes (`src="..." title='...'`) into a lowercase map.
Map<String, String> parseTagAttributes(String tagStr) {
  final attrs = <String, String>{};
  for (final match in _attrRegex.allMatches(tagStr)) {
    final key = match.group(1)!.toLowerCase();
    final value = match.group(2) ?? match.group(3) ?? '';
    attrs[key] = value;
  }
  return attrs;
}

/// Extracts an 11-character YouTube video ID from a raw ID or YouTube URL.
String? extractYouTubeVideoId(String input) {
  final trimmed = input.trim();
  if (trimmed.isEmpty) return null;
  if (_youtubeIdOnlyRegex.hasMatch(trimmed)) {
    return trimmed;
  }
  final match = _youtubeUrlRegex.firstMatch(trimmed);
  return match?.group(1);
}

/// Tokenizes raw lesson/question content into ordered text and media tokens.
List<RichContentToken> parseRichTokens(String raw) {
  if (raw.isEmpty) return const [];

  final tokens = <RichContentToken>[];
  var lastIndex = 0;

  for (final match in _richTokenPattern.allMatches(raw)) {
    if (match.start > lastIndex) {
      tokens.add(RichContentToken.text(raw.substring(lastIndex, match.start)));
    }

    final fullMatch = match.group(0)!;
    final lower = fullMatch.toLowerCase();

    if (lower.startsWith('<audio')) {
      final attrs = parseTagAttributes(fullMatch);
      tokens.add(
        RichContentToken.audio(
          src: (attrs['src'] ?? '').trim(),
          title: (attrs['title'] ?? '').trim(),
        ),
      );
    } else if (lower.startsWith('<video')) {
      final attrs = parseTagAttributes(fullMatch);
      tokens.add(
        RichContentToken.video(
          src: (attrs['src'] ?? '').trim(),
          title: (attrs['title'] ?? '').trim(),
        ),
      );
    } else if (lower.startsWith('<iframe')) {
      final attrs = parseTagAttributes(fullMatch);
      tokens.add(
        RichContentToken.interactive(
          src: (attrs['src'] ?? '').trim(),
          title: (attrs['title'] ?? '').trim(),
        ),
      );
    } else if (fullMatch.startsWith('![')) {
      tokens.add(
        RichContentToken.image(
          alt: (match.group(1) ?? '').trim(),
          src: _stripMarkdownImageTitle((match.group(2) ?? '').trim()),
        ),
      );
    } else if (match.group(3) != null) {
      final kind = match.group(3)!.toUpperCase();
      final payload = match.group(4) ?? '';
      tokens.add(_parseBracketToken(kind, payload));
    } else if (match.group(5) != null) {
      final kind = match.group(5)!.toUpperCase();
      final payload = match.group(6) ?? '';
      tokens.add(_parseBracketToken(kind, payload));
    }

    lastIndex = match.end;
  }

  if (lastIndex < raw.length) {
    tokens.add(RichContentToken.text(raw.substring(lastIndex)));
  }

  return tokens;
}

String _stripMarkdownImageTitle(String rawSrc) {
  final quoteIdx = rawSrc.indexOf(' "');
  if (quoteIdx > 0 && rawSrc.endsWith('"')) {
    return rawSrc.substring(0, quoteIdx).trim();
  }
  return rawSrc;
}

RichContentToken _parseBracketToken(String kind, String payload) {
  final sepIndex = kind == 'INTERACTIVE'
      ? _findInteractiveTitleSeparator(payload)
      : payload.indexOf('|');
  final source = (sepIndex == -1 ? payload : payload.substring(0, sepIndex))
      .trim();
  final label = sepIndex == -1 ? '' : payload.substring(sepIndex + 1).trim();

  switch (kind) {
    case 'IMAGE':
      return RichContentToken.image(src: source, alt: label);
    case 'AUDIO':
      return RichContentToken.audio(src: source, title: label);
    case 'VIDEO':
      return RichContentToken.video(src: source, title: label);
    case 'YOUTUBE':
      final videoId = extractYouTubeVideoId(source) ?? '';
      return RichContentToken.youtube(
        videoId: videoId,
        src: source,
        title: label,
      );
    case 'INTERACTIVE':
      final lower = source.toLowerCase();
      if (source.startsWith('<') || lower.contains('<html')) {
        return RichContentToken.interactive(html: source, title: label);
      }
      return RichContentToken.interactive(src: source, title: label);
    default:
      return RichContentToken.text(payload);
  }
}

int _findInteractiveTitleSeparator(String payload) {
  final lastPipe = payload.lastIndexOf('|');
  if (lastPipe == -1) return -1;
  final trailing = payload.substring(lastPipe + 1);
  // If the trailing segment contains HTML tags, the '|' was inside script/HTML, not a title separator.
  if (trailing.contains('<') || trailing.contains('>')) {
    return -1;
  }
  return lastPipe;
}

/// Parses a plain-text Markdown segment into structured [MarkdownBlock] items.
/// Never throws on unclosed `$$`, unclosed ` ``` `, or malformed tables.
List<MarkdownBlock> parseMarkdownBlocks(String raw) {
  if (raw.isEmpty) return const [];

  final blocks = <MarkdownBlock>[];
  final lines = raw.replaceAll('\r\n', '\n').split('\n');
  var i = 0;

  while (i < lines.length) {
    final line = lines[i];
    final trimmed = line.trim();

    if (trimmed.isEmpty) {
      i++;
      continue;
    }

    // Fenced code block ```...```
    final fenceMatch = _codeFenceRegex.firstMatch(trimmed);
    if (fenceMatch != null) {
      final lang = fenceMatch.group(1) ?? '';
      final codeLines = <String>[];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith('```')) {
        codeLines.add(lines[i]);
        i++;
      }
      if (i < lines.length && lines[i].trim().startsWith('```')) {
        i++;
      }
      blocks.add(CodeBlock(language: lang, code: codeLines.join('\n')));
      continue;
    }

    // Display math $$...$$
    if (trimmed.startsWith(r'$$')) {
      final secondIdx = trimmed.indexOf(r'$$', 2);
      if (trimmed.length > 2 && trimmed.endsWith(r'$$') && secondIdx != -1) {
        final math = trimmed.substring(2, trimmed.length - 2).trim();
        if (math.isNotEmpty) {
          blocks.add(MathBlock(math: math));
        }
        i++;
        continue;
      }

      final buffer = StringBuffer(trimmed.substring(2));
      i++;
      while (i < lines.length && !lines[i].contains(r'$$')) {
        if (buffer.isNotEmpty) {
          buffer.write('\n');
        }
        buffer.write(lines[i]);
        i++;
      }
      if (i < lines.length) {
        final closingLine = lines[i].replaceFirst(r'$$', '');
        if (closingLine.trim().isNotEmpty) {
          if (buffer.isNotEmpty) buffer.write('\n');
          buffer.write(closingLine);
        }
        i++;
      }
      final math = buffer.toString().trim();
      if (math.isNotEmpty) {
        blocks.add(MathBlock(math: math));
      }
      continue;
    }

    // Dividers: ---, ***, ___
    if (_dividerRegex.hasMatch(line)) {
      blocks.add(const DividerBlock());
      i++;
      continue;
    }

    // Headings: #, ##, ###, ####
    final hMatch = _headingRegex.firstMatch(line);
    if (hMatch != null) {
      blocks.add(
        HeadingBlock(
          level: hMatch.group(1)!.length,
          text: hMatch.group(2)!.trim(),
        ),
      );
      i++;
      continue;
    }

    // Blockquote: > lines
    if (trimmed.startsWith('>')) {
      final qLines = <String>[];
      while (i < lines.length && lines[i].trim().startsWith('>')) {
        qLines.add(lines[i].trim().replaceFirst(RegExp(r'^>\s?'), ''));
        i++;
      }
      blocks.add(BlockquoteBlock(text: qLines.join('\n')));
      continue;
    }

    // Unordered list: - or *
    if (_unorderedListRegex.hasMatch(line)) {
      final items = <String>[];
      while (i < lines.length && _unorderedListRegex.hasMatch(lines[i])) {
        items.add(lines[i].replaceFirst(_unorderedListRegex, '').trim());
        i++;
      }
      blocks.add(UnorderedListBlock(items: items));
      continue;
    }

    // Ordered list: 1. or ১.
    if (_orderedListRegex.hasMatch(line)) {
      final items = <OrderedListItem>[];
      while (i < lines.length) {
        final itemMatch = _orderedListRegex.firstMatch(lines[i]);
        if (itemMatch == null) break;
        items.add(
          OrderedListItem(
            num: itemMatch.group(1)!,
            text: itemMatch.group(2)!.trim(),
          ),
        );
        i++;
      }
      blocks.add(OrderedListBlock(items: items));
      continue;
    }

    // Table: lines starting and ending with |
    if (_isTableLine(trimmed)) {
      final tableLines = <String>[];
      while (i < lines.length && _isTableLine(lines[i].trim())) {
        tableLines.add(lines[i].trim());
        i++;
      }
      if (tableLines.length >= 2) {
        final headers = _splitTableRow(tableLines.first);
        final rows = tableLines
            .skip(1)
            .where((r) => !_tableSeparatorRegex.hasMatch(r))
            .map(_splitTableRow)
            .toList();
        blocks.add(TableBlock(headers: headers, rows: rows));
      } else {
        blocks.add(ParagraphBlock(text: tableLines.join(' ')));
      }
      continue;
    }

    // Paragraph: collect lines until blank line or next block syntax
    final pLines = <String>[];
    while (i < lines.length) {
      final cur = lines[i];
      final curTrimmed = cur.trim();
      if (curTrimmed.isEmpty) break;
      if (_startsBlockSyntax(cur, curTrimmed)) break;
      pLines.add(curTrimmed);
      i++;
    }
    if (pLines.isNotEmpty) {
      blocks.add(ParagraphBlock(text: pLines.join(' ')));
    }
  }

  return blocks;
}

bool _isTableLine(String trimmed) =>
    trimmed.length >= 2 && trimmed.startsWith('|') && trimmed.endsWith('|');

List<String> _splitTableRow(String row) {
  final parts = row.split('|');
  if (parts.length <= 2) return [row];
  return parts.sublist(1, parts.length - 1).map((c) => c.trim()).toList();
}

bool _startsBlockSyntax(String line, String trimmed) {
  return trimmed.startsWith(r'$$') ||
      _codeFenceRegex.hasMatch(trimmed) ||
      _dividerRegex.hasMatch(line) ||
      _headingRegex.hasMatch(line) ||
      trimmed.startsWith('>') ||
      _unorderedListRegex.hasMatch(line) ||
      _orderedListRegex.hasMatch(line) ||
      _isTableLine(trimmed);
}

/// Splits [content] into text, inline `$...$`, and block `$$...$$` segments.
List<LatexSegment> parseLatexSegments(String content) {
  if (content.isEmpty) return const [];

  final segments = <LatexSegment>[];
  var lastIndex = 0;

  for (final match in _latexSegmentRegex.allMatches(content)) {
    if (match.start > lastIndex) {
      segments.add(
        LatexSegment(
          type: LatexSegmentType.text,
          raw: content.substring(lastIndex, match.start),
        ),
      );
    }

    final blockMath = match.group(1);
    final inlineMath = match.group(2);
    if (blockMath != null) {
      segments.add(
        LatexSegment(
          type: LatexSegmentType.block,
          raw: match.group(0)!,
          math: blockMath.trim(),
        ),
      );
    } else if (inlineMath != null) {
      segments.add(
        LatexSegment(
          type: LatexSegmentType.inline,
          raw: match.group(0)!,
          math: inlineMath.trim(),
        ),
      );
    }

    lastIndex = match.end;
  }

  if (lastIndex < content.length) {
    segments.add(
      LatexSegment(
        type: LatexSegmentType.text,
        raw: content.substring(lastIndex),
      ),
    );
  }

  return segments;
}

/// Tokenizes inline Markdown (`**bold**`, `*italic*`, `` `code` ``, `$math$`, `[text](href)`).
List<InlineToken> parseInlineTokens(String text) {
  if (text.isEmpty) return const [];

  final tokens = <InlineToken>[];
  var lastIndex = 0;

  for (final match in _inlineTokenRegex.allMatches(text)) {
    if (match.start > lastIndex) {
      tokens.add(
        InlineToken(
          type: InlineTokenType.text,
          raw: text.substring(lastIndex, match.start),
        ),
      );
    }

    if (match.group(1) != null) {
      final raw = match.group(1)!;
      tokens.add(
        InlineToken(
          type: InlineTokenType.bold,
          raw: raw,
          content: raw.substring(2, raw.length - 2),
        ),
      );
    } else if (match.group(2) != null) {
      final raw = match.group(2)!;
      tokens.add(
        InlineToken(
          type: InlineTokenType.code,
          raw: raw,
          content: raw.substring(1, raw.length - 1),
        ),
      );
    } else if (match.group(3) != null) {
      final raw = match.group(3)!;
      tokens.add(
        InlineToken(
          type: InlineTokenType.math,
          raw: raw,
          content: raw.substring(1, raw.length - 1).trim(),
        ),
      );
    } else if (match.group(4) != null) {
      tokens.add(
        InlineToken(
          type: InlineTokenType.italic,
          raw: match.group(0)!,
          content: match.group(4)!,
        ),
      );
    } else if (match.group(5) != null) {
      tokens.add(
        InlineToken(
          type: InlineTokenType.link,
          raw: match.group(5)!,
          content: match.group(6) ?? '',
          href: match.group(7) ?? '',
        ),
      );
    }

    lastIndex = match.end;
  }

  if (lastIndex < text.length) {
    tokens.add(
      InlineToken(
        type: InlineTokenType.text,
        raw: text.substring(lastIndex),
      ),
    );
  }

  return tokens;
}

/// Strips LaTeX, media markers, and Markdown symbols for clean TTS narration.
String stripMarkdownForSpeech(String input) {
  return input
      .replaceAll(_richTokenPattern, ' ')
      .replaceAll(RegExp(r'\$\$[\s\S]*?\$\$'), ' ')
      .replaceAll(RegExp(r'\$[^$\n]*\$'), ' ')
      .replaceAll(RegExp(r'[#*_`>~\[\]()]'), ' ')
      .replaceAll(RegExp(r'\s+'), ' ')
      .trim();
}
