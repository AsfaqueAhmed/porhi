import 'package:flutter/material.dart';
import 'package:porhi/core/i18n/app_strings.dart';
import 'package:porhi/core/theme/porhi_theme.dart';
import 'package:porhi/features/lesson/presentation/lesson/controller/lesson_controller.dart';

class LessonNotesSheet extends StatefulWidget {
  final AppLanguage language;
  final String lessonTitle;
  final String initialNote;
  final Future<String?> Function(String noteText) onSave;

  const LessonNotesSheet({
    super.key,
    required this.language,
    required this.lessonTitle,
    required this.initialNote,
    required this.onSave,
  });

  static Future<void> show(
    BuildContext context, {
    required LessonController controller,
  }) {
    return showModalBottomSheet<void>(
      context: context,
      isScrollControlled: true,
      useSafeArea: true,
      isDismissible: true,
      backgroundColor: Colors.white,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
      ),
      builder: (_) => LessonNotesSheet(
        language: controller.language.value,
        lessonTitle: controller.lesson.value?.titleBangla ?? '',
        initialNote: controller.savedNote.value,
        onSave: controller.saveNote,
      ),
    );
  }

  @override
  State<LessonNotesSheet> createState() => _LessonNotesSheetState();
}

class _LessonNotesSheetState extends State<LessonNotesSheet> {
  late final TextEditingController _noteController;
  late final FocusNode _noteFocusNode;

  bool _isSaving = false;
  String? _errorMessage;

  @override
  void initState() {
    super.initState();
    _noteController = TextEditingController(text: widget.initialNote);
    _noteFocusNode = FocusNode();
  }

  @override
  void dispose() {
    _noteController.dispose();
    _noteFocusNode.dispose();
    super.dispose();
  }

  Future<void> _handleSave() async {
    if (_isSaving) return;
    setState(() {
      _isSaving = true;
      _errorMessage = null;
    });

    try {
      final error = await widget.onSave(_noteController.text);
      if (!mounted) return;
      if (error == null) {
        Navigator.of(context).pop();
      } else {
        setState(() {
          _errorMessage = error;
        });
      }
    } finally {
      if (mounted) {
        setState(() {
          _isSaving = false;
        });
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    final lang = widget.language;
    final title = widget.lessonTitle;
    final bottomInset = MediaQuery.viewInsetsOf(context).bottom;

    return PopScope(
      canPop: !_isSaving,
      child: Padding(
        key: const Key('lesson_notes_sheet'),
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
                      color: const Color(0xFFF3E8FF),
                      borderRadius: BorderRadius.circular(10),
                    ),
                    child: const Icon(
                      Icons.sticky_note_2_outlined,
                      size: 18,
                      color: Color(0xFF7E22CE),
                    ),
                  ),
                  const SizedBox(width: 10),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: <Widget>[
                        Text(
                          AppStrings.tr(
                            'আমার ব্যক্তিগত নোট',
                            'My Personal Study Note',
                            lang,
                          ),
                          maxLines: 1,
                          overflow: TextOverflow.ellipsis,
                          style: const TextStyle(
                            fontSize: 15,
                            fontWeight: FontWeight.w800,
                            color: PorhiTheme.slate900,
                          ),
                        ),
                        if (title.isNotEmpty)
                          Text(
                            title,
                            maxLines: 1,
                            overflow: TextOverflow.ellipsis,
                            style: const TextStyle(
                              fontSize: 11.5,
                              color: PorhiTheme.slate600,
                            ),
                          ),
                      ],
                    ),
                  ),
                  IconButton(
                    key: const Key('lesson_note_close_btn'),
                    onPressed:
                        _isSaving ? null : () => Navigator.of(context).pop(),
                    icon: const Icon(Icons.close_rounded),
                  ),
                ],
              ),
              const SizedBox(height: 12),
              TextField(
                key: const Key('lesson_note_input'),
                controller: _noteController,
                focusNode: _noteFocusNode,
                maxLines: 5,
                maxLength: 5000,
                enabled: !_isSaving,
                onChanged: (_) {
                  if (_errorMessage != null) {
                    setState(() => _errorMessage = null);
                  }
                },
                decoration: InputDecoration(
                  hintText: AppStrings.tr(
                    'এই পাঠের মূল সূত্র, শর্টকাট বা মনে রাখার পয়েন্ট লিখে রাখো...',
                    'Write key formulas, shortcuts, or reminders for this lesson...',
                    lang,
                  ),
                ),
              ),
              if (_errorMessage != null) ...<Widget>[
                const SizedBox(height: 8),
                Container(
                  key: const Key('lesson_note_error_banner'),
                  padding: const EdgeInsets.symmetric(
                    horizontal: 12,
                    vertical: 10,
                  ),
                  decoration: BoxDecoration(
                    color: const Color(0xFFFFF1F2),
                    borderRadius: BorderRadius.circular(10),
                    border: Border.all(color: const Color(0xFFFECDD3)),
                  ),
                  child: Row(
                    children: <Widget>[
                      const Icon(
                        Icons.error_outline_rounded,
                        size: 16,
                        color: PorhiTheme.rose600,
                      ),
                      const SizedBox(width: 8),
                      Expanded(
                        child: Text(
                          _errorMessage!,
                          style: const TextStyle(
                            fontSize: 12,
                            fontWeight: FontWeight.w600,
                            color: PorhiTheme.rose600,
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
              ],
              const SizedBox(height: 12),
              Wrap(
                alignment: WrapAlignment.end,
                spacing: 10,
                runSpacing: 8,
                children: <Widget>[
                  OutlinedButton(
                    key: const Key('lesson_note_cancel_btn'),
                    onPressed:
                        _isSaving ? null : () => Navigator.of(context).pop(),
                    child: Text(AppStrings.t('action.cancel', lang)),
                  ),
                  FilledButton.icon(
                    key: const Key('lesson_note_save_btn'),
                    onPressed: _isSaving ? null : _handleSave,
                    icon: _isSaving
                        ? const SizedBox(
                            width: 14,
                            height: 14,
                            child: CircularProgressIndicator(
                              strokeWidth: 2,
                              color: Colors.white,
                            ),
                          )
                        : const Icon(Icons.save_outlined, size: 16),
                    label: Text(AppStrings.t('action.save', lang)),
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}
