import 'dart:async';

import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:porhi/core/i18n/app_strings.dart';
import 'package:porhi/core/theme/porhi_theme.dart';
import 'package:porhi/features/auth/domain/entities/auth_user_entity.dart';
import 'package:porhi/features/curriculum/domain/entities/curriculum_entities.dart';
import 'package:porhi/features/curriculum/presentation/subjects/controller/subjects_controller.dart';
import 'package:porhi/features/curriculum/presentation/subjects/widgets/subject_card.dart';
import 'package:porhi/features/dashboard/presentation/dashboard/controller/dashboard_controller.dart';
import 'package:porhi/features/shell/presentation/main_shell/controller/main_shell_controller.dart';
import 'package:porhi/routes/app_routes.dart';

class SubjectsView extends GetView<SubjectsController> {
  const SubjectsView({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Obx(() {
          final lang = controller.language.value;
          final isCached = controller.isOfflineCache.value;
          return Row(
            children: <Widget>[
              Flexible(
                child: Text(
                  AppStrings.tr('বিষয় ক্যাটালগ', 'Subject Catalog', lang),
                  overflow: TextOverflow.ellipsis,
                ),
              ),
              if (isCached) ...<Widget>[
                const SizedBox(width: 8),
                Container(
                  padding: const EdgeInsets.symmetric(
                    horizontal: 8,
                    vertical: 3,
                  ),
                  decoration: BoxDecoration(
                    color: const Color(0xFFFEF3C7),
                    borderRadius: BorderRadius.circular(999),
                  ),
                  child: Text(
                    AppStrings.t('common.offline', lang),
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                    style: const TextStyle(
                      fontSize: 10,
                      fontWeight: FontWeight.w700,
                      color: Color(0xFF92400E),
                    ),
                  ),
                ),
              ],
            ],
          );
        }),
        actions: <Widget>[
          Obx(() {
            final lang = controller.language.value;
            return IconButton(
              key: const Key('subjects_account_button'),
              tooltip: AppStrings.t('nav.account', lang),
              icon: const Icon(Icons.person_outline_rounded),
              onPressed: () async {
                final originRoute = Get.currentRoute;
                await Get.toNamed(AppRoutes.account);
                if (!context.mounted || Get.currentRoute != originRoute) {
                  return;
                }
                if (Get.isRegistered<MainShellController>()) {
                  Get.find<MainShellController>().refreshPreferences();
                }
                if (Get.isRegistered<SubjectsController>()) {
                  Get.find<SubjectsController>().refreshPreferences();
                }
                if (Get.isRegistered<DashboardController>()) {
                  unawaited(
                    Get.find<DashboardController>().refreshLanguageAndUser(),
                  );
                }
              },
            );
          }),
        ],
      ),
      body: Obx(() {
        final lang = controller.language.value;
        final isLoading = controller.isLoading.value;
        final subjects = controller.filteredSubjects;
        final allCount = controller.allSubjects.length;
        final error = controller.errorMessage.value;
        final activeId = controller.activeSubjectId.value;
        final selectedTrack = controller.selectedTrackFilter.value;
        final downloaded = controller.downloadedChapters;

        if (isLoading && allCount == 0 && downloaded.isEmpty) {
          return const Center(child: CircularProgressIndicator());
        }

        if (error != null && allCount == 0 && downloaded.isEmpty) {
          return Center(
            child: Padding(
              padding: const EdgeInsets.all(24),
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: <Widget>[
                  const Icon(
                    Icons.cloud_off_rounded,
                    size: 48,
                    color: PorhiTheme.slate400,
                  ),
                  const SizedBox(height: 12),
                  Text(
                    error,
                    textAlign: TextAlign.center,
                    style: const TextStyle(color: PorhiTheme.slate700),
                  ),
                  const SizedBox(height: 16),
                  ElevatedButton.icon(
                    onPressed: controller.loadSubjects,
                    icon: const Icon(Icons.refresh_rounded),
                    label: Text(AppStrings.t('action.retry', lang)),
                  ),
                ],
              ),
            ),
          );
        }

        return RefreshIndicator(
          onRefresh: controller.loadSubjects,
          child: ListView(
            padding: const EdgeInsets.all(16),
            children: <Widget>[
              Text(
                AppStrings.tr(
                  'তোমার ট্র্যাক ও বিষয় বেছে নিয়ে কারিকুলাম ও অনুশীলন শুরু করো।',
                  'Choose your track and subject to explore chapters and practice.',
                  lang,
                ),
                style: const TextStyle(
                  fontSize: 13.5,
                  color: PorhiTheme.slate600,
                ),
              ),
              const SizedBox(height: 12),
              TextField(
                key: const Key('subjects_search_input'),
                controller: controller.searchController,
                onChanged: controller.onSearchQueryChanged,
                decoration: InputDecoration(
                  prefixIcon: const Icon(Icons.search_rounded),
                  hintText: AppStrings.tr(
                    'বিষয় খুঁজুন...',
                    'Search subjects...',
                    lang,
                  ),
                  suffixIcon: controller.searchQuery.value.isEmpty
                      ? null
                      : IconButton(
                          key: const Key('subjects_search_clear_btn'),
                          icon: const Icon(Icons.clear_rounded, size: 18),
                          onPressed: controller.clearSearchQuery,
                        ),
                ),
              ),
              const SizedBox(height: 12),
              _TrackFilterBar(
                language: lang,
                selectedTrack: selectedTrack,
                onSelected: controller.selectTrackFilter,
              ),
              if (downloaded.isNotEmpty) ...<Widget>[
                const SizedBox(height: 14),
                _DownloadedChaptersCard(
                  language: lang,
                  downloaded: downloaded,
                  onOpenSubject: (subjectId) =>
                      _openCurriculumRoute(context, subjectId),
                ),
              ],
              if (error != null && allCount == 0) ...<Widget>[
                const SizedBox(height: 14),
                Card(
                  child: Padding(
                    padding: const EdgeInsets.all(16),
                    child: Column(
                      children: <Widget>[
                        Text(
                          error,
                          textAlign: TextAlign.center,
                          style: const TextStyle(color: PorhiTheme.slate700),
                        ),
                        const SizedBox(height: 10),
                        OutlinedButton.icon(
                          onPressed: controller.loadSubjects,
                          icon: const Icon(Icons.refresh_rounded, size: 18),
                          label: Text(AppStrings.t('action.retry', lang)),
                        ),
                      ],
                    ),
                  ),
                ),
              ],
              const SizedBox(height: 14),
              if (subjects.isEmpty && allCount > 0)
                Padding(
                  padding: const EdgeInsets.symmetric(vertical: 32),
                  child: Center(
                    child: Text(
                      AppStrings.t('common.noData', lang),
                      style: const TextStyle(color: PorhiTheme.slate600),
                    ),
                  ),
                )
              else
                ...subjects.map(
                  (subject) => Padding(
                    padding: const EdgeInsets.only(bottom: 12),
                    child: SubjectCard(
                      subject: subject,
                      language: lang,
                      isActive: subject.id == activeId,
                      downloadedChapterCount:
                          controller.downloadedCountForSubject(subject.id),
                      onTap: () => _handleSelectSubject(context, subject),
                    ),
                  ),
                ),
              const SizedBox(height: 16),
            ],
          ),
        );
      }),
    );
  }

  Future<void> _handleSelectSubject(
    BuildContext context,
    SubjectEntity subject,
  ) async {
    final ok = await controller.selectSubject(subject);
    if (!ok || !context.mounted) return;
    await _openCurriculumRoute(context, subject.id);
  }

  Future<void> _openCurriculumRoute(
    BuildContext context,
    String subjectId,
  ) async {
    final originRoute = Get.currentRoute;
    await Get.toNamed(AppRoutes.chaptersForSubject(subjectId));
    if (!context.mounted || Get.currentRoute != originRoute) {
      return;
    }
    if (Get.isRegistered<SubjectsController>()) {
      await Get.find<SubjectsController>().refreshDownloadedChapters();
    }
  }
}

