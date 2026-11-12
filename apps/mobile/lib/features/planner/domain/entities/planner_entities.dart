import 'package:equatable/equatable.dart';
import 'package:porhi/features/dashboard/domain/entities/student_overview_entity.dart';

export 'package:porhi/features/dashboard/domain/entities/student_overview_entity.dart'
    show PlannerOverviewEntity, PlannerTaskSummaryEntity;

enum PlannerTargetType {
  lesson('LESSON', 'লেসন', 'Lesson'),
  practice('PRACTICE', 'অনুশীলন', 'Practice'),
  modelTest('MODEL_TEST', 'মডেল টেস্ট', 'Model Test'),
  revision('REVISION', 'রিভিশন', 'Revision'),
  custom('CUSTOM', 'কাস্টম', 'Custom');

  final String apiValue;
  final String labelBn;
  final String labelEn;

  const PlannerTargetType(this.apiValue, this.labelBn, this.labelEn);

  static PlannerTargetType fromApiValue(String? raw) {
    final normalized = raw?.trim().toUpperCase();
    for (final value in PlannerTargetType.values) {
      if (value.apiValue == normalized) return value;
    }
    return PlannerTargetType.custom;
  }
}

enum PlannerTaskFilter { all, dueToday, completed }

class AutoGeneratePlanResultEntity extends Equatable {
  final int createdCount;
  final List<PlannerTaskSummaryEntity> tasks;

  const AutoGeneratePlanResultEntity({
    this.createdCount = 0,
    this.tasks = const <PlannerTaskSummaryEntity>[],
  });

  @override
  List<Object?> get props => <Object?>[createdCount, tasks];
}
