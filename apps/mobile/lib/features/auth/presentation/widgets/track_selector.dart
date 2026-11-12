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
    return Wrap(
      spacing: 8,
      runSpacing: 8,
      children: StudentTrack.values.map((track) {
        final isSelected = track == selectedTrack;
        final label = language == AppLanguage.en ? track.labelEn : track.labelBn;
        return ChoiceChip(
          key: Key('track_chip_${track.apiValue}'),
          label: Text(label),
          selected: isSelected,
          selectedColor: PorhiTheme.indigo50,
          backgroundColor: Colors.white,
          side: BorderSide(
            color: isSelected ? PorhiTheme.indigo600 : PorhiTheme.slate200,
          ),
          labelStyle: TextStyle(
            fontWeight: isSelected ? FontWeight.w700 : FontWeight.w500,
            color: isSelected ? PorhiTheme.indigo700 : PorhiTheme.slate700,
          ),
          onSelected: (_) => onSelected(track),
        );
      }).toList(),
    );
  }
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
    return Wrap(
      spacing: 8,
      runSpacing: 8,
      children: presets.map((minutes) {
        final isSelected = minutes == selectedMinutes;
        final label = language == AppLanguage.en
            ? '$minutes min'
            : '${AppStrings.formatNumber(minutes, language)} মিনিট';
        return ChoiceChip(
          key: Key('goal_chip_$minutes'),
          label: Text(label),
          selected: isSelected,
          selectedColor: PorhiTheme.emerald50,
          backgroundColor: Colors.white,
          side: BorderSide(
            color: isSelected ? PorhiTheme.emerald600 : PorhiTheme.slate200,
          ),
          labelStyle: TextStyle(
            fontWeight: isSelected ? FontWeight.w700 : FontWeight.w500,
            color: isSelected ? PorhiTheme.emerald600 : PorhiTheme.slate700,
          ),
          onSelected: (_) => onSelected(minutes),
        );
      }).toList(),
    );
  }
}
