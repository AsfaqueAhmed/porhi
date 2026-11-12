import 'package:flutter/material.dart';
import 'package:porhi/core/i18n/app_strings.dart';
import 'package:porhi/core/theme/porhi_theme.dart';
import 'package:porhi/features/dashboard/presentation/dashboard/controller/dashboard_controller.dart';

class DashboardBannerCard extends StatelessWidget {
  final AppLanguage lang;
  final String trackLabel;
  final int streakDays;
  final int completedTopics;
  final int totalTopics;
  final int syllabusPercent;
  final List<ActivityDayEntry> last7Days;

  const DashboardBannerCard({
    super.key,
    required this.lang,
    required this.trackLabel,
    required this.streakDays,
    required this.completedTopics,
    required this.totalTopics,
    required this.syllabusPercent,
    required this.last7Days,
  });

  @override
  Widget build(BuildContext context) {
    final streakStr = AppStrings.formatNumber(streakDays, lang);
    final completedStr = AppStrings.formatNumber(completedTopics, lang);
    final totalStr = AppStrings.formatNumber(totalTopics, lang);
    final pctStr = AppStrings.formatNumber(syllabusPercent, lang);

    return Container(
      decoration: BoxDecoration(
        gradient: const LinearGradient(
          colors: <Color>[PorhiTheme.indigo700, Color(0xFF312E81)],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        borderRadius: BorderRadius.circular(20),
      ),
      padding: const EdgeInsets.all(20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: <Widget>[
          Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: <Widget>[
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: <Widget>[
                    Container(
                      padding: const EdgeInsets.symmetric(
                        horizontal: 10,
                        vertical: 4,
                      ),
                      decoration: BoxDecoration(
                        color: Colors.white.withValues(alpha: 0.16),
                        borderRadius: BorderRadius.circular(999),
                      ),
                      child: Text(
                        trackLabel,
                        maxLines: 1,
                        overflow: TextOverflow.ellipsis,
                        style: const TextStyle(
                          color: Color(0xFFE0E7FF),
                          fontSize: 11,
                          fontWeight: FontWeight.w700,
                        ),
                      ),
                    ),
                    const SizedBox(height: 10),
                    Text(
                      AppStrings.tr(
                        'স্বাগতম! আজ কী পড়বে?',
                        'Welcome! What will you study today?',
                        lang,
                      ),
                      style: const TextStyle(
                        color: Colors.white,
                        fontSize: 20,
                        fontWeight: FontWeight.w800,
                        height: 1.25,
                      ),
                    ),
                    const SizedBox(height: 4),
                    Text(
                      AppStrings.tr(
                        'ধারাবাহিক পড়াশোনা তোমার মেধা ও আত্মবিশ্বাস গড়ে তোলে।',
                        'Consistent study builds mastery and confidence.',
                        lang,
                      ),
                      style: const TextStyle(
                        color: Color(0xFFC7D2FE),
                        fontSize: 12.5,
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(width: 12),
              Container(
                padding: const EdgeInsets.symmetric(
                  horizontal: 12,
                  vertical: 10,
                ),
                decoration: BoxDecoration(
                  color: Colors.white.withValues(alpha: 0.12),
                  borderRadius: BorderRadius.circular(14),
                  border: Border.all(
                    color: Colors.white.withValues(alpha: 0.2),
                  ),
                ),
                child: Column(
                  children: <Widget>[
                    const Icon(
                      Icons.local_fire_department_rounded,
                      color: Color(0xFFFB923C),
                      size: 24,
                    ),
                    const SizedBox(height: 2),
                    Text(
                      '$streakStr ${AppStrings.tr('দিন', 'Days', lang)}',
                      style: const TextStyle(
                        color: Colors.white,
                        fontSize: 16,
                        fontWeight: FontWeight.w800,
                      ),
                    ),
                    Text(
                      AppStrings.tr('স্ট্রিক', 'Streak', lang),
                      style: const TextStyle(
                        color: Color(0xFFC7D2FE),
                        fontSize: 11,
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
          const SizedBox(height: 16),
          Divider(color: Colors.white.withValues(alpha: 0.18), height: 1),
          const SizedBox(height: 14),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: <Widget>[
              Expanded(
                child: Text(
                  AppStrings.tr(
                    'সামগ্রিক সিলেবাস অগ্রগতি',
                    'Overall Syllabus Progress',
                    lang,
                  ),
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                  style: const TextStyle(
                    color: Color(0xFFE0E7FF),
                    fontSize: 12,
                    fontWeight: FontWeight.w600,
                  ),
                ),
              ),
              const SizedBox(width: 8),
              Flexible(
                child: Text(
                  lang == AppLanguage.bn
                      ? '$completedStr/$totalStr টপিক ($pctStr%)'
                      : '$completedStr/$totalStr Topics ($pctStr%)',
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                  style: const TextStyle(
                    color: Colors.white,
                    fontSize: 12,
                    fontWeight: FontWeight.w700,
                  ),
                ),
              ),
            ],
          ),
          const SizedBox(height: 8),
          ClipRRect(
            borderRadius: BorderRadius.circular(999),
            child: LinearProgressIndicator(
              value: (syllabusPercent / 100).clamp(0, 1),
              minHeight: 8,
              backgroundColor: const Color(0xFF1E1B4B),
              valueColor: const AlwaysStoppedAnimation<Color>(
                Color(0xFF34D399),
              ),
            ),
          ),
          const SizedBox(height: 14),
          Row(
            key: const Key('dashboard_7day_strip'),
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: last7Days.map((day) {
              final bgColor = day.active
                  ? const Color(0xFF34D399).withValues(alpha: 0.22)
                  : day.isToday
                      ? Colors.white.withValues(alpha: 0.14)
                      : Colors.white.withValues(alpha: 0.06);
              final borderColor = day.active
                  ? const Color(0xFF6EE7B7).withValues(alpha: 0.5)
                  : day.isToday
                      ? const Color(0xFFA5B4FC)
                      : Colors.white.withValues(alpha: 0.14);

              return Expanded(
                child: Container(
                  margin: const EdgeInsets.symmetric(horizontal: 2.5),
                  padding: const EdgeInsets.symmetric(vertical: 6),
                  decoration: BoxDecoration(
                    color: bgColor,
                    borderRadius: BorderRadius.circular(10),
                    border: Border.all(color: borderColor),
                  ),
                  child: Column(
                    children: <Widget>[
                      Text(
                        lang == AppLanguage.bn ? day.labelBn : day.labelEn,
                        maxLines: 1,
                        overflow: TextOverflow.ellipsis,
                        style: TextStyle(
                          fontSize: 10,
                          fontWeight: FontWeight.w700,
                          color: day.active
                              ? const Color(0xFFA7F3D0)
                              : Colors.white.withValues(alpha: 0.85),
                        ),
                      ),
                      const SizedBox(height: 3),
                      Icon(
                        day.active
                            ? Icons.circle
                            : Icons.radio_button_unchecked,
                        size: 9,
                        color: day.active
                            ? const Color(0xFF34D399)
                            : const Color(0xFFC7D2FE),
                      ),
                    ],
                  ),
                ),
              );
            }).toList(),
          ),
        ],
      ),
    );
  }
}
