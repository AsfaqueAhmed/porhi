import 'dart:math';

extension NumExtension on num {
  addCurrencySplitter([int? decimalLength]) {
    String ext = "";
    if (toString().contains(".")) {
      ext = toStringAsFixed(decimalLength ?? 2).split(".").last;
      if ((int.tryParse(ext) ?? 0) == 0) ext = "";
    }
    String absPart = toString().split(".").first;

    String result = "";
    for (int i = 0; i < absPart.length; i++) {
      if (i % 3 == 0 && result.isNotEmpty) {
        result = ",$result";
      }
      result = "${absPart[absPart.length - i - 1]}$result";
    }
    return "$result${ext.isEmpty && decimalLength==null? "" : ".${ext.isEmpty?ext.padLeft(decimalLength??0,"0"):ext.substring(0, min(2, ext.length))}"}";
  }
}
