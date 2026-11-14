import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:porhi/core/i18n/app_strings.dart';
import 'package:porhi/core/theme/porhi_theme.dart';
import 'package:porhi/features/auth/presentation/account/view/account_view.dart';
import 'package:porhi/features/curriculum/presentation/subjects/view/subjects_view.dart';
import 'package:porhi/features/dashboard/presentation/dashboard/view/dashboard_view.dart';
import 'package:porhi/features/planner/presentation/planner/view/planner_view.dart';
import 'package:porhi/features/progress/presentation/progress/view/progress_view.dart';
import 'package:porhi/features/shell/presentation/main_shell/controller/main_shell_controller.dart';
import 'package:porhi/routes/app_routes.dart';

/// Slot builders for the 5-tab shell so feature tabs can be composed
/// Subjects (Task 7) and Planner/Progress (Task 12) without rewriting the shell.
class MainShellTabBuilders {
  final WidgetBuilder homeBuilder;
  final WidgetBuilder subjectsBuilder;
  final WidgetBuilder plannerBuilder;
  final WidgetBuilder progressBuilder;
  final WidgetBuilder profileBuilder;

  const MainShellTabBuilders({
    this.homeBuilder = _defaultHomeBuilder,
    this.subjectsBuilder = _defaultSubjectsBuilder,
    this.plannerBuilder = _defaultPlannerBuilder,
    this.progressBuilder = _defaultProgressBuilder,
    this.profileBuilder = _defaultProfileBuilder,
  });

  static Widget _defaultHomeBuilder(BuildContext context) =>
      const DashboardView();

  static Widget _defaultSubjectsBuilder(BuildContext context) =>
      SubjectsView(onAccountTap: () => _openAccountFromShell(context));

  static Future<void> _openAccountFromShell(BuildContext context) async {
    final originRoute = Get.currentRoute;
    await Get.toNamed(AppRoutes.account);
    if (!context.mounted || Get.currentRoute != originRoute) {
      return;
    }
    if (Get.isRegistered<MainShellController>()) {
      await Get.find<MainShellController>().refreshAfterAccountReturn();
    }
  }

  static Widget _defaultPlannerBuilder(BuildContext context) =>
      PlannerView(onAccountTap: () => _openAccountFromShell(context));

  static Widget _defaultProgressBuilder(BuildContext context) =>
      ProgressView(onAccountTap: () => _openAccountFromShell(context));

  static Widget _defaultProfileBuilder(BuildContext context) =>
      const AccountView(isTab: true);
}

/// 5-tab authenticated shell rendering ONLY the active tab dynamically via [Obx]
/// (without mounting inactive tabs simultaneously).
class MainShellView extends GetView<MainShellController> {
  final MainShellTabBuilders tabBuilders;

  const MainShellView({
    super.key,
    this.tabBuilders = const MainShellTabBuilders(),
  });

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Obx(
        () => switch (controller.currentIndex.value) {
          0 => tabBuilders.homeBuilder(context),
          1 => tabBuilders.subjectsBuilder(context),
          2 => tabBuilders.plannerBuilder(context),
          3 => tabBuilders.progressBuilder(context),
          4 => tabBuilders.profileBuilder(context),
          _ => tabBuilders.homeBuilder(context),
        },
      ),
      bottomNavigationBar: Obx(() {
        final lang = controller.language.value;
        final activeIndex = controller.currentIndex.value;
        const destinations =
            <({IconData icon, IconData activeIcon, String key})>[
              (
                icon: Icons.home_outlined,
                activeIcon: Icons.home_rounded,
                key: 'nav.home',
              ),
              (
                icon: Icons.menu_book_outlined,
                activeIcon: Icons.menu_book_rounded,
                key: 'nav.subjects',
              ),
              (
                icon: Icons.calendar_today_outlined,
                activeIcon: Icons.calendar_today_rounded,
                key: 'nav.planner',
              ),
              (
                icon: Icons.insights_outlined,
                activeIcon: Icons.insights_rounded,
                key: 'nav.progress',
              ),
              (
                icon: Icons.person_outline_rounded,
                activeIcon: Icons.person_rounded,
                key: 'nav.account',
              ),
            ];
        return SafeArea(
          top: false,
          child: Padding(
            padding: const EdgeInsets.fromLTRB(14, 4, 14, 10),
            child: Container(
              height: 68,
              padding: const EdgeInsets.all(6),
              decoration: BoxDecoration(
                color: PorhiTheme.navigationSurface,
                borderRadius: BorderRadius.circular(24),
                boxShadow: const <BoxShadow>[
                  BoxShadow(
                    color: Color(0x2618241F),
                    blurRadius: 22,
                    offset: Offset(0, 8),
                  ),
                ],
              ),
              child: Row(
                children: <Widget>[
                  for (var i = 0; i < destinations.length; i++)
                    Expanded(
                      child: _FloatingNavItem(
                        icon: destinations[i].icon,
                        activeIcon: destinations[i].activeIcon,
                        label: AppStrings.t(destinations[i].key, lang),
                        selected: activeIndex == i,
                        onTap: () => controller.selectTab(i),
                      ),
                    ),
                ],
              ),
            ),
          ),
        );
      }),
    );
  }
}

