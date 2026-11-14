import 'package:flutter/material.dart';
import 'package:porhi/core/i18n/app_strings.dart';
import 'package:porhi/core/theme/porhi_theme.dart';
import 'package:porhi/features/curriculum/domain/entities/curriculum_entities.dart';

class ChapterAccordionCard extends StatelessWidget {
  final ChapterEntity chapter;
  final AppLanguage language;
  final bool isCollapsed;
  final bool isDownloaded;
  final bool isDownloading;
  final int? downloadedSizeBytes;
  final Set<String> completedTopicIds;
  final Set<String> bookmarkedTopicIds;
  final VoidCallback onToggleExpand;
  final VoidCallback onToggleOfflinePack;
  final VoidCallback onPracticeTap;
  final VoidCallback onExamTap;
  final ValueChanged<TopicEntity> onTopicTap;
  final ValueChanged<TopicEntity> onToggleBookmark;

  const ChapterAccordionCard({
    super.key,
    required this.chapter,
    required this.language,
    required this.isCollapsed,
    required this.isDownloaded,
    required this.isDownloading,
    this.downloadedSizeBytes,
    required this.completedTopicIds,
    required this.bookmarkedTopicIds,
    required this.onToggleExpand,
    required this.onToggleOfflinePack,
    required this.onPracticeTap,
    required this.onExamTap,
    required this.onTopicTap,
    required this.onToggleBookmark,
  });

