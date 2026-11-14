import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:porhi/core/i18n/app_strings.dart';
import 'package:porhi/core/theme/app_theme_controller.dart';
import 'package:porhi/core/theme/porhi_theme.dart';
import 'package:porhi/features/auth/domain/entities/auth_user_entity.dart';
import 'package:porhi/features/auth/presentation/account/controller/account_controller.dart';
import 'package:porhi/features/auth/presentation/widgets/track_selector.dart';

class AccountView extends GetView<AccountController> {
  final bool isTab;

  const AccountView({super.key, this.isTab = false});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        automaticallyImplyLeading: !isTab,
        title: Obx(
          () => Text(AppStrings.t('nav.account', controller.language.value)),
        ),
      ),
      body: SafeArea(
        child: Form(
          key: controller.formKey,
          child: Obx(() {
            final lang = controller.language.value;
            final user = controller.user.value;
            final isGuest = user?.isGuest == true;
            final name = user?.fullName?.trim().isNotEmpty == true
                ? user!.fullName!.trim()
                : AppStrings.tr('শিক্ষার্থী', 'Student', lang);
            final contact = isGuest
                ? user?.guestId
                : (user?.phoneNumber ?? user?.email);
            final track = controller.selectedTrack.value;
            final error = controller.errorMessage.value;
            final status = controller.statusMessage.value;

            return ListView(
              padding: const EdgeInsets.fromLTRB(18, 12, 18, 20),
              children: <Widget>[
                if (controller.isLoading.value)
                  const LinearProgressIndicator(minHeight: 2),
                _ProfileIdentityCard(
                  name: name,
                  contact: contact,
                  trackLabel: lang == AppLanguage.bn
                      ? track.labelBn
                      : track.labelEn,
                  isGuest: isGuest,
                  lang: lang,
                ),
                const SizedBox(height: 24),
                _SectionHeading(
                  step: '01',
                  title: AppStrings.tr('তোমার পরিচয়', 'ABOUT YOU', lang),
                  subtitle: AppStrings.tr(
                    'প্রোফাইল ও পড়ার ট্র্যাক',
                    'Profile and curriculum track',
                    lang,
                  ),
                ),
                const SizedBox(height: 10),
                _SettingsSurface(
                  children: <Widget>[
                    TextFormField(
                      key: const Key('account_name_field'),
                      controller: controller.nameController,
                      maxLength: 80,
                      validator: controller.validateFullName,
                      decoration: InputDecoration(
                        labelText: AppStrings.tr(
                          'পূর্ণ নাম',
                          'Full name',
                          lang,
                        ),
                        prefixIcon: const Icon(Icons.badge_outlined),
                        counterText: '',
                      ),
                    ),
                    const SizedBox(height: 22),
                    _TrackPickerTile(
                      selectedTrack: track,
                      language: lang,
                      onTap: () => _openTrackPicker(context, lang, track),
                    ),
                  ],
                ),
                const SizedBox(height: 22),
                _SectionHeading(
                  step: '02',
                  title: AppStrings.tr(
                    'পড়াশোনার পছন্দ',
                    'STUDY PREFERENCES',
                    lang,
                  ),
                  subtitle: AppStrings.tr(
                    'তোমার মতো করে পড়ার সময় ঠিক করো',
                    'Set a study rhythm that works for you',
                    lang,
                  ),
                ),
                const SizedBox(height: 10),
                _SettingsSurface(
                  children: <Widget>[
                    TextFormField(
                      key: const Key('account_board_field'),
                      controller: controller.boardController,
                      decoration: InputDecoration(
                        labelText: AppStrings.tr(
                          'শিক্ষা বোর্ড',
                          'Education board',
                          lang,
                        ),
                        prefixIcon: const Icon(Icons.account_balance_outlined),
                      ),
                    ),
                    const SizedBox(height: 22),
                    _FieldLabel(
                      icon: Icons.timelapse_rounded,
                      title: AppStrings.tr(
                        'প্রতিদিন কতক্ষণ পড়বে?',
                        'HOW LONG WILL YOU STUDY EACH DAY?',
                        lang,
                      ),
                    ),
                    const SizedBox(height: 10),
                    DailyGoalSelectorChips(
                      selectedMinutes: controller.dailyStudyGoalMinutes.value,
                      language: lang,
                      onSelected: controller.selectDailyGoal,
                    ),
                  ],
                ),
                const SizedBox(height: 22),
                _SectionHeading(
                  step: '03',
                  title: AppStrings.tr('অ্যাপ সেটিংস', 'APP SETTINGS', lang),
                  subtitle: AppStrings.tr(
                    'ভাষা ও ডিভাইসে রাখা পড়ার তথ্য',
                    'Language and offline study data',
                    lang,
                  ),
                ),
                const SizedBox(height: 10),
                _SettingsSurface(
                  children: <Widget>[
                    Row(
                      children: <Widget>[
                        Expanded(
                          child: _FieldLabel(
                            icon: Icons.translate_rounded,
                            title: AppStrings.t('common.language', lang),
                          ),
                        ),
                        SegmentedButton<AppLanguage>(
                          segments: const <ButtonSegment<AppLanguage>>[
                            ButtonSegment<AppLanguage>(
                              value: AppLanguage.bn,
                              label: Text('বাংলা'),
                            ),
                            ButtonSegment<AppLanguage>(
                              value: AppLanguage.en,
                              label: Text('EN'),
                            ),
                          ],
                          selected: <AppLanguage>{lang},
                          onSelectionChanged: (selection) {
                            if (selection.isNotEmpty) {
                              controller.setLanguage(selection.first);
                            }
                          },
                        ),
                      ],
                    ),
                    const SizedBox(height: 14),
                    const Divider(height: 1),
                    const SizedBox(height: 12),
                    _ThemePickerTile(
                      language: lang,
                      onTap: () => _openThemePicker(context, lang),
                    ),
                    const SizedBox(height: 12),
                    const Divider(height: 1),
                    const SizedBox(height: 10),
                    OutlinedButton.icon(
                      key: const Key('clear_offline_cache_button'),
                      onPressed: controller.isClearingCache.value
                          ? null
                          : controller.clearOfflineCache,
                      icon: controller.isClearingCache.value
                          ? const SizedBox(
                              width: 18,
                              height: 18,
                              child: CircularProgressIndicator(strokeWidth: 2),
                            )
                          : const Icon(Icons.delete_sweep_outlined),
                      label: Text(
                        AppStrings.tr(
                          'অফলাইন ডাউনলোড পরিষ্কার করুন',
                          'Clear offline downloads',
                          lang,
                        ),
                      ),
                    ),
                    const SizedBox(height: 10),
                    TextButton.icon(
                      key: const Key('logout_button'),
                      onPressed: controller.isLoggingOut.value
                          ? null
                          : controller.logout,
                      icon: const Icon(Icons.logout_rounded),
                      label: Text(AppStrings.t('action.logout', lang)),
                      style: TextButton.styleFrom(
                        foregroundColor: PorhiTheme.rose600,
                        minimumSize: const Size(0, 46),
                      ),
                    ),
                  ],
                ),
                if ((error?.trim().isNotEmpty ?? false) ||
                    (status?.trim().isNotEmpty ?? false)) ...<Widget>[
                  const SizedBox(height: 14),
                  _MessageBanner(
                    message: error?.trim().isNotEmpty == true
                        ? error!.trim()
                        : status!.trim(),
                    isError: error?.trim().isNotEmpty == true,
                  ),
                ],
                const SizedBox(height: 16),
              ],
            );
          }),
        ),
      ),
      bottomNavigationBar: Obx(() {
        final lang = controller.language.value;
        final saving = controller.isSaving.value;
        return SafeArea(
          top: false,
          child: Container(
            padding: const EdgeInsets.fromLTRB(18, 12, 18, 12),
            decoration: BoxDecoration(
              color: PorhiTheme.canvas,
              border: const Border(top: BorderSide(color: PorhiTheme.slate200)),
            ),
            child: FilledButton.icon(
              key: const Key('account_save_button'),
              onPressed: saving ? null : controller.saveProfile,
              icon: saving
                  ? const SizedBox(
                      width: 18,
                      height: 18,
                      child: CircularProgressIndicator(
                        strokeWidth: 2,
                        color: Colors.white,
                      ),
                    )
                  : const Icon(Icons.check_rounded),
              label: Text(
                AppStrings.tr('পরিবর্তন সংরক্ষণ', 'Save changes', lang),
              ),
            ),
          ),
        );
      }),
    );
  }

  Future<void> _openTrackPicker(
    BuildContext context,
    AppLanguage language,
    StudentTrack selectedTrack,
  ) async {
    final result = await showModalBottomSheet<StudentTrack>(
      context: context,
      showDragHandle: true,
      isScrollControlled: true,
      backgroundColor: PorhiTheme.canvas,
      builder: (sheetContext) => SafeArea(
        child: Padding(
          padding: const EdgeInsets.fromLTRB(18, 4, 18, 20),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: <Widget>[
              Text(
                AppStrings.tr(
                  'কারিকুলাম বেছে নাও',
                  'Choose your curriculum',
                  language,
                ),
                style: Theme.of(sheetContext).textTheme.titleLarge,
              ),
              const SizedBox(height: 6),
              Text(
                AppStrings.tr(
                  'তোমার জন্য বিষয় ও অধ্যায় এই ট্র্যাক অনুযায়ী সাজানো হবে।',
                  'Subjects and chapters will follow this track.',
                  language,
                ),
                style: Theme.of(sheetContext).textTheme.bodyMedium,
              ),
              const SizedBox(height: 14),
              for (final track in StudentTrack.values)
                _TrackOptionTile(
                  track: track,
                  language: language,
                  selected: track == selectedTrack,
                  onTap: () => Navigator.of(sheetContext).pop(track),
                ),
            ],
          ),
        ),
      ),
    );
    if (result != null) controller.selectTrack(result);
  }

  Future<void> _openThemePicker(
    BuildContext context,
    AppLanguage language,
  ) async {
    final themeController = Get.find<AppThemeController>();
    themeController.isThemePickerOpen.value = true;
    try {
      await showModalBottomSheet<void>(
        context: context,
        showDragHandle: true,
        isScrollControlled: true,
        backgroundColor: PorhiTheme.canvas,
        builder: (sheetContext) => SafeArea(
          child: ConstrainedBox(
            constraints: BoxConstraints(
              maxHeight: MediaQuery.sizeOf(sheetContext).height * 0.75,
            ),
            child: Padding(
              padding: const EdgeInsets.fromLTRB(18, 4, 18, 20),
              child: Obx(
                () => Column(
                  mainAxisSize: MainAxisSize.min,
                  crossAxisAlignment: CrossAxisAlignment.stretch,
                  children: <Widget>[
                    Text(
                      AppStrings.tr('রঙের থিম', 'Color theme', language),
                      style: Theme.of(sheetContext).textTheme.titleLarge,
                    ),
                    const SizedBox(height: 12),
                    Flexible(
                      child: ListView(
                        shrinkWrap: true,
                        children: <Widget>[
                          for (final theme in PorhiColorTheme.values)
                            _ColorThemeOption(
                              theme: theme,
                              language: language,
                              selected: themeController.selected.value == theme,
                              onTap: () async {
                                await themeController.select(theme);
                                if (sheetContext.mounted) {
                                  Navigator.of(sheetContext).pop();
                                }
                              },
                            ),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ),
        ),
      );
    } finally {
      themeController.isThemePickerOpen.value = false;
    }
  }
}

class _TrackPickerTile extends StatelessWidget {
  final StudentTrack selectedTrack;
  final AppLanguage language;
  final VoidCallback onTap;

  const _TrackPickerTile({
    required this.selectedTrack,
    required this.language,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return Material(
      color: PorhiTheme.slate50,
      borderRadius: BorderRadius.circular(17),
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(17),
        child: Container(
          padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 13),
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(17),
            border: Border.all(color: PorhiTheme.slate200),
          ),
          child: Row(
            children: <Widget>[
              const Icon(Icons.menu_book_rounded, color: PorhiTheme.indigo600),
              const SizedBox(width: 11),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: <Widget>[
                    Text(
                      AppStrings.tr('কারিকুলাম', 'CURRICULUM', language),
                      style: const TextStyle(
                        color: PorhiTheme.slate600,
                        fontSize: 10,
                        fontWeight: FontWeight.w800,
                        letterSpacing: 0.6,
                      ),
                    ),
                    const SizedBox(height: 3),
                    Text(
                      language == AppLanguage.bn
                          ? selectedTrack.labelBn
                          : selectedTrack.labelEn,
                      style: const TextStyle(
                        color: PorhiTheme.slate900,
                        fontSize: 14,
                        fontWeight: FontWeight.w800,
                      ),
                    ),
                  ],
                ),
              ),
              const Icon(Icons.expand_more_rounded, color: PorhiTheme.slate600),
            ],
          ),
        ),
      ),
    );
  }
}

class _TrackOptionTile extends StatelessWidget {
  final StudentTrack track;
  final AppLanguage language;
  final bool selected;
  final VoidCallback onTap;

  const _TrackOptionTile({
    required this.track,
    required this.language,
    required this.selected,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    final label = language == AppLanguage.bn ? track.labelBn : track.labelEn;
    return Padding(
      padding: const EdgeInsets.only(bottom: 8),
      child: Material(
        color: selected ? PorhiTheme.indigo50 : Colors.white,
        borderRadius: BorderRadius.circular(16),
        child: InkWell(
          onTap: onTap,
          borderRadius: BorderRadius.circular(16),
          child: Container(
            key: Key('account_track_option_${track.apiValue}'),
            padding: const EdgeInsets.symmetric(horizontal: 15, vertical: 13),
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(16),
              border: Border.all(
                color: selected ? PorhiTheme.indigo600 : PorhiTheme.slate200,
              ),
            ),
            child: Row(
              children: <Widget>[
                Expanded(
                  child: Text(
                    label,
                    style: TextStyle(
                      color: selected
                          ? PorhiTheme.indigo700
                          : PorhiTheme.slate800,
                      fontWeight: FontWeight.w700,
                    ),
                  ),
                ),
                if (selected)
                  const Icon(
                    Icons.check_circle_rounded,
                    color: PorhiTheme.indigo600,
                    size: 20,
                  ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

class _ThemePickerTile extends StatelessWidget {
  final AppLanguage language;
  final VoidCallback onTap;

  const _ThemePickerTile({required this.language, required this.onTap});

  @override
  Widget build(BuildContext context) {
    final themeController = Get.find<AppThemeController>();
    return Obx(() {
      final theme = themeController.selected.value;
      return ListTile(
        contentPadding: EdgeInsets.zero,
        leading: const Icon(
          Icons.palette_outlined,
          color: PorhiTheme.indigo600,
        ),
        title: Text(AppStrings.tr('রঙের থিম', 'Color theme', language)),
        subtitle: Text(_themeLabel(theme, language)),
        trailing: const Icon(Icons.chevron_right_rounded),
        onTap: onTap,
      );
    });
  }
}

class _ColorThemeOption extends StatelessWidget {
  final PorhiColorTheme theme;
  final AppLanguage language;
  final bool selected;
  final VoidCallback onTap;

  const _ColorThemeOption({
    required this.theme,
    required this.language,
    required this.selected,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    final colors = switch (theme) {
      PorhiColorTheme.evergreen => const [Color(0xFF176B58), Color(0xFFD8EF83)],
      PorhiColorTheme.indigo => const [Color(0xFF4338CA), Color(0xFFC7D2FE)],
      PorhiColorTheme.blue => const [Color(0xFF1D4ED8), Color(0xFF93C5FD)],
      PorhiColorTheme.teal => const [Color(0xFF0F766E), Color(0xFF99F6E4)],
      PorhiColorTheme.orange => const [Color(0xFFC2410C), Color(0xFFFED7AA)],
      PorhiColorTheme.red => const [Color(0xFFB91C1C), Color(0xFFFECACA)],
      PorhiColorTheme.golden => const [Color(0xFFB45309), Color(0xFFFDE68A)],
      PorhiColorTheme.monochrome => const [
        Color(0xFF171717),
        Color(0xFFE5E5E5),
      ],
    };
    return ListTile(
      key: Key('color_theme_${theme.name}'),
      onTap: onTap,
      leading: Container(
        width: 42,
        height: 32,
        decoration: BoxDecoration(
          gradient: LinearGradient(colors: colors),
          borderRadius: BorderRadius.circular(10),
        ),
      ),
      title: Text(_themeLabel(theme, language)),
      trailing: selected
          ? const Icon(Icons.check_circle_rounded, color: PorhiTheme.indigo600)
          : null,
    );
  }
}

String _themeLabel(PorhiColorTheme theme, AppLanguage language) =>
    switch (theme) {
      PorhiColorTheme.evergreen => AppStrings.tr(
        'চিরসবুজ',
        'Evergreen',
        language,
      ),
      PorhiColorTheme.indigo => AppStrings.tr('ইন্ডিগো', 'Indigo', language),
      PorhiColorTheme.blue => AppStrings.tr('নীল', 'Blue', language),
      PorhiColorTheme.teal => AppStrings.tr('টিল', 'Teal', language),
      PorhiColorTheme.orange => AppStrings.tr('কমলা', 'Orange', language),
      PorhiColorTheme.red => AppStrings.tr('লাল', 'Red', language),
      PorhiColorTheme.golden => AppStrings.tr('সোনালী', 'Golden', language),
      PorhiColorTheme.monochrome => AppStrings.tr(
        'সাদা-কালো',
        'Black & white',
        language,
      ),
    };

class _ProfileIdentityCard extends StatelessWidget {
  final String name;
  final String? contact;
  final String trackLabel;
  final bool isGuest;
  final AppLanguage lang;

  const _ProfileIdentityCard({
    required this.name,
    required this.contact,
    required this.trackLabel,
    required this.isGuest,
    required this.lang,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(18),
      decoration: BoxDecoration(
        gradient: PorhiTheme.heroGradient,
        borderRadius: BorderRadius.circular(28),
      ),
      child: Row(
        children: <Widget>[
          Container(
            width: 58,
            height: 58,
            decoration: BoxDecoration(
              color: PorhiTheme.citrus,
              borderRadius: BorderRadius.circular(19),
            ),
            child: const Icon(
              Icons.person_rounded,
              color: PorhiTheme.indigo900,
              size: 30,
            ),
          ),
          const SizedBox(width: 14),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: <Widget>[
                Text(
                  name,
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                  style: const TextStyle(
                    color: Colors.white,
                    fontSize: 18,
                    fontWeight: FontWeight.w800,
                  ),
                ),
                if (contact?.isNotEmpty == true) ...<Widget>[
                  const SizedBox(height: 3),
                  Text(
                    contact!,
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                    style: const TextStyle(
                      color: Color(0xFFD2E6D9),
                      fontSize: 12,
                    ),
                  ),
                ],
                const SizedBox(height: 9),
                Wrap(
                  spacing: 6,
                  children: <Widget>[
                    _IdentityTag(label: trackLabel),
                    if (isGuest)
                      _IdentityTag(
                        label: AppStrings.tr('অতিথি অ্যাকাউন্ট', 'GUEST', lang),
                      ),
                  ],
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

class _IdentityTag extends StatelessWidget {
  final String label;

  const _IdentityTag({required this.label});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 9, vertical: 5),
      decoration: BoxDecoration(
        color: Colors.white.withValues(alpha: 0.13),
        borderRadius: BorderRadius.circular(999),
        border: Border.all(color: Colors.white.withValues(alpha: 0.18)),
      ),
      child: Text(
        label,
        style: const TextStyle(
          color: Colors.white,
          fontSize: 10,
          fontWeight: FontWeight.w700,
        ),
      ),
    );
  }
}

class _SectionHeading extends StatelessWidget {
  final String step;
  final String title;
  final String subtitle;

  const _SectionHeading({
    required this.step,
    required this.title,
    required this.subtitle,
  });

  @override
  Widget build(BuildContext context) {
    return Row(
      children: <Widget>[
        Text(
          step,
          style: const TextStyle(
            color: PorhiTheme.terracotta,
            fontSize: 12,
            fontWeight: FontWeight.w900,
          ),
        ),
        const SizedBox(width: 10),
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: <Widget>[
              Text(
                title,
                style: const TextStyle(
                  color: PorhiTheme.slate900,
                  fontSize: 13,
                  fontWeight: FontWeight.w900,
                  letterSpacing: 0.6,
                ),
              ),
              const SizedBox(height: 2),
              Text(
                subtitle,
                style: const TextStyle(
                  color: PorhiTheme.slate600,
                  fontSize: 12,
                ),
              ),
            ],
          ),
        ),
      ],
    );
  }
}

class _FieldLabel extends StatelessWidget {
  final IconData icon;
  final String title;

  const _FieldLabel({required this.icon, required this.title});

  @override
  Widget build(BuildContext context) {
    return Row(
      children: <Widget>[
        Icon(icon, size: 17, color: PorhiTheme.indigo600),
        const SizedBox(width: 7),
        Expanded(
          child: Text(
            title,
            style: const TextStyle(
              color: PorhiTheme.slate800,
              fontSize: 12,
              fontWeight: FontWeight.w800,
              letterSpacing: 0.25,
            ),
          ),
        ),
      ],
    );
  }
}

class _SettingsSurface extends StatelessWidget {
  final List<Widget> children;

  const _SettingsSurface({required this.children});

  @override
  Widget build(BuildContext context) {
    return Material(
      color: Colors.white,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(22),
        side: const BorderSide(color: PorhiTheme.slate200),
      ),
      clipBehavior: Clip.antiAlias,
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: children,
        ),
      ),
    );
  }
}

class _MessageBanner extends StatelessWidget {
  final String message;
  final bool isError;

  const _MessageBanner({required this.message, required this.isError});

  @override
  Widget build(BuildContext context) {
    final color = isError ? PorhiTheme.rose600 : PorhiTheme.emerald600;
    return Container(
      padding: const EdgeInsets.all(13),
      decoration: BoxDecoration(
        color: color.withValues(alpha: 0.08),
        borderRadius: BorderRadius.circular(14),
      ),
      child: Row(
        children: <Widget>[
          Icon(
            isError ? Icons.error_outline_rounded : Icons.check_circle_outline,
            size: 18,
            color: color,
          ),
          const SizedBox(width: 9),
          Expanded(
            child: Text(
              message,
              style: TextStyle(color: color, fontWeight: FontWeight.w700),
            ),
          ),
        ],
      ),
    );
  }
}
