import 'dart:async';
import 'dart:math';

import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:porhi/app/env.dart';
import 'package:porhi/core/i18n/app_strings.dart';
import 'package:porhi/features/auth/domain/usecases/auth_usecases.dart';
import 'package:porhi/features/board_archive/domain/entities/board_archive_entities.dart';
import 'package:porhi/features/board_archive/domain/usecases/board_archive_usecases.dart';
import 'package:porhi/features/dashboard/domain/usecases/student_usecases.dart';
import 'package:porhi/features/practice/domain/entities/practice_entities.dart';
import 'package:porhi/features/practice/domain/usecases/practice_usecases.dart';

class BoardArchiveController extends GetxController {
  static const int defaultLimit = 15;
  static const List<int> fallbackYears = <int>[
    2025,
    2024,
    2023,
    2022,
    2021,
    2020,
  ];

  final GetBoardArchiveFiltersUseCase _getFiltersUseCase;
  final GetBoardArchiveQuestionsUseCase _getQuestionsUseCase;
  final SubmitCqSelfAssessUseCase _submitCqSelfAssessUseCase;
  final ToggleBookmarkUseCase _toggleBookmarkUseCase;
  final GetLanguageUseCase _getLanguageUseCase;
  final EnvConfig? envConfig;

  BoardArchiveController({
    required this._getFiltersUseCase,
    required this._getQuestionsUseCase,
    required this._submitCqSelfAssessUseCase,
    required this._toggleBookmarkUseCase,
    required this._getLanguageUseCase,
    this.envConfig,
  });

  final TextEditingController searchController = TextEditingController();
  final ScrollController scrollController = ScrollController();

  final Rx<AppLanguage> language = AppLanguage.bn.obs;
  final Rxn<BoardArchiveFiltersEntity> filters =
      Rxn<BoardArchiveFiltersEntity>();
  final RxList<BoardQuestionItemEntity> questions =
      <BoardQuestionItemEntity>[].obs;

  final RxString selectedBoard = 'ALL'.obs;
  final RxString selectedYear = 'ALL'.obs;
  final RxString selectedSubjectId = 'ALL'.obs;
  final RxString selectedType = 'ALL'.obs;
  final RxBool verifiedOnly = true.obs;
  final RxString searchQuery = ''.obs;

  final RxInt currentPage = 1.obs;
  final RxInt totalPages = 1.obs;
  final RxInt totalQuestions = 0.obs;

  final RxBool isLoading = false.obs;
  final RxBool isLoadingFilters = false.obs;
  final RxnString errorMessage = RxnString();

  final RxMap<String, String> selectedMcqOptions = <String, String>{}.obs;
  final RxSet<String> expandedExplanations = <String>{}.obs;
  final RxMap<String, CqSelfAssessResultEntity> cqResults =
      <String, CqSelfAssessResultEntity>{}.obs;
  final RxSet<String> submittingCqIds = <String>{}.obs;
  final RxSet<String> bookmarkedIds = <String>{}.obs;
  final RxSet<String> togglingBookmarkIds = <String>{}.obs;

  int _loadGeneration = 0;
  int _filtersGeneration = 0;
  Timer? _searchDebounce;

  List<int> get availableYears {
    final dynamicYears =
        filters.value?.years.map((y) => y.year).toList() ?? const <int>[];
    return dynamicYears.isNotEmpty ? dynamicYears : fallbackYears;
  }

  @override
  void onInit() {
    super.onInit();
    language.value = AppLanguage.fromCode(_getLanguageUseCase());
    unawaited(loadFilters());
    unawaited(loadQuestions());
  }

  Future<void> loadFilters() async {
    final generation = ++_filtersGeneration;
    isLoadingFilters.value = true;
    try {
      final res = await _getFiltersUseCase();
      if (isClosed || generation != _filtersGeneration) return;
      res.fold(
        (_) {},
        (loaded) => filters.value = loaded,
      );
    } finally {
      if (!isClosed && generation == _filtersGeneration) {
        isLoadingFilters.value = false;
      }
    }
  }

  Future<void> loadQuestions() async {
    final generation = ++_loadGeneration;
    isLoading.value = true;
    errorMessage.value = null;

    final query = BoardArchiveQueryParams(
      board: selectedBoard.value,
      year: selectedYear.value,
      subjectId: selectedSubjectId.value,
      type: selectedType.value,
      verifiedOnly: verifiedOnly.value,
      search: searchQuery.value.trim(),
      page: currentPage.value,
      limit: defaultLimit,
    );

    try {
      final res = await _getQuestionsUseCase(query);
      if (isClosed || generation != _loadGeneration) return;

      res.fold(
        (err) {
          errorMessage.value = err.message ??
              AppStrings.tr(
                'বোর্ড প্রশ্ন লোড করা যায়নি।',
                'Could not load board archive questions.',
                language.value,
              );
        },
        (pageData) {
          questions.assignAll(pageData.items);
          totalQuestions.value = pageData.total;
          currentPage.value = max(1, pageData.page);
          totalPages.value = max(1, pageData.totalPages);
        },
      );
    } catch (_) {
      if (!isClosed && generation == _loadGeneration) {
        errorMessage.value = AppStrings.tr(
          'বোর্ড প্রশ্ন লোড করা যায়নি।',
          'Could not load board archive questions.',
          language.value,
        );
      }
    } finally {
      if (!isClosed && generation == _loadGeneration) {
        isLoading.value = false;
      }
    }
  }

