extension StringExtension on String {
  String splitOnCap() {
    return replaceAllMapped(
      RegExp(r'(?<!^)(?=[A-Z])'),
      (match) => ' ',
    );
  }
}
