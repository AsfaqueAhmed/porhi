import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:network/network.dart' show ErrorResponse;
import 'package:porhi/core/i18n/app_strings.dart';
import 'package:porhi/core/theme/porhi_theme.dart';
import 'package:porhi/features/content_report/domain/entities/content_report_entity.dart';
import 'package:porhi/features/content_report/domain/usecases/content_report_usecases.dart';

/// Reusable modal bottom sheet for reporting inaccuracies or LaTeX/curriculum issues
/// in a lesson or question via `POST /content-reports`.
class ReportContentSheet extends StatefulWidget {
  final ReportContentType contentType;
  final String contentId;
  final String? topicId;
  final String? contentLabel;
  final AppLanguage language;
  final SubmitContentReportUseCase? submitUseCase;

  const ReportContentSheet({
    super.key,
    required this.contentType,
    required this.contentId,
    this.topicId,
    this.contentLabel,
    this.language = AppLanguage.bn,
    this.submitUseCase,
  });

  static Future<void> show(
    BuildContext context, {
    required ReportContentType contentType,
    required String contentId,
    String? topicId,
    String? contentLabel,
    AppLanguage language = AppLanguage.bn,
    SubmitContentReportUseCase? submitUseCase,
  }) {
    return showModalBottomSheet<void>(
      context: context,
      isScrollControlled: true,
      useSafeArea: true,
      backgroundColor: Colors.white,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
      ),
      builder: (_) => ReportContentSheet(
        contentType: contentType,
        contentId: contentId,
        topicId: topicId,
        contentLabel: contentLabel,
        language: language,
        submitUseCase: submitUseCase,
      ),
    );
  }

  @override
  State<ReportContentSheet> createState() => _ReportContentSheetState();
}

class _ReportContentSheetState extends State<ReportContentSheet> {
  late final TextEditingController _descriptionController;
  ReportCategory _selectedCategory = ReportCategory.wrongAnswer;
  bool _isSubmitting = false;
  bool _isSubmitted = false;
  String? _errorMessage;

  @override
  void initState() {
    super.initState();
    _descriptionController = TextEditingController();
  }

  @override
  void dispose() {
    _descriptionController.dispose();
    super.dispose();
  }

  SubmitContentReportUseCase get _useCase =>
      widget.submitUseCase ?? Get.find<SubmitContentReportUseCase>();