  void selectBoard(String board) {
    if (selectedBoard.value == board) return;
    selectedBoard.value = board;
    currentPage.value = 1;
    unawaited(loadQuestions());
  }

  void selectYear(String year) {
    if (selectedYear.value == year) return;
    selectedYear.value = year;
    currentPage.value = 1;
    unawaited(loadQuestions());
  }

  void selectSubject(String subjectId) {
    if (selectedSubjectId.value == subjectId) return;
    selectedSubjectId.value = subjectId;
    currentPage.value = 1;
    unawaited(loadQuestions());
  }

  void selectType(String type) {
    if (selectedType.value == type) return;
    selectedType.value = type;
    currentPage.value = 1;
    unawaited(loadQuestions());
  }

  void toggleVerifiedOnly(bool value) {
    if (verifiedOnly.value == value) return;
    verifiedOnly.value = value;
    currentPage.value = 1;
    unawaited(loadQuestions());
  }

  void onSearchChanged(String raw) {
    searchQuery.value = raw;
    _searchDebounce?.cancel();
    _searchDebounce = Timer(const Duration(milliseconds: 350), () {
      if (isClosed) return;
      currentPage.value = 1;
      unawaited(loadQuestions());
    });
  }

  void submitSearch() {
    _searchDebounce?.cancel();
    searchQuery.value = searchController.text;
    currentPage.value = 1;
    unawaited(loadQuestions());
  }

  void clearSearch() {
    _searchDebounce?.cancel();
    searchController.clear();
    if (searchQuery.value.isEmpty) return;
    searchQuery.value = '';
    currentPage.value = 1;
    unawaited(loadQuestions());
  }

  void goToPage(int page) {
    final target = page.clamp(1, max(1, totalPages.value)).toInt();
    if (target == currentPage.value) return;
    currentPage.value = target;
    if (scrollController.hasClients) {
      scrollController.jumpTo(0);
    }
    unawaited(loadQuestions());
  }

  void nextPage() => goToPage(currentPage.value + 1);

  void previousPage() => goToPage(currentPage.value - 1);

  Future<void> refreshAll() async {
    await Future.wait<void>(<Future<void>>[
      loadFilters(),
      loadQuestions(),
    ]);
  }

  void selectMcqOption(BoardQuestionItemEntity question, String optionId) {
    selectedMcqOptions[question.id] = optionId;
    expandedExplanations.add(question.id);
  }

  void toggleExplanation(String questionId) {
    if (expandedExplanations.contains(questionId)) {
      expandedExplanations.remove(questionId);
    } else {
      expandedExplanations.add(questionId);
    }
  }

  bool isOptionCorrect(BoardQuestionItemEntity question, PracticeOptionEntity opt) {
    if (question.correctOption != null && question.correctOption!.isNotEmpty) {
      return opt.id == question.correctOption;
    }
    return opt.isCorrect == true;
  }

  Future<void> submitCqSelfAssess(
    BoardQuestionItemEntity question,
    CqSelfScoresEntity scores,
  ) async {
    if (submittingCqIds.contains(question.id)) return;
    submittingCqIds.add(question.id);
    try {
      final res = await _submitCqSelfAssessUseCase(
        questionId: question.id,
        selfScores: scores,
        topicId: question.topicId,
      );
      if (isClosed) return;
      res.fold(
        (err) {
          // Allow local feedback even if offline/unauthenticated while showing error
          cqResults[question.id] = CqSelfAssessResultEntity(
            questionId: question.id,
            selfScores: scores,
            totalScore: scores.totalScore,
          );
        },
        (result) {
          cqResults[question.id] = result;
        },
      );
    } finally {
      if (!isClosed) {
        submittingCqIds.remove(question.id);
      }
    }
  }

  Future<void> toggleBookmark(BoardQuestionItemEntity question) async {
    if (togglingBookmarkIds.contains(question.id)) return;
    togglingBookmarkIds.add(question.id);
    try {
      final res = await _toggleBookmarkUseCase(
        itemId: question.id,
        itemType: 'QUESTION',
        titleBangla: question.boardSource ?? question.boardLabelBangla,
        subtitleBangla: question.subjectNameBangla,
        href: '/board-archive',
      );
      if (isClosed) return;
      res.fold(
        (_) {},
        (bookmarked) {
          if (bookmarked) {
            bookmarkedIds.add(question.id);
          } else {
            bookmarkedIds.remove(question.id);
          }
        },
      );
    } finally {
      if (!isClosed) {
        togglingBookmarkIds.remove(question.id);
      }
    }
  }

  @override
  void onClose() {
    _loadGeneration++;
    _filtersGeneration++;
    _searchDebounce?.cancel();
    _searchDebounce = null;
    searchController.dispose();
    scrollController.dispose();
    super.onClose();
  }
}
