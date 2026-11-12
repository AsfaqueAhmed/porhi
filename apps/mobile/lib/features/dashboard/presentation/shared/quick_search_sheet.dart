import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:porhi/core/i18n/app_strings.dart';
import 'package:porhi/core/theme/porhi_theme.dart';
import 'package:porhi/features/dashboard/domain/entities/student_overview_entity.dart';
import 'package:porhi/features/dashboard/presentation/dashboard/controller/dashboard_controller.dart';
import 'package:porhi/features/lesson/domain/entities/lesson_entities.dart';
import 'package:porhi/features/shell/presentation/main_shell/controller/main_shell_controller.dart';
import 'package:porhi/routes/app_routes.dart';

/// Quick Search modal bottom sheet searching chapters, topics, and interactive labs.
class QuickSearchSheet extends StatefulWidget {
  final ValueChanged<QuickSearchTopicEntity>? onTopicSelected;

  const QuickSearchSheet({super.key, this.onTopicSelected});

  static Future<void> show(
    BuildContext context, {
    ValueChanged<QuickSearchTopicEntity>? onTopicSelected,
  }) {
    return showModalBottomSheet<void>(
      context: context,
      isScrollControlled: true,
      useSafeArea: true,
      backgroundColor: Colors.white,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
      ),
      builder: (_) => FractionallySizedBox(
        heightFactor: 0.85,
        child: QuickSearchSheet(onTopicSelected: onTopicSelected),
      ),
    );
  }

  @override
  State<QuickSearchSheet> createState() => _QuickSearchSheetState();
}

class _QuickSearchSheetState extends State<QuickSearchSheet> {
  late final DashboardController _controller;
  bool _isOpeningTopic = false;

  @override
  void initState() {
    super.initState();
    _controller = Get.find<DashboardController>();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (mounted) {
        _controller.clearSearchQuery();
        _controller.loadQuickSearchCatalog();
      }
    });
  }

  Future<void> _handleTopicTap(QuickSearchTopicEntity topic) async {
    if (_isOpeningTopic) return;
    _isOpeningTopic = true;
    try {
      Navigator.of(context).pop();
      if (widget.onTopicSelected != null) {
        widget.onTopicSelected!(topic);
        return;
      }
      final lessonRoute = AppRoutes.lessonForTopic(topic.topicId);
      if (Get.routeTree.matchRoute(lessonRoute).route != null) {
        await _controller.runLessonNavigation(() async {
          await Get.toNamed(
            lessonRoute,
            arguments: LessonRouteArgs(
              subjectId: topic.subjectId,
              chapterId: topic.chapterId,
              chapterTitle: topic.chapterTitle,
              topicTitle: topic.topicTitle,
            ),
          );
          if (Get.isRegistered<DashboardController>()) {
            await Get.find<DashboardController>().refreshLanguageAndUser();
          }
        });
        return;
      }
      if (Get.isRegistered<MainShellController>()) {
        Get.find<MainShellController>().selectTab(1);
      }
    } finally {
      if (mounted) {
        _isOpeningTopic = false;
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return _QuickSearchBody(
      controller: _controller,
      showCloseButton: true,
      onTopicSelected: _handleTopicTap,
    );
  }
}

/// Standalone `/search` route page wrapping the same Quick Search UI.
class QuickSearchPage extends StatefulWidget {
  const QuickSearchPage({super.key});

  @override
  State<QuickSearchPage> createState() => _QuickSearchPageState();
}

class _QuickSearchPageState extends State<QuickSearchPage> {
  late final DashboardController _controller;

  @override
  void initState() {
    super.initState();
    _controller = Get.find<DashboardController>();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (mounted) {
        _controller.clearSearchQuery();
        _controller.loadQuickSearchCatalog();
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Obx(
          () => Text(
            AppStrings.tr(
              'দ্রুত অনুসন্ধান',
              'Quick Search',
              _controller.language.value,
            ),
          ),
        ),
      ),
      body: _QuickSearchBody(
        controller: _controller,
        showCloseButton: false,
        onTopicSelected: (topic) =>
            Get.back<QuickSearchTopicEntity?>(result: topic),
      ),
    );
  }
}

class _QuickSearchBody extends StatelessWidget {
  final DashboardController controller;
  final bool showCloseButton;
  final ValueChanged<QuickSearchTopicEntity> onTopicSelected;

