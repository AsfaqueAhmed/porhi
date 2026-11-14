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

    return Container(
      key: Key('subject_card_${subject.id}'),
      margin: const EdgeInsets.only(bottom: 12),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(20),
        border: Border.all(
          color: isActive ? PorhiTheme.indigo600 : PorhiTheme.slate200,
          width: isActive ? 1.8 : 1,
        ),
        boxShadow: isActive ? PorhiTheme.brandShadow : PorhiTheme.subtleShadow,
      ),
      child: Material(
        color: Colors.transparent,
        child: InkWell(
          onTap: subject.isReady ? onTap : null,
          borderRadius: BorderRadius.circular(20),
          child: Padding(
            padding: const EdgeInsets.all(18),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: <Widget>[
                Row(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: <Widget>[
                    Container(
                      width: 48,
                      height: 48,
                      decoration: BoxDecoration(
                        gradient: subject.isReady
                            ? (isActive
                                ? PorhiTheme.brandGradient
                                : const LinearGradient(
                                    colors: <Color>[
                                      Color(0xFFEEF2FF),
                                      Color(0xFFE0E7FF),
                                    ],
                                  ))
                            : const LinearGradient(
                                colors: <Color>[
                                  Color(0xFFF1F5F9),
                                  Color(0xFFE2E8F0),
                                ],
                              ),
                        borderRadius: BorderRadius.circular(14),
                      ),
                      child: Icon(
                        Icons.menu_book_rounded,
                        color: subject.isReady
                            ? (isActive ? Colors.white : PorhiTheme.indigo600)
                            : PorhiTheme.slate400,
                        size: 24,
                      ),
                    ),
                    const SizedBox(width: 14),
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
                              fontSize: 17,
                              fontWeight: FontWeight.w800,
                              letterSpacing: -0.2,
                              color: subject.isReady
                                  ? PorhiTheme.slate900
                                  : PorhiTheme.slate600,
                            ),
                          ),
                        ],
                      ),
                    ),
                    if (subject.isReady)
                      Container(
                        padding: const EdgeInsets.all(4),
                        decoration: BoxDecoration(
                          color: PorhiTheme.slate50,
                          shape: BoxShape.circle,
                        ),
                        child: const Icon(
                          Icons.chevron_right_rounded,
                          color: PorhiTheme.slate400,
                          size: 20,
                        ),
                      ),
                  ],
                ),
                const SizedBox(height: 14),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: <Widget>[
                    Flexible(
                      child: Text(
                        language == AppLanguage.bn
                            ? '$chapterTextটি অধ্যায় • $topicTextটি টপিক'
                            : '$chapterText chapters • $topicText topics',
                        style: const TextStyle(
                          fontSize: 12.5,
                          fontWeight: FontWeight.w600,
                          color: PorhiTheme.slate500,
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
