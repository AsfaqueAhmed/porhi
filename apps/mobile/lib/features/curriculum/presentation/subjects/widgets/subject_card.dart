import 'package:flutter/material.dart';
import 'package:porhi/core/i18n/app_strings.dart';
import 'package:porhi/core/theme/porhi_theme.dart';
import 'package:porhi/features/curriculum/domain/entities/curriculum_entities.dart';

class SubjectCard extends StatelessWidget {
  final SubjectEntity subject;
  final AppLanguage language;
  final bool isActive;
  final int downloadedChapterCount;
  final VoidCallback? onTap;

  const SubjectCard({
    super.key,
    required this.subject,
    required this.language,
    required this.isActive,
    this.downloadedChapterCount = 0,
    this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    final trackLabel = language == AppLanguage.en
        ? subject.program.labelEn
        : subject.program.labelBn;
    final chapterText = AppStrings.formatNumber(subject.chapterCount, language);
    final topicText = AppStrings.formatNumber(subject.topicCount, language);

    return Card(
      key: Key('subject_card_${subject.id}'),
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(16),
        side: BorderSide(
          color: isActive ? PorhiTheme.indigo600 : PorhiTheme.slate200,
          width: isActive ? 1.5 : 1,
        ),
      ),
      child: InkWell(
        onTap: subject.isReady ? onTap : null,
        borderRadius: BorderRadius.circular(16),
        child: Padding(
          padding: const EdgeInsets.all(16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: <Widget>[
              Row(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: <Widget>[
                  Container(
                    width: 42,
                    height: 42,
                    decoration: BoxDecoration(
                      color: subject.isReady
                          ? PorhiTheme.indigo50
                          : PorhiTheme.slate100,
                      borderRadius: BorderRadius.circular(12),
                    ),
                    child: Icon(
                      Icons.menu_book_rounded,
                      color: subject.isReady
                          ? PorhiTheme.indigo600
                          : PorhiTheme.slate400,
                    ),
                  ),
                  const SizedBox(width: 12),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: <Widget>[
                        Wrap(
                          spacing: 6,
                          runSpacing: 4,
                          children: <Widget>[
                            _BadgeChip(
                              label: trackLabel,
                              bgColor: PorhiTheme.indigo50,
                              textColor: PorhiTheme.indigo700,
                            ),
                            if (isActive)
                              _BadgeChip(
                                label: AppStrings.tr(
                                  'সক্রিয় বিষয়',
                                  'Active',
                                  language,
                                ),
                                bgColor: PorhiTheme.emerald50,
                                textColor: PorhiTheme.emerald600,
                              ),
                            if (!subject.isReady)
                              _BadgeChip(
                                label: AppStrings.tr(
                                  'শীঘ্রই আসছে',
                                  'Coming Soon',
                                  language,
                                ),
                                bgColor: PorhiTheme.slate100,
                                textColor: PorhiTheme.slate600,
                              ),
                            if (downloadedChapterCount > 0)
                              _BadgeChip(
                                label: AppStrings.tr(
                                  '${AppStrings.formatNumber(downloadedChapterCount, language)}টি অফলাইন',
                                  '$downloadedChapterCount offline',
                                  language,
                                ),
                                bgColor: const Color(0xFFECFDF5),
                                textColor: PorhiTheme.emerald600,
                              ),
                          ],
                        ),
                        const SizedBox(height: 8),
                        Text(
                          subject.nameBangla,
                          maxLines: 2,
                          overflow: TextOverflow.ellipsis,
                          style: TextStyle(
                            fontSize: 16,
                            fontWeight: FontWeight.w700,
                            color: subject.isReady
                                ? PorhiTheme.slate900
                                : PorhiTheme.slate600,
                          ),
                        ),
                      ],
                    ),
                  ),
                  if (subject.isReady)
                    const Icon(
                      Icons.chevron_right_rounded,
                      color: PorhiTheme.slate400,
                    ),
                ],
              ),
              const SizedBox(height: 12),
              Row(
                children: <Widget>[
                  Flexible(
                    child: Text(
                      language == AppLanguage.bn
                          ? '$chapterTextটি অধ্যায় • $topicTextটি টপিক'
                          : '$chapterText chapters • $topicText topics',
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                      style: const TextStyle(
                        fontSize: 12.5,
                        fontWeight: FontWeight.w600,
                        color: PorhiTheme.slate600,
                      ),
                    ),
                  ),
                  const SizedBox(width: 8),
                  Text(
                    AppStrings.formatNumber(subject.syllabusYear, language),
                    style: const TextStyle(
                      fontSize: 12,
                      color: PorhiTheme.slate400,
                      fontWeight: FontWeight.w600,
                    ),
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

class _BadgeChip extends StatelessWidget {
  final String label;
  final Color bgColor;
  final Color textColor;

  const _BadgeChip({
    required this.label,
    required this.bgColor,
    required this.textColor,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
      decoration: BoxDecoration(
        color: bgColor,
        borderRadius: BorderRadius.circular(999),
      ),
      child: Text(
        label,
        maxLines: 1,
        overflow: TextOverflow.ellipsis,
        style: TextStyle(
          fontSize: 10.5,
          fontWeight: FontWeight.w700,
          color: textColor,
        ),
      ),
    );
  }
}
