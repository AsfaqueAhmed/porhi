const _banglaDigitMap = <String, String>{
  '0': '০',
  '1': '১',
  '2': '২',
  '3': '৩',
  '4': '৪',
  '5': '৫',
  '6': '৬',
  '7': '৭',
  '8': '৮',
  '9': '৯',
};

const _asciiDigitMap = <String, String>{
  '০': '0',
  '১': '1',
  '২': '2',
  '৩': '3',
  '৪': '4',
  '৫': '5',
  '৬': '6',
  '৭': '7',
  '৮': '8',
  '৯': '9',
};

/// Converts ASCII numerals `0-9` in [input] to Bengali numerals `০-৯`.
String toBanglaDigits(Object input) {
  final raw = input.toString();
  final buffer = StringBuffer();
  for (var i = 0; i < raw.length; i++) {
    final ch = raw[i];
    buffer.write(_banglaDigitMap[ch] ?? ch);
  }
  return buffer.toString();
}

/// Converts Bengali numerals `০-৯` in [input] to ASCII numerals `0-9`.
String toAsciiDigits(Object input) {
  final raw = input.toString();
  final buffer = StringBuffer();
  for (var i = 0; i < raw.length; i++) {
    final ch = raw[i];
    buffer.write(_asciiDigitMap[ch] ?? ch);
  }
  return buffer.toString();
}
