abstract class BaseResponseModel<T> {
  String? message;
  T? data;

  BaseResponseModel({this.message, this.data});

  toJson() {}
}
