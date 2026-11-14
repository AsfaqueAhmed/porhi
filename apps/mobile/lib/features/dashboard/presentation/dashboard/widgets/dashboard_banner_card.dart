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
    final pct = (syllabusPercent / 100).clamp(0.0, 1.0);
    final completed = AppStrings.formatNumber(completedTopics, lang);
    final total = AppStrings.formatNumber(totalTopics, lang);
    final percent = AppStrings.formatNumber(syllabusPercent, lang);

    return Container(
      clipBehavior: Clip.antiAlias,
      decoration: BoxDecoration(
        gradient: PorhiTheme.heroGradient,
        borderRadius: BorderRadius.circular(30),
        boxShadow: PorhiTheme.glowShadow,
      ),
      child: Stack(
        children: <Widget>[
          Positioned(
            right: -34,
            top: -58,
            child: Container(
              width: 170,
              height: 170,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                border: Border.all(
                  color: Colors.white.withValues(alpha: 0.08),
                  width: 28,
                ),
              ),
            ),
          ),
          Padding(
            padding: const EdgeInsets.fromLTRB(21, 20, 21, 18),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: <Widget>[
                Row(
                  children: <Widget>[
                    Expanded(
                      child: Container(
                        padding: const EdgeInsets.symmetric(
                          horizontal: 11,
                          vertical: 7,
                        ),
                        decoration: BoxDecoration(
                          color: Colors.white.withValues(alpha: 0.12),
                          borderRadius: BorderRadius.circular(999),
                          border: Border.all(
                            color: Colors.white.withValues(alpha: 0.18),
                          ),
                        ),
                        child: Text(
                          trackLabel,
                          maxLines: 1,
                          overflow: TextOverflow.ellipsis,
                          style: const TextStyle(
                            color: Colors.white,
                            fontSize: 11,
                            fontWeight: FontWeight.w700,
                          ),
                        ),
                      ),
                    ),
                    const SizedBox(width: 10),
                    Container(
                      padding: const EdgeInsets.symmetric(
                        horizontal: 10,
                        vertical: 7,
                      ),
                      decoration: BoxDecoration(
                        color: PorhiTheme.citrus,
                        borderRadius: BorderRadius.circular(999),
                      ),
                      child: Row(
                        mainAxisSize: MainAxisSize.min,
                        children: <Widget>[
                          const Icon(
                            Icons.local_fire_department_rounded,
                            size: 16,
                            color: PorhiTheme.indigo900,
                          ),
                          const SizedBox(width: 4),
                          Text(
                            '${AppStrings.formatNumber(streakDays, lang)} ${AppStrings.tr('দিন', 'day streak', lang)}',
                            style: const TextStyle(
                              color: PorhiTheme.indigo900,
                              fontSize: 11,
                              fontWeight: FontWeight.w800,
                            ),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 18),
                Text(
                  AppStrings.tr(
                    'আজ একটু এগিয়ে যাও।',
                    'A little progress today.',
                    lang,
                  ),
                  style: const TextStyle(
                    color: Colors.white,
                    fontSize: 24,
                    height: 1.16,
                    letterSpacing: -0.5,
                    fontWeight: FontWeight.w900,
                  ),
                ),
                const SizedBox(height: 17),
                Row(
                  children: <Widget>[
                    SizedBox(
                      width: 62,
                      height: 62,
                      child: Stack(
                        alignment: Alignment.center,
                        children: <Widget>[
                          SizedBox.expand(
                            child: CircularProgressIndicator(
                              value: pct,
                              strokeWidth: 6,
                              strokeCap: StrokeCap.round,
                              backgroundColor: Colors.white.withValues(
                                alpha: 0.16,
                              ),
                              valueColor: const AlwaysStoppedAnimation<Color>(
                                PorhiTheme.citrus,
                              ),
                            ),
                          ),
                          Text(
                            '$percent%',
                            style: const TextStyle(
                              color: Colors.white,
                              fontSize: 13,
                              fontWeight: FontWeight.w900,
                            ),
                          ),
                        ],
                      ),
                    ),
                    const SizedBox(width: 13),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: <Widget>[
                          Text(
                            AppStrings.tr(
                              'সিলেবাসের অগ্রগতি',
                              'SYLLABUS PROGRESS',
                              lang,
                            ),
                            style: const TextStyle(
                              color: Color(0xFFCAE1D5),
                              fontSize: 10,
                              letterSpacing: 0.8,
                              fontWeight: FontWeight.w800,
                            ),
                          ),
                          const SizedBox(height: 4),
                          Text(
                            lang == AppLanguage.bn
                                ? '$completed / $total টপিক শেষ'
                                : '$completed of $total topics completed',
                            style: const TextStyle(
                              color: Colors.white,
                              fontSize: 14,
                              fontWeight: FontWeight.w700,
                            ),
                          ),
                          const SizedBox(height: 9),
                          ClipRRect(
                            borderRadius: BorderRadius.circular(99),
                            child: LinearProgressIndicator(
                              value: pct,
                              minHeight: 5,
                              backgroundColor: Colors.white.withValues(
                                alpha: 0.15,
                              ),
                              valueColor: const AlwaysStoppedAnimation<Color>(
                                PorhiTheme.citrus,
                              ),
                            ),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 17),
                Row(
                  key: const Key('dashboard_7day_strip'),
                  children: last7Days.map((day) {
                    final active = day.active;
                    return Expanded(
                      child: Container(
                        margin: const EdgeInsets.only(right: 6),
                        padding: const EdgeInsets.symmetric(vertical: 7),
                        decoration: BoxDecoration(
                          color: active
                              ? PorhiTheme.citrus
                              : Colors.white.withValues(alpha: 0.1),
                          borderRadius: BorderRadius.circular(12),
                        ),
                        child: Column(
                          children: <Widget>[
                            Text(
                              lang == AppLanguage.bn
                                  ? day.labelBn
                                  : day.labelEn,
                              style: TextStyle(
                                color: active
                                    ? PorhiTheme.indigo900
                                    : Colors.white.withValues(alpha: 0.8),
                                fontSize: 10,
                                fontWeight: FontWeight.w700,
                              ),
                            ),
                            const SizedBox(height: 5),
                            Container(
                              width: 6,
                              height: 6,
                              decoration: BoxDecoration(
                                shape: BoxShape.circle,
                                color: active
                                    ? PorhiTheme.indigo900
                                    : Colors.white.withValues(alpha: 0.3),
                              ),
                            ),
                          ],
                        ),
                      ),
                    );
                  }).toList(),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
