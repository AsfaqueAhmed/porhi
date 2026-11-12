import 'package:porhi/core/i18n/bangla_digits.dart';

/// Pure Dart date and time parsing helpers supporting Bangla (`০-৯`) and ASCII digits.
abstract final class DateTimeParser {
  static final RegExp _dateRegex = RegExp(r'^(\d{4})-(\d{2})-(\d{2})$');
  static final RegExp _timeRegex = RegExp(r'^(\d{2}):(\d{2})$');

  /// Normalizes Bangla numerals (`০-৯`) to ASCII and validates strict `HH:mm`.
  /// Returns `null` when [raw] is blank or malformed.
  static String? normalizeHhMm(String raw) {
    final ascii = toAsciiDigits(raw).trim();
    if (ascii.isEmpty) return null;
    final match = _timeRegex.firstMatch(ascii);
    if (match == null) return null;
    final hour = int.tryParse(match.group(1)!);
    final minute = int.tryParse(match.group(2)!);
    if (hour == null || minute == null) return null;
    if (hour < 0 || hour > 23 || minute < 0 || minute > 59) return null;
    return '${hour.toString().padLeft(2, '0')}:${minute.toString().padLeft(2, '0')}';
  }

  /// Normalizes Bangla numerals (`০-৯`) to ASCII and validates strict calendar `YYYY-MM-DD`.
  static String? normalizeYyyyMmDd(String raw) {
    final ascii = toAsciiDigits(raw).trim();
    if (ascii.isEmpty) return null;
    final match = _dateRegex.firstMatch(ascii);
    if (match == null) return null;
    final year = int.tryParse(match.group(1)!);
    final month = int.tryParse(match.group(2)!);
    final day = int.tryParse(match.group(3)!);
    if (year == null || month == null || day == null) return null;
    if (month < 1 || month > 12 || day < 1 || day > 31) return null;
    final check = DateTime(year, month, day);
    if (check.year != year || check.month != month || check.day != day) {
      return null;
    }
    return '${year.toString().padLeft(4, '0')}-'
        '${month.toString().padLeft(2, '0')}-'
        '${day.toString().padLeft(2, '0')}';
  }
}