  Future<void> _submit() async {
    if (_isSubmitting) return;

    final lang = widget.language;
    final trimmed = _descriptionController.text.trim();
    if (trimmed.isEmpty) {
      setState(() {
        _errorMessage = AppStrings.tr(
          'অনুগ্রহ করে সমস্যার বিবরণ লেখো।',
          'Please describe the issue.',
          lang,
        );
      });
      return;
    }

    if (trimmed.length > SubmitContentReportUseCase.maxDescriptionLength) {
      setState(() {
        _errorMessage = AppStrings.tr(
          'বিবরণ ২০০০ অক্ষরের মধ্যে রাখো।',
          'Description must be within 2000 characters.',
          lang,
        );
      });
      return;
    }

    setState(() {
      _isSubmitting = true;
      _errorMessage = null;
    });

    try {
      final result = await _useCase(
        contentType: widget.contentType,
        contentId: widget.contentId,
        topicId: widget.topicId,
        category: _selectedCategory,
        description: trimmed,
      );
      if (!mounted) return;

      result.fold(
        (ErrorResponse err) {
          final msg = err.message?.trim();
          setState(() {
            _errorMessage = (msg != null && msg.isNotEmpty)
                ? msg
                : AppStrings.tr(
                    'রিপোর্ট পাঠানো যায়নি। ইন্টারনেট সংযোগ যাচাই করে আবার চেষ্টা করো।',
                    'Could not submit report. Check your connection and try again.',
                    lang,
                  );
          });
        },
        (_) {
          setState(() {
            _isSubmitted = true;
          });
        },
      );
    } finally {
      if (mounted) {
        setState(() {
          _isSubmitting = false;
        });
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    final lang = widget.language;
    final bottomInset = MediaQuery.viewInsetsOf(context).bottom;

    return Padding(
      key: const Key('report_content_sheet'),
      padding: EdgeInsets.fromLTRB(20, 16, 20, 20 + bottomInset),
      child: SingleChildScrollView(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: <Widget>[
            Row(
              children: <Widget>[
                Container(
                  width: 34,
                  height: 34,
                  decoration: BoxDecoration(
                    color: const Color(0xFFFFF1F2),
                    borderRadius: BorderRadius.circular(10),
                  ),
                  child: const Icon(
                    Icons.flag_rounded,
                    size: 18,
                    color: PorhiTheme.rose600,
                  ),
                ),
                const SizedBox(width: 10),
                Expanded(
                  child: Text(
                    AppStrings.tr(
                      'কনটেন্ট ভুল রিপোর্ট করো',
                      'Report Content Issue',
                      lang,
                    ),
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                    style: const TextStyle(
                      fontSize: 16,
                      fontWeight: FontWeight.w800,
                      color: PorhiTheme.slate900,
                    ),
                  ),
                ),
                IconButton(
                  key: const Key('report_close_btn'),
                  onPressed: () => Navigator.of(context).pop(),
                  icon: const Icon(Icons.close_rounded),
                ),
              ],
            ),
            const SizedBox(height: 12),
            if (_isSubmitted)
              Container(
                key: const Key('report_success_view'),
                padding: const EdgeInsets.symmetric(vertical: 16),
                child: Column(
                  children: <Widget>[
                    Container(
                      width: 52,
                      height: 52,
                      decoration: BoxDecoration(
                        color: PorhiTheme.emerald50,
                        borderRadius: BorderRadius.circular(16),
                      ),
                      child: const Icon(
                        Icons.check_circle_rounded,
                        size: 28,
                        color: PorhiTheme.emerald600,
                      ),
                    ),
                    const SizedBox(height: 12),
                    Text(
                      AppStrings.tr(
                        'ধন্যবাদ! তোমার রিপোর্টটি জমা হয়েছে',
                        'Thank you! Your report has been submitted',
                        lang,
                      ),
                      textAlign: TextAlign.center,
                      style: const TextStyle(
                        fontSize: 15,
                        fontWeight: FontWeight.w800,
                        color: PorhiTheme.slate900,
                      ),
                    ),
                    const SizedBox(height: 6),
                    Text(
                      AppStrings.tr(
                        'আমাদের রিভিউ টিম শীঘ্রই এটি যাচাই করে সমাধান করবে।',
                        'Our editorial review team will verify and fix it shortly.',
                        lang,
                      ),
                      textAlign: TextAlign.center,
                      style: const TextStyle(
                        fontSize: 12.5,
                        color: PorhiTheme.slate600,
                      ),
                    ),
                    const SizedBox(height: 16),
                    FilledButton(
                      key: const Key('report_done_btn'),
                      onPressed: () => Navigator.of(context).pop(),
                      child: Text(AppStrings.tr('ঠিক আছে', 'Done', lang)),
                    ),
                  ],
                ),
              )
            else ...<Widget>[
              if (widget.contentLabel != null &&
                  widget.contentLabel!.trim().isNotEmpty) ...<Widget>[
                Container(
                  padding: const EdgeInsets.all(10),
                  decoration: BoxDecoration(
                    color: PorhiTheme.slate50,
                    borderRadius: BorderRadius.circular(12),
                    border: Border.all(color: PorhiTheme.slate200),
                  ),
                  child: Row(
                    children: <Widget>[
                      Text(
                        widget.contentType == ReportContentType.lesson
                            ? AppStrings.tr('পাঠ:', 'Lesson:', lang)
                            : AppStrings.tr('প্রশ্ন:', 'Question:', lang),
                        style: const TextStyle(
                          fontSize: 12,
                          fontWeight: FontWeight.w800,
                          color: PorhiTheme.slate900,
                        ),
                      ),
                      const SizedBox(width: 6),
                      Expanded(
                        child: Text(
                          widget.contentLabel!,
                          maxLines: 2,
                          overflow: TextOverflow.ellipsis,
                          style: const TextStyle(
                            fontSize: 12,
                            color: PorhiTheme.slate700,
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 14),
              ],
              Text(
                AppStrings.tr('ভুলের ধরন', 'Issue Category', lang),
                style: const TextStyle(
                  fontSize: 12.5,
                  fontWeight: FontWeight.w700,
                  color: PorhiTheme.slate700,
                ),
              ),
              const SizedBox(height: 8),
              Wrap(
                spacing: 8,
                runSpacing: 8,
                children: ReportCategory.values.map((category) {
                  final selected = _selectedCategory == category;
                  return ChoiceChip(
                    key: Key('report_category_${category.apiValue}'),
                    label: Text(
                      lang == AppLanguage.en
                          ? category.labelEn
                          : category.labelBn,
                    ),
                    selected: selected,
                    selectedColor: PorhiTheme.indigo600,
                    backgroundColor: Colors.white,
                    labelStyle: TextStyle(
                      fontSize: 12,
                      fontWeight: FontWeight.w700,
                      color: selected ? Colors.white : PorhiTheme.slate700,
                    ),
                    onSelected: _isSubmitting
                        ? null
                        : (_) => setState(() => _selectedCategory = category),
                  );
                }).toList(),
              ),
              const SizedBox(height: 14),
              Text(
                AppStrings.tr('সমস্যার বিবরণ', 'Details', lang),
                style: const TextStyle(
                  fontSize: 12.5,
                  fontWeight: FontWeight.w700,
                  color: PorhiTheme.slate700,
                ),
              ),
              const SizedBox(height: 6),
              TextField(
                key: const Key('report_description_input'),
                controller: _descriptionController,
                maxLines: 4,
                maxLength: SubmitContentReportUseCase.maxDescriptionLength,
                enabled: !_isSubmitting,
                onChanged: (_) {
                  if (_errorMessage != null) {
                    setState(() => _errorMessage = null);
                  }
                },
                decoration: InputDecoration(
                  hintText: AppStrings.tr(
                    'বিস্তারিত লেখো (কী ভুল আছে বা সঠিক কী হওয়া উচিত)...',
                    'Describe what is wrong or unclear...',
                    lang,
                  ),
                ),
              ),
              if (_errorMessage != null) ...<Widget>[
                const SizedBox(height: 6),
                Text(
                  _errorMessage!,
                  key: const Key('report_error_text'),
                  style: const TextStyle(
                    fontSize: 12,
                    fontWeight: FontWeight.w600,
                    color: PorhiTheme.rose600,
                  ),
                ),
              ],
              const SizedBox(height: 14),
              Row(
                mainAxisAlignment: MainAxisAlignment.end,
                children: <Widget>[
                  OutlinedButton(
                    key: const Key('report_cancel_btn'),
                    onPressed: _isSubmitting
                        ? null
                        : () => Navigator.of(context).pop(),
                    child: Text(AppStrings.t('action.cancel', lang)),
                  ),
                  const SizedBox(width: 10),
                  FilledButton.icon(
                    key: const Key('report_submit_btn'),
                    onPressed: _isSubmitting ? null : _submit,
                    style: FilledButton.styleFrom(
                      backgroundColor: PorhiTheme.rose600,
                      foregroundColor: Colors.white,
                    ),
                    icon: _isSubmitting
                        ? const SizedBox(
                            width: 14,
                            height: 14,
                            child: CircularProgressIndicator(
                              strokeWidth: 2,
                              color: Colors.white,
                            ),
                          )
                        : const Icon(Icons.send_rounded, size: 16),
                    label: Text(
                      AppStrings.tr('রিপোর্ট পাঠাও', 'Submit Report', lang),
                    ),
                  ),
                ],
              ),
            ],
          ],
        ),
      ),
    );
  }
}