class _TrackFilterBar extends StatelessWidget {
  final AppLanguage language;
  final StudentTrack? selectedTrack;
  final ValueChanged<StudentTrack?> onSelected;

  const _TrackFilterBar({
    required this.language,
    required this.selectedTrack,
    required this.onSelected,
  });

  @override
  Widget build(BuildContext context) {
    return Wrap(
      spacing: 8,
      runSpacing: 8,
      children: <Widget>[
        ChoiceChip(
          key: const Key('subject_track_ALL'),
          label: Text(
            AppStrings.tr('সকল বিষয়', 'All Tracks', language),
          ),
          selected: selectedTrack == null,
          selectedColor: PorhiTheme.indigo600,
          backgroundColor: Colors.white,
          labelStyle: TextStyle(
            fontWeight: FontWeight.w700,
            fontSize: 12,
            color: selectedTrack == null
                ? Colors.white
                : PorhiTheme.slate700,
          ),
          onSelected: (_) => onSelected(null),
        ),
        ...StudentTrack.values.map((track) {
          final isSelected = selectedTrack == track;
          final label =
              language == AppLanguage.en ? track.labelEn : track.labelBn;
          return ChoiceChip(
            key: Key('subject_track_${track.apiValue}'),
            label: Text(label),
            selected: isSelected,
            selectedColor: PorhiTheme.indigo600,
            backgroundColor: Colors.white,
            labelStyle: TextStyle(
              fontWeight: FontWeight.w700,
              fontSize: 12,
              color: isSelected ? Colors.white : PorhiTheme.slate700,
            ),
            onSelected: (_) => onSelected(track),
          );
        }),
      ],
    );
  }
}

