import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:porhi/core/i18n/app_strings.dart';
import 'package:porhi/core/theme/porhi_theme.dart';
import 'package:porhi/features/auth/presentation/onboarding/controller/onboarding_controller.dart';
import 'package:porhi/features/auth/presentation/widgets/track_selector.dart';

class OnboardingView extends GetView<OnboardingController> {
  const OnboardingView({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: PorhiTheme.canvas,
      appBar: AppBar(
        elevation: 0,
        backgroundColor: Colors.white,
        title: Obx(
          () => Text(
            AppStrings.tr(
              'প্রোফাইল সেটআপ',
              'Profile Setup',
              controller.language.value,
            ),
            style: const TextStyle(
              fontSize: 18,
              fontWeight: FontWeight.w700,
              color: PorhiTheme.slate900,
            ),
          ),
        ),
      ),
      body: SafeArea(
        child: Center(
          child: SingleChildScrollView(
            padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 16),
            child: ConstrainedBox(
              constraints: const BoxConstraints(maxWidth: 480),
              child: Form(
                key: controller.formKey,
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.stretch,
                  children: <Widget>[
                    Obx(() {
                      final lang = controller.language.value;
                      return Container(
                        padding: const EdgeInsets.all(18),
                        decoration: BoxDecoration(
                          gradient: PorhiTheme.heroGradient,
                          borderRadius: BorderRadius.circular(18),
                          boxShadow: PorhiTheme.cardShadow,
                        ),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: <Widget>[
                            Text(
                              AppStrings.tr(
                                'আপনার পড়াশোনার লক্ষ্য ঠিক করুন',
                                'Personalize your study path',
                                lang,
                              ),
                              style: const TextStyle(
                                fontSize: 20,
                                fontWeight: FontWeight.w800,
                                color: Colors.white,
                              ),
                            ),
                            const SizedBox(height: 6),
                            Text(
                              AppStrings.tr(
                                'আপনার শ্রেণি ও দৈনিক লক্ষ্য অনুযায়ী কনটেন্ট সাজানো হবে।',
                                'We will tailor lessons and practice for your track.',
                                lang,
                              ),
                              style: const TextStyle(
                                fontSize: 13,
                                color: Color(0xFFC7D2FE),
                                height: 1.4,
                              ),
                            ),
                          ],
                        ),
                      );
                    }),
                    const SizedBox(height: 16),
                    Obx(() {
                      final err = controller.errorMessage.value;
                      if (err == null || err.isEmpty) {
                        return const SizedBox.shrink();
                      }
                      return Container(
                        margin: const EdgeInsets.only(bottom: 14),
                        padding: const EdgeInsets.all(12),
                        decoration: BoxDecoration(
                          color: PorhiTheme.rose50,
                          borderRadius: BorderRadius.circular(12),
                          border: Border.all(
                            color: PorhiTheme.rose600.withValues(alpha: 0.25),
                          ),
                        ),
                        child: Row(
                          children: <Widget>[
                            const Icon(
                              Icons.error_outline_rounded,
                              size: 18,
                              color: PorhiTheme.rose600,
                            ),
                            const SizedBox(width: 8),
                            Expanded(
                              child: Text(
                                err,
                                style: const TextStyle(
                                  color: PorhiTheme.rose600,
                                  fontWeight: FontWeight.w600,
                                ),
                              ),
                            ),
                          ],
                        ),
                      );
                    }),
                    Container(
                      padding: const EdgeInsets.all(18),
                      decoration: BoxDecoration(
                        color: Colors.white,
                        borderRadius: BorderRadius.circular(20),
                        border: Border.all(color: const Color(0xFFE8ECF4)),
                        boxShadow: PorhiTheme.subtleShadow,
                      ),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.stretch,
                        children: <Widget>[
                          Obx(() {
                            final lang = controller.language.value;
                            return TextFormField(
                              key: const Key('onboarding_name_field'),
                              controller: controller.nameController,
                              validator: controller.validateFullName,
                              maxLength: 80,
                              decoration: InputDecoration(
                                labelText: AppStrings.tr(
                                  'পূর্ণ নাম',
                                  'Full Name',
                                  lang,
                                ),
                                prefixIcon: const Icon(
                                  Icons.person_outline_rounded,
                                  color: PorhiTheme.indigo600,
                                ),
                                hintText: AppStrings.tr(
                                  'যেমন: তাসনিম আক্তার',
                                  'e.g. Tasnim Akter',
                                  lang,
                                ),
                                counterText: '',
                              ),
                            );
                          }),
                          const SizedBox(height: 16),
                          Obx(() {
                            final lang = controller.language.value;
                            return Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: <Widget>[
                                Text(
                                  AppStrings.tr(
                                    'শিক্ষা ট্র্যাক নির্বাচন করুন',
                                    'Select Track',
                                    lang,
                                  ),
                                  style: const TextStyle(
                                    fontSize: 14,
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
                          const SizedBox(height: 16),
                          Obx(() {
                            final lang = controller.language.value;
                            return TextFormField(
                              key: const Key('onboarding_board_field'),
                              controller: controller.boardController,
                              decoration: InputDecoration(
                                labelText: AppStrings.tr(
                                  'শিক্ষা বোর্ড (ঐচ্ছিক)',
                                  'Education Board (Optional)',
                                  lang,
                                ),
                                prefixIcon: const Icon(
                                  Icons.account_balance_outlined,
                                  color: PorhiTheme.indigo600,
                                ),
                                hintText: AppStrings.tr(
                                  'যেমন: ঢাকা বোর্ড',
                                  'e.g. Dhaka Board',
                                  lang,
                                ),
                              ),
                            );
                          }),
                          const SizedBox(height: 16),
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
                                    fontSize: 14,
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
                            return Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: <Widget>[
                                Text(
                                  AppStrings.t('common.language', lang),
                                  style: const TextStyle(
                                    fontSize: 14,
                                    fontWeight: FontWeight.w700,
                                    color: PorhiTheme.slate900,
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
                                      label: Text('English'),
                                    ),
                                  ],
                                  selected: <AppLanguage>{lang},
                                  onSelectionChanged: (set) {
                                    if (set.isNotEmpty) {
                                      controller.setLanguage(set.first);
                                    }
                                  },
                                ),
                              ],
                            );
                          }),
                        ],
                      ),
                    ),
                    const SizedBox(height: 20),
                    Obx(() {
                      final lang = controller.language.value;
                      final loading = controller.isSubmitting.value;
                      return ElevatedButton(
                        key: const Key('onboarding_submit_button'),
                        style: ElevatedButton.styleFrom(
                          minimumSize: const Size(0, 52),
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(14),
                          ),
                        ),
                        onPressed: loading ? null : controller.submit,
                        child: loading
                            ? const SizedBox(
                                width: 20,
                                height: 20,
                                child: CircularProgressIndicator(
                                  strokeWidth: 2,
                                  color: Colors.white,
                                ),
                              )
                            : Text(AppStrings.t('action.continue', lang)),
                      );
                    }),
                  ],
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }
}
