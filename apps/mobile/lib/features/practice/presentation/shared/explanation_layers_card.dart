import 'package:flutter/material.dart';
import 'package:porhi/app/env.dart';
import 'package:porhi/core/i18n/app_strings.dart';
import 'package:porhi/core/theme/porhi_theme.dart';
import 'package:porhi/core/widgets/rich_content/rich_content_view.dart';
import 'package:porhi/features/practice/domain/entities/practice_entities.dart';

/// Reusable 6-layer explanation accordion card for MCQ practice & exam review.
class ExplanationLayersCard extends StatefulWidget {
  final ExplanationLayersEntity explanation;
  final EnvConfig? envConfig;
  final String languageCode;
  final Map<String, bool>? initialExpanded;

  const ExplanationLayersCard({
    super.key,
    required this.explanation,
    this.envConfig,
    this.languageCode = 'bn',
    this.initialExpanded,
  });

  @override
  State<ExplanationLayersCard> createState() => _ExplanationLayersCardState();
}

class _ExplanationLayersCardState extends State<ExplanationLayersCard> {
  static const Map<String, bool> _defaultExpanded = <String, bool>{
    'direct': true,
    'concept': true,
    'derivation': true,
    'distractors': false,
    'citation': false,
    'protip': true,
  };

  late Map<String, bool> _expanded;

  @override
  void initState() {
    super.initState();
    _expanded = <String, bool>{
      ..._defaultExpanded,
      ...?widget.initialExpanded,
    };
  }

  @override
  void didUpdateWidget(covariant ExplanationLayersCard oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (oldWidget.explanation != widget.explanation ||
        oldWidget.initialExpanded != widget.initialExpanded) {
      _expanded = <String, bool>{
        ..._defaultExpanded,
        ...?widget.initialExpanded,
      };
    }
  }

  void _toggleLayer(String key) {
    setState(() {
      _expanded[key] = !(_expanded[key] ?? false);
    });
  }