class _DownloadedChaptersCard extends StatelessWidget {
  final AppLanguage language;
  final List<DownloadedChapterEntity> downloaded;
  final ValueChanged<String> onOpenSubject;

  const _DownloadedChaptersCard({
    required this.language,
    required this.downloaded,
    required this.onOpenSubject,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      key: const Key('downloaded_chapters_summary'),
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        color: PorhiTheme.emerald50,
        borderRadius: BorderRadius.circular(14),
        border: Border.all(color: const Color(0xFFA7F3D0)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: <Widget>[
          Row(
            children: <Widget>[
              const Icon(
                Icons.offline_pin_rounded,
                size: 18,
                color: PorhiTheme.emerald600,
              ),
              const SizedBox(width: 8),
              Expanded(
                child: Text(
                  AppStrings.tr(
                    'অফলাইনে সংরক্ষিত অধ্যায় (${AppStrings.formatNumber(downloaded.length, language)})',
                    'Saved Offline Chapters (${downloaded.length})',
                    language,
                  ),
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                  style: const TextStyle(
                    fontSize: 13,
                    fontWeight: FontWeight.w700,
                    color: PorhiTheme.slate900,
                  ),
                ),
              ),
            ],
          ),
          const SizedBox(height: 8),
          Wrap(
            spacing: 8,
            runSpacing: 6,
            children: downloaded.take(4).map((chapter) {
              return ActionChip(
                key: Key('offline_chapter_shortcut_${chapter.chapterId}'),
                avatar: const Icon(
                  Icons.download_done_rounded,
                  size: 15,
                  color: PorhiTheme.emerald600,
                ),
                label: Text(
                  chapter.titleBangla,
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                ),
                backgroundColor: Colors.white,
                side: const BorderSide(color: Color(0xFFA7F3D0)),
                onPressed: () => onOpenSubject(chapter.subjectId),
              );
            }).toList(),
          ),
        ],
      ),
    );
  }
}
