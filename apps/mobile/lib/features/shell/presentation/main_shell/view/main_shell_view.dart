import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:porhi/core/i18n/app_strings.dart';
import 'package:porhi/core/theme/porhi_theme.dart';
import 'package:porhi/features/curriculum/presentation/subjects/view/subjects_view.dart';
import 'package:porhi/features/dashboard/presentation/dashboard/view/dashboard_view.dart';
import 'package:porhi/features/planner/presentation/planner/view/planner_view.dart';
import 'package:porhi/features/progress/presentation/progress/view/progress_view.dart';
import 'package:porhi/features/shell/presentation/main_shell/controller/main_shell_controller.dart';
import 'package:porhi/routes/app_routes.dart';

/// Slot builders for the 4-tab shell so future feature tasks can plug in
/// Subjects (Task 7) and Planner/Progress (Task 12) without rewriting the shell.
class MainShellTabBuilders {
  final WidgetBuilder homeBuilder;
  final WidgetBuilder subjectsBuilder;
  final WidgetBuilder plannerBuilder;
  final WidgetBuilder progressBuilder;

  const MainShellTabBuilders({
    this.homeBuilder = _defaultHomeBuilder,
    this.subjectsBuilder = _defaultSubjectsBuilder,
    this.plannerBuilder = _defaultPlannerBuilder,
    this.progressBuilder = _defaultProgressBuilder,
  });

  static Widget _defaultHomeBuilder(BuildContext context) =>
      const DashboardView();

  static Widget _defaultSubjectsBuilder(BuildContext context) => SubjectsView(
        onAccountTap: () => _openAccountFromShell(context),
      );

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

  static Widget _defaultPlannerBuilder(BuildContext context) => PlannerView(
        onAccountTap: () => _openAccountFromShell(context),
      );

  static Widget _defaultProgressBuilder(BuildContext context) => ProgressView(
        onAccountTap: () => _openAccountFromShell(context),
      );
}

/// 4-tab authenticated shell rendering ONLY the active tab dynamically via [Obx]
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
          _ => tabBuilders.homeBuilder(context),
        },
      ),
      bottomNavigationBar: Obx(() {
        final lang = controller.language.value;
        final activeIndex = controller.currentIndex.value;
        return Container(
          decoration: BoxDecoration(
            color: Colors.white,
            border: const Border(
              top: BorderSide(color: Color(0xFFE8ECF4), width: 1),
            ),
            boxShadow: PorhiTheme.subtleShadow,
          ),
          child: NavigationBar(
            selectedIndex: activeIndex,
            onDestinationSelected: controller.selectTab,
            destinations: <NavigationDestination>[
              NavigationDestination(
                icon: const Icon(Icons.home_outlined),
                selectedIcon: const Icon(
                  Icons.home_rounded,
                  color: PorhiTheme.indigo600,
                ),
                label: AppStrings.t('nav.home', lang),
              ),
              NavigationDestination(
                icon: const Icon(Icons.menu_book_outlined),
                selectedIcon: const Icon(
                  Icons.menu_book_rounded,
                  color: PorhiTheme.indigo600,
                ),
                label: AppStrings.t('nav.subjects', lang),
              ),
              NavigationDestination(
                icon: const Icon(Icons.calendar_today_outlined),
                selectedIcon: const Icon(
                  Icons.calendar_today_rounded,
                  color: PorhiTheme.indigo600,
                ),
                label: AppStrings.t('nav.planner', lang),
              ),
              NavigationDestination(
                icon: const Icon(Icons.bar_chart_outlined),
                selectedIcon: const Icon(
                  Icons.bar_chart_rounded,
                  color: PorhiTheme.indigo600,
                ),
                label: AppStrings.t('nav.progress', lang),
              ),
            ],
          ),
        );
      }),
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
          () => Text(
            AppStrings.tr(titleBn, titleEn, controller.language.value),
          ),
        ),
        actions: <Widget>[
          Obx(
            () => IconButton(
              key: const Key('slot_account_button'),
              tooltip: AppStrings.t('nav.account', controller.language.value),
              icon: const Icon(Icons.person_outline_rounded),
              onPressed: () =>
                  MainShellTabBuilders._openAccountFromShell(context),
            ),
          ),
        ],
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
