import 'package:dio/dio.dart';
import 'package:network/src/network_initializer.dart';

abstract class InterceptorItem {}

class PredefinedInterceptor extends InterceptorItem {
  final NetworkInterceptors interceptor;

  PredefinedInterceptor(this.interceptor);
}

class CustomInterceptor extends InterceptorItem {
  final Interceptor interceptor;

  CustomInterceptor(this.interceptor);
}
