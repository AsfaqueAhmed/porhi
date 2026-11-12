import 'package:flutter/material.dart';
import 'package:flutter_math_fork/flutter_math.dart';
import 'package:porhi/app/env.dart';
import 'package:porhi/core/content/media_url_resolver.dart';
import 'package:porhi/core/content/rich_content_parser.dart';
import 'package:porhi/core/theme/porhi_theme.dart';
import 'package:porhi/core/widgets/interactive_lab/interactive_lab_card.dart';
import 'package:porhi/core/widgets/rich_content/audio_player_tile.dart';
import 'package:porhi/core/widgets/rich_content/image_lightbox_viewer.dart';
import 'package:porhi/core/widgets/rich_content/video_player_tile.dart';

typedef RichContentAudioBuilder = Widget Function(
  BuildContext context,
  String resolvedUrl,
  String title,
);

typedef RichContentVideoBuilder = Widget Function(
  BuildContext context,
  String resolvedUrl,
  String title,
);

typedef RichContentImageBuilder = Widget Function(
  BuildContext context,
  String resolvedUrl,
  String alt,
);

typedef RichContentInteractiveBuilder = Widget Function(
  BuildContext context,
  String? resolvedUrl,
  String? htmlContent,
  String title,
);

typedef RichContentYoutubeBuilder = Widget Function(
  BuildContext context,
  String videoId,
  String title,
);

/// Renders lesson/question rich content (Markdown, callouts, tables, KaTeX,
/// images with lightbox, audio, video, YouTube, and interactive HTML labs).
class RichContentView extends StatelessWidget {
  final String? content;
  final EnvConfig? envConfig;
  final TextStyle? baseStyle;
  final ValueChanged<String>? onLinkTap;
  final RichContentAudioBuilder? audioBuilder;
  final RichContentVideoBuilder? videoBuilder;
  final RichContentImageBuilder? imageBuilder;
  final RichContentInteractiveBuilder? interactiveBuilder;
  final RichContentYoutubeBuilder? youtubeBuilder;

  const RichContentView({
    super.key,
    required this.content,
    this.envConfig,
    this.baseStyle,
    this.onLinkTap,
    this.audioBuilder,
    this.videoBuilder,
    this.imageBuilder,
    this.interactiveBuilder,
    this.youtubeBuilder,
  });

  @override
  Widget build(BuildContext context) {
    final raw = content;
    if (raw == null || raw.trim().isEmpty) {
      return const SizedBox.shrink();
    }

    final defaultTextStyle = baseStyle ??
        const TextStyle(
          fontSize: 15,
          height: 1.6,
          color: PorhiTheme.slate700,
        );

    final tokens = parseRichTokens(raw);
    final children = <Widget>[];

    for (final token in tokens) {
      switch (token) {
        case AudioContentToken(:final src, :final title):
          final resolved = resolvePorhiMediaUrl(src, envConfig: envConfig);
          children.add(
            audioBuilder != null
                ? audioBuilder!(context, resolved, title)
                : AudioPlayerTile(
                    src: src,
                    title: title,
                    envConfig: envConfig,
                  ),
          );
        case VideoContentToken(:final src, :final title):
          final resolved = resolvePorhiMediaUrl(src, envConfig: envConfig);
          children.add(
            videoBuilder != null
                ? videoBuilder!(context, resolved, title)
                : VideoPlayerTile(
                    src: src,
                    title: title,
                    envConfig: envConfig,
                  ),
          );
        case ImageContentToken(:final src, :final alt):
          final resolved = resolvePorhiMediaUrl(src, envConfig: envConfig);
          children.add(
            imageBuilder != null
                ? imageBuilder!(context, resolved, alt)
                : ImageLightboxViewer(
                    src: src,
                    alt: alt,
                    envConfig: envConfig,
                  ),
          );
        case YoutubeContentToken(:final videoId, :final title):
          children.add(
            youtubeBuilder != null
                ? youtubeBuilder!(context, videoId, title)
                : YoutubeVideoTile(videoId: videoId, title: title),
          );
        case InteractiveContentToken(:final src, :final html, :final title):
          final resolved = src.isNotEmpty
              ? resolvePorhiMediaUrl(src, envConfig: envConfig)
              : null;
          children.add(
            interactiveBuilder != null
                ? interactiveBuilder!(
                    context,
                    resolved,
                    html.isNotEmpty ? html : null,
                    title,
                  )
                : InteractiveLabCard(
                    widgetUrl: src.isNotEmpty ? src : null,
                    htmlContent: html.isNotEmpty ? html : null,
                    title: title.isNotEmpty
                        ? title
                        : 'ইন্টারেক্টিভ ল্যাব সিমুলেশন',
                    envConfig: envConfig,
                  ),
          );
        case TextContentToken(:final text):
          final blocks = parseMarkdownBlocks(text);
          for (final block in blocks) {
            children.add(
              MarkdownBlockView(
                block: block,
                baseStyle: defaultTextStyle,
                onLinkTap: onLinkTap,
              ),
            );
          }
      }
    }

    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      mainAxisSize: MainAxisSize.min,
      children: children,
    );
  }
}

