import 'dart:async';
import 'dart:convert';

import 'dart:io' as io;
import 'dart:math';
import 'dart:typed_data';

import 'package:common/common.dart';

class WebSocketConnector2 {
  final Function(String) onClose;
  final String webSocketUrl;
  final int maxRetries;
  final Duration initialRetryDelay;
  final double backoffFactor;

  WebSocketConnector2.init({
    required this.onClose,
    required this.webSocketUrl,
    this.maxRetries = 5,
    this.initialRetryDelay = const Duration(seconds: 1),
    this.backoffFactor = 2.0,
  }) {
    _connect();
  }

  late io.WebSocket _channel;
  bool isOpened = false;
  bool _isConnecting = false;
  bool _shouldClose = false;
  int _retryCount = 0;

  String data = "";

  final StreamController<Uint8List> _controller = StreamController<Uint8List>();

  get sink => _controller.sink;

  bool get isConnected => isOpened && !_isConnecting;

  _connect() async {
    if (_isConnecting || _shouldClose) {
      return;
    }

    _isConnecting = true;
    try {
      _channel = await io.WebSocket.connect(webSocketUrl,
          headers: {"connection": "keep-alive"});

      isOpened = true;
      _retryCount = 0;
      _isConnecting = false;

      _listenToWebSocket();
    } catch (e) {
      isOpened = false;
      _isConnecting = false;

      if (!_shouldClose && _retryCount < maxRetries) {
        final delay = _calculateBackoffDelay(_retryCount);
        logInfo(
            'WebSocket connection failed, retrying in ${delay.inSeconds}s (attempt ${_retryCount + 1}/$maxRetries)');
        _retryCount++;
        await Future.delayed(delay);
        _connect();
      } else {
        logError('WebSocket connection failed after $maxRetries retries: $e');
      }
    }
  }

  Duration _calculateBackoffDelay(int retryCount) {
    final exponentialDelay =
        initialRetryDelay.inMilliseconds * pow(backoffFactor, retryCount);
    return Duration(
        milliseconds: exponentialDelay.toInt().clamp(0, 30000)); // Max 30s
  }

  _listenToWebSocket() {
    _channel.listen((data) {
      try {
        if (data is String) {
          this.data = jsonDecode(data).first['transcript'];
        }
        if (data is List) {
          this.data = data.first['transcript'];
        }
        logInfo(data);
        onClose(this.data);
      } catch (e) {
        logError('Error processing WebSocket data: $e');
      }
    }, onDone: () {
      isOpened = false;

      // Reconnect if it wasn't an intentional close
      if (!_shouldClose && _retryCount < maxRetries) {
        logInfo('WebSocket closed, attempting to reconnect...');
        _connect();
      }
    }, onError: (error) {
      isOpened = false;
      logError('WebSocket error: $error');

      // Reconnect on error unless intentional close
      if (!_shouldClose && _retryCount < maxRetries) {
        logInfo('WebSocket error occurred, attempting to reconnect...');
        _connect();
      }
    });

    _controller.stream.listen((data) {
      sendStream(data);
    });
  }

  sendStream(Uint8List message) {
    if (isOpened) {
      try {
        _channel.add(message);
      } catch (e) {
        logError('Error sending WebSocket message: $e');
        // Attempt to reconnect on send error
        if (!_shouldClose && _retryCount < maxRetries) {
          _connect();
        }
      }
    }
  }

  start() {
    if (isOpened) {
      try {
        _channel.add(jsonEncode({
          "command": "start",
          "language": "en-US",
          "sampleRate": 16000,
        }));
      } catch (e) {
        logError('Error sending start command: $e');
      }
    }
  }

  stop() {
    if (isOpened) {
      try {
        _channel.add(jsonEncode({"command": "stop"}));
      } catch (e) {
        logError('Error sending stop command: $e');
      }
    }
  }

  dispose() {
    _shouldClose = true;
    _isConnecting = false;
    try {
      _channel.close();
    } catch (e) {
      logError('Error closing WebSocket: $e');
    }
    isOpened = false;
  }
}
