import 'package:flutter_test/flutter_test.dart';
import 'package:network/network.dart';

void main() {
  test('ErrorResponse.byErrorType creates a typed error response', () {
    final response = ErrorResponse.byErrorType(
      errorType: ApiResponseErrorType.noInternet,
    );
    expect(response.data, ApiResponseErrorType.noInternet);
    expect(response.message, 'Please connect to internet');
  });
}
