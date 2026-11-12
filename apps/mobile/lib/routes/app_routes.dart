abstract class AppRoutes {
  static const splash = '/splash';
  static const login = '/login';
  static const onboarding = '/onboarding';
  static const account = '/account';
  static const home = '/home';
  static const search = '/search';
  static const subjects = '/subjects';
  static const chapters = '/curriculum/:subjectId';
  static const boardArchive = '/board-archive';
  static const lesson = '/lesson/:topicId';
  static const practice = '/practice/:chapterId';
  static const examSetup = '/exam/setup';
  static const examRunner = '/exam/runner';
  static const examResult = '/exam/result/:sessionId';
  static const exam = '/exam/:chapterId';

  static String chaptersForSubject(String subjectId) =>
      '/curriculum/${Uri.encodeComponent(subjectId)}';

  static String lessonForTopic(String topicId) =>
      '/lesson/${Uri.encodeComponent(topicId)}';

  static String practiceForChapter(String chapterId) =>
      '/practice/${Uri.encodeComponent(chapterId)}';

  static String examForChapter(String chapterId) =>
      '/exam/${Uri.encodeComponent(chapterId)}';

  static String examResultForSession(String sessionId) =>
      '/exam/result/${Uri.encodeComponent(sessionId)}';
}
