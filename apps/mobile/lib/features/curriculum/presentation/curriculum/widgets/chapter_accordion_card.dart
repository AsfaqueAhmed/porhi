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
    final completedCount =
        chapter.topics.where((t) => completedTopicIds.contains(t.id)).length;
    final progressRatio =
        topicCount > 0 ? (completedCount / topicCount).clamp(0.0, 1.0) : 0.0;
    final orderText = AppStrings.formatNumber(chapter.orderIndex, language);

    return Card(
      key: Key('chapter_card_${chapter.id}'),
      clipBehavior: Clip.antiAlias,
      child: Column(
        children: <Widget>[
          InkWell(
            key: Key('chapter_header_${chapter.id}'),
            onTap: onToggleExpand,
            child: Container(
              color: PorhiTheme.slate50,
              padding: const EdgeInsets.all(14),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: <Widget>[
                  Row(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: <Widget>[
                      Container(
                        width: 34,
                        height: 34,
                        alignment: Alignment.center,
                        decoration: BoxDecoration(
                          color: PorhiTheme.indigo600,
                          borderRadius: BorderRadius.circular(10),
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
                                    key: Key('offline_saved_badge_${chapter.id}'),
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
                        PorhiTheme.emerald600,
                      ),
                    ),
                  ),
                  const SizedBox(height: 12),
                  Wrap(
                    spacing: 8,
                    runSpacing: 8,
                    children: <Widget>[
                      OutlinedButton.icon(
                        key: Key('offline_pack_btn_${chapter.id}'),
                        onPressed: isDownloading ? null : onToggleOfflinePack,
                        style: OutlinedButton.styleFrom(
                          padding: const EdgeInsets.symmetric(
                            horizontal: 10,
                            vertical: 8,
                          ),
                          backgroundColor: isDownloaded
                              ? PorhiTheme.emerald50
                              : Colors.white,
                          side: BorderSide(
                            color: isDownloaded
                                ? const Color(0xFFA7F3D0)
                                : PorhiTheme.slate200,
                          ),
                          foregroundColor: isDownloaded
                              ? PorhiTheme.emerald600
                              : PorhiTheme.slate700,
                        ),
                        icon: isDownloading
                            ? const SizedBox(
                                width: 14,
                                height: 14,
                                child: CircularProgressIndicator(strokeWidth: 2),
                              )
                            : Icon(
                                isDownloaded
                                    ? Icons.delete_outline_rounded
                                    : Icons.download_rounded,
                                size: 16,
                              ),
                        label: Text(
                          isDownloading
                              ? AppStrings.tr(
                                  'ডাউনলোড হচ্ছে...',
                                  'Saving...',
                                  language,
                                )
                              : isDownloaded
                                  ? AppStrings.tr(
                                      'অফলাইন মুছুন',
                                      'Remove Offline',
                                      language,
                                    )
                                  : AppStrings.tr(
                                      'অফলাইন ডাউনলোড',
                                      'Save Offline',
                                      language,
                                    ),
                          style: const TextStyle(
                            fontSize: 12,
                            fontWeight: FontWeight.w700,
                          ),
                        ),
                      ),
                      OutlinedButton.icon(
                        key: Key('chapter_practice_btn_${chapter.id}'),
                        onPressed: onPracticeTap,
                        style: OutlinedButton.styleFrom(
                          padding: const EdgeInsets.symmetric(
                            horizontal: 10,
                            vertical: 8,
                          ),
                          backgroundColor: PorhiTheme.indigo50,
                          side: const BorderSide(color: Color(0xFFC7D2FE)),
                          foregroundColor: PorhiTheme.indigo700,
                        ),
                        icon: const Icon(Icons.quiz_outlined, size: 16),
                        label: Text(
                          AppStrings.tr(
                            'MCQ প্র্যাকটিস',
                            'MCQ Practice',
                            language,
                          ),
                          style: const TextStyle(
                            fontSize: 12,
                            fontWeight: FontWeight.w700,
                          ),
                        ),
                      ),
                      FilledButton.icon(
                        key: Key('chapter_exam_btn_${chapter.id}'),
                        onPressed: onExamTap,
                        style: FilledButton.styleFrom(
                          padding: const EdgeInsets.symmetric(
                            horizontal: 10,
                            vertical: 8,
                          ),
                          backgroundColor: PorhiTheme.slate900,
                          foregroundColor: Colors.white,
                        ),
                        icon: const Icon(
                          Icons.emoji_events_rounded,
                          size: 16,
                          color: Color(0xFFFBBF24),
                        ),
                        label: Text(
                          AppStrings.tr('মডেল টেস্ট', 'Model Test', language),
                          style: const TextStyle(
                            fontSize: 12,
                            fontWeight: FontWeight.w700,
                          ),
                        ),
                      ),
                    ],
                  ),
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
                    isCompleted:
                        completedTopicIds.contains(chapter.topics[i].id),
                    isBookmarked:
                        bookmarkedTopicIds.contains(chapter.topics[i].id),
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
