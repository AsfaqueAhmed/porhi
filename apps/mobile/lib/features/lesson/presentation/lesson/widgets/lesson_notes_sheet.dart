import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:porhi/core/i18n/app_strings.dart';
import 'package:porhi/core/theme/porhi_theme.dart';
import 'package:porhi/features/lesson/presentation/lesson/controller/lesson_controller.dart';

class LessonNotesSheet {
  static Future<void> show(
    BuildContext context, {
    required LessonController controller,
  }) {
    if (controller.noteController.text != controller.savedNote.value) {
      controller.noteController.text = controller.savedNote.value;
    }

    return showModalBottomSheet<void>(
      context: context,
      isScrollControlled: true,
      useSafeArea: true,
      backgroundColor: Colors.white,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
      ),
      builder: (sheetContext) {
        final bottomInset = MediaQuery.viewInsetsOf(sheetContext).bottom;
        return Padding(
          key: const Key('lesson_notes_sheet'),
          padding: EdgeInsets.fromLTRB(20, 16, 20, 20 + bottomInset),
          child: Obx(() {
            final lang = controller.language.value;
            final saving = controller.isSavingNote.value;
            final title = controller.lesson.value?.titleBangla ?? '';

            return SingleChildScrollView(
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
                        onPressed: () => Navigator.of(sheetContext).pop(),
                        icon: const Icon(Icons.close_rounded),
                      ),
                    ],
                  ),
                  const SizedBox(height: 12),
                  TextField(
                    key: const Key('lesson_note_input'),
                    controller: controller.noteController,
                    focusNode: controller.noteFocusNode,
                    maxLines: 5,
                    maxLength: 5000,
                    enabled: !saving,
                    decoration: InputDecoration(
                      hintText: AppStrings.tr(
                        'এই পাঠের মূল সূত্র, শর্টকাট বা মনে রাখার পয়েন্ট লিখে রাখো...',
                        'Write key formulas, shortcuts, or reminders for this lesson...',
                        lang,
                      ),
                    ),
                  ),
                  const SizedBox(height: 12),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.end,
                    children: <Widget>[
                      OutlinedButton(
                        onPressed: saving
                            ? null
                            : () => Navigator.of(sheetContext).pop(),
                        child: Text(AppStrings.t('action.cancel', lang)),
                      ),
                      const SizedBox(width: 10),
                      FilledButton.icon(
                        key: const Key('lesson_note_save_btn'),
                        onPressed: saving
                            ? null
                            : () async {
                                final ok = await controller.saveNote();
                                if (ok && sheetContext.mounted) {
                                  Navigator.of(sheetContext).pop();
                                }
                              },
                        icon: saving
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
            );
          }),
        );
      },
    );
  }
}
