import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:porhi/core/i18n/app_strings.dart';
import 'package:porhi/core/theme/porhi_theme.dart';
import 'package:porhi/features/auth/presentation/account/controller/account_controller.dart';
import 'package:porhi/features/auth/presentation/widgets/track_selector.dart';

class AccountView extends GetView<AccountController> {
  const AccountView({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Obx(
          () => Text(AppStrings.t('nav.account', controller.language.value)),
        ),
      ),
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(20),
          child: Form(
            key: controller.formKey,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: <Widget>[
                Obx(
                  () => controller.isLoading.value
                      ? const Padding(
                          padding: EdgeInsets.only(bottom: 12),
                          child: LinearProgressIndicator(minHeight: 2),
                        )
                      : const SizedBox.shrink(),
                ),
                Obx(() {
                  final u = controller.user.value;
                  final lang = controller.language.value;
                  final contact = u?.phoneNumber ?? u?.email ?? '';
                  return Card(
                    child: ListTile(
                      leading: CircleAvatar(
                        backgroundColor: PorhiTheme.indigo50,
                        child: const Icon(
                          Icons.person_rounded,
                          color: PorhiTheme.indigo600,
                        ),
                      ),
                      title: Text(
                        u?.fullName?.isNotEmpty == true
                            ? u!.fullName!
                            : AppStrings.tr('শিক্ষার্থী', 'Student', lang),
                        style: const TextStyle(fontWeight: FontWeight.w700),
                      ),
                      subtitle: contact.isNotEmpty ? Text(contact) : null,
                    ),
                  );
                }),
                const SizedBox(height: 12),
                Obx(() {
                  final status = controller.statusMessage.value;
                  final err = controller.errorMessage.value;
                  if ((status == null || status.isEmpty) &&
                      (err == null || err.isEmpty)) {
                    return const SizedBox.shrink();
                  }
                  final isErr = err != null && err.isNotEmpty;
                  return Container(
                    margin: const EdgeInsets.only(bottom: 12),
                    padding: const EdgeInsets.all(12),
                    decoration: BoxDecoration(
                      color: (isErr ? PorhiTheme.rose600 : PorhiTheme.emerald600)
                          .withValues(alpha: 0.08),
                      borderRadius: BorderRadius.circular(12),
                    ),
                    child: Text(
                      isErr ? err : status!,
                      style: TextStyle(
                        color:
                            isErr ? PorhiTheme.rose600 : PorhiTheme.emerald600,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                  );
                }),
                Card(
                  child: Padding(
                    padding: const EdgeInsets.all(16),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.stretch,
                      children: <Widget>[
                        Obx(() {
                          final lang = controller.language.value;
                          return TextFormField(
                            key: const Key('account_name_field'),
                            controller: controller.nameController,
                            maxLength: 80,
                            validator: controller.validateFullName,
                            decoration: InputDecoration(
                              labelText: AppStrings.tr(
                                'পূর্ণ নাম',
                                'Full Name',
                                lang,
                              ),
                              counterText: '',
                            ),
                          );
                        }),
                        const SizedBox(height: 14),
                        Obx(() {
                          final lang = controller.language.value;
                          return Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: <Widget>[
                              Text(
                                AppStrings.tr('ট্র্যাক', 'Track', lang),
                                style: const TextStyle(
                                  fontWeight: FontWeight.w700,
                                  color: PorhiTheme.slate900,
                                ),
                              ),
                              const SizedBox(height: 8),
                              TrackSelectorChips(
                                selectedTrack: controller.selectedTrack.value,
                                language: lang,
                                onSelected: controller.selectTrack,
                              ),
                            ],
                          );
                        }),
                        const SizedBox(height: 14),
                        Obx(() {
                          final lang = controller.language.value;
                          return TextFormField(
                            key: const Key('account_board_field'),
                            controller: controller.boardController,
                            decoration: InputDecoration(
                              labelText: AppStrings.tr(
                                'শিক্ষা বোর্ড',
                                'Education Board',
                                lang,
                              ),
                            ),
                          );
                        }),
                        const SizedBox(height: 14),
                        Obx(() {
                          final lang = controller.language.value;
                          return Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: <Widget>[
                              Text(
                                AppStrings.tr(
                                  'দৈনিক পড়াশোনার লক্ষ্য',
                                  'Daily Study Goal',
                                  lang,
                                ),
                                style: const TextStyle(
                                  fontWeight: FontWeight.w700,
                                  color: PorhiTheme.slate900,
                                ),
                              ),
                              const SizedBox(height: 8),
                              DailyGoalSelectorChips(
                                selectedMinutes:
                                    controller.dailyStudyGoalMinutes.value,
                                language: lang,
                                onSelected: controller.selectDailyGoal,
                              ),
                            ],
                          );
                        }),
                        const SizedBox(height: 16),
                        Obx(() {
                          final lang = controller.language.value;
                          final saving = controller.isSaving.value;
                          return ElevatedButton(
                            key: const Key('account_save_button'),
                            onPressed: saving ? null : controller.saveProfile,
                            child: Text(AppStrings.t('action.save', lang)),
                          );
                        }),
                      ],
                    ),
                  ),
                ),
                const SizedBox(height: 14),
                Card(
                  child: Padding(
                    padding: const EdgeInsets.all(16),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.stretch,
                      children: <Widget>[
                        Obx(() {
                          final lang = controller.language.value;
                          return Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: <Widget>[
                              Text(
                                AppStrings.t('common.language', lang),
                                style: const TextStyle(
                                  fontWeight: FontWeight.w700,
                                  color: PorhiTheme.slate900,
                                ),
                              ),
                              Wrap(
                                spacing: 8,
                                children: <Widget>[
                                  ChoiceChip(
                                    key: const Key('language_toggle_bn'),
                                    label: const Text('বাংলা'),
                                    selected: lang == AppLanguage.bn,
                                    onSelected: (_) =>
                                        controller.setLanguage(AppLanguage.bn),
                                  ),
                                  ChoiceChip(
                                    key: const Key('language_toggle_en'),
                                    label: const Text('EN'),
                                    selected: lang == AppLanguage.en,
                                    onSelected: (_) =>
                                        controller.setLanguage(AppLanguage.en),
                                  ),
                                ],
                              ),
                            ],
                          );
                        }),
                        const Divider(height: 24),
                        Obx(() {
                          final lang = controller.language.value;
                          final clearing = controller.isClearingCache.value;
                          return OutlinedButton.icon(
                            key: const Key('clear_offline_cache_button'),
                            onPressed:
                                clearing ? null : controller.clearOfflineCache,
                            icon: const Icon(Icons.cleaning_services_rounded),
                            label: Text(
                              AppStrings.tr(
                                'অফলাইন ক্যাশ মুছুন',
                                'Clear Offline Cache',
                                lang,
                              ),
                            ),
                          );
                        }),
                        const SizedBox(height: 10),
                        Obx(() {
                          final lang = controller.language.value;
                          final loggingOut = controller.isLoggingOut.value;
                          return OutlinedButton.icon(
                            key: const Key('logout_button'),
                            style: OutlinedButton.styleFrom(
                              foregroundColor: PorhiTheme.rose600,
                              side: const BorderSide(color: PorhiTheme.rose600),
                            ),
                            onPressed: loggingOut ? null : controller.logout,
                            icon: const Icon(Icons.logout_rounded),
                            label: Text(AppStrings.t('action.logout', lang)),
                          );
                        }),
                      ],
                    ),
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
