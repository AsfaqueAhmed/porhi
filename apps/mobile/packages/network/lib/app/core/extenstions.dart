import 'package:intl/intl.dart';

extension DateTimeExtension on DateTime {
  String get toHHMMSS => DateFormat('HH:mm:ss').format(this);
}
