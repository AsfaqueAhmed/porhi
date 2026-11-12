import 'dart:convert';

import 'package:common/common.dart';
import 'package:network/src/api/models/base_response.dart';

class StorageService extends BaseStorageService {
  saveResponse(Map<String, dynamic> json, String endPoint) {
    write(endPoint, jsonEncode(json));
  }

  T? getStoredResponse<T extends BaseResponseModel>(
      String endPoint, T? Function(Map<String, dynamic> json) compiler) {
    try {
      String? storedData = read(endPoint);
      if (storedData != null) {
        return compiler(jsonDecode(storedData));
      }
      return null;
    } catch (e) {
      return null;
    }
  }
}
