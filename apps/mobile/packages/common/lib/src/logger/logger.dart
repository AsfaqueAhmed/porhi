import 'dart:convert';
import 'dart:developer';

import 'package:common/common.dart';

class _Logger {
  _Logger();

  String logLocation() {
    final stackTrace = StackTrace.current.toString().split('\n');
    if (stackTrace.length > 3) {
      String log=stackTrace[3].trim();

      // Regular expression to match the package path and line information
      RegExp regex = RegExp(r'\(package:[^\)]+\)');

      // Extract the match
      Match? match = regex.firstMatch(log);
      if (match != null) {
        // Remove the surrounding parentheses
        String result = match.group(0)!.substring(1, match.group(0)!.length - 1);
        return 'Location: $result';
      } else {
        return ('Location: Caller location not found');
      }

    } else {
      return ('Location: Caller location not found');
    }
  }

  void logInfo(String message) {
    log(
      "${logLocation()}\n$message",
      name: 'INFO',
      level: 0,
    );
  }

  void logWarning(String message) {
    log(
      "${logLocation()}\n$message",
      name: 'WARNING',
      level: 900,
    );
  }

  void logError(String message, [StackTrace? stackTrace]) {
    log("${logLocation()}\n$message",
        name: 'ERROR', level: 1000, error: message, stackTrace: stackTrace);
  }
}

var logger = _Logger();

logInfo(dynamic message) {
  if (Common.isInitiated() && Common.loggerEnabled) {
    //logger.logLocation();
    if (message is String) {
      logger.logInfo(message);
    } else if (message is Map<String, dynamic>) {
      logger.logInfo(jsonEncode(message));
    } else {
      logger.logInfo(message.toString());
    }
  }
}

logWarning(dynamic message) {
  if (Common.isInitiated() && Common.loggerEnabled) {
    //logger.logLocation();
    if (message is String) {
      logger.logWarning(message);
    } else if (message is Map<String, dynamic>) {
      logger.logWarning(jsonEncode(message));
    } else {
      logger.logWarning(message.toString());
    }
  }
}

logError(dynamic message, [StackTrace? stackTrace]) {
  if (Common.isInitiated() && Common.loggerEnabled) {
    //logger.logLocation();
    if (message is String) {
      logger.logError(message, stackTrace);
    } else if (message is Map<String, dynamic>) {
      logger.logError(jsonEncode(message), stackTrace);
    } else {
      logger.logError(message.toString(), stackTrace);
    }
  }
}
