import 'dart:async';

import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:network/network.dart' show ErrorResponse;
import 'package:porhi/core/i18n/app_strings.dart';
import 'package:porhi/features/auth/domain/entities/auth_user_entity.dart';
import 'package:porhi/features/auth/domain/usecases/auth_usecases.dart';
import 'package:porhi/features/curriculum/domain/entities/curriculum_entities.dart';
import 'package:porhi/features/curriculum/domain/usecases/curriculum_usecases.dart';
import 'package:porhi/features/dashboard/presentation/dashboard/controller/dashboard_controller.dart';

class SubjectsController extends GetxController {
  final GetSubjectsUseCase _getSubjectsUseCase;
  final GetCachedSubjectsUseCase _getCachedSubjectsUseCase;
  final FilterSubjectsUseCase _filterSubjectsUseCase;
  final GetDownloadedChaptersUseCase _getDownloadedChaptersUseCase;
  final GetActiveCurriculumSubjectUseCase _getActiveSubjectUseCase;
  final SetActiveCurriculumSubjectUseCase _setActiveSubjectUseCase;
  final GetCachedUserUseCase _getCachedUserUseCase;
  final GetLanguageUseCase _getLanguageUseCase;

  SubjectsController({
    required this._getSubjectsUseCase,
    required this._getCachedSubjectsUseCase,
    required this._filterSubjectsUseCase,
    required this._getDownloadedChaptersUseCase,
    required this._getActiveSubjectUseCase,
    required this._setActiveSubjectUseCase,
    required this._getCachedUserUseCase,
    required this._getLanguageUseCase,
  });

  final TextEditingController searchController = TextEditingController();

  final Rx<AppLanguage> language = AppLanguage.bn.obs;
  final Rxn<StudentTrack> selectedTrackFilter = Rxn<StudentTrack>();
  final RxString searchQuery = ''.obs;
  final RxString activeSubjectId = 'sub_ssc_physics'.obs;

  final RxList<SubjectEntity> allSubjects = <SubjectEntity>[].obs;
  final RxList<SubjectEntity> filteredSubjects = <SubjectEntity>[].obs;
  final RxList<DownloadedChapterEntity> downloadedChapters =
      <DownloadedChapterEntity>[].obs;

  final RxBool isLoading = false.obs;
  final RxBool isOfflineCache = false.obs;
  final RxnString errorMessage = RxnString();

  int _loadGeneration = 0;

  @override
  void onInit() {
    super.onInit();
    refreshPreferences();
    loadSubjects();
  }

  void refreshPreferences() {
    language.value = AppLanguage.fromCode(_getLanguageUseCase());
    final user = _getCachedUserUseCase();
    activeSubjectId.value = _getActiveSubjectUseCase(user?.selectedClass);
  }

  Future<void> refreshDownloadedChapters() async {
    final chapters = await _getDownloadedChaptersUseCase();
    if (isClosed) return;
    downloadedChapters.assignAll(chapters);
  }

  Future<void> loadSubjects() async {
    final generation = ++_loadGeneration;
    isLoading.value = true;
    errorMessage.value = null;

    try {
      final downloadedFuture = _getDownloadedChaptersUseCase();
      final cachedSubjects = await _getCachedSubjectsUseCase();
      if (isClosed || generation != _loadGeneration) return;

      if (cachedSubjects.isNotEmpty && allSubjects.isEmpty) {
        allSubjects.assignAll(cachedSubjects);
        isOfflineCache.value = true;
        _applyFilters();
      }

      final downloaded = await downloadedFuture;
      if (isClosed || generation != _loadGeneration) return;
      downloadedChapters.assignAll(downloaded);

      final result = await _getSubjectsUseCase();
      if (isClosed || generation != _loadGeneration) return;

      result.fold(
        (err) {
          if (allSubjects.isEmpty) {
            errorMessage.value = _resolveErrorMessage(
              err,
              fallbackBn: 'বিষয়ের তালিকা লোড করা যায়নি। আবার চেষ্টা করুন।',
              fallbackEn: 'Could not load subject catalog. Please try again.',
            );
          }
        },
        (subjects) {
          allSubjects.assignAll(subjects);
          isOfflineCache.value =
              subjects.isNotEmpty && subjects.every((s) => s.isFromCache);
          _applyFilters();
        },
      );
    } finally {
      if (!isClosed && generation == _loadGeneration) {
        isLoading.value = false;
      }
    }
  }

  void selectTrackFilter(StudentTrack? track) {
    if (selectedTrackFilter.value != track) {
      selectedTrackFilter.value = track;
      _applyFilters();
    }
  }

  void onSearchQueryChanged(String value) {
    searchQuery.value = value;
    _applyFilters();
  }

  void clearSearchQuery() {
    if (searchController.text.isNotEmpty) {
      searchController.clear();
    }
    if (searchQuery.value.isNotEmpty) {
      searchQuery.value = '';
      _applyFilters();
    }
  }

  void _applyFilters() {
    final filtered = _filterSubjectsUseCase(
      subjects: allSubjects,
      trackFilter: selectedTrackFilter.value,
      query: searchQuery.value,
    );
    filteredSubjects.assignAll(filtered);
  }

  /// Persists [subject] as active and syncs [DashboardController] before navigation.
  Future<bool> selectSubject(SubjectEntity subject) async {
    if (!subject.isReady) return false;
    await _setActiveSubjectUseCase(subject.id);
    if (isClosed) return false;
    activeSubjectId.value = subject.id;
    if (Get.isRegistered<DashboardController>()) {
      unawaited(Get.find<DashboardController>().refreshLanguageAndUser());
    }
    return true;
  }

  int downloadedCountForSubject(String subjectId) {
    return downloadedChapters.where((c) => c.subjectId == subjectId).length;
  }

  String _resolveErrorMessage(
    ErrorResponse err, {
    required String fallbackBn,
    required String fallbackEn,
  }) {
    final message = err.message?.trim();
    if (message != null && message.isNotEmpty) {
      return message;
    }
    return AppStrings.tr(fallbackBn, fallbackEn, language.value);
  }

  @override
  void onClose() {
    searchController.dispose();
    super.onClose();
  }
}
