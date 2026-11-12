class BaseWrapperModel {
  late Map<String, dynamic> data;

  BaseWrapperModel(dynamic response) {
    data = {
      "json": response,
    };
  }
}
