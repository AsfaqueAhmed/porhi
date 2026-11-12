import 'package:flutter/material.dart';
import 'package:intl/intl.dart';

extension DateTimeExtension on DateTime {
  int get daysInMonth {
    return lastDateOfTheMonth.day;
  }

  bool isSameDay(DateTime? date) {
    if (date == null) return false;
    return date.day == day && date.month == month && date.year == year;
  }

  bool isAfterDay(DateTime? date) {
    if (date == null) return false;
    return date.year < year ||
        (date.month < month && date.year == year) ||
        (date.day < day && date.month == month && date.year == year);
  }

  bool isBeforeDay(DateTime? date) {
    if (date == null) return false;
    return date.year > year ||
        (date.month > month && date.year == year) ||
        (date.day > day && date.month == month && date.year == year);
  }

  DateTime get startDateOfTheMonth {
    return DateTime(year, month);
  }

  DateTime get lastDateOfTheMonth {
    return DateTime(year, month + 1).subtract(const Duration(days: 1));
  }

  String toDateZeroTimeString() {
    return "$year-${month.toString().padLeft(2, "0")}-${day.toString().padLeft(2, "0")}T00:00:00";
  }

  bool timeInBetween(TimeOfDay start, TimeOfDay end) {
    TimeOfDay time = TimeOfDay.fromDateTime(this);
    return !time.isBefore(start) && !time.isAfter(end);
  }

  String toTimeString(TimeFormats format) {
    switch (format) {
      case TimeFormats.hhmm:
        return DateFormat("HH:mm").format(this);
      case TimeFormats.hhmma:
        return DateFormat("hh:mm a").format(this);
    }
  }

  String toDateString(DateFormats dateFormat) {
    switch (dateFormat) {
      case DateFormats.dMMMyy:
        return DateFormat("d MMM yy").format(this);
      case DateFormats.ddMMMyyyy:
        return DateFormat("dd MMM yyyy").format(this);
      case DateFormats.dMMMy:
        return DateFormat("d MMM, y").format(this);
      case DateFormats.dd_MM_yyyy:
        return DateFormat('dd/MM/yyyy').format(this);
      case DateFormats.yyyy_MM_dd:
        return DateFormat('yyyy-MM-dd').format(this);
    }
  }
}

enum TimeFormats {
  ///time of the date will be shown in `HH:mm` format, ex: 12:11, 15:55, 05:45
  hhmm,

  ///time of the date will be shown in `hh:mm a` format, ex: 12:11 PM, 03:55 PM, 05:45 AM
  hhmma
}

enum DateFormats {
  ///Data will shows as `d MMM yy` format ex: 10 Feb 24, 25 Dec 23 and 15 Jul 25
  dMMMyy,

  ///Data will shows as `dd MMM yyyy` format ex: 10 Feb 2024, 25 Dec 2023 and 15 Jul 2025
  ddMMMyyyy,

  ///Data will shows as `d MMM,y` format ex: 10 Feb,24, 25 Dec,23 and 15 Jul,25
  dMMMy,

  ///Data will shows as `dd/MM/yyyy` format ex: 20/11/2023, 25/12/23 and 15/07/2025
  // ignore: constant_identifier_names
  dd_MM_yyyy,

  ///Data will shows as `yyyy-MM-dd` format ex: 2023-11-20, 2023-12-25 and 2025-07-15
  // ignore: constant_identifier_names
  yyyy_MM_dd
}