  @override
  Widget build(BuildContext context) {
    final exp = widget.explanation;
    if (!exp.hasAnyContent) {
      return const SizedBox.shrink();
    }

    final lang = AppLanguage.fromCode(widget.languageCode);

    return Card(
      key: const Key('explanation_layers_card'),
      clipBehavior: Clip.antiAlias,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(18),
        side: const BorderSide(color: PorhiTheme.slate200),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: <Widget>[
          Container(
            color: PorhiTheme.slate900,
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 13),
            child: Row(
              children: <Widget>[
                const Icon(
                  Icons.bolt_rounded,
                  size: 18,
                  color: Color(0xFFFBBF24),
                ),
                const SizedBox(width: 8),
                Expanded(
                  child: Text(
                    AppStrings.tr(
                      '৬-স্তরের তাৎক্ষণিক ব্যাখ্যা ও বিশ্লেষণ',
                      '6-Layer Instant Explanation & Breakdown',
                      lang,
                    ),
                    style: const TextStyle(
                      fontSize: 13.5,
                      fontWeight: FontWeight.w800,
                      color: Colors.white,
                    ),
                  ),
                ),
              ],
            ),
          ),
          if (exp.directAnswer.trim().isNotEmpty)
            _buildLayer(
              layerKey: 'direct',
              title: AppStrings.tr(
                '১. সরাসরি উত্তর (Direct Answer)',
                '1. Direct Answer',
                lang,
              ),
              body: RichContentView(
                content: exp.directAnswer,
                envConfig: widget.envConfig,
                baseStyle: const TextStyle(
                  fontSize: 13.5,
                  fontWeight: FontWeight.w600,
                  height: 1.5,
                  color: PorhiTheme.slate900,
                ),
              ),
            ),
          if (exp.coreConcept.trim().isNotEmpty)
            _buildLayer(
              layerKey: 'concept',
              title: AppStrings.tr(
                '২. মূল তত্ত্ব ও কনসেপ্ট (Core Concept)',
                '2. Core Concept & Theory',
                lang,
              ),
              body: RichContentView(
                content: exp.coreConcept,
                envConfig: widget.envConfig,
                baseStyle: const TextStyle(
                  fontSize: 13.5,
                  height: 1.55,
                  color: PorhiTheme.slate700,
                ),
              ),
            ),
          if (exp.stepDerivation.trim().isNotEmpty)
            _buildLayer(
              layerKey: 'derivation',
              title: AppStrings.tr(
                '৩. ধাপে ধাপে গাণিতিক প্রতিপাদন (Step Derivation)',
                '3. Step-by-Step Derivation',
                lang,
              ),
              body: RichContentView(
                content: exp.stepDerivation,
                envConfig: widget.envConfig,
                baseStyle: const TextStyle(
                  fontSize: 13.5,
                  height: 1.55,
                  color: PorhiTheme.slate900,
                ),
              ),
            ),
          if (exp.distractorAnalysis.isNotEmpty)
            _buildLayer(
              layerKey: 'distractors',
              title: AppStrings.tr(
                '৪. ভুল অপশনগুলোর বিশ্লেষণ (Distractor Analysis)',
                '4. Distractor Analysis',
                lang,
              ),
              body: Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: <Widget>[
                  for (final entry in exp.distractorAnalysis.entries)
                    Container(
                      margin: const EdgeInsets.only(bottom: 8),
                      padding: const EdgeInsets.all(10),
                      decoration: BoxDecoration(
                        color: PorhiTheme.slate50,
                        borderRadius: BorderRadius.circular(10),
                        border: Border.all(color: PorhiTheme.slate200),
                      ),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: <Widget>[
                          Text(
                            '${AppStrings.tr('অপশন ', 'Option ', lang)}${entry.key}:',
                            style: const TextStyle(
                              fontSize: 12,
                              fontWeight: FontWeight.w800,
                              color: PorhiTheme.rose600,
                            ),
                          ),
                          const SizedBox(height: 4),
                          RichContentView(
                            content: entry.value,
                            envConfig: widget.envConfig,
                            baseStyle: const TextStyle(
                              fontSize: 12.5,
                              height: 1.45,
                              color: PorhiTheme.slate700,
                            ),
                          ),
                        ],
                      ),
                    ),
                ],
              ),
            ),
          if (exp.textbookCitation != null && !exp.textbookCitation!.isEmpty)
            _buildLayer(
              layerKey: 'citation',
              title: AppStrings.tr(
                '৫. পাঠ্যবই রেফারেন্স (NCTB Textbook Citation)',
                '5. NCTB Textbook Citation',
                lang,
              ),
              body: Container(
                padding: const EdgeInsets.all(10),
                decoration: BoxDecoration(
                  color: PorhiTheme.slate50,
                  borderRadius: BorderRadius.circular(10),
                  border: Border.all(color: PorhiTheme.slate200),
                ),
                child: Row(
                  children: <Widget>[
                    const Icon(
                      Icons.menu_book_rounded,
                      size: 16,
                      color: PorhiTheme.indigo600,
                    ),
                    const SizedBox(width: 8),
                    Expanded(
                      child: Text(
                        _formatCitation(exp.textbookCitation!, lang),
                        style: const TextStyle(
                          fontSize: 12.5,
                          fontWeight: FontWeight.w600,
                          color: PorhiTheme.slate700,
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ),
          if (exp.proTipShortcut.trim().isNotEmpty)
            _buildLayer(
              layerKey: 'protip',
              title: AppStrings.tr(
                '৬. প্রো-টিপ ও শর্টকাট (Pro Tip & Shortcut)',
                '6. Pro Tip & Shortcut',
                lang,
              ),
              isHighlightedAmber: true,
              showBottomBorder: false,
              body: RichContentView(
                content: exp.proTipShortcut,
                envConfig: widget.envConfig,
                baseStyle: const TextStyle(
                  fontSize: 13,
                  fontWeight: FontWeight.w600,
                  height: 1.5,
                  color: Color(0xFF78350F),
                ),
              ),
            ),
        ],
      ),
    );
  }

  String _formatCitation(TextbookCitationEntity citation, AppLanguage lang) {
    final parts = <String>[
      if (citation.bookTitle.trim().isNotEmpty) citation.bookTitle.trim(),
      if (citation.chapterName.trim().isNotEmpty) citation.chapterName.trim(),
    ];
    final joined = parts.join(' • ');
    if (citation.pageNumber == null) return joined;
    final pageStr = AppStrings.formatNumber(citation.pageNumber!, lang);
    final pageLabel = AppStrings.tr('পৃষ্ঠা ', 'Page ', lang);
    return joined.isEmpty
        ? '$pageLabel$pageStr'
        : '$joined ($pageLabel$pageStr)';
  }

  Widget _buildLayer({
    required String layerKey,
    required String title,
    required Widget body,
    bool isHighlightedAmber = false,
    bool showBottomBorder = true,
  }) {
    final isOpen = _expanded[layerKey] ?? false;
    final headerBg = isHighlightedAmber
        ? const Color(0xFFFFFBEB)
        : PorhiTheme.slate50;
    final bodyBg =
        isHighlightedAmber ? const Color(0xFFFEF3C7).withAlpha(80) : Colors.white;
    final titleColor =
        isHighlightedAmber ? const Color(0xFF78350F) : PorhiTheme.slate900;

    return Container(
      decoration: showBottomBorder
          ? const BoxDecoration(
              border: Border(
                bottom: BorderSide(color: PorhiTheme.slate100),
              ),
            )
          : null,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: <Widget>[
          InkWell(
            key: Key('explanation_layer_header_$layerKey'),
            onTap: () => _toggleLayer(layerKey),
            child: Container(
              color: headerBg,
              padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
              child: Row(
                children: <Widget>[
                  Expanded(
                    child: Text(
                      title,
                      style: TextStyle(
                        fontSize: 13,
                        fontWeight: FontWeight.w700,
                        color: titleColor,
                      ),
                    ),
                  ),
                  Icon(
                    isOpen
                        ? Icons.keyboard_arrow_up_rounded
                        : Icons.keyboard_arrow_down_rounded,
                    size: 20,
                    color: isHighlightedAmber
                        ? const Color(0xFFD97706)
                        : PorhiTheme.slate400,
                  ),
                ],
              ),
            ),
          ),
          if (isOpen)
            Container(
              color: bodyBg,
              padding: const EdgeInsets.fromLTRB(14, 8, 14, 14),
              child: body,
            ),
        ],
      ),
    );
  }
}