  const _QuickSearchBody({
    required this.controller,
    required this.showCloseButton,
    required this.onTopicSelected,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      children: <Widget>[
        Padding(
          padding: const EdgeInsets.fromLTRB(16, 14, 12, 10),
          child: Row(
            children: <Widget>[
              Expanded(
                child: ValueListenableBuilder<TextEditingValue>(
                  valueListenable: controller.searchQueryController,
                  builder: (context, value, _) {
                    return Obx(() {
                      final lang = controller.language.value;
                      return TextField(
                        key: const Key('quick_search_input'),
                        controller: controller.searchQueryController,
                        autofocus: true,
                        onChanged: controller.onSearchQueryChanged,
                        decoration: InputDecoration(
                          prefixIcon: const Icon(Icons.search_rounded),
                          hintText: AppStrings.tr(
                            'টপিক, অধ্যায় বা "ল্যাব" খুঁজুন...',
                            'Search topics, chapters, or "lab"...',
                            lang,
                          ),
                          suffixIcon: value.text.isEmpty
                              ? null
                              : IconButton(
                                  key: const Key('quick_search_clear_button'),
                                  tooltip: AppStrings.tr('মুছুন', 'Clear', lang),
                                  icon: const Icon(
                                    Icons.clear_rounded,
                                    size: 18,
                                  ),
                                  onPressed: controller.clearSearchQuery,
                                ),
                        ),
                      );
                    });
                  },
                ),
              ),
              if (showCloseButton)
                IconButton(
                  icon: const Icon(Icons.close_rounded),
                  onPressed: () => Navigator.of(context).pop(),
                ),
            ],
          ),
        ),
        const Divider(height: 1),
        Expanded(
          child: Obx(() {
            final lang = controller.language.value;
            final isLoading = controller.isLoadingSearch.value;
            final results = controller.filteredSearchResults;
            final error = controller.searchErrorMessage.value;

            if (isLoading && results.isEmpty) {
              return const Center(child: CircularProgressIndicator());
            }

            if (error != null && results.isEmpty) {
              return Center(
                child: Padding(
                  padding: const EdgeInsets.all(24),
                  child: Column(
                    mainAxisSize: MainAxisSize.min,
                    children: <Widget>[
                      Text(error, textAlign: TextAlign.center),
                      const SizedBox(height: 12),
                      OutlinedButton(
                        onPressed: controller.loadQuickSearchCatalog,
                        child: Text(AppStrings.t('action.retry', lang)),
                      ),
                    ],
                  ),
                ),
              );
            }

            if (results.isEmpty) {
              return Center(
                child: Text(
                  AppStrings.t('common.noData', lang),
                  style: const TextStyle(color: PorhiTheme.slate600),
                ),
              );
            }

            return ListView.separated(
              padding: const EdgeInsets.symmetric(vertical: 8),
              itemCount: results.length,
              separatorBuilder: (_, _) => const Divider(height: 1),
              itemBuilder: (context, index) {
                final item = results[index];
                return ListTile(
                  leading: Icon(
                    item.isCompleted
                        ? Icons.check_circle_rounded
                        : Icons.menu_book_outlined,
                    color: item.isCompleted
                        ? PorhiTheme.emerald600
                        : PorhiTheme.indigo600,
                  ),
                  title: Text(
                    item.topicTitle,
                    style: const TextStyle(
                      fontWeight: FontWeight.w700,
                      color: PorhiTheme.slate900,
                    ),
                  ),
                  subtitle: Text(
                    item.chapterTitle,
                    style: const TextStyle(
                      fontSize: 12.5,
                      color: PorhiTheme.slate600,
                    ),
                  ),
                  trailing: item.hasInteractiveLab
                      ? Container(
                          padding: const EdgeInsets.symmetric(
                            horizontal: 8,
                            vertical: 4,
                          ),
                          decoration: BoxDecoration(
                            color: PorhiTheme.indigo50,
                            borderRadius: BorderRadius.circular(999),
                          ),
                          child: Text(
                            AppStrings.tr('ল্যাব', 'Lab', lang),
                            style: const TextStyle(
                              fontSize: 11,
                              fontWeight: FontWeight.w700,
                              color: PorhiTheme.indigo700,
                            ),
                          ),
                        )
                      : const Icon(
                          Icons.chevron_right_rounded,
                          color: PorhiTheme.slate400,
                        ),
                  onTap: () => onTopicSelected(item),
                );
              },
            );
          }),
        ),
      ],
    );
  }
}
