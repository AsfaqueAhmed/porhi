import 'dart:convert';

import 'package:flutter/foundation.dart';
import 'package:flutter_local_notifications/flutter_local_notifications.dart';
import 'package:get/get.dart';
import 'package:porhi/core/i18n/bangla_digits.dart';
import 'package:porhi/features/dashboard/domain/entities/student_overview_entity.dart';
import 'package:porhi/features/shell/presentation/main_shell/controller/main_shell_controller.dart';
import 'package:porhi/routes/app_routes.dart';
import 'package:timezone/data/latest.dart' as tz_data;
import 'package:timezone/timezone.dart' as tz;

typedef NotificationTapCallback = void Function(String? payload);
typedef ReminderRouteNavigator = Future<void> Function(
  String route, {
  Object? arguments,
});

/// Thin platform gateway interface around [FlutterLocalNotificationsPlugin]
/// so reminder scheduling and cancellation can be unit-tested without platform channels.
abstract class LocalNotificationsGateway {
  Future<void> initialize({
    required NotificationTapCallback onNotificationTap,
    required String channelId,
    required String channelName,
    required String channelDescription,
  });

  Future<bool> requestPermissions();

  Future<void> zonedSchedule({
    required int id,
    required String title,
    required String body,
    required tz.TZDateTime scheduledDate,
    required String payload,
    required String channelId,
    required String channelName,
    required String channelDescription,
  });

  Future<void> cancel(int id);

  Future<void> cancelAll();
}

class FlutterLocalNotificationsGateway implements LocalNotificationsGateway {
  final FlutterLocalNotificationsPlugin _plugin;

  FlutterLocalNotificationsGateway({FlutterLocalNotificationsPlugin? plugin})
      : _plugin = plugin ?? FlutterLocalNotificationsPlugin();

  @override
  Future<void> initialize({
    required NotificationTapCallback onNotificationTap,
    required String channelId,
    required String channelName,
    required String channelDescription,
  }) async {
    const androidInit = AndroidInitializationSettings('@mipmap/ic_launcher');
    const darwinInit = DarwinInitializationSettings(
      requestAlertPermission: false,
      requestBadgePermission: false,
      requestSoundPermission: false,
    );
    const settings = InitializationSettings(
      android: androidInit,
      iOS: darwinInit,
      macOS: darwinInit,
    );

    try {
      await _plugin.initialize(
        settings,
        onDidReceiveNotificationResponse: (response) {
          onNotificationTap(response.payload);
        },
      );
      final androidPlugin =
          _plugin.resolvePlatformSpecificImplementation<
              AndroidFlutterLocalNotificationsPlugin>();
      await androidPlugin?.createNotificationChannel(
        AndroidNotificationChannel(
          channelId,
          channelName,
          description: channelDescription,
          importance: Importance.high,
        ),
      );
    } catch (e) {
      debugPrint('Local notifications initialize skipped safely: $e');
    }
  }

  @override
  Future<bool> requestPermissions() async {
    try {
      final androidPlugin =
          _plugin.resolvePlatformSpecificImplementation<
              AndroidFlutterLocalNotificationsPlugin>();
      final granted = await androidPlugin?.requestNotificationsPermission();
      return granted ?? true;
    } catch (_) {
      return false;
    }
  }

  @override
  Future<void> zonedSchedule({
    required int id,
    required String title,
    required String body,
    required tz.TZDateTime scheduledDate,
    required String payload,
    required String channelId,
    required String channelName,
    required String channelDescription,
  }) async {
    final details = NotificationDetails(
      android: AndroidNotificationDetails(
        channelId,
        channelName,
        channelDescription: channelDescription,
        importance: Importance.high,
        priority: Priority.high,
      ),
      iOS: const DarwinNotificationDetails(),
    );

    try {
      await _plugin.zonedSchedule(
        id,
        title,
        body,
        scheduledDate,
        details,
        androidScheduleMode: AndroidScheduleMode.inexactAllowWhileIdle,
        payload: payload,
      );
    } catch (e) {
      debugPrint('Local notification schedule skipped safely: $e');
    }
  }

  @override
  Future<void> cancel(int id) async {
    try {
      await _plugin.cancel(id);
    } catch (_) {}
  }