class _FloatingNavItem extends StatelessWidget {
  final IconData icon;
  final IconData activeIcon;
  final String label;
  final bool selected;
  final VoidCallback onTap;

  const _FloatingNavItem({
    required this.icon,
    required this.activeIcon,
    required this.label,
    required this.selected,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return Semantics(
      button: true,
      selected: selected,
      label: label,
      child: Material(
        color: Colors.transparent,
        child: InkWell(
          key: Key('shell_nav_$label'),
          onTap: onTap,
          borderRadius: BorderRadius.circular(18),
          child: AnimatedContainer(
            duration: const Duration(milliseconds: 180),
            decoration: BoxDecoration(
              color: selected ? PorhiTheme.selectedSurface : Colors.transparent,
              borderRadius: BorderRadius.circular(18),
            ),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: <Widget>[
                Icon(
                  selected ? activeIcon : icon,
                  size: 21,
                  color: selected
                      ? PorhiTheme.selectedForeground
                      : Colors.white.withValues(alpha: 0.78),
                ),
                const SizedBox(height: 3),
                Text(
                  label,
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                  style: TextStyle(
                    color: selected
                        ? PorhiTheme.selectedForeground
                        : Colors.white.withValues(alpha: 0.78),
                    fontSize: 10,
                    fontWeight: selected ? FontWeight.w800 : FontWeight.w600,
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

/// Dedicated placeholder slot for the Planner tab (replaced in Task 12).
class PlannerTabSlot extends StatelessWidget {
  const PlannerTabSlot({super.key});

  @override
  Widget build(BuildContext context) {
    return const _ShellPlaceholderSlot(
      icon: Icons.calendar_today_rounded,
      titleBn: 'স্টাডি প্ল্যানার',
      titleEn: 'Study Planner',
      subtitleBn: 'দৈনিক লক্ষ্য, স্মার্ট রুটিন ও রিমাইন্ডার এখানে সাজানো হবে।',
      subtitleEn:
          'Organize daily study targets, smart schedules, and reminders here.',
    );
  }
}

/// Dedicated placeholder slot for the Progress tab (replaced in Task 12).
class ProgressTabSlot extends StatelessWidget {
  const ProgressTabSlot({super.key});

  @override
  Widget build(BuildContext context) {
    return const _ShellPlaceholderSlot(
      icon: Icons.bar_chart_rounded,
      titleBn: 'অগ্রগতি ও দুর্বলতা বিশ্লেষণ',
      titleEn: 'Progress & Analytics',
      subtitleBn: 'নির্ভুলতা, ভুলের তালিকা ও অভিভাবক শেয়ার লিংক এখানে দেখাবে।',
      subtitleEn:
          'Track accuracy, mistake bank insights, and guardian share links here.',
    );
  }
}

class _ShellPlaceholderSlot extends GetView<MainShellController> {
  final IconData icon;
  final String titleBn;
  final String titleEn;
  final String subtitleBn;
  final String subtitleEn;

  const _ShellPlaceholderSlot({
    required this.icon,
    required this.titleBn,
    required this.titleEn,
    required this.subtitleBn,
    required this.subtitleEn,
  });

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Obx(
          () =>
              Text(AppStrings.tr(titleBn, titleEn, controller.language.value)),
        ),
      ),
      body: Center(
        child: Padding(
          padding: const EdgeInsets.all(24),
          child: Obx(() {
            final lang = controller.language.value;
            return Column(
              mainAxisSize: MainAxisSize.min,
              children: <Widget>[
                Container(
                  width: 64,
                  height: 64,
                  decoration: BoxDecoration(
                    color: PorhiTheme.indigo50,
                    borderRadius: BorderRadius.circular(18),
                  ),
                  child: Icon(icon, size: 32, color: PorhiTheme.indigo600),
                ),
                const SizedBox(height: 16),
                Text(
                  AppStrings.tr(titleBn, titleEn, lang),
                  textAlign: TextAlign.center,
                  style: const TextStyle(
                    fontSize: 20,
                    fontWeight: FontWeight.w700,
                    color: PorhiTheme.slate900,
                  ),
                ),
                const SizedBox(height: 8),
                Text(
                  AppStrings.tr(subtitleBn, subtitleEn, lang),
                  textAlign: TextAlign.center,
                  style: const TextStyle(
                    fontSize: 14,
                    color: PorhiTheme.slate600,
                    height: 1.4,
                  ),
                ),
                const SizedBox(height: 20),
                OutlinedButton.icon(
                  onPressed: () => controller.selectTab(0),
                  icon: const Icon(Icons.home_rounded),
                  label: Text(AppStrings.t('nav.home', lang)),
                ),
              ],
            );
          }),
        ),
      ),
    );
  }
}
