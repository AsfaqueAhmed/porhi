import 'package:flutter/material.dart';

extension TimeOfDayExtension on TimeOfDay {
  DayPart get dayPart {
    if (hour >= 5 && hour <= 12) {
      return DayPart.morning;
    }
    if (hour >= 12 && hour <= 17) {
      return DayPart.afternoon;
    } else {
      return DayPart.evening;
    }
  }


  bool isBefore(TimeOfDay time) {
    return hour < time.hour || (hour == time.hour && minute < time.minute);
  }

  bool isAfter(TimeOfDay time) {
    return hour > time.hour || (hour == time.hour && minute > time.minute);
  }

  bool isSame(TimeOfDay time) {
    return hour == time.hour && minute == time.minute;
  }
}

enum DayPart { morning, afternoon, evening }
