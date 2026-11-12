import 'dart:convert';

import 'package:common/common.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_json_viewer/flutter_json_viewer.dart';

import 'package:network/src/api/models/api_log.dart';

class CurlDetailsView extends StatelessWidget {
  final ApiLog log;

  const CurlDetailsView({super.key, required this.log});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppBar(
        automaticallyImplyLeading: true,
        title: const Text('Log Details'),
        centerTitle: true,
        backgroundColor: Colors.white,
        surfaceTintColor: Colors.white,
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          children: [
            ResponseCard(
              title: 'Request',
              data: log.curl,
            ),
            const SizedBox(height: 20),
            ResponseCard(
              title: 'Response',
              data: log.responseData,
            ),
          ],
        ),
      ),
    );
  }
}

class ResponseCard extends StatelessWidget {
  final String title;
  final dynamic data;

  const ResponseCard({super.key, required this.title, this.data});

  @override
  Widget build(BuildContext context) {
    return Card(
      color: Colors.white,
      child: Padding(
        padding: const EdgeInsets.all(12),
        child: Column(
          children: [
            Row(
              children: [
                Text(
                  title,
                  style: const TextStyle(
                      fontSize: 16, fontWeight: FontWeight.w700),
                ),
                const Spacer(),
                IconButton(
                  onPressed: () {
                    if (data == null) return;
                    String clipBoardText;
                    if (data is String) {
                      clipBoardText = data;
                    } else {
                      clipBoardText = jsonEncode(data);
                    }
                    Clipboard.setData(ClipboardData(text: clipBoardText));
                    CustomToast.show(message: "$title copied");
                  },
                  icon: const Icon(Icons.copy),
                ),
              ],
            ),
            const SizedBox(height: 4),
            showData(),
          ],
        ),
      ),
    );
  }

  Widget showData() {
    if (data is Map || data is List) {
      return JsonViewer(data);
    } else {
      return Text(data ?? '');
    }
  }
}
