import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:porhi/app/env.dart';
import 'package:porhi/core/i18n/app_strings.dart';
import 'package:porhi/features/auth/domain/usecases/auth_usecases.dart';
import 'package:porhi/features/curriculum/domain/usecases/curriculum_usecases.dart';
import 'package:porhi/features/dashboard/domain/usecases/student_usecases.dart';
import 'package:porhi/features/exam/domain/entities/exam_entities.dart';
import 'package:porhi/features/exam/domain/usecases/exam_usecases.dart';
import 'package:porhi/routes/app_routes.dart';

class ExamResultController extends GetxController {
  final GetExamSessionUseCase _getExamSessionUseCase;
  final GetCachedChaptersUseCase _getCachedChaptersUseCase;
  final GetCachedUserUseCase _getCachedUserUseCase;
  final GetActiveSubjectIdUseCase _getActiveSubjectIdUseCase;
  final GetLanguageUseCase _getLanguageUseCase;
  final EnvConfig? envConfig;

  ExamResultController({
    required this._getExamSessionUseCase,
    required this._getCachedChaptersUseCase,
    required this._getCachedUserUseCase,
    required this._getActiveSubjectIdUseCase,
    required this._getLanguageUseCase,
    this.envConfig,
  });

  final ScrollController scrollController = ScrollController();

  final Rx<AppLanguage> language = AppLanguage.bn.obs;
  final RxString sessionId = ''.obs;
  final RxString headerTitle = ''.obs;
  final RxBool isLoading = false.obs;
  final RxnString errorMessage = RxnString();
  final Rxn<ExamResultEntity> result = Rxn<ExamResultEntity>();
  final RxSet<String> expandedExplanationIds = <String>{}.obs;

  String _tryDecodeUriComponent(String raw) {
    try {
      return Uri.decodeComponent(raw);
    } on ArgumentError {
      return raw;
    }
  }

  @override
  void onInit() {
    super.onInit();
    language.value = AppLanguage.fromCode(_getLanguageUseCase());

    final rawSessionId = Get.parameters['sessionId']?.trim();
    if (rawSessionId != null && rawSessionId.isNotEmpty) {
      sessionId.value = _tryDecodeUriComponent(rawSessionId);
    }

    final args =
        Get.arguments is ExamResultArgs ? Get.arguments as ExamResultArgs : null;
    if (args?.title != null && args!.title!.trim().isNotEmpty) {
      headerTitle.value = args.title!.trim();
    }

    if (args?.preloadedResult != null) {
      result.value = args!.preloadedResult;
      if (sessionId.value.isEmpty) {
        sessionId.value = args.preloadedResult!.sessionId;
      }
      _resolveChapterTitle(args.preloadedResult!);
      return;
    }

    loadSession();
  }

  Future<void> loadSession() async {
    if (isLoading.value) return;
    final id = sessionId.value.trim();
    final lang = language.value;
    if (id.isEmpty) {
      errorMessage.value = AppStrings.tr(
        'সেশন আইডি পাওয়া যায়নি।',
        'Session ID not found.',
        lang,
      );
      return;
    }

    isLoading.value = true;
    errorMessage.value = null;

    try {
      final res = await _getExamSessionUseCase(id);
      if (isClosed) return;

      res.fold(
        (err) {
          errorMessage.value = resolveExamErrorMessage(
            err.message,
            AppStrings.tr(
              'পরীক্ষার ফলাফল লোড করা যায়নি।',
              'Could not load exam result.',
              lang,
            ),
          );
        },
        (data) {
          result.value = data;
          _resolveChapterTitle(data);
        },
      );
    } finally {
      if (!isClosed) {
        isLoading.value = false;
      }
    }
  }

  Future<void> _resolveChapterTitle(ExamResultEntity data) async {
    if (headerTitle.value.isNotEmpty) return;
    final subject = data.subjectId.isNotEmpty
        ? data.subjectId
        : _getActiveSubjectIdUseCase(_getCachedUserUseCase()?.selectedClass);
    if (data.chapterId == null || data.chapterId!.isEmpty || subject.isEmpty) {
      return;
    }
    try {
      final chapters = await _getCachedChaptersUseCase(subject);
      if (isClosed) return;
      for (final ch in chapters) {
        if (ch.id == data.chapterId) {
          headerTitle.value = ch.titleBangla;
          break;
        }
      }
    } catch (_) {
      // Best-effort title lookup.
    }
  }

  void toggleExplanation(String questionId) {
    if (expandedExplanationIds.contains(questionId)) {
      expandedExplanationIds.remove(questionId);
    } else {
      expandedExplanationIds.add(questionId);
    }
  }

  void retakeExam() {
    final res = result.value;
    if (res == null) {
      Get.back<void>();
      return;
    }
    final targetChapterParam = res.testType == ExamTestType.subjectTest ||
            res.chapterId == null ||
            res.chapterId!.isEmpty
        ? 'subject_${res.subjectId}'
        : res.chapterId!;
    Get.offNamed(
      AppRoutes.examForChapter(targetChapterParam),
      arguments: ExamSetupRouteArgs(
        subjectId: res.subjectId,
        chapterId: res.chapterId,
        chapterTitle: headerTitle.value.isNotEmpty ? headerTitle.value : null,
        testType: res.testType,
      ),
    );
  }

  void goBackToChapterOrSubjects() {
    if (Get.key.currentState?.canPop() == true ||
        Get.previousRoute.isNotEmpty) {
      Get.back<void>();
      return;
    }
    final res = result.value;
    if (res != null && res.subjectId.isNotEmpty) {
      Get.offNamed(AppRoutes.chaptersForSubject(res.subjectId));
      return;
    }
    Get.back<void>();
  }

  @override
  void onClose() {
    scrollController.dispose();
    super.onClose();
  }
}
