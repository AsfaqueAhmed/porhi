import 'package:share_plus/share_plus.dart';

/// Mockable wrapper over `share_plus` so Guardian link sharing can be verified
/// in unit and widget tests without invoking platform share sheets.
abstract class ShareGateway {
  Future<void> shareText(String text, {String? subject});
}

class SharePlusGateway implements ShareGateway {
  @override
  Future<void> shareText(String text, {String? subject}) async {
    await Share.share(text, subject: subject);
  }
}
