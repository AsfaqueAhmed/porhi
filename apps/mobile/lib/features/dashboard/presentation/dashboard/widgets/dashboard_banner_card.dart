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
        gradient: PorhiTheme.heroGradient,
        borderRadius: BorderRadius.circular(24),
        boxShadow: PorhiTheme.elevatedShadow,
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
                        horizontal: 12,
                        vertical: 5,
                      ),
                      decoration: BoxDecoration(
                        color: Colors.white.withValues(alpha: 0.16),
                        borderRadius: BorderRadius.circular(999),
                        border: Border.all(
                          color: Colors.white.withValues(alpha: 0.25),
                        ),
                      ),
                      child: Text(
                        trackLabel,
                        maxLines: 1,
                        overflow: TextOverflow.ellipsis,
                        style: const TextStyle(
                          color: Colors.white,
                          fontSize: 11.5,
                          fontWeight: FontWeight.w700,
                        ),
                      ),
                    ),
                    const SizedBox(height: 12),
                    Text(
                      AppStrings.tr(
                        'স্বাগতম! আজ কী পড়বে?',
                        'Welcome! What will you study today?',
                        lang,
                      ),
                      style: const TextStyle(
                        color: Colors.white,
                        fontSize: 22,
                        fontWeight: FontWeight.w900,
                        letterSpacing: -0.4,
                        height: 1.25,
                      ),
                    ),
                    const SizedBox(height: 6),
                    Text(
                      AppStrings.tr(
                        'ধারাবাহিক পড়াশোনা তোমার মেধা ও আত্মবিশ্বাস গড়ে তোলে।',
                        'Consistent study builds mastery and confidence.',
                        lang,
                      ),
                      style: const TextStyle(
                        color: Color(0xFFC7D2FE),
                        fontSize: 13,
                        height: 1.35,
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(width: 14),
              Container(
                padding: const EdgeInsets.symmetric(
                  horizontal: 14,
                  vertical: 12,
                ),
                decoration: BoxDecoration(
                  gradient: const LinearGradient(
                    colors: <Color>[Color(0xFF3730A3), Color(0xFF312E81)],
                    begin: Alignment.topLeft,
                    end: Alignment.bottomRight,
                  ),
                  borderRadius: BorderRadius.circular(18),
                  border: Border.all(
                    color: Colors.white.withValues(alpha: 0.22),
                  ),
                  boxShadow: const <BoxShadow>[
                    BoxShadow(
                      color: Color(0x33F59E0B),
                      blurRadius: 14,
                      offset: Offset(0, 4),
                    ),
                  ],
                ),
                child: Column(
                  children: <Widget>[
                    Container(
                      padding: const EdgeInsets.all(6),
                      decoration: BoxDecoration(
                        color: const Color(0xFFF59E0B).withValues(alpha: 0.2),
                        shape: BoxShape.circle,
                      ),
                      child: const Icon(
                        Icons.local_fire_department_rounded,
                        color: Color(0xFFFBBF24),
                        size: 26,
                      ),
                    ),
                    const SizedBox(height: 4),
                    Text(
                      '$streakStr ${AppStrings.tr('দিন', 'Days', lang)}',
                      style: const TextStyle(
                        color: Colors.white,
                        fontSize: 16,
                        fontWeight: FontWeight.w900,
                      ),
                    ),
                    Text(
                      AppStrings.tr('স্ট্রিক', 'Streak', lang),
                      style: const TextStyle(
                        color: Color(0xFFFDE68A),
                        fontSize: 11,
                        fontWeight: FontWeight.w700,
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
          const SizedBox(height: 18),
          Divider(color: Colors.white.withValues(alpha: 0.16), height: 1),
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
                    fontSize: 12.5,
                    fontWeight: FontWeight.w600,
                  ),
                ),
              ),
              const SizedBox(width: 8),
              Flexible(
                child: Container(
                  padding: const EdgeInsets.symmetric(
                    horizontal: 8,
                    vertical: 3,
                  ),
                  decoration: BoxDecoration(
                    color: Colors.white.withValues(alpha: 0.15),
                    borderRadius: BorderRadius.circular(999),
                  ),
                  child: Text(
                    lang == AppLanguage.bn
                        ? '$completedStr/$totalStr টপিক ($pctStr%)'
                        : '$completedStr/$totalStr Topics ($pctStr%)',
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                    style: const TextStyle(
                      color: Colors.white,
                      fontSize: 11.5,
                      fontWeight: FontWeight.w700,
                    ),
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
                  ? const Color(0xFF10B981).withValues(alpha: 0.28)
                  : day.isToday
                      ? Colors.white.withValues(alpha: 0.16)
                      : Colors.white.withValues(alpha: 0.07);
              final borderColor = day.active
                  ? const Color(0xFF34D399).withValues(alpha: 0.7)
                  : day.isToday
                      ? const Color(0xFFA5B4FC)
                      : Colors.white.withValues(alpha: 0.14);

              return Expanded(
                child: Container(
                  margin: const EdgeInsets.symmetric(horizontal: 2.5),
                  padding: const EdgeInsets.symmetric(vertical: 8),
                  decoration: BoxDecoration(
                    color: bgColor,
                    borderRadius: BorderRadius.circular(12),
                    border: Border.all(color: borderColor),
                  ),
                  child: Column(
                    children: <Widget>[
                      Text(
                        lang == AppLanguage.bn ? day.labelBn : day.labelEn,
                        maxLines: 1,
                        overflow: TextOverflow.ellipsis,
                        style: TextStyle(
                          fontSize: 10.5,
                          fontWeight: FontWeight.w700,
                          color: day.active
                              ? const Color(0xFFA7F3D0)
                              : Colors.white.withValues(alpha: 0.9),
                        ),
                      ),
                      const SizedBox(height: 4),
                      Icon(
                        day.active
                            ? Icons.check_circle_rounded
                            : (day.isToday
                                ? Icons.adjust_rounded
                                : Icons.circle_outlined),
                        size: 13,
                        color: day.active
                            ? const Color(0xFF34D399)
                            : (day.isToday
                                ? const Color(0xFFA5B4FC)
                                : const Color(0xFFC7D2FE)),
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
