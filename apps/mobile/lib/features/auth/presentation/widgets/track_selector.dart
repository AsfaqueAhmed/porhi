import 'package:flutter/material.dart';
import 'package:porhi/core/i18n/app_strings.dart';
import 'package:porhi/core/theme/porhi_theme.dart';
import 'package:porhi/features/auth/domain/entities/auth_user_entity.dart';

/// Reusable 5-track selector (`CLASS_6_8`, `SSC`, `HSC`, `ADMISSION`, `BCS`).
class TrackSelectorChips extends StatelessWidget {
  final StudentTrack selectedTrack;
  final AppLanguage language;
  final ValueChanged<StudentTrack> onSelected;

  const TrackSelectorChips({
    super.key,
    required this.selectedTrack,
    required this.language,
    required this.onSelected,
  });

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (context, constraints) {
        final itemWidth = (constraints.maxWidth - 8) / 2;
        return Wrap(
          spacing: 8,
          runSpacing: 8,
          children: StudentTrack.values.map((track) {
            final isSelected = track == selectedTrack;
            final label = language == AppLanguage.en
                ? track.labelEn
                : track.labelBn;
            return Semantics(
              button: true,
              selected: isSelected,
              label: label,
              child: InkWell(
                key: Key('track_chip_${track.apiValue}'),
                borderRadius: BorderRadius.circular(16),
                onTap: () => onSelected(track),
                child: AnimatedContainer(
                  duration: const Duration(milliseconds: 160),
                  width: itemWidth,
                  constraints: const BoxConstraints(minHeight: 58),
                  padding: const EdgeInsets.symmetric(
                    horizontal: 11,
                    vertical: 10,
                  ),
                  decoration: BoxDecoration(
                    color: isSelected
                        ? PorhiTheme.indigo50
                        : PorhiTheme.slate50,
                    borderRadius: BorderRadius.circular(16),
                    border: Border.all(
                      color: isSelected
                          ? PorhiTheme.indigo600
                          : PorhiTheme.slate200,
                      width: isSelected ? 1.5 : 1,
                    ),
                  ),
                  child: Row(
                    children: <Widget>[
                      Icon(
                        _trackIcon(track),
                        size: 18,
                        color: isSelected
                            ? PorhiTheme.indigo600
                            : PorhiTheme.slate500,
                      ),
                      const SizedBox(width: 8),
                      Expanded(
                        child: Text(
                          label,
                          maxLines: 2,
                          overflow: TextOverflow.ellipsis,
                          style: TextStyle(
                            fontSize: 12,
                            height: 1.15,
                            fontWeight: isSelected
                                ? FontWeight.w800
                                : FontWeight.w600,
                            color: isSelected
                                ? PorhiTheme.indigo700
                                : PorhiTheme.slate700,
                          ),
                        ),
                      ),
                      if (isSelected) ...<Widget>[
                        const SizedBox(width: 4),
                        const Icon(
                          Icons.check_circle_rounded,
                          size: 17,
                          color: PorhiTheme.indigo600,
                        ),
                      ],
                    ],
                  ),
                ),
              ),
            );
          }).toList(),
        );
      },
    );
  }

  IconData _trackIcon(StudentTrack track) => switch (track) {
    StudentTrack.class6to8 => Icons.auto_stories_rounded,
    StudentTrack.ssc => Icons.school_rounded,
    StudentTrack.hsc => Icons.science_rounded,
    StudentTrack.admission => Icons.rocket_launch_rounded,
    StudentTrack.bcs => Icons.workspace_premium_rounded,
  };
}

/// Reusable daily study goal chip selector.
class DailyGoalSelectorChips extends StatelessWidget {
  static const List<int> presets = <int>[15, 30, 45, 60, 90, 120];

  final int selectedMinutes;
  final AppLanguage language;
  final ValueChanged<int> onSelected;

  const DailyGoalSelectorChips({
    super.key,
    required this.selectedMinutes,
    required this.language,
    required this.onSelected,
  });

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (context, constraints) {
        const spacing = 8.0;
        final itemWidth = (constraints.maxWidth - (spacing * 2)) / 3;
        return Wrap(
          spacing: spacing,
          runSpacing: spacing,
          children: presets.map((minutes) {
            final isSelected = minutes == selectedMinutes;
            final value = AppStrings.formatNumber(minutes, language);
            return Semantics(
              button: true,
              selected: isSelected,
              label: language == AppLanguage.en
                  ? '$minutes minutes per day'
                  : '$value মিনিট প্রতিদিন',
              child: InkWell(
                key: Key('goal_chip_$minutes'),
                onTap: () => onSelected(minutes),
                borderRadius: BorderRadius.circular(15),
                child: AnimatedContainer(
                  duration: const Duration(milliseconds: 160),
                  width: itemWidth,
                  height: 60,
                  decoration: BoxDecoration(
                    color: isSelected
                        ? PorhiTheme.selectedSurface
                        : PorhiTheme.slate50,
                    borderRadius: BorderRadius.circular(15),
                    border: Border.all(
                      color: isSelected
                          ? PorhiTheme.indigo600
                          : PorhiTheme.slate200,
                      width: isSelected ? 1.5 : 1,
                    ),
                  ),
                  child: Stack(
                    children: <Widget>[
                      Center(
                        child: Column(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: <Widget>[
                            Text(
                              value,
                              style: TextStyle(
                                color: PorhiTheme.slate900,
                                fontSize: 17,
                                height: 1,
                                fontWeight: FontWeight.w900,
                              ),
                            ),
                            const SizedBox(height: 4),
                            Text(
                              AppStrings.tr('মিনিট', 'MIN / DAY', language),
                              style: const TextStyle(
                                color: PorhiTheme.slate600,
                                fontSize: 8,
                                fontWeight: FontWeight.w800,
                                letterSpacing: 0.3,
                              ),
                            ),
                          ],
                        ),
                      ),
                      if (isSelected)
                        const Positioned(
                          right: 5,
                          top: 5,
                          child: Icon(
                            Icons.check_circle_rounded,
                            size: 14,
                            color: PorhiTheme.indigo600,
                          ),
                        ),
                    ],
                  ),
                ),
              ),
            );
          }).toList(),
        );
      },
    );
  }
}
