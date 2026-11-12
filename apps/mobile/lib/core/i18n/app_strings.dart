import 'package:porhi/core/i18n/bangla_digits.dart';

/// Supported bilingual UI languages for porhi.
enum AppLanguage {
  bn,
  en;

  String get code => name;

  static AppLanguage fromCode(String? code) {
    return code == 'en' ? AppLanguage.en : AppLanguage.bn;
  }
}

/// Bilingual Bengali/English UI strings and formatting helpers for porhi.
class AppStrings {
  static const Map<String, ({String bn, String en})> _translations = {
    'app.name': (bn: 'পড়ি', en: 'porhi'),
    'app.tagline': (
      bn: 'বাংলাদেশ কারিকুলামভিত্তিক স্মার্ট লার্নিং',
      en: 'Smart Learning for Bangladesh Curriculum',
    ),
    'nav.home': (bn: 'হোম', en: 'Home'),
    'nav.subjects': (bn: 'বিষয়সমূহ', en: 'Subjects'),
    'nav.planner': (bn: 'প্ল্যানার', en: 'Planner'),
    'nav.progress': (bn: 'অগ্রগতি', en: 'Progress'),
    'nav.account': (bn: 'অ্যাকাউন্ট', en: 'Account'),
    'action.save': (bn: 'সংরক্ষণ করুন', en: 'Save'),
    'action.cancel': (bn: 'বাতিল', en: 'Cancel'),
    'action.confirm': (bn: 'নিশ্চিত করুন', en: 'Confirm'),
    'action.retry': (bn: 'আবার চেষ্টা করুন', en: 'Retry'),
    'action.login': (bn: 'লগইন', en: 'Login'),
    'action.logout': (bn: 'লগআউট', en: 'Logout'),
    'action.submit': (bn: 'জমা দিন', en: 'Submit'),
    'action.continue': (bn: 'চালিয়ে যান', en: 'Continue'),
    'common.loading': (bn: 'লোড হচ্ছে...', en: 'Loading...'),
    'common.noData': (bn: 'কোনো তথ্য পাওয়া যায়নি', en: 'No data found'),
    'common.language': (bn: 'ভাষা', en: 'Language'),
    'common.offline': (bn: 'অফলাইন মোড', en: 'Offline mode'),
  };

  /// Returns the localized app brand name (`পড়ি` in Bengali, `porhi` in English).
  static String appName(AppLanguage lang) => t('app.name', lang);

  /// Looks up a translation key in [lang], falling back to Bengali or [key].
  static String t(String key, AppLanguage lang) {
    final entry = _translations[key];
    if (entry == null) return key;
    return lang == AppLanguage.en ? entry.en : entry.bn;
  }

  /// Inline bilingual helper matching `apps/web`'s `tr(bn, en, lang)`.
  static String tr(String bn, String en, AppLanguage lang) {
    return lang == AppLanguage.en ? en : bn;
  }

  /// Formats numbers/digits in Bengali or ASCII depending on [lang].
  static String formatNumber(Object value, AppLanguage lang) {
    return lang == AppLanguage.bn ? toBanglaDigits(value) : toAsciiDigits(value);
  }
}