  @override
  Future<void> cancelAll() async {
    try {
      await _plugin.cancelAll();
    } catch (_) {}
  }
}

/// Schedules, cancels, and deep-links local study planner reminders.
class LocalReminderScheduler {
  static const String channelId = 'porhi_study_reminders';
  static const String channelName = 'Study Reminders';
  static const String channelDescription =
      'Daily study planner and revision reminders for porhi';
  static const String fallbackTimeZoneName = 'Asia/Dhaka';

  static final RegExp _dateRegex = RegExp(r'^(\d{4})-(\d{2})-(\d{2})$');
  static final RegExp _timeRegex = RegExp(r'^(\d{2}):(\d{2})$');

  final LocalNotificationsGateway _gateway;
  final ReminderRouteNavigator _onNavigate;
  final VoidCallback _onFocusPlanner;

  bool _initialized = false;
  bool _timeZonesInitialized = false;

  LocalReminderScheduler({
    LocalNotificationsGateway? gateway,
    ReminderRouteNavigator? onNavigate,
    VoidCallback? onFocusPlanner,
  })  : _gateway = gateway ?? FlutterLocalNotificationsGateway(),
        _onNavigate = onNavigate ?? _defaultNavigate,
        _onFocusPlanner = onFocusPlanner ?? _defaultFocusPlanner;

  static Future<void> _defaultNavigate(
    String route, {
    Object? arguments,
  }) async {
    if (Get.key.currentState == null) return;
    await Get.toNamed<dynamic>(route, arguments: arguments);
  }

  static void _defaultFocusPlanner() {
    if (Get.isRegistered<MainShellController>()) {
      Get.find<MainShellController>().selectTab(2);
      return;
    }
    if (Get.key.currentState != null) {
      Get.toNamed<dynamic>(AppRoutes.home);
    }
  }

  /// Ensures timezone database is loaded and local location falls back safely
  /// to `Asia/Dhaka` when unavailable.
  tz.Location safeLocalLocation() {
    if (!_timeZonesInitialized) {
      tz_data.initializeTimeZones();
      _timeZonesInitialized = true;
    }
    try {
      final current = tz.local;
      if (current.name == 'UTC') {
        final dhaka = tz.getLocation(fallbackTimeZoneName);
        tz.setLocalLocation(dhaka);
        return dhaka;
      }
      return current;
    } catch (_) {
      try {
        final dhaka = tz.getLocation(fallbackTimeZoneName);
        tz.setLocalLocation(dhaka);
        return dhaka;
      } catch (_) {
        return tz.UTC;
      }
    }
  }

  /// Idempotently initializes timezone data, notification plugin, and Android channel.
  Future<void> initialize({bool requestPermissions = false}) async {
    safeLocalLocation();
    if (!_initialized) {
      _initialized = true;
      await _gateway.initialize(
        onNotificationTap: (payload) {
          handleNotificationPayload(payload);
        },
        channelId: channelId,
        channelName: channelName,
        channelDescription: channelDescription,
      );
    }
    if (requestPermissions) {
      await _gateway.requestPermissions();
    }
  }

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

  /// Derives a deterministic 32-bit positive integer ID from [taskId].
  static int notificationIdForTask(String taskId) {
    var hash = 0x811c9dc5;
    for (final unit in taskId.trim().codeUnits) {
      hash ^= unit;
      hash = (hash * 0x01000193) & 0xFFFFFFFF;
    }
    final positive = hash & 0x7FFFFFFF;
    return positive == 0 ? 1 : positive;
  }