/// Renders a single parsed [MarkdownBlock].
class MarkdownBlockView extends StatelessWidget {
  final MarkdownBlock block;
  final TextStyle baseStyle;
  final ValueChanged<String>? onLinkTap;

  const MarkdownBlockView({
    super.key,
    required this.block,
    required this.baseStyle,
    this.onLinkTap,
  });

  @override
  Widget build(BuildContext context) {
    return switch (block) {
      HeadingBlock b => _buildHeading(b),
      DividerBlock _ => _buildDivider(),
      BlockquoteBlock b => _buildBlockquote(b),
      UnorderedListBlock b => _buildUnorderedList(b),
      OrderedListBlock b => _buildOrderedList(b),
      MathBlock b => _buildMathBlock(b),
      CodeBlock b => _buildCodeBlock(b),
      TableBlock b => _buildTable(b),
      ParagraphBlock b => Padding(
          padding: const EdgeInsets.symmetric(vertical: 5),
          child: LatexText(
            content: b.text,
            style: baseStyle,
            onLinkTap: onLinkTap,
          ),
        ),
    };
  }

  Widget _buildHeading(HeadingBlock b) {
    if (b.level == 1) {
      return Container(
        margin: const EdgeInsets.only(top: 12, bottom: 10),
        padding: const EdgeInsets.only(bottom: 8),
        decoration: const BoxDecoration(
          border: Border(
            bottom: BorderSide(color: PorhiTheme.indigo50, width: 2),
          ),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                Icon(
                  Icons.bookmark_rounded,
                  size: 14,
                  color: PorhiTheme.indigo600,
                ),
                SizedBox(width: 4),
                Text(
                  'মূল বিষয়বস্তু',
                  style: TextStyle(
                    fontSize: 11,
                    fontWeight: FontWeight.w700,
                    color: PorhiTheme.indigo600,
                    letterSpacing: 0.4,
                  ),
                ),
              ],
            ),
            const SizedBox(height: 4),
            LatexText(
              content: b.text,
              style: baseStyle.copyWith(
                fontSize: 21,
                fontWeight: FontWeight.w800,
                color: PorhiTheme.slate900,
                height: 1.35,
              ),
              onLinkTap: onLinkTap,
            ),
          ],
        ),
      );
    }
    if (b.level == 2) {
      return Container(
        margin: const EdgeInsets.only(top: 12, bottom: 8),
        padding: const EdgeInsets.only(bottom: 6),
        decoration: const BoxDecoration(
          border: Border(bottom: BorderSide(color: PorhiTheme.slate200)),
        ),
        child: LatexText(
          content: b.text,
          style: baseStyle.copyWith(
            fontSize: 18,
            fontWeight: FontWeight.w700,
            color: PorhiTheme.slate900,
            height: 1.35,
          ),
          onLinkTap: onLinkTap,
        ),
      );
    }
    if (b.level == 3) {
      return Padding(
        padding: const EdgeInsets.only(top: 10, bottom: 6),
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            Container(
              width: 4,
              height: 18,
              decoration: BoxDecoration(
                color: PorhiTheme.indigo600,
                borderRadius: BorderRadius.circular(4),
              ),
            ),
            const SizedBox(width: 8),
            Expanded(
              child: LatexText(
                content: b.text,
                style: baseStyle.copyWith(
                  fontSize: 16,
                  fontWeight: FontWeight.w700,
                  color: PorhiTheme.slate900,
                  height: 1.35,
                ),
                onLinkTap: onLinkTap,
              ),
            ),
          ],
        ),
      );
    }
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 6),
      child: LatexText(
        content: b.text,
        style: baseStyle.copyWith(
          fontSize: 15,
          fontWeight: FontWeight.w700,
          color: PorhiTheme.slate900,
        ),
        onLinkTap: onLinkTap,
      ),
    );
  }

  Widget _buildDivider() {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 14),
      child: Row(
        children: [
          const Expanded(child: Divider(color: PorhiTheme.slate200)),
          Container(
            margin: const EdgeInsets.symmetric(horizontal: 10),
            width: 6,
            height: 6,
            decoration: BoxDecoration(
              color: PorhiTheme.indigo600.withValues(alpha: 0.6),
              shape: BoxShape.circle,
            ),
          ),
          const Expanded(child: Divider(color: PorhiTheme.slate200)),
        ],
      ),
    );
  }

  Widget _buildBlockquote(BlockquoteBlock b) {
    final (
      Color bg,
      Color border,
      Color accent,
      Color textColor,
      IconData? icon,
    ) = switch (b.calloutKind) {
      CalloutKind.definition => (
          PorhiTheme.indigo50,
          const Color(0xFFC7D2FE),
          PorhiTheme.indigo600,
          PorhiTheme.slate900,
          Icons.auto_awesome_rounded,
        ),
      CalloutKind.tip => (
          const Color(0xFFFFFBEB),
          const Color(0xFFFDE68A),
          const Color(0xFFF59E0B),
          const Color(0xFF451A03),
          Icons.lightbulb_rounded,
        ),
      CalloutKind.warning => (
          const Color(0xFFFFF1F2),
          const Color(0xFFFECDD3),
          PorhiTheme.rose600,
          const Color(0xFF4C0519),
          Icons.warning_amber_rounded,
        ),
      CalloutKind.normal => (
          PorhiTheme.slate50,
          PorhiTheme.slate200,
          PorhiTheme.slate400,
          PorhiTheme.slate700,
          null,
        ),
    };

    return Container(
      margin: const EdgeInsets.symmetric(vertical: 8),
      decoration: BoxDecoration(
        color: bg,
        borderRadius: BorderRadius.circular(14),
        border: Border.all(color: border),
      ),
      clipBehavior: Clip.antiAlias,
      child: IntrinsicHeight(
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Container(width: 4, color: accent),
            Expanded(
              child: Padding(
                padding: const EdgeInsets.all(12),
                child: Row(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    if (icon != null) ...[
                      Container(
                        width: 24,
                        height: 24,
                        decoration: BoxDecoration(
                          color: accent,
                          borderRadius: BorderRadius.circular(7),
                        ),
                        child: Icon(icon, size: 14, color: Colors.white),
                      ),
                      const SizedBox(width: 10),
                    ],
                    Expanded(
                      child: LatexText(
                        content: b.text,
                        style: baseStyle.copyWith(color: textColor),
                        onLinkTap: onLinkTap,
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildUnorderedList(UnorderedListBlock b) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 6),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: b.items
            .map(
              (item) => Padding(
                padding: const EdgeInsets.symmetric(vertical: 4),
                child: Row(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Container(
                      margin: const EdgeInsets.only(top: 8, right: 10),
                      width: 7,
                      height: 7,
                      decoration: const BoxDecoration(
                        color: PorhiTheme.indigo600,
                        shape: BoxShape.circle,
                      ),
                    ),
                    Expanded(
                      child: LatexText(
                        content: item,
                        style: baseStyle,
                        onLinkTap: onLinkTap,
                      ),
                    ),
                  ],
                ),
              ),
            )
            .toList(),
      ),
    );
  }

  Widget _buildOrderedList(OrderedListBlock b) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 6),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: b.items
            .map(
              (item) => Padding(
                padding: const EdgeInsets.symmetric(vertical: 4),
                child: Row(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Container(
                      margin: const EdgeInsets.only(top: 2, right: 10),
                      constraints: const BoxConstraints(minWidth: 22, minHeight: 22),
                      padding: const EdgeInsets.symmetric(horizontal: 5, vertical: 2),
                      alignment: Alignment.center,
                      decoration: BoxDecoration(
                        color: PorhiTheme.indigo50,
                        borderRadius: BorderRadius.circular(6),
                        border: Border.all(color: const Color(0xFFC7D2FE)),
                      ),
                      child: Text(
                        item.num,
                        style: const TextStyle(
                          fontSize: 12,
                          fontWeight: FontWeight.w700,
                          color: PorhiTheme.indigo700,
                        ),
                      ),
                    ),
                    Expanded(
                      child: LatexText(
                        content: item.text,
                        style: baseStyle,
                        onLinkTap: onLinkTap,
                      ),
                    ),
                  ],
                ),
              ),
            )
            .toList(),
      ),
    );
  }

  Widget _buildMathBlock(MathBlock b) {
    return Container(
      margin: const EdgeInsets.symmetric(vertical: 8),
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
      decoration: BoxDecoration(
        color: PorhiTheme.slate50,
        borderRadius: BorderRadius.circular(14),
        border: Border.all(color: PorhiTheme.slate200),
      ),
      child: SingleChildScrollView(
        scrollDirection: Axis.horizontal,
        child: _SafeMathView(
          math: b.math,
          raw: '\$\$${b.math}\$\$',
          display: true,
          style: baseStyle.copyWith(color: PorhiTheme.slate900),
        ),
      ),
    );
  }

  Widget _buildCodeBlock(CodeBlock b) {
    return Container(
      margin: const EdgeInsets.symmetric(vertical: 8),
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: PorhiTheme.slate900,
        borderRadius: BorderRadius.circular(12),
      ),
      child: SingleChildScrollView(
        scrollDirection: Axis.horizontal,
        child: SelectableText(
          b.code,
          style: const TextStyle(
            fontFamily: 'monospace',
            fontSize: 13,
            color: PorhiTheme.slate100,
            height: 1.5,
          ),
        ),
      ),
    );
  }

  Widget _buildTable(TableBlock b) {
    if (b.headers.isEmpty) return const SizedBox.shrink();
    final colCount = b.headers.length;

    return Container(
      margin: const EdgeInsets.symmetric(vertical: 10),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: PorhiTheme.slate200),
      ),
      clipBehavior: Clip.antiAlias,
      child: SingleChildScrollView(
        scrollDirection: Axis.horizontal,
        child: Table(
          defaultColumnWidth: const IntrinsicColumnWidth(),
          border: TableBorder.symmetric(
            inside: const BorderSide(color: PorhiTheme.slate200, width: 0.75),
          ),
          children: [
            TableRow(
              decoration: const BoxDecoration(color: PorhiTheme.slate100),
              children: b.headers
                  .map(
                    (h) => Padding(
                      padding: const EdgeInsets.symmetric(
                        horizontal: 12,
                        vertical: 10,
                      ),
                      child: LatexText(
                        content: h,
                        style: baseStyle.copyWith(
                          fontSize: 13,
                          fontWeight: FontWeight.w700,
                          color: PorhiTheme.slate900,
                        ),
                        onLinkTap: onLinkTap,
                      ),
                    ),
                  )
                  .toList(),
            ),
            for (var rIdx = 0; rIdx < b.rows.length; rIdx++)
              TableRow(
                decoration: BoxDecoration(
                  color: rIdx.isOdd ? PorhiTheme.slate50 : Colors.white,
                ),
                children: List.generate(colCount, (cIdx) {
                  final cell =
                      cIdx < b.rows[rIdx].length ? b.rows[rIdx][cIdx] : '';
                  return Padding(
                    padding: const EdgeInsets.symmetric(
                      horizontal: 12,
                      vertical: 8,
                    ),
                    child: LatexText(
                      content: cell,
                      style: baseStyle.copyWith(fontSize: 13),
                      onLinkTap: onLinkTap,
                    ),
                  );
                }),
              ),
          ],
        ),
      ),
    );
  }
}