  @override
  Widget build(BuildContext context) {
    final topicCount = chapter.topics.length;
    final completedCount = chapter.topics
        .where((t) => completedTopicIds.contains(t.id))
        .length;
    final progressRatio = topicCount > 0
        ? (completedCount / topicCount).clamp(0.0, 1.0)
        : 0.0;
    final orderText = AppStrings.formatNumber(chapter.orderIndex, language);

    return Container(
      key: Key('chapter_card_${chapter.id}'),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: PorhiTheme.slate200),
        boxShadow: PorhiTheme.subtleShadow,
      ),
      clipBehavior: Clip.antiAlias,
      child: Column(
        children: <Widget>[
          InkWell(
            key: Key('chapter_header_${chapter.id}'),
            onTap: onToggleExpand,
            child: Container(
              color: Colors.white,
              padding: const EdgeInsets.all(16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: <Widget>[
                  Row(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: <Widget>[
                      Container(
                        width: 36,
                        height: 36,
                        alignment: Alignment.center,
                        decoration: BoxDecoration(
                          gradient: PorhiTheme.brandGradient,
                          borderRadius: BorderRadius.circular(11),
                        ),
                        child: Text(
                          orderText,
                          style: const TextStyle(
                            color: Colors.white,
                            fontWeight: FontWeight.w800,
                            fontSize: 13,
                          ),
                        ),
                      ),
                      const SizedBox(width: 10),
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: <Widget>[
                            Wrap(
                              spacing: 6,
                              runSpacing: 4,
                              crossAxisAlignment: WrapCrossAlignment.center,
                              children: <Widget>[
                                Text(
                                  '${AppStrings.tr('অধ্যায়', 'Chapter', language)} $orderText',
                                  style: const TextStyle(
                                    fontSize: 11,
                                    fontWeight: FontWeight.w700,
                                    color: PorhiTheme.indigo700,
                                  ),
                                ),
                                _SmallPill(
                                  label: language == AppLanguage.bn
                                      ? '${AppStrings.formatNumber(topicCount, language)} টপিক'
                                      : '$topicCount topics',
                                  bgColor: PorhiTheme.slate200,
                                  textColor: PorhiTheme.slate700,
                                ),
                                _SmallPill(
                                  label: language == AppLanguage.bn
                                      ? '${AppStrings.formatNumber(completedCount, language)}/${AppStrings.formatNumber(topicCount, language)} সম্পন্ন'
                                      : '$completedCount/$topicCount done',
                                  bgColor: PorhiTheme.emerald50,
                                  textColor: PorhiTheme.emerald600,
                                ),
                                if (isDownloaded)
                                  _SmallPill(
                                    key: Key(
                                      'offline_saved_badge_${chapter.id}',
                                    ),
                                    label: AppStrings.tr(
                                      'অফলাইন সংরক্ষিত',
                                      'Saved Offline',
                                      language,
                                    ),
                                    bgColor: const Color(0xFFD1FAE5),
                                    textColor: const Color(0xFF065F46),
                                  ),
                              ],
                            ),
                            const SizedBox(height: 6),
                            Text(
                              chapter.titleBangla,
                              maxLines: 2,
                              overflow: TextOverflow.ellipsis,
                              style: const TextStyle(
                                fontSize: 15.5,
                                fontWeight: FontWeight.w800,
                                color: PorhiTheme.slate900,
                              ),
                            ),
                          ],
                        ),
                      ),
                      Icon(
                        isCollapsed
                            ? Icons.keyboard_arrow_down_rounded
                            : Icons.keyboard_arrow_up_rounded,
                        color: PorhiTheme.slate600,
                      ),
                    ],
                  ),
                  const SizedBox(height: 10),
                  ClipRRect(
                    borderRadius: BorderRadius.circular(999),
                    child: LinearProgressIndicator(
                      value: progressRatio,
                      minHeight: 5,
                      backgroundColor: PorhiTheme.slate200,
                      valueColor: const AlwaysStoppedAnimation<Color>(
                        PorhiTheme.selectedBorder,
                      ),
                    ),
                  ),
                  if (!isCollapsed) ...<Widget>[
                    const SizedBox(height: 12),
                    Row(
                      children: <Widget>[
                        Expanded(
                          child: _ChapterActionButton(
                            key: Key('offline_pack_btn_${chapter.id}'),
                            icon: isDownloaded
                                ? Icons.download_done_rounded
                                : Icons.download_rounded,
                            label: isDownloading
                                ? AppStrings.tr(
                                    'ডাউনলোড হচ্ছে',
                                    'Saving offline',
                                    language,
                                  )
                                : isDownloaded
                                ? AppStrings.tr(
                                    'অফলাইন সংরক্ষিত',
                                    'Saved offline',
                                    language,
                                  )
                                : AppStrings.tr(
                                    'অফলাইনে রাখুন',
                                    'Save offline',
                                    language,
                                  ),
                            selected: isDownloaded,
                            isLoading: isDownloading,
                            onTap: isDownloading ? null : onToggleOfflinePack,
                          ),
                        ),
                        const SizedBox(width: 8),
                        Expanded(
                          child: _ChapterActionButton(
                            key: Key('chapter_practice_btn_${chapter.id}'),
                            icon: Icons.quiz_outlined,
                            label: AppStrings.tr(
                              'MCQ প্র্যাকটিস',
                              'MCQ practice',
                              language,
                            ),
                            onTap: onPracticeTap,
                          ),
                        ),
                        const SizedBox(width: 8),
                        Expanded(
                          child: _ChapterActionButton(
                            key: Key('chapter_exam_btn_${chapter.id}'),
                            icon: Icons.fact_check_outlined,
                            label: AppStrings.tr(
                              'মডেল টেস্ট',
                              'Model test',
                              language,
                            ),
                            prominent: true,
                            onTap: onExamTap,
                          ),
                        ),
                      ],
                    ),
                  ],
                ],
              ),
            ),
          ),
          if (!isCollapsed)
            Column(
              children: <Widget>[
                const Divider(height: 1),
                for (var i = 0; i < chapter.topics.length; i++) ...<Widget>[
                  if (i > 0) const Divider(height: 1),
                  _TopicRowTile(
                    chapterOrder: chapter.orderIndex,
                    topic: chapter.topics[i],
                    fallbackIndex: i + 1,
                    language: language,
                    isCompleted: completedTopicIds.contains(
                      chapter.topics[i].id,
                    ),
                    isBookmarked: bookmarkedTopicIds.contains(
                      chapter.topics[i].id,
                    ),
                    onTap: () => onTopicTap(chapter.topics[i]),
                    onToggleBookmark: () => onToggleBookmark(chapter.topics[i]),
                  ),
                ],
              ],
            ),
        ],
      ),
    );
  }
}

class _ChapterActionButton extends StatelessWidget {
  final IconData icon;
  final String label;
  final bool selected;
  final bool prominent;
  final bool isLoading;
  final VoidCallback? onTap;

