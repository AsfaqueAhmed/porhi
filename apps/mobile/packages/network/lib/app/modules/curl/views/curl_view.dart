import 'package:common/common.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:network/app/core/extenstions.dart';
import 'package:network/app/modules/curl/controllers/curl_controller.dart';
import 'package:network/app/modules/curl_details/views/curl_details_view.dart';
import 'package:network/src/api/models/api_log.dart';

class CurlView extends StatelessWidget {
  const CurlView({super.key});

  @override
  Widget build(BuildContext context) {
    final controller = CurlController.instance;

    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppBar(
        title: const Text('Api Logs'),
        centerTitle: true,
        backgroundColor: Colors.white,
        surfaceTintColor: Colors.white,
        actions: [
          TextButton(
            onPressed: controller.clearLogs,
            child: const Text(
              'Clear',
              style: TextStyle(
                color: Colors.red,
                fontSize: 16,
              ),
            ),
          ),
        ],
      ),
      body: Padding(
        padding: const EdgeInsets.symmetric(vertical: 16),
        child: AnimatedBuilder(
          animation: controller,
          builder: (_, __) {
            return ListView.builder(
              itemCount: controller.logs.length,
              itemBuilder: (_, index) {
                final log = controller.logs[index];
                return CurlViewCard(
                  log: log,
                  onTap: () {
                    Navigator.of(context).push(
                      MaterialPageRoute(
                        builder: (_) => CurlDetailsView(log: log),
                      ),
                    );
                  },
                );
              },
            );
          },
        ),
      ),
    );
  }
}

class CurlViewCard extends StatelessWidget {
  final ApiLog log;
  final Function() onTap;

  const CurlViewCard({super.key, required this.log, required this.onTap});

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Card(
        margin: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
        elevation: 1,
        color: Colors.white,
        child: Padding(
          padding: const EdgeInsets.all(12),
          child: Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Status Icon or Loader
              Column(
                children: [
                  log.isLoading
                      ? const SizedBox(
                          width: 24,
                          height: 24,
                          child: CircularProgressIndicator(strokeWidth: 2),
                        )
                      : Icon(
                          _isSuccess() ? Icons.check_circle : Icons.error,
                          color: _isSuccess() ? Colors.green : Colors.red,
                        ),
                  const SizedBox(height: 4),
                  isTokenAvailable()
                      ? const Icon(Icons.person)
                      : const SizedBox(),
                ],
              ),
              const SizedBox(width: 12),

              // Text Info
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    // Method & URL
                    Row(
                      children: [
                        Text(
                          log.method,
                          style: const TextStyle(
                            fontSize: 14,
                            fontWeight: FontWeight.w600,
                          ),
                          maxLines: 1,
                          overflow: TextOverflow.ellipsis,
                        ),
                        const Spacer(),
                        Text(
                          log.startTime.toHHMMSS,
                          style: const TextStyle(
                            fontSize: 14,
                            fontWeight: FontWeight.w600,
                          ),
                          maxLines: 1,
                          overflow: TextOverflow.ellipsis,
                        ),
                      ],
                    ),
                    const SizedBox(height: 8),
                    Row(
                      children: [
                        Expanded(
                          child: Text(
                            log.url,
                            style: const TextStyle(
                              fontSize: 14,
                              fontWeight: FontWeight.w600,
                            ),
                          ),
                        ),
                        IconButton(
                          onPressed: () {
                            Clipboard.setData(ClipboardData(text: log.curl));
                            CustomToast.show(message: "Curl copied");
                          },
                          icon: const Icon(Icons.copy),
                        ),
                      ],
                    ),
                    const SizedBox(height: 8),
                    // Status or Loading
                    Row(
                      children: [
                        Text(
                          log.isLoading
                              ? "Loading..."
                              : "Status: ${log.statusCode}",
                          style: TextStyle(
                            fontSize: 12,
                            color: Colors.grey[600],
                          ),
                        ),
                        const Spacer(),
                        Text(
                          log.isLoading
                              ? "Loading..."
                              : "Time: ${log.endTime?.difference(log.startTime).inMilliseconds} ms",
                          style: TextStyle(
                            fontSize: 12,
                            color: Colors.grey[600],
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  bool _isSuccess() {
    if (log.statusCode != null &&
        log.statusCode! >= 200 &&
        log.statusCode! < 300) {
      return true;
    }
    return false;
  }

  bool isTokenAvailable() {
    if (log.requestHeaders['Authorization']?.contains('Bearer') == true) {
      return true;
    }
    return false;
  }
}