/// Renders inline Markdown + KaTeX (`$$...$$` and `$...$`) with safe error fallback.
class LatexText extends StatelessWidget {
  final String content;
  final TextStyle style;
  final ValueChanged<String>? onLinkTap;

  const LatexText({
    super.key,
    required this.content,
    required this.style,
    this.onLinkTap,
  });

  @override
  Widget build(BuildContext context) {
    if (content.isEmpty) return const SizedBox.shrink();

    if (content.contains(r'$$')) {
      final segments = parseLatexSegments(content);
      return Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        mainAxisSize: MainAxisSize.min,
        children: segments.map((seg) {
          switch (seg.type) {
            case LatexSegmentType.block:
              return Padding(
                padding: const EdgeInsets.symmetric(vertical: 6),
                child: SingleChildScrollView(
                  scrollDirection: Axis.horizontal,
                  child: _SafeMathView(
                    math: seg.math,
                    raw: seg.raw,
                    display: true,
                    style: style,
                  ),
                ),
              );
            case LatexSegmentType.inline:
              return _SafeMathView(
                math: seg.math,
                raw: seg.raw,
                display: false,
                style: style,
              );
            case LatexSegmentType.text:
              return _buildInlineRichText(seg.raw);
          }
        }).toList(),
      );
    }

    return _buildInlineRichText(content);
  }

  Widget _buildInlineRichText(String text) {
    final tokens = parseInlineTokens(text);
    if (tokens.isEmpty) return const SizedBox.shrink();
    if (tokens.length == 1 && tokens.first.type == InlineTokenType.text) {
      return Text(tokens.first.raw, style: style);
    }

    return Text.rich(
      TextSpan(
        style: style,
        children: _buildInlineSpans(tokens, style),
      ),
    );
  }

  List<InlineSpan> _buildInlineSpans(
    List<InlineToken> tokens,
    TextStyle currentStyle,
  ) {
    final spans = <InlineSpan>[];

    for (final token in tokens) {
      switch (token.type) {
        case InlineTokenType.text:
          spans.add(TextSpan(text: token.raw, style: currentStyle));
        case InlineTokenType.bold:
          final boldStyle = currentStyle.copyWith(fontWeight: FontWeight.w700);
          final inner = parseInlineTokens(token.content);
          if (inner.isEmpty) {
            spans.add(TextSpan(text: token.content, style: boldStyle));
          } else {
            spans.addAll(_buildInlineSpans(inner, boldStyle));
          }
        case InlineTokenType.italic:
          final italicStyle =
              currentStyle.copyWith(fontStyle: FontStyle.italic);
          final inner = parseInlineTokens(token.content);
          if (inner.isEmpty) {
            spans.add(TextSpan(text: token.content, style: italicStyle));
          } else {
            spans.addAll(_buildInlineSpans(inner, italicStyle));
          }
        case InlineTokenType.code:
          spans.add(
            WidgetSpan(
              alignment: PlaceholderAlignment.middle,
              child: Container(
                padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 1),
                margin: const EdgeInsets.symmetric(horizontal: 2),
                decoration: BoxDecoration(
                  color: PorhiTheme.indigo50,
                  borderRadius: BorderRadius.circular(5),
                  border: Border.all(color: const Color(0xFFC7D2FE)),
                ),
                child: Text(
                  token.content,
                  style: currentStyle.copyWith(
                    fontFamily: 'monospace',
                    fontSize: (currentStyle.fontSize ?? 15) * 0.85,
                    fontWeight: FontWeight.w600,
                    color: PorhiTheme.indigo700,
                  ),
                ),
              ),
            ),
          );
        case InlineTokenType.math:
          spans.add(
            WidgetSpan(
              alignment: PlaceholderAlignment.middle,
              child: Padding(
                padding: const EdgeInsets.symmetric(horizontal: 2),
                child: _SafeMathView(
                  math: token.content,
                  raw: token.raw,
                  display: false,
                  style: currentStyle,
                ),
              ),
            ),
          );
        case InlineTokenType.link:
          spans.add(
            WidgetSpan(
              alignment: PlaceholderAlignment.baseline,
              baseline: TextBaseline.alphabetic,
              child: GestureDetector(
                onTap: () => onLinkTap?.call(token.href),
                child: Text(
                  token.content,
                  style: currentStyle.copyWith(
                    color: PorhiTheme.indigo600,
                    fontWeight: FontWeight.w600,
                    decoration: TextDecoration.underline,
                  ),
                ),
              ),
            ),
          );
      }
    }

    return spans;
  }
}

class _SafeMathView extends StatelessWidget {
  final String math;
  final String raw;
  final bool display;
  final TextStyle style;

  const _SafeMathView({
    required this.math,
    required this.raw,
    required this.display,
    required this.style,
  });

  Widget _fallback() {
    return Text(
      raw,
      style: style.copyWith(
        fontFamily: 'monospace',
        color: PorhiTheme.rose600,
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final trimmed = math.trim();
    if (trimmed.isEmpty) {
      return Text(raw, style: style);
    }

    try {
      return Math.tex(
        trimmed,
        mathStyle: display ? MathStyle.display : MathStyle.text,
        textStyle: style,
        onErrorFallback: (_) => _fallback(),
      );
    } catch (_) {
      return _fallback();
    }
  }
}