  const _ChapterActionButton({
    super.key,
    required this.icon,
    required this.label,
    this.selected = false,
    this.prominent = false,
    this.isLoading = false,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    final background = prominent
        ? PorhiTheme.selectedSurface
        : selected
        ? PorhiTheme.selectedSurface
        : PorhiTheme.slate50;
    final foreground = prominent
        ? PorhiTheme.selectedForeground
        : selected
        ? PorhiTheme.selectedForeground
        : PorhiTheme.slate700;

    return Material(
      color: background,
      borderRadius: BorderRadius.circular(14),
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(14),
        child: Container(
          constraints: const BoxConstraints(minHeight: 62),
          padding: const EdgeInsets.symmetric(horizontal: 5, vertical: 7),
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(14),
            border: Border.all(
              color: prominent
                  ? PorhiTheme.selectedBorder
                  : selected
                  ? PorhiTheme.selectedBorder
                  : PorhiTheme.slate200,
            ),
          ),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[
              if (isLoading)
                SizedBox(
                  width: 17,
                  height: 17,
                  child: CircularProgressIndicator(
                    strokeWidth: 2,
                    color: foreground,
                  ),
                )
              else
                Icon(icon, size: 18, color: foreground),
              const SizedBox(height: 4),
              Text(
                label,
                maxLines: 2,
                textAlign: TextAlign.center,
                overflow: TextOverflow.ellipsis,
                style: TextStyle(
                  color: foreground,
                  fontSize: 9.5,
                  height: 1.1,
                  fontWeight: FontWeight.w700,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _TopicRowTile extends StatelessWidget {
  final int chapterOrder;
  final TopicEntity topic;
  final int fallbackIndex;
  final AppLanguage language;
  final bool isCompleted;
  final bool isBookmarked;
  final VoidCallback onTap;
  final VoidCallback onToggleBookmark;

  const _TopicRowTile({
    required this.chapterOrder,
    required this.topic,
    required this.fallbackIndex,
    required this.language,
    required this.isCompleted,
    required this.isBookmarked,
    required this.onTap,
    required this.onToggleBookmark,
  });

  @override
  Widget build(BuildContext context) {
    final topicOrder = topic.orderIndex > 0 ? topic.orderIndex : fallbackIndex;
    final prefix =
        '${AppStrings.formatNumber(chapterOrder, language)}.${AppStrings.formatNumber(topicOrder, language)}';

    return InkWell(
      key: Key('topic_row_${topic.id}'),
      onTap: onTap,
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
        child: Row(
          children: <Widget>[
            SizedBox(
              width: 34,
              child: Text(
                prefix,
                style: const TextStyle(
                  fontSize: 12,
                  fontWeight: FontWeight.w600,
                  color: PorhiTheme.slate400,
                ),
              ),
            ),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: <Widget>[
                  Text(
                    topic.titleBangla,
                    maxLines: 2,
                    overflow: TextOverflow.ellipsis,
                    style: const TextStyle(
                      fontSize: 13.5,
                      fontWeight: FontWeight.w700,
                      color: PorhiTheme.slate900,
                    ),
                  ),
                  if (topic.isInteractiveLab || isCompleted) ...<Widget>[
                    const SizedBox(height: 4),
                    Wrap(
                      spacing: 6,
                      runSpacing: 4,
                      children: <Widget>[
                        if (topic.isInteractiveLab)
                          _SmallPill(
                            label: AppStrings.tr('⚡ ল্যাব', '⚡ Lab', language),
                            bgColor: const Color(0xFFFEF3C7),
                            textColor: const Color(0xFF92400E),
                          ),
                        if (isCompleted)
                          _SmallPill(
                            label: AppStrings.tr(
                              '✓ সম্পন্ন',
                              '✓ Mastered',
                              language,
                            ),
                            bgColor: PorhiTheme.emerald50,
                            textColor: PorhiTheme.emerald600,
                          ),
                      ],
                    ),
                  ],
                ],
              ),
            ),
            IconButton(
              key: Key('topic_bookmark_btn_${topic.id}'),
              tooltip: AppStrings.tr('বুকমার্ক', 'Bookmark', language),
              icon: Icon(
                isBookmarked
                    ? Icons.bookmark_rounded
                    : Icons.bookmark_border_rounded,
                size: 20,
                color: isBookmarked
                    ? PorhiTheme.indigo600
                    : PorhiTheme.slate400,
              ),
              onPressed: onToggleBookmark,
            ),
            const Icon(
              Icons.play_arrow_rounded,
              size: 20,
              color: PorhiTheme.indigo600,
            ),
          ],
        ),
      ),
    );
  }
}

class _SmallPill extends StatelessWidget {
  final String label;
  final Color bgColor;
  final Color textColor;

  const _SmallPill({
    super.key,
    required this.label,
    required this.bgColor,
    required this.textColor,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 7, vertical: 2.5),
      decoration: BoxDecoration(
        color: bgColor,
        borderRadius: BorderRadius.circular(999),
      ),
      child: Text(
        label,
        maxLines: 1,
        overflow: TextOverflow.ellipsis,
        style: TextStyle(
          fontSize: 10.5,
          fontWeight: FontWeight.w700,
          color: textColor,
        ),
      ),
    );
  }
}