  /// Parses [scheduledDate] (`YYYY-MM-DD`) and [reminderTime] (`HH:mm`),
  /// returning `null` if either is missing/malformed or not after [now] when provided.
  tz.TZDateTime? parseScheduleDateTime({
    required String scheduledDate,
    String? reminderTime,
    tz.Location? location,
    DateTime? now,
  }) {
    final normalizedDate = normalizeYyyyMmDd(scheduledDate);
    if (normalizedDate == null) return null;

    if (reminderTime == null || reminderTime.trim().isEmpty) {
      return null;
    }
    final normalizedTime = normalizeHhMm(reminderTime);
    if (normalizedTime == null) return null;

    final dateParts = normalizedDate.split('-');
    final timeParts = normalizedTime.split(':');
    final year = int.parse(dateParts[0]);
    final month = int.parse(dateParts[1]);
    final day = int.parse(dateParts[2]);
    final hour = int.parse(timeParts[0]);
    final minute = int.parse(timeParts[1]);

    final loc = location ?? safeLocalLocation();
    final scheduled = tz.TZDateTime(loc, year, month, day, hour, minute);

    if (now != null) {
      final nowTz = tz.TZDateTime.from(now, loc);
      if (!scheduled.isAfter(nowTz)) {
        return null;
      }
    }

    return scheduled;
  }

  /// Syncs all planner task reminders with the local notification plugin.
  Future<void> syncTaskReminders(
    List<PlannerTaskSummaryEntity> tasks, {
    bool enabled = true,
    DateTime? now,
  }) async {
    await initialize();
    if (!enabled) {
      await _gateway.cancelAll();
      return;
    }

    final effectiveNow = now ?? DateTime.now();
    final loc = safeLocalLocation();

    for (final task in tasks) {
      final taskId = task.id.trim();
      if (taskId.isEmpty) continue;
      final notificationId = notificationIdForTask(taskId);

      if (task.completed) {
        await _gateway.cancel(notificationId);
        continue;
      }

      final scheduled = parseScheduleDateTime(
        scheduledDate: task.scheduledDate,
        reminderTime: task.reminderTime,
        location: loc,
        now: effectiveNow,
      );

      if (scheduled == null) {
        await _gateway.cancel(notificationId);
        continue;
      }

      final payload = jsonEncode(<String, dynamic>{
        'taskId': taskId,
        'targetType': task.targetType,
        'subjectId': task.subjectId,
        'chapterId': task.chapterId,
        'topicId': task.topicId,
      });

      final title = task.titleBangla.trim().isNotEmpty
          ? 'পড়ি — স্টাডি রিমাইন্ডার'
          : 'porhi — Study Reminder';

      await _gateway.zonedSchedule(
        id: notificationId,
        title: title,
        body: task.titleBangla.trim(),
        scheduledDate: scheduled,
        payload: payload,
        channelId: channelId,
        channelName: channelName,
        channelDescription: channelDescription,
      );
    }
  }

  /// Cancels any scheduled reminder for [taskId].
  Future<void> cancelTaskReminder(String taskId) async {
    final trimmed = taskId.trim();
    if (trimmed.isEmpty) return;
    await initialize();
    await _gateway.cancel(notificationIdForTask(trimmed));
  }

  /// Safely parses a tapped notification [payload] and deep-links to the target screen.
  Future<void> handleNotificationPayload(String? payload) async {
    if (payload == null || payload.trim().isEmpty) return;
    Map<String, dynamic> data;
    try {
      final decoded = jsonDecode(payload);
      if (decoded is! Map) return;
      data = Map<String, dynamic>.from(decoded);
    } catch (_) {
      return;
    }

    final targetType =
        data['targetType']?.toString().trim().toUpperCase() ?? '';
    final subjectId = data['subjectId']?.toString().trim() ?? '';
    final chapterId = data['chapterId']?.toString().trim() ?? '';
    final topicId = data['topicId']?.toString().trim() ?? '';

    switch (targetType) {
      case 'LESSON':
        if (topicId.isNotEmpty) {
          await _onNavigate(AppRoutes.lessonForTopic(topicId));
          return;
        }
        break;
      case 'PRACTICE':
      case 'REVISION':
        if (chapterId.isNotEmpty) {
          await _onNavigate(AppRoutes.practiceForChapter(chapterId));
          return;
        }
        break;
      case 'MODEL_TEST':
        if (chapterId.isNotEmpty) {
          await _onNavigate(AppRoutes.examForChapter(chapterId));
          return;
        }
        if (subjectId.isNotEmpty) {
          await _onNavigate(
            AppRoutes.examSetup,
            arguments: <String, dynamic>{
              'subjectId': subjectId,
              'testType': 'SUBJECT_TEST',
            },
          );
          return;
        }
        break;
    }

    _onFocusPlanner();
  }
}
