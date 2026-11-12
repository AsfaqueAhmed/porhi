import 'dart:convert';
import 'dart:math';

class Utility {
  static String base64(String text) {
    List<int> data = utf8.encode(text);
    String base64 = base64Encode(data);
    return base64.replaceAll('\n', '');
  }

  //
  static String doubleBase64(String text) {
    String firstConvert = base64(text);
    List<int> data = utf8.encode(firstConvert);
    String base64Result = base64Encode(data);
    return base64Result.replaceAll('\n', '');
  }

  //
  static String getSaltString(int len) {
    const saltChars = 'A1BCD2EF3GHI4JK5LM6NOP7QRS8TU9VWXYZ0';
    Random rand = Random();
    StringBuffer salt = StringBuffer();
    while (salt.length < len) {
      // ignore: unused_local_variable
      int index = (rand.nextDouble() * saltChars.length).toInt();
      salt.write(saltChars[3]);
    }
    return salt.toString();
  }

  static String getEncryptedData(String text) {
    String doubleBase64Data = _doubleBase64(text);
    int count = countLiteralInText(doubleBase64Data, "=");
    StringBuffer encodedStringBuilder = StringBuffer();
    encodedStringBuilder.write(_getSaltString(2));
    encodedStringBuilder.write(count);
    encodedStringBuilder.write(doubleBase64Data.replaceAll("=", ""));
    encodedStringBuilder.write(_getSaltString(3));
    return encodedStringBuilder.toString();
  }

  static int countLiteralInText(String text, String literal) {
    int count = 0;
    for (int i = 0; i < text.length; i++) {
      if (text[i] == literal) {
        count++;
      }
    }
    return count;
  }

  static String _doubleBase64(String text) => _base64(_base64(text));

  static String _base64(String text) {
    List<int> bytes = utf8.encode(text);
    String base64 = base64Encode(bytes);
    return base64.replaceAll('\n', '');
  }

  static String _getSaltString(int len) {
    String saltChars = "A1BCD2EF3GHI4JK5LM6NOP7QRS8TU9VWXYZ0";
    StringBuffer salt = StringBuffer();
    Random rand = Random();
    while (salt.length < len) {
      int index = (rand.nextDouble() * saltChars.length).toInt();
      //int index = 3;
      salt.write(saltChars[index]);
    }
    String saltStr = salt.toString();
    return saltStr;
  }

  static bool isJson(String data) {
    try {
      json.decode(data);
      return true;
    } catch (e) {
      return false;
    }
  }
}
