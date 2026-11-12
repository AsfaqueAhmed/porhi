// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'app_database.dart';

// ignore_for_file: type=lint
class $DownloadedChaptersTable extends DownloadedChapters
    with TableInfo<$DownloadedChaptersTable, DownloadedChapter> {
  @override
  final GeneratedDatabase attachedDatabase;
  final String? _alias;
  $DownloadedChaptersTable(this.attachedDatabase, [this._alias]);
  static const VerificationMeta _idMeta = const VerificationMeta('id');
  @override
  late final GeneratedColumn<String> id = GeneratedColumn<String>(
    'id',
    aliasedName,
    false,
    type: DriftSqlType.string,
    requiredDuringInsert: true,
  );
  static const VerificationMeta _subjectIdMeta = const VerificationMeta(
    'subjectId',
  );
  @override
  late final GeneratedColumn<String> subjectId = GeneratedColumn<String>(
    'subject_id',
    aliasedName,
    false,
    type: DriftSqlType.string,
    requiredDuringInsert: true,
  );
  static const VerificationMeta _titleBanglaMeta = const VerificationMeta(
    'titleBangla',
  );
  @override
  late final GeneratedColumn<String> titleBangla = GeneratedColumn<String>(
    'title_bangla',
    aliasedName,
    false,
    type: DriftSqlType.string,
    requiredDuringInsert: true,
  );
  static const VerificationMeta _titleEnglishMeta = const VerificationMeta(
    'titleEnglish',
  );
  @override
  late final GeneratedColumn<String> titleEnglish = GeneratedColumn<String>(
    'title_english',
    aliasedName,
    true,
    type: DriftSqlType.string,
    requiredDuringInsert: false,
  );
  static const VerificationMeta _versionMeta = const VerificationMeta(
    'version',
  );
  @override
  late final GeneratedColumn<int> version = GeneratedColumn<int>(
    'version',
    aliasedName,
    false,
    type: DriftSqlType.int,
    requiredDuringInsert: false,
    defaultValue: const Constant(1),
  );
  static const VerificationMeta _lessonCountMeta = const VerificationMeta(
    'lessonCount',
  );
  @override
  late final GeneratedColumn<int> lessonCount = GeneratedColumn<int>(
    'lesson_count',
    aliasedName,
    false,
    type: DriftSqlType.int,
    requiredDuringInsert: false,
    defaultValue: const Constant(0),
  );
  static const VerificationMeta _questionCountMeta = const VerificationMeta(
    'questionCount',
  );
  @override
  late final GeneratedColumn<int> questionCount = GeneratedColumn<int>(
    'question_count',
    aliasedName,
    false,
    type: DriftSqlType.int,
    requiredDuringInsert: false,
    defaultValue: const Constant(0),
  );
  static const VerificationMeta _sizeBytesMeta = const VerificationMeta(
    'sizeBytes',
  );
  @override
  late final GeneratedColumn<int> sizeBytes = GeneratedColumn<int>(
    'size_bytes',
    aliasedName,
    false,
    type: DriftSqlType.int,
    requiredDuringInsert: false,
    defaultValue: const Constant(0),
  );
  static const VerificationMeta _downloadedAtMeta = const VerificationMeta(
    'downloadedAt',
  );
  @override
  late final GeneratedColumn<DateTime> downloadedAt = GeneratedColumn<DateTime>(
    'downloaded_at',
    aliasedName,
    false,
    type: DriftSqlType.dateTime,
    requiredDuringInsert: true,
  );
  static const VerificationMeta _metadataJsonMeta = const VerificationMeta(
    'metadataJson',
  );
  @override
  late final GeneratedColumn<String> metadataJson = GeneratedColumn<String>(
    'metadata_json',
    aliasedName,
    true,
    type: DriftSqlType.string,
    requiredDuringInsert: false,
  );
  @override
  List<GeneratedColumn> get $columns => [
    id,
    subjectId,
    titleBangla,
    titleEnglish,
    version,
    lessonCount,
    questionCount,
    sizeBytes,
    downloadedAt,
    metadataJson,
  ];
  @override
  String get aliasedName => _alias ?? actualTableName;
  @override
  String get actualTableName => $name;
  static const String $name = 'downloaded_chapters';
  @override
  VerificationContext validateIntegrity(
    Insertable<DownloadedChapter> instance, {
    bool isInserting = false,
  }) {
    final context = VerificationContext();
    final data = instance.toColumns(true);
    if (data.containsKey('id')) {
      context.handle(_idMeta, id.isAcceptableOrUnknown(data['id']!, _idMeta));
    } else if (isInserting) {
      context.missing(_idMeta);
    }
    if (data.containsKey('subject_id')) {
      context.handle(
        _subjectIdMeta,
        subjectId.isAcceptableOrUnknown(data['subject_id']!, _subjectIdMeta),
      );
    } else if (isInserting) {
      context.missing(_subjectIdMeta);
    }
    if (data.containsKey('title_bangla')) {
      context.handle(
        _titleBanglaMeta,
        titleBangla.isAcceptableOrUnknown(
          data['title_bangla']!,
          _titleBanglaMeta,
        ),
      );
    } else if (isInserting) {
      context.missing(_titleBanglaMeta);
    }
    if (data.containsKey('title_english')) {
      context.handle(
        _titleEnglishMeta,
        titleEnglish.isAcceptableOrUnknown(
          data['title_english']!,
          _titleEnglishMeta,
        ),
      );
    }
    if (data.containsKey('version')) {
      context.handle(
        _versionMeta,
        version.isAcceptableOrUnknown(data['version']!, _versionMeta),
      );
    }
    if (data.containsKey('lesson_count')) {
      context.handle(
        _lessonCountMeta,
        lessonCount.isAcceptableOrUnknown(
          data['lesson_count']!,
          _lessonCountMeta,
        ),
      );
    }
    if (data.containsKey('question_count')) {
      context.handle(
        _questionCountMeta,
        questionCount.isAcceptableOrUnknown(
          data['question_count']!,
          _questionCountMeta,
        ),
      );
    }
    if (data.containsKey('size_bytes')) {
      context.handle(
        _sizeBytesMeta,
        sizeBytes.isAcceptableOrUnknown(data['size_bytes']!, _sizeBytesMeta),
      );
    }
    if (data.containsKey('downloaded_at')) {
      context.handle(
        _downloadedAtMeta,
        downloadedAt.isAcceptableOrUnknown(
          data['downloaded_at']!,
          _downloadedAtMeta,
        ),
      );
    } else if (isInserting) {
      context.missing(_downloadedAtMeta);
    }
    if (data.containsKey('metadata_json')) {
      context.handle(
        _metadataJsonMeta,
        metadataJson.isAcceptableOrUnknown(
          data['metadata_json']!,
          _metadataJsonMeta,
        ),
      );
    }
    return context;
  }

  @override
  Set<GeneratedColumn> get $primaryKey => {id};
  @override
  DownloadedChapter map(Map<String, dynamic> data, {String? tablePrefix}) {
    final effectivePrefix = tablePrefix != null ? '$tablePrefix.' : '';
    return DownloadedChapter(
      id: attachedDatabase.typeMapping.read(
        DriftSqlType.string,
        data['${effectivePrefix}id'],
      )!,
      subjectId: attachedDatabase.typeMapping.read(
        DriftSqlType.string,
        data['${effectivePrefix}subject_id'],
      )!,
      titleBangla: attachedDatabase.typeMapping.read(
        DriftSqlType.string,
        data['${effectivePrefix}title_bangla'],
      )!,
      titleEnglish: attachedDatabase.typeMapping.read(
        DriftSqlType.string,
        data['${effectivePrefix}title_english'],
      ),
      version: attachedDatabase.typeMapping.read(
        DriftSqlType.int,
        data['${effectivePrefix}version'],
      )!,
      lessonCount: attachedDatabase.typeMapping.read(
        DriftSqlType.int,
        data['${effectivePrefix}lesson_count'],
      )!,
      questionCount: attachedDatabase.typeMapping.read(
        DriftSqlType.int,
        data['${effectivePrefix}question_count'],
      )!,
      sizeBytes: attachedDatabase.typeMapping.read(
        DriftSqlType.int,
        data['${effectivePrefix}size_bytes'],
      )!,
      downloadedAt: attachedDatabase.typeMapping.read(
        DriftSqlType.dateTime,
        data['${effectivePrefix}downloaded_at'],
      )!,
      metadataJson: attachedDatabase.typeMapping.read(
        DriftSqlType.string,
        data['${effectivePrefix}metadata_json'],
      ),
    );
  }

  @override
  $DownloadedChaptersTable createAlias(String alias) {
    return $DownloadedChaptersTable(attachedDatabase, alias);
  }
}

class DownloadedChapter extends DataClass
    implements Insertable<DownloadedChapter> {
  final String id;
  final String subjectId;
  final String titleBangla;
  final String? titleEnglish;
  final int version;
  final int lessonCount;
  final int questionCount;
  final int sizeBytes;
  final DateTime downloadedAt;
  final String? metadataJson;
  const DownloadedChapter({
    required this.id,
    required this.subjectId,
    required this.titleBangla,
    this.titleEnglish,
    required this.version,
    required this.lessonCount,
    required this.questionCount,
    required this.sizeBytes,
    required this.downloadedAt,
    this.metadataJson,
  });
  @override
  Map<String, Expression> toColumns(bool nullToAbsent) {
    final map = <String, Expression>{};
    map['id'] = Variable<String>(id);
    map['subject_id'] = Variable<String>(subjectId);
    map['title_bangla'] = Variable<String>(titleBangla);
    if (!nullToAbsent || titleEnglish != null) {
      map['title_english'] = Variable<String>(titleEnglish);
    }
    map['version'] = Variable<int>(version);
    map['lesson_count'] = Variable<int>(lessonCount);
    map['question_count'] = Variable<int>(questionCount);
    map['size_bytes'] = Variable<int>(sizeBytes);
    map['downloaded_at'] = Variable<DateTime>(downloadedAt);
    if (!nullToAbsent || metadataJson != null) {
      map['metadata_json'] = Variable<String>(metadataJson);
    }
    return map;
  }

  DownloadedChaptersCompanion toCompanion(bool nullToAbsent) {
    return DownloadedChaptersCompanion(
      id: Value(id),
      subjectId: Value(subjectId),
      titleBangla: Value(titleBangla),
      titleEnglish: titleEnglish == null && nullToAbsent
          ? const Value.absent()
          : Value(titleEnglish),
      version: Value(version),
      lessonCount: Value(lessonCount),
      questionCount: Value(questionCount),
      sizeBytes: Value(sizeBytes),
      downloadedAt: Value(downloadedAt),
      metadataJson: metadataJson == null && nullToAbsent
          ? const Value.absent()
          : Value(metadataJson),
    );
  }

  factory DownloadedChapter.fromJson(
    Map<String, dynamic> json, {
    ValueSerializer? serializer,
  }) {
    serializer ??= driftRuntimeOptions.defaultSerializer;
    return DownloadedChapter(
      id: serializer.fromJson<String>(json['id']),
      subjectId: serializer.fromJson<String>(json['subjectId']),
      titleBangla: serializer.fromJson<String>(json['titleBangla']),
      titleEnglish: serializer.fromJson<String?>(json['titleEnglish']),
      version: serializer.fromJson<int>(json['version']),
      lessonCount: serializer.fromJson<int>(json['lessonCount']),
      questionCount: serializer.fromJson<int>(json['questionCount']),
      sizeBytes: serializer.fromJson<int>(json['sizeBytes']),
      downloadedAt: serializer.fromJson<DateTime>(json['downloadedAt']),
      metadataJson: serializer.fromJson<String?>(json['metadataJson']),
    );
  }
  @override
  Map<String, dynamic> toJson({ValueSerializer? serializer}) {
    serializer ??= driftRuntimeOptions.defaultSerializer;
    return <String, dynamic>{
      'id': serializer.toJson<String>(id),
      'subjectId': serializer.toJson<String>(subjectId),
      'titleBangla': serializer.toJson<String>(titleBangla),
      'titleEnglish': serializer.toJson<String?>(titleEnglish),
      'version': serializer.toJson<int>(version),
      'lessonCount': serializer.toJson<int>(lessonCount),
      'questionCount': serializer.toJson<int>(questionCount),
      'sizeBytes': serializer.toJson<int>(sizeBytes),
      'downloadedAt': serializer.toJson<DateTime>(downloadedAt),
      'metadataJson': serializer.toJson<String?>(metadataJson),
    };
  }

  DownloadedChapter copyWith({
    String? id,
    String? subjectId,
    String? titleBangla,
    Value<String?> titleEnglish = const Value.absent(),
    int? version,
    int? lessonCount,
    int? questionCount,
    int? sizeBytes,
    DateTime? downloadedAt,
    Value<String?> metadataJson = const Value.absent(),
  }) => DownloadedChapter(
    id: id ?? this.id,
    subjectId: subjectId ?? this.subjectId,
    titleBangla: titleBangla ?? this.titleBangla,
    titleEnglish: titleEnglish.present ? titleEnglish.value : this.titleEnglish,
    version: version ?? this.version,
    lessonCount: lessonCount ?? this.lessonCount,
    questionCount: questionCount ?? this.questionCount,
    sizeBytes: sizeBytes ?? this.sizeBytes,
    downloadedAt: downloadedAt ?? this.downloadedAt,
    metadataJson: metadataJson.present ? metadataJson.value : this.metadataJson,
  );
  DownloadedChapter copyWithCompanion(DownloadedChaptersCompanion data) {
    return DownloadedChapter(
      id: data.id.present ? data.id.value : this.id,
      subjectId: data.subjectId.present ? data.subjectId.value : this.subjectId,
      titleBangla: data.titleBangla.present
          ? data.titleBangla.value
          : this.titleBangla,
      titleEnglish: data.titleEnglish.present
          ? data.titleEnglish.value
          : this.titleEnglish,
      version: data.version.present ? data.version.value : this.version,
      lessonCount: data.lessonCount.present
          ? data.lessonCount.value
          : this.lessonCount,
      questionCount: data.questionCount.present
          ? data.questionCount.value
          : this.questionCount,
      sizeBytes: data.sizeBytes.present ? data.sizeBytes.value : this.sizeBytes,
      downloadedAt: data.downloadedAt.present
          ? data.downloadedAt.value
          : this.downloadedAt,
      metadataJson: data.metadataJson.present
          ? data.metadataJson.value
          : this.metadataJson,
    );
  }

  @override
  String toString() {
    return (StringBuffer('DownloadedChapter(')
          ..write('id: $id, ')
          ..write('subjectId: $subjectId, ')
          ..write('titleBangla: $titleBangla, ')
          ..write('titleEnglish: $titleEnglish, ')
          ..write('version: $version, ')
          ..write('lessonCount: $lessonCount, ')
          ..write('questionCount: $questionCount, ')
          ..write('sizeBytes: $sizeBytes, ')
          ..write('downloadedAt: $downloadedAt, ')
          ..write('metadataJson: $metadataJson')
          ..write(')'))
        .toString();
  }

  @override
  int get hashCode => Object.hash(
    id,
    subjectId,
    titleBangla,
    titleEnglish,
    version,
    lessonCount,
    questionCount,
    sizeBytes,
    downloadedAt,
    metadataJson,
  );
  @override
  bool operator ==(Object other) =>
      identical(this, other) ||
      (other is DownloadedChapter &&
          other.id == this.id &&
          other.subjectId == this.subjectId &&
          other.titleBangla == this.titleBangla &&
          other.titleEnglish == this.titleEnglish &&
          other.version == this.version &&
          other.lessonCount == this.lessonCount &&
          other.questionCount == this.questionCount &&
          other.sizeBytes == this.sizeBytes &&
          other.downloadedAt == this.downloadedAt &&
          other.metadataJson == this.metadataJson);
}

class DownloadedChaptersCompanion extends UpdateCompanion<DownloadedChapter> {
  final Value<String> id;
  final Value<String> subjectId;
  final Value<String> titleBangla;
  final Value<String?> titleEnglish;
  final Value<int> version;
  final Value<int> lessonCount;
  final Value<int> questionCount;
  final Value<int> sizeBytes;
  final Value<DateTime> downloadedAt;
  final Value<String?> metadataJson;
  final Value<int> rowid;
  const DownloadedChaptersCompanion({
    this.id = const Value.absent(),
    this.subjectId = const Value.absent(),
    this.titleBangla = const Value.absent(),
    this.titleEnglish = const Value.absent(),
    this.version = const Value.absent(),
    this.lessonCount = const Value.absent(),
    this.questionCount = const Value.absent(),
    this.sizeBytes = const Value.absent(),
    this.downloadedAt = const Value.absent(),
    this.metadataJson = const Value.absent(),
    this.rowid = const Value.absent(),
  });
  DownloadedChaptersCompanion.insert({
    required String id,
    required String subjectId,
    required String titleBangla,
    this.titleEnglish = const Value.absent(),
    this.version = const Value.absent(),
    this.lessonCount = const Value.absent(),
    this.questionCount = const Value.absent(),
    this.sizeBytes = const Value.absent(),
    required DateTime downloadedAt,
    this.metadataJson = const Value.absent(),
    this.rowid = const Value.absent(),
  }) : id = Value(id),
       subjectId = Value(subjectId),
       titleBangla = Value(titleBangla),
       downloadedAt = Value(downloadedAt);
  static Insertable<DownloadedChapter> custom({
    Expression<String>? id,
    Expression<String>? subjectId,
    Expression<String>? titleBangla,
    Expression<String>? titleEnglish,
    Expression<int>? version,
    Expression<int>? lessonCount,
    Expression<int>? questionCount,
    Expression<int>? sizeBytes,
    Expression<DateTime>? downloadedAt,
    Expression<String>? metadataJson,
    Expression<int>? rowid,
  }) {
    return RawValuesInsertable({
      if (id != null) 'id': id,
      if (subjectId != null) 'subject_id': subjectId,
      if (titleBangla != null) 'title_bangla': titleBangla,
      if (titleEnglish != null) 'title_english': titleEnglish,
      if (version != null) 'version': version,
      if (lessonCount != null) 'lesson_count': lessonCount,
      if (questionCount != null) 'question_count': questionCount,
      if (sizeBytes != null) 'size_bytes': sizeBytes,
      if (downloadedAt != null) 'downloaded_at': downloadedAt,
      if (metadataJson != null) 'metadata_json': metadataJson,
      if (rowid != null) 'rowid': rowid,
    });
  }

  DownloadedChaptersCompanion copyWith({
    Value<String>? id,
    Value<String>? subjectId,
    Value<String>? titleBangla,
    Value<String?>? titleEnglish,
    Value<int>? version,
    Value<int>? lessonCount,
    Value<int>? questionCount,
    Value<int>? sizeBytes,
    Value<DateTime>? downloadedAt,
    Value<String?>? metadataJson,
    Value<int>? rowid,
  }) {
    return DownloadedChaptersCompanion(
      id: id ?? this.id,
      subjectId: subjectId ?? this.subjectId,
      titleBangla: titleBangla ?? this.titleBangla,
      titleEnglish: titleEnglish ?? this.titleEnglish,
      version: version ?? this.version,
      lessonCount: lessonCount ?? this.lessonCount,
      questionCount: questionCount ?? this.questionCount,
      sizeBytes: sizeBytes ?? this.sizeBytes,
      downloadedAt: downloadedAt ?? this.downloadedAt,
      metadataJson: metadataJson ?? this.metadataJson,
      rowid: rowid ?? this.rowid,
    );
  }

  @override
  Map<String, Expression> toColumns(bool nullToAbsent) {
    final map = <String, Expression>{};
    if (id.present) {
      map['id'] = Variable<String>(id.value);
    }
    if (subjectId.present) {
      map['subject_id'] = Variable<String>(subjectId.value);
    }
    if (titleBangla.present) {
      map['title_bangla'] = Variable<String>(titleBangla.value);
    }
    if (titleEnglish.present) {
      map['title_english'] = Variable<String>(titleEnglish.value);
    }
    if (version.present) {
      map['version'] = Variable<int>(version.value);
    }
    if (lessonCount.present) {
      map['lesson_count'] = Variable<int>(lessonCount.value);
    }
    if (questionCount.present) {
      map['question_count'] = Variable<int>(questionCount.value);
    }
    if (sizeBytes.present) {
      map['size_bytes'] = Variable<int>(sizeBytes.value);
    }
    if (downloadedAt.present) {
      map['downloaded_at'] = Variable<DateTime>(downloadedAt.value);
    }
    if (metadataJson.present) {
      map['metadata_json'] = Variable<String>(metadataJson.value);
    }
    if (rowid.present) {
      map['rowid'] = Variable<int>(rowid.value);
    }
    return map;
  }

  @override
  String toString() {
    return (StringBuffer('DownloadedChaptersCompanion(')
          ..write('id: $id, ')
          ..write('subjectId: $subjectId, ')
          ..write('titleBangla: $titleBangla, ')
          ..write('titleEnglish: $titleEnglish, ')
          ..write('version: $version, ')
          ..write('lessonCount: $lessonCount, ')
          ..write('questionCount: $questionCount, ')
          ..write('sizeBytes: $sizeBytes, ')
          ..write('downloadedAt: $downloadedAt, ')
          ..write('metadataJson: $metadataJson, ')
          ..write('rowid: $rowid')
          ..write(')'))
        .toString();
  }
}

class $CachedLessonsTable extends CachedLessons
    with TableInfo<$CachedLessonsTable, CachedLesson> {
  @override
  final GeneratedDatabase attachedDatabase;
  final String? _alias;
  $CachedLessonsTable(this.attachedDatabase, [this._alias]);
  static const VerificationMeta _idMeta = const VerificationMeta('id');
  @override
  late final GeneratedColumn<String> id = GeneratedColumn<String>(
    'id',
    aliasedName,
    false,
    type: DriftSqlType.string,
    requiredDuringInsert: true,
  );
  static const VerificationMeta _topicIdMeta = const VerificationMeta(
    'topicId',
  );
  @override
  late final GeneratedColumn<String> topicId = GeneratedColumn<String>(
    'topic_id',
    aliasedName,
    false,
    type: DriftSqlType.string,
    requiredDuringInsert: true,
  );
  static const VerificationMeta _chapterIdMeta = const VerificationMeta(
    'chapterId',
  );
  @override
  late final GeneratedColumn<String> chapterId = GeneratedColumn<String>(
    'chapter_id',
    aliasedName,
    false,
    type: DriftSqlType.string,
    requiredDuringInsert: true,
  );
  static const VerificationMeta _subjectIdMeta = const VerificationMeta(
    'subjectId',
  );
  @override
  late final GeneratedColumn<String> subjectId = GeneratedColumn<String>(
    'subject_id',
    aliasedName,
    true,
    type: DriftSqlType.string,
    requiredDuringInsert: false,
  );
  static const VerificationMeta _titleBanglaMeta = const VerificationMeta(
    'titleBangla',
  );
  @override
  late final GeneratedColumn<String> titleBangla = GeneratedColumn<String>(
    'title_bangla',
    aliasedName,
    false,
    type: DriftSqlType.string,
    requiredDuringInsert: true,
  );
  static const VerificationMeta _titleEnglishMeta = const VerificationMeta(
    'titleEnglish',
  );
  @override
  late final GeneratedColumn<String> titleEnglish = GeneratedColumn<String>(
    'title_english',
    aliasedName,
    true,
    type: DriftSqlType.string,
    requiredDuringInsert: false,
  );
  static const VerificationMeta _payloadJsonMeta = const VerificationMeta(
    'payloadJson',
  );
  @override
  late final GeneratedColumn<String> payloadJson = GeneratedColumn<String>(
    'payload_json',
    aliasedName,
    false,
    type: DriftSqlType.string,
    requiredDuringInsert: true,
  );
  static const VerificationMeta _isCompletedMeta = const VerificationMeta(
    'isCompleted',
  );
  @override
  late final GeneratedColumn<bool> isCompleted = GeneratedColumn<bool>(
    'is_completed',
    aliasedName,
    false,
    type: DriftSqlType.bool,
    requiredDuringInsert: false,
    defaultConstraints: GeneratedColumn.constraintIsAlways(
      'CHECK ("is_completed" IN (0, 1))',
    ),
    defaultValue: const Constant(false),
  );
  static const VerificationMeta _updatedAtMeta = const VerificationMeta(
    'updatedAt',
  );
  @override
  late final GeneratedColumn<DateTime> updatedAt = GeneratedColumn<DateTime>(
    'updated_at',
    aliasedName,
    false,
    type: DriftSqlType.dateTime,
    requiredDuringInsert: true,
  );
  @override
  List<GeneratedColumn> get $columns => [
    id,
    topicId,
    chapterId,
    subjectId,
    titleBangla,
    titleEnglish,
    payloadJson,
    isCompleted,
    updatedAt,
  ];
  @override
  String get aliasedName => _alias ?? actualTableName;
  @override
  String get actualTableName => $name;
  static const String $name = 'cached_lessons';
  @override
  VerificationContext validateIntegrity(
    Insertable<CachedLesson> instance, {
    bool isInserting = false,
  }) {
    final context = VerificationContext();
    final data = instance.toColumns(true);
    if (data.containsKey('id')) {
      context.handle(_idMeta, id.isAcceptableOrUnknown(data['id']!, _idMeta));
    } else if (isInserting) {
      context.missing(_idMeta);
    }
    if (data.containsKey('topic_id')) {
      context.handle(
        _topicIdMeta,
        topicId.isAcceptableOrUnknown(data['topic_id']!, _topicIdMeta),
      );
    } else if (isInserting) {
      context.missing(_topicIdMeta);
    }
    if (data.containsKey('chapter_id')) {
      context.handle(
        _chapterIdMeta,
        chapterId.isAcceptableOrUnknown(data['chapter_id']!, _chapterIdMeta),
      );
    } else if (isInserting) {
      context.missing(_chapterIdMeta);
    }
    if (data.containsKey('subject_id')) {
      context.handle(
        _subjectIdMeta,
        subjectId.isAcceptableOrUnknown(data['subject_id']!, _subjectIdMeta),
      );
    }
    if (data.containsKey('title_bangla')) {
      context.handle(
        _titleBanglaMeta,
        titleBangla.isAcceptableOrUnknown(
          data['title_bangla']!,
          _titleBanglaMeta,
        ),
      );
    } else if (isInserting) {
      context.missing(_titleBanglaMeta);
    }
    if (data.containsKey('title_english')) {
      context.handle(
        _titleEnglishMeta,
        titleEnglish.isAcceptableOrUnknown(
          data['title_english']!,
          _titleEnglishMeta,
        ),
      );
    }
    if (data.containsKey('payload_json')) {
      context.handle(
        _payloadJsonMeta,
        payloadJson.isAcceptableOrUnknown(
          data['payload_json']!,
          _payloadJsonMeta,
        ),
      );
    } else if (isInserting) {
      context.missing(_payloadJsonMeta);
    }
    if (data.containsKey('is_completed')) {
      context.handle(
        _isCompletedMeta,
        isCompleted.isAcceptableOrUnknown(
          data['is_completed']!,
          _isCompletedMeta,
        ),
      );
    }
    if (data.containsKey('updated_at')) {
      context.handle(
        _updatedAtMeta,
        updatedAt.isAcceptableOrUnknown(data['updated_at']!, _updatedAtMeta),
      );
    } else if (isInserting) {
      context.missing(_updatedAtMeta);
    }
    return context;
  }

  @override
  Set<GeneratedColumn> get $primaryKey => {id};
  @override
  CachedLesson map(Map<String, dynamic> data, {String? tablePrefix}) {
    final effectivePrefix = tablePrefix != null ? '$tablePrefix.' : '';
    return CachedLesson(
      id: attachedDatabase.typeMapping.read(
        DriftSqlType.string,
        data['${effectivePrefix}id'],
      )!,
      topicId: attachedDatabase.typeMapping.read(
        DriftSqlType.string,
        data['${effectivePrefix}topic_id'],
      )!,
      chapterId: attachedDatabase.typeMapping.read(
        DriftSqlType.string,
        data['${effectivePrefix}chapter_id'],
      )!,
      subjectId: attachedDatabase.typeMapping.read(
        DriftSqlType.string,
        data['${effectivePrefix}subject_id'],
      ),
      titleBangla: attachedDatabase.typeMapping.read(
        DriftSqlType.string,
        data['${effectivePrefix}title_bangla'],
      )!,
      titleEnglish: attachedDatabase.typeMapping.read(
        DriftSqlType.string,
        data['${effectivePrefix}title_english'],
      ),
      payloadJson: attachedDatabase.typeMapping.read(
        DriftSqlType.string,
        data['${effectivePrefix}payload_json'],
      )!,
      isCompleted: attachedDatabase.typeMapping.read(
        DriftSqlType.bool,
        data['${effectivePrefix}is_completed'],
      )!,
      updatedAt: attachedDatabase.typeMapping.read(
        DriftSqlType.dateTime,
        data['${effectivePrefix}updated_at'],
      )!,
    );
  }

  @override
  $CachedLessonsTable createAlias(String alias) {
    return $CachedLessonsTable(attachedDatabase, alias);
  }
}

class CachedLesson extends DataClass implements Insertable<CachedLesson> {
  final String id;
  final String topicId;
  final String chapterId;
  final String? subjectId;
  final String titleBangla;
  final String? titleEnglish;
  final String payloadJson;
  final bool isCompleted;
  final DateTime updatedAt;
  const CachedLesson({
    required this.id,
    required this.topicId,
    required this.chapterId,
    this.subjectId,
    required this.titleBangla,
    this.titleEnglish,
    required this.payloadJson,
    required this.isCompleted,
    required this.updatedAt,
  });
  @override
  Map<String, Expression> toColumns(bool nullToAbsent) {
    final map = <String, Expression>{};
    map['id'] = Variable<String>(id);
    map['topic_id'] = Variable<String>(topicId);
    map['chapter_id'] = Variable<String>(chapterId);
    if (!nullToAbsent || subjectId != null) {
      map['subject_id'] = Variable<String>(subjectId);
    }
    map['title_bangla'] = Variable<String>(titleBangla);
    if (!nullToAbsent || titleEnglish != null) {
      map['title_english'] = Variable<String>(titleEnglish);
    }
    map['payload_json'] = Variable<String>(payloadJson);
    map['is_completed'] = Variable<bool>(isCompleted);
    map['updated_at'] = Variable<DateTime>(updatedAt);
    return map;
  }

  CachedLessonsCompanion toCompanion(bool nullToAbsent) {
    return CachedLessonsCompanion(
      id: Value(id),
      topicId: Value(topicId),
      chapterId: Value(chapterId),
      subjectId: subjectId == null && nullToAbsent
          ? const Value.absent()
          : Value(subjectId),
      titleBangla: Value(titleBangla),
      titleEnglish: titleEnglish == null && nullToAbsent
          ? const Value.absent()
          : Value(titleEnglish),
      payloadJson: Value(payloadJson),
      isCompleted: Value(isCompleted),
      updatedAt: Value(updatedAt),
    );
  }

  factory CachedLesson.fromJson(
    Map<String, dynamic> json, {
    ValueSerializer? serializer,
  }) {
    serializer ??= driftRuntimeOptions.defaultSerializer;
    return CachedLesson(
      id: serializer.fromJson<String>(json['id']),
      topicId: serializer.fromJson<String>(json['topicId']),
      chapterId: serializer.fromJson<String>(json['chapterId']),
      subjectId: serializer.fromJson<String?>(json['subjectId']),
      titleBangla: serializer.fromJson<String>(json['titleBangla']),
      titleEnglish: serializer.fromJson<String?>(json['titleEnglish']),
      payloadJson: serializer.fromJson<String>(json['payloadJson']),
      isCompleted: serializer.fromJson<bool>(json['isCompleted']),
      updatedAt: serializer.fromJson<DateTime>(json['updatedAt']),
    );
  }
  @override
  Map<String, dynamic> toJson({ValueSerializer? serializer}) {
    serializer ??= driftRuntimeOptions.defaultSerializer;
    return <String, dynamic>{
      'id': serializer.toJson<String>(id),
      'topicId': serializer.toJson<String>(topicId),
      'chapterId': serializer.toJson<String>(chapterId),
      'subjectId': serializer.toJson<String?>(subjectId),
      'titleBangla': serializer.toJson<String>(titleBangla),
      'titleEnglish': serializer.toJson<String?>(titleEnglish),
      'payloadJson': serializer.toJson<String>(payloadJson),
      'isCompleted': serializer.toJson<bool>(isCompleted),
      'updatedAt': serializer.toJson<DateTime>(updatedAt),
    };
  }

  CachedLesson copyWith({
    String? id,
    String? topicId,
    String? chapterId,
    Value<String?> subjectId = const Value.absent(),
    String? titleBangla,
    Value<String?> titleEnglish = const Value.absent(),
    String? payloadJson,
    bool? isCompleted,
    DateTime? updatedAt,
  }) => CachedLesson(
    id: id ?? this.id,
    topicId: topicId ?? this.topicId,
    chapterId: chapterId ?? this.chapterId,
    subjectId: subjectId.present ? subjectId.value : this.subjectId,
    titleBangla: titleBangla ?? this.titleBangla,
    titleEnglish: titleEnglish.present ? titleEnglish.value : this.titleEnglish,
    payloadJson: payloadJson ?? this.payloadJson,
    isCompleted: isCompleted ?? this.isCompleted,
    updatedAt: updatedAt ?? this.updatedAt,
  );
  CachedLesson copyWithCompanion(CachedLessonsCompanion data) {
    return CachedLesson(
      id: data.id.present ? data.id.value : this.id,
      topicId: data.topicId.present ? data.topicId.value : this.topicId,
      chapterId: data.chapterId.present ? data.chapterId.value : this.chapterId,
      subjectId: data.subjectId.present ? data.subjectId.value : this.subjectId,
      titleBangla: data.titleBangla.present
          ? data.titleBangla.value
          : this.titleBangla,
      titleEnglish: data.titleEnglish.present
          ? data.titleEnglish.value
          : this.titleEnglish,
      payloadJson: data.payloadJson.present
          ? data.payloadJson.value
          : this.payloadJson,
      isCompleted: data.isCompleted.present
          ? data.isCompleted.value
          : this.isCompleted,
      updatedAt: data.updatedAt.present ? data.updatedAt.value : this.updatedAt,
    );
  }

  @override
  String toString() {
    return (StringBuffer('CachedLesson(')
          ..write('id: $id, ')
          ..write('topicId: $topicId, ')
          ..write('chapterId: $chapterId, ')
          ..write('subjectId: $subjectId, ')
          ..write('titleBangla: $titleBangla, ')
          ..write('titleEnglish: $titleEnglish, ')
          ..write('payloadJson: $payloadJson, ')
          ..write('isCompleted: $isCompleted, ')
          ..write('updatedAt: $updatedAt')
          ..write(')'))
        .toString();
  }

  @override
  int get hashCode => Object.hash(
    id,
    topicId,
    chapterId,
    subjectId,
    titleBangla,
    titleEnglish,
    payloadJson,
    isCompleted,
    updatedAt,
  );
  @override
  bool operator ==(Object other) =>
      identical(this, other) ||
      (other is CachedLesson &&
          other.id == this.id &&
          other.topicId == this.topicId &&
          other.chapterId == this.chapterId &&
          other.subjectId == this.subjectId &&
          other.titleBangla == this.titleBangla &&
          other.titleEnglish == this.titleEnglish &&
          other.payloadJson == this.payloadJson &&
          other.isCompleted == this.isCompleted &&
          other.updatedAt == this.updatedAt);
}

class CachedLessonsCompanion extends UpdateCompanion<CachedLesson> {
  final Value<String> id;
  final Value<String> topicId;
  final Value<String> chapterId;
  final Value<String?> subjectId;
  final Value<String> titleBangla;
  final Value<String?> titleEnglish;
  final Value<String> payloadJson;
  final Value<bool> isCompleted;
  final Value<DateTime> updatedAt;
  final Value<int> rowid;
  const CachedLessonsCompanion({
    this.id = const Value.absent(),
    this.topicId = const Value.absent(),
    this.chapterId = const Value.absent(),
    this.subjectId = const Value.absent(),
    this.titleBangla = const Value.absent(),
    this.titleEnglish = const Value.absent(),
    this.payloadJson = const Value.absent(),
    this.isCompleted = const Value.absent(),
    this.updatedAt = const Value.absent(),
    this.rowid = const Value.absent(),
  });
  CachedLessonsCompanion.insert({
    required String id,
    required String topicId,
    required String chapterId,
    this.subjectId = const Value.absent(),
    required String titleBangla,
    this.titleEnglish = const Value.absent(),
    required String payloadJson,
    this.isCompleted = const Value.absent(),
    required DateTime updatedAt,
    this.rowid = const Value.absent(),
  }) : id = Value(id),
       topicId = Value(topicId),
       chapterId = Value(chapterId),
       titleBangla = Value(titleBangla),
       payloadJson = Value(payloadJson),
       updatedAt = Value(updatedAt);
  static Insertable<CachedLesson> custom({
    Expression<String>? id,
    Expression<String>? topicId,
    Expression<String>? chapterId,
    Expression<String>? subjectId,
    Expression<String>? titleBangla,
    Expression<String>? titleEnglish,
    Expression<String>? payloadJson,
    Expression<bool>? isCompleted,
    Expression<DateTime>? updatedAt,
    Expression<int>? rowid,
  }) {
    return RawValuesInsertable({
      if (id != null) 'id': id,
      if (topicId != null) 'topic_id': topicId,
      if (chapterId != null) 'chapter_id': chapterId,
      if (subjectId != null) 'subject_id': subjectId,
      if (titleBangla != null) 'title_bangla': titleBangla,
      if (titleEnglish != null) 'title_english': titleEnglish,
      if (payloadJson != null) 'payload_json': payloadJson,
      if (isCompleted != null) 'is_completed': isCompleted,
      if (updatedAt != null) 'updated_at': updatedAt,
      if (rowid != null) 'rowid': rowid,
    });
  }

  CachedLessonsCompanion copyWith({
    Value<String>? id,
    Value<String>? topicId,
    Value<String>? chapterId,
    Value<String?>? subjectId,
    Value<String>? titleBangla,
    Value<String?>? titleEnglish,
    Value<String>? payloadJson,
    Value<bool>? isCompleted,
    Value<DateTime>? updatedAt,
    Value<int>? rowid,
  }) {
    return CachedLessonsCompanion(
      id: id ?? this.id,
      topicId: topicId ?? this.topicId,
      chapterId: chapterId ?? this.chapterId,
      subjectId: subjectId ?? this.subjectId,
      titleBangla: titleBangla ?? this.titleBangla,
      titleEnglish: titleEnglish ?? this.titleEnglish,
      payloadJson: payloadJson ?? this.payloadJson,
      isCompleted: isCompleted ?? this.isCompleted,
      updatedAt: updatedAt ?? this.updatedAt,
      rowid: rowid ?? this.rowid,
    );
  }

  @override
  Map<String, Expression> toColumns(bool nullToAbsent) {
    final map = <String, Expression>{};
    if (id.present) {
      map['id'] = Variable<String>(id.value);
    }
    if (topicId.present) {
      map['topic_id'] = Variable<String>(topicId.value);
    }
    if (chapterId.present) {
      map['chapter_id'] = Variable<String>(chapterId.value);
    }
    if (subjectId.present) {
      map['subject_id'] = Variable<String>(subjectId.value);
    }
    if (titleBangla.present) {
      map['title_bangla'] = Variable<String>(titleBangla.value);
    }
    if (titleEnglish.present) {
      map['title_english'] = Variable<String>(titleEnglish.value);
    }
    if (payloadJson.present) {
      map['payload_json'] = Variable<String>(payloadJson.value);
    }
    if (isCompleted.present) {
      map['is_completed'] = Variable<bool>(isCompleted.value);
    }
    if (updatedAt.present) {
      map['updated_at'] = Variable<DateTime>(updatedAt.value);
    }
    if (rowid.present) {
      map['rowid'] = Variable<int>(rowid.value);
    }
    return map;
  }

  @override
  String toString() {
    return (StringBuffer('CachedLessonsCompanion(')
          ..write('id: $id, ')
          ..write('topicId: $topicId, ')
          ..write('chapterId: $chapterId, ')
          ..write('subjectId: $subjectId, ')
          ..write('titleBangla: $titleBangla, ')
          ..write('titleEnglish: $titleEnglish, ')
          ..write('payloadJson: $payloadJson, ')
          ..write('isCompleted: $isCompleted, ')
          ..write('updatedAt: $updatedAt, ')
          ..write('rowid: $rowid')
          ..write(')'))
        .toString();
  }
}

class $CachedQuestionsTable extends CachedQuestions
    with TableInfo<$CachedQuestionsTable, CachedQuestion> {
  @override
  final GeneratedDatabase attachedDatabase;
  final String? _alias;
  $CachedQuestionsTable(this.attachedDatabase, [this._alias]);
  static const VerificationMeta _idMeta = const VerificationMeta('id');
  @override
  late final GeneratedColumn<String> id = GeneratedColumn<String>(
    'id',
    aliasedName,
    false,
    type: DriftSqlType.string,
    requiredDuringInsert: true,
  );
  static const VerificationMeta _topicIdMeta = const VerificationMeta(
    'topicId',
  );
  @override
  late final GeneratedColumn<String> topicId = GeneratedColumn<String>(
    'topic_id',
    aliasedName,
    true,
    type: DriftSqlType.string,
    requiredDuringInsert: false,
  );
  static const VerificationMeta _chapterIdMeta = const VerificationMeta(
    'chapterId',
  );
  @override
  late final GeneratedColumn<String> chapterId = GeneratedColumn<String>(
    'chapter_id',
    aliasedName,
    false,
    type: DriftSqlType.string,
    requiredDuringInsert: true,
  );
  static const VerificationMeta _subjectIdMeta = const VerificationMeta(
    'subjectId',
  );
  @override
  late final GeneratedColumn<String> subjectId = GeneratedColumn<String>(
    'subject_id',
    aliasedName,
    true,
    type: DriftSqlType.string,
    requiredDuringInsert: false,
  );
  static const VerificationMeta _questionTypeMeta = const VerificationMeta(
    'questionType',
  );
  @override
  late final GeneratedColumn<String> questionType = GeneratedColumn<String>(
    'question_type',
    aliasedName,
    false,
    type: DriftSqlType.string,
    requiredDuringInsert: true,
  );
  static const VerificationMeta _difficultyMeta = const VerificationMeta(
    'difficulty',
  );
  @override
  late final GeneratedColumn<String> difficulty = GeneratedColumn<String>(
    'difficulty',
    aliasedName,
    true,
    type: DriftSqlType.string,
    requiredDuringInsert: false,
  );
  static const VerificationMeta _payloadJsonMeta = const VerificationMeta(
    'payloadJson',
  );
  @override
  late final GeneratedColumn<String> payloadJson = GeneratedColumn<String>(
    'payload_json',
    aliasedName,
    false,
    type: DriftSqlType.string,
    requiredDuringInsert: true,
  );
  static const VerificationMeta _updatedAtMeta = const VerificationMeta(
    'updatedAt',
  );
  @override
  late final GeneratedColumn<DateTime> updatedAt = GeneratedColumn<DateTime>(
    'updated_at',
    aliasedName,
    false,
    type: DriftSqlType.dateTime,
    requiredDuringInsert: true,
  );
  @override
  List<GeneratedColumn> get $columns => [
    id,
    topicId,
    chapterId,
    subjectId,
    questionType,
    difficulty,
    payloadJson,
    updatedAt,
  ];
  @override
  String get aliasedName => _alias ?? actualTableName;
  @override
  String get actualTableName => $name;
  static const String $name = 'cached_questions';
  @override
  VerificationContext validateIntegrity(
    Insertable<CachedQuestion> instance, {
    bool isInserting = false,
  }) {
    final context = VerificationContext();
    final data = instance.toColumns(true);
    if (data.containsKey('id')) {
      context.handle(_idMeta, id.isAcceptableOrUnknown(data['id']!, _idMeta));
    } else if (isInserting) {
      context.missing(_idMeta);
    }
    if (data.containsKey('topic_id')) {
      context.handle(
        _topicIdMeta,
        topicId.isAcceptableOrUnknown(data['topic_id']!, _topicIdMeta),
      );
    }
    if (data.containsKey('chapter_id')) {
      context.handle(
        _chapterIdMeta,
        chapterId.isAcceptableOrUnknown(data['chapter_id']!, _chapterIdMeta),
      );
    } else if (isInserting) {
      context.missing(_chapterIdMeta);
    }
    if (data.containsKey('subject_id')) {
      context.handle(
        _subjectIdMeta,
        subjectId.isAcceptableOrUnknown(data['subject_id']!, _subjectIdMeta),
      );
    }
    if (data.containsKey('question_type')) {
      context.handle(
        _questionTypeMeta,
        questionType.isAcceptableOrUnknown(
          data['question_type']!,
          _questionTypeMeta,
        ),
      );
    } else if (isInserting) {
      context.missing(_questionTypeMeta);
    }
    if (data.containsKey('difficulty')) {
      context.handle(
        _difficultyMeta,
        difficulty.isAcceptableOrUnknown(data['difficulty']!, _difficultyMeta),
      );
    }
    if (data.containsKey('payload_json')) {
      context.handle(
        _payloadJsonMeta,
        payloadJson.isAcceptableOrUnknown(
          data['payload_json']!,
          _payloadJsonMeta,
        ),
      );
    } else if (isInserting) {
      context.missing(_payloadJsonMeta);
    }
    if (data.containsKey('updated_at')) {
      context.handle(
        _updatedAtMeta,
        updatedAt.isAcceptableOrUnknown(data['updated_at']!, _updatedAtMeta),
      );
    } else if (isInserting) {
      context.missing(_updatedAtMeta);
    }
    return context;
  }

  @override
  Set<GeneratedColumn> get $primaryKey => {id};
  @override
  CachedQuestion map(Map<String, dynamic> data, {String? tablePrefix}) {
    final effectivePrefix = tablePrefix != null ? '$tablePrefix.' : '';
    return CachedQuestion(
      id: attachedDatabase.typeMapping.read(
        DriftSqlType.string,
        data['${effectivePrefix}id'],
      )!,
      topicId: attachedDatabase.typeMapping.read(
        DriftSqlType.string,
        data['${effectivePrefix}topic_id'],
      ),
      chapterId: attachedDatabase.typeMapping.read(
        DriftSqlType.string,
        data['${effectivePrefix}chapter_id'],
      )!,
      subjectId: attachedDatabase.typeMapping.read(
        DriftSqlType.string,
        data['${effectivePrefix}subject_id'],
      ),
      questionType: attachedDatabase.typeMapping.read(
        DriftSqlType.string,
        data['${effectivePrefix}question_type'],
      )!,
      difficulty: attachedDatabase.typeMapping.read(
        DriftSqlType.string,
        data['${effectivePrefix}difficulty'],
      ),
      payloadJson: attachedDatabase.typeMapping.read(
        DriftSqlType.string,
        data['${effectivePrefix}payload_json'],
      )!,
      updatedAt: attachedDatabase.typeMapping.read(
        DriftSqlType.dateTime,
        data['${effectivePrefix}updated_at'],
      )!,
    );
  }

  @override
  $CachedQuestionsTable createAlias(String alias) {
    return $CachedQuestionsTable(attachedDatabase, alias);
  }
}

class CachedQuestion extends DataClass implements Insertable<CachedQuestion> {
  final String id;
  final String? topicId;
  final String chapterId;
  final String? subjectId;
  final String questionType;
  final String? difficulty;
  final String payloadJson;
  final DateTime updatedAt;
  const CachedQuestion({
    required this.id,
    this.topicId,
    required this.chapterId,
    this.subjectId,
    required this.questionType,
    this.difficulty,
    required this.payloadJson,
    required this.updatedAt,
  });
  @override
  Map<String, Expression> toColumns(bool nullToAbsent) {
    final map = <String, Expression>{};
    map['id'] = Variable<String>(id);
    if (!nullToAbsent || topicId != null) {
      map['topic_id'] = Variable<String>(topicId);
    }
    map['chapter_id'] = Variable<String>(chapterId);
    if (!nullToAbsent || subjectId != null) {
      map['subject_id'] = Variable<String>(subjectId);
    }
    map['question_type'] = Variable<String>(questionType);
    if (!nullToAbsent || difficulty != null) {
      map['difficulty'] = Variable<String>(difficulty);
    }
    map['payload_json'] = Variable<String>(payloadJson);
    map['updated_at'] = Variable<DateTime>(updatedAt);
    return map;
  }

  CachedQuestionsCompanion toCompanion(bool nullToAbsent) {
    return CachedQuestionsCompanion(
      id: Value(id),
      topicId: topicId == null && nullToAbsent
          ? const Value.absent()
          : Value(topicId),
      chapterId: Value(chapterId),
      subjectId: subjectId == null && nullToAbsent
          ? const Value.absent()
          : Value(subjectId),
      questionType: Value(questionType),
      difficulty: difficulty == null && nullToAbsent
          ? const Value.absent()
          : Value(difficulty),
      payloadJson: Value(payloadJson),
      updatedAt: Value(updatedAt),
    );
  }

  factory CachedQuestion.fromJson(
    Map<String, dynamic> json, {
    ValueSerializer? serializer,
  }) {
    serializer ??= driftRuntimeOptions.defaultSerializer;
    return CachedQuestion(
      id: serializer.fromJson<String>(json['id']),
      topicId: serializer.fromJson<String?>(json['topicId']),
      chapterId: serializer.fromJson<String>(json['chapterId']),
      subjectId: serializer.fromJson<String?>(json['subjectId']),
      questionType: serializer.fromJson<String>(json['questionType']),
      difficulty: serializer.fromJson<String?>(json['difficulty']),
      payloadJson: serializer.fromJson<String>(json['payloadJson']),
      updatedAt: serializer.fromJson<DateTime>(json['updatedAt']),
    );
  }
  @override
  Map<String, dynamic> toJson({ValueSerializer? serializer}) {
    serializer ??= driftRuntimeOptions.defaultSerializer;
    return <String, dynamic>{
      'id': serializer.toJson<String>(id),
      'topicId': serializer.toJson<String?>(topicId),
      'chapterId': serializer.toJson<String>(chapterId),
      'subjectId': serializer.toJson<String?>(subjectId),
      'questionType': serializer.toJson<String>(questionType),
      'difficulty': serializer.toJson<String?>(difficulty),
      'payloadJson': serializer.toJson<String>(payloadJson),
      'updatedAt': serializer.toJson<DateTime>(updatedAt),
    };
  }

  CachedQuestion copyWith({
    String? id,
    Value<String?> topicId = const Value.absent(),
    String? chapterId,
    Value<String?> subjectId = const Value.absent(),
    String? questionType,
    Value<String?> difficulty = const Value.absent(),
    String? payloadJson,
    DateTime? updatedAt,
  }) => CachedQuestion(
    id: id ?? this.id,
    topicId: topicId.present ? topicId.value : this.topicId,
    chapterId: chapterId ?? this.chapterId,
    subjectId: subjectId.present ? subjectId.value : this.subjectId,
    questionType: questionType ?? this.questionType,
    difficulty: difficulty.present ? difficulty.value : this.difficulty,
    payloadJson: payloadJson ?? this.payloadJson,
    updatedAt: updatedAt ?? this.updatedAt,
  );
  CachedQuestion copyWithCompanion(CachedQuestionsCompanion data) {
    return CachedQuestion(
      id: data.id.present ? data.id.value : this.id,
      topicId: data.topicId.present ? data.topicId.value : this.topicId,
      chapterId: data.chapterId.present ? data.chapterId.value : this.chapterId,
      subjectId: data.subjectId.present ? data.subjectId.value : this.subjectId,
      questionType: data.questionType.present
          ? data.questionType.value
          : this.questionType,
      difficulty: data.difficulty.present
          ? data.difficulty.value
          : this.difficulty,
      payloadJson: data.payloadJson.present
          ? data.payloadJson.value
          : this.payloadJson,
      updatedAt: data.updatedAt.present ? data.updatedAt.value : this.updatedAt,
    );
  }

  @override
  String toString() {
    return (StringBuffer('CachedQuestion(')
          ..write('id: $id, ')
          ..write('topicId: $topicId, ')
          ..write('chapterId: $chapterId, ')
          ..write('subjectId: $subjectId, ')
          ..write('questionType: $questionType, ')
          ..write('difficulty: $difficulty, ')
          ..write('payloadJson: $payloadJson, ')
          ..write('updatedAt: $updatedAt')
          ..write(')'))
        .toString();
  }

  @override
  int get hashCode => Object.hash(
    id,
    topicId,
    chapterId,
    subjectId,
    questionType,
    difficulty,
    payloadJson,
    updatedAt,
  );
  @override
  bool operator ==(Object other) =>
      identical(this, other) ||
      (other is CachedQuestion &&
          other.id == this.id &&
          other.topicId == this.topicId &&
          other.chapterId == this.chapterId &&
          other.subjectId == this.subjectId &&
          other.questionType == this.questionType &&
          other.difficulty == this.difficulty &&
          other.payloadJson == this.payloadJson &&
          other.updatedAt == this.updatedAt);
}

class CachedQuestionsCompanion extends UpdateCompanion<CachedQuestion> {
  final Value<String> id;
  final Value<String?> topicId;
  final Value<String> chapterId;
  final Value<String?> subjectId;
  final Value<String> questionType;
  final Value<String?> difficulty;
  final Value<String> payloadJson;
  final Value<DateTime> updatedAt;
  final Value<int> rowid;
  const CachedQuestionsCompanion({
    this.id = const Value.absent(),
    this.topicId = const Value.absent(),
    this.chapterId = const Value.absent(),
    this.subjectId = const Value.absent(),
    this.questionType = const Value.absent(),
    this.difficulty = const Value.absent(),
    this.payloadJson = const Value.absent(),
    this.updatedAt = const Value.absent(),
    this.rowid = const Value.absent(),
  });
  CachedQuestionsCompanion.insert({
    required String id,
    this.topicId = const Value.absent(),
    required String chapterId,
    this.subjectId = const Value.absent(),
    required String questionType,
    this.difficulty = const Value.absent(),
    required String payloadJson,
    required DateTime updatedAt,
    this.rowid = const Value.absent(),
  }) : id = Value(id),
       chapterId = Value(chapterId),
       questionType = Value(questionType),
       payloadJson = Value(payloadJson),
       updatedAt = Value(updatedAt);
  static Insertable<CachedQuestion> custom({
    Expression<String>? id,
    Expression<String>? topicId,
    Expression<String>? chapterId,
    Expression<String>? subjectId,
    Expression<String>? questionType,
    Expression<String>? difficulty,
    Expression<String>? payloadJson,
    Expression<DateTime>? updatedAt,
    Expression<int>? rowid,
  }) {
    return RawValuesInsertable({
      if (id != null) 'id': id,
      if (topicId != null) 'topic_id': topicId,
      if (chapterId != null) 'chapter_id': chapterId,
      if (subjectId != null) 'subject_id': subjectId,
      if (questionType != null) 'question_type': questionType,
      if (difficulty != null) 'difficulty': difficulty,
      if (payloadJson != null) 'payload_json': payloadJson,
      if (updatedAt != null) 'updated_at': updatedAt,
      if (rowid != null) 'rowid': rowid,
    });
  }

  CachedQuestionsCompanion copyWith({
    Value<String>? id,
    Value<String?>? topicId,
    Value<String>? chapterId,
    Value<String?>? subjectId,
    Value<String>? questionType,
    Value<String?>? difficulty,
    Value<String>? payloadJson,
    Value<DateTime>? updatedAt,
    Value<int>? rowid,
  }) {
    return CachedQuestionsCompanion(
      id: id ?? this.id,
      topicId: topicId ?? this.topicId,
      chapterId: chapterId ?? this.chapterId,
      subjectId: subjectId ?? this.subjectId,
      questionType: questionType ?? this.questionType,
      difficulty: difficulty ?? this.difficulty,
      payloadJson: payloadJson ?? this.payloadJson,
      updatedAt: updatedAt ?? this.updatedAt,
      rowid: rowid ?? this.rowid,
    );
  }

  @override
  Map<String, Expression> toColumns(bool nullToAbsent) {
    final map = <String, Expression>{};
    if (id.present) {
      map['id'] = Variable<String>(id.value);
    }
    if (topicId.present) {
      map['topic_id'] = Variable<String>(topicId.value);
    }
    if (chapterId.present) {
      map['chapter_id'] = Variable<String>(chapterId.value);
    }
    if (subjectId.present) {
      map['subject_id'] = Variable<String>(subjectId.value);
    }
    if (questionType.present) {
      map['question_type'] = Variable<String>(questionType.value);
    }
    if (difficulty.present) {
      map['difficulty'] = Variable<String>(difficulty.value);
    }
    if (payloadJson.present) {
      map['payload_json'] = Variable<String>(payloadJson.value);
    }
    if (updatedAt.present) {
      map['updated_at'] = Variable<DateTime>(updatedAt.value);
    }
    if (rowid.present) {
      map['rowid'] = Variable<int>(rowid.value);
    }
    return map;
  }

  @override
  String toString() {
    return (StringBuffer('CachedQuestionsCompanion(')
          ..write('id: $id, ')
          ..write('topicId: $topicId, ')
          ..write('chapterId: $chapterId, ')
          ..write('subjectId: $subjectId, ')
          ..write('questionType: $questionType, ')
          ..write('difficulty: $difficulty, ')
          ..write('payloadJson: $payloadJson, ')
          ..write('updatedAt: $updatedAt, ')
          ..write('rowid: $rowid')
          ..write(')'))
        .toString();
  }
}

class $ActiveExamDraftsTable extends ActiveExamDrafts
    with TableInfo<$ActiveExamDraftsTable, ActiveExamDraft> {
  @override
  final GeneratedDatabase attachedDatabase;
  final String? _alias;
  $ActiveExamDraftsTable(this.attachedDatabase, [this._alias]);
  static const VerificationMeta _sessionIdMeta = const VerificationMeta(
    'sessionId',
  );
  @override
  late final GeneratedColumn<String> sessionId = GeneratedColumn<String>(
    'session_id',
    aliasedName,
    false,
    type: DriftSqlType.string,
    requiredDuringInsert: true,
  );
  static const VerificationMeta _subjectIdMeta = const VerificationMeta(
    'subjectId',
  );
  @override
  late final GeneratedColumn<String> subjectId = GeneratedColumn<String>(
    'subject_id',
    aliasedName,
    false,
    type: DriftSqlType.string,
    requiredDuringInsert: true,
  );
  static const VerificationMeta _chapterIdMeta = const VerificationMeta(
    'chapterId',
  );
  @override
  late final GeneratedColumn<String> chapterId = GeneratedColumn<String>(
    'chapter_id',
    aliasedName,
    true,
    type: DriftSqlType.string,
    requiredDuringInsert: false,
  );
  static const VerificationMeta _testTypeMeta = const VerificationMeta(
    'testType',
  );
  @override
  late final GeneratedColumn<String> testType = GeneratedColumn<String>(
    'test_type',
    aliasedName,
    false,
    type: DriftSqlType.string,
    requiredDuringInsert: false,
    defaultValue: const Constant('CHAPTER_TEST'),
  );
  static const VerificationMeta _questionIdsJsonMeta = const VerificationMeta(
    'questionIdsJson',
  );
  @override
  late final GeneratedColumn<String> questionIdsJson = GeneratedColumn<String>(
    'question_ids_json',
    aliasedName,
    false,
    type: DriftSqlType.string,
    requiredDuringInsert: true,
  );
  static const VerificationMeta _answersJsonMeta = const VerificationMeta(
    'answersJson',
  );
  @override
  late final GeneratedColumn<String> answersJson = GeneratedColumn<String>(
    'answers_json',
    aliasedName,
    false,
    type: DriftSqlType.string,
    requiredDuringInsert: false,
    defaultValue: const Constant('{}'),
  );
  static const VerificationMeta _flaggedQuestionIdsJsonMeta =
      const VerificationMeta('flaggedQuestionIdsJson');
  @override
  late final GeneratedColumn<String> flaggedQuestionIdsJson =
      GeneratedColumn<String>(
        'flagged_question_ids_json',
        aliasedName,
        false,
        type: DriftSqlType.string,
        requiredDuringInsert: false,
        defaultValue: const Constant('[]'),
      );
  static const VerificationMeta _remainingSecondsMeta = const VerificationMeta(
    'remainingSeconds',
  );
  @override
  late final GeneratedColumn<int> remainingSeconds = GeneratedColumn<int>(
    'remaining_seconds',
    aliasedName,
    false,
    type: DriftSqlType.int,
    requiredDuringInsert: true,
  );
  static const VerificationMeta _totalDurationSecondsMeta =
      const VerificationMeta('totalDurationSeconds');
  @override
  late final GeneratedColumn<int> totalDurationSeconds = GeneratedColumn<int>(
    'total_duration_seconds',
    aliasedName,
    false,
    type: DriftSqlType.int,
    requiredDuringInsert: true,
  );
  static const VerificationMeta _currentIndexMeta = const VerificationMeta(
    'currentIndex',
  );
  @override
  late final GeneratedColumn<int> currentIndex = GeneratedColumn<int>(
    'current_index',
    aliasedName,
    false,
    type: DriftSqlType.int,
    requiredDuringInsert: false,
    defaultValue: const Constant(0),
  );
  static const VerificationMeta _startedAtMeta = const VerificationMeta(
    'startedAt',
  );
  @override
  late final GeneratedColumn<DateTime> startedAt = GeneratedColumn<DateTime>(
    'started_at',
    aliasedName,
    false,
    type: DriftSqlType.dateTime,
    requiredDuringInsert: true,
  );
  static const VerificationMeta _updatedAtMeta = const VerificationMeta(
    'updatedAt',
  );
  @override
  late final GeneratedColumn<DateTime> updatedAt = GeneratedColumn<DateTime>(
    'updated_at',
    aliasedName,
    false,
    type: DriftSqlType.dateTime,
    requiredDuringInsert: true,
  );
  @override
  List<GeneratedColumn> get $columns => [
    sessionId,
    subjectId,
    chapterId,
    testType,
    questionIdsJson,
    answersJson,
    flaggedQuestionIdsJson,
    remainingSeconds,
    totalDurationSeconds,
    currentIndex,
    startedAt,
    updatedAt,
  ];
  @override
  String get aliasedName => _alias ?? actualTableName;
  @override
  String get actualTableName => $name;
  static const String $name = 'active_exam_drafts';
  @override
  VerificationContext validateIntegrity(
    Insertable<ActiveExamDraft> instance, {
    bool isInserting = false,
  }) {
    final context = VerificationContext();
    final data = instance.toColumns(true);
    if (data.containsKey('session_id')) {
      context.handle(
        _sessionIdMeta,
        sessionId.isAcceptableOrUnknown(data['session_id']!, _sessionIdMeta),
      );
    } else if (isInserting) {
      context.missing(_sessionIdMeta);
    }
    if (data.containsKey('subject_id')) {
      context.handle(
        _subjectIdMeta,
        subjectId.isAcceptableOrUnknown(data['subject_id']!, _subjectIdMeta),
      );
    } else if (isInserting) {
      context.missing(_subjectIdMeta);
    }
    if (data.containsKey('chapter_id')) {
      context.handle(
        _chapterIdMeta,
        chapterId.isAcceptableOrUnknown(data['chapter_id']!, _chapterIdMeta),
      );
    }
    if (data.containsKey('test_type')) {
      context.handle(
        _testTypeMeta,
        testType.isAcceptableOrUnknown(data['test_type']!, _testTypeMeta),
      );
    }
    if (data.containsKey('question_ids_json')) {
      context.handle(
        _questionIdsJsonMeta,
        questionIdsJson.isAcceptableOrUnknown(
          data['question_ids_json']!,
          _questionIdsJsonMeta,
        ),
      );
    } else if (isInserting) {
      context.missing(_questionIdsJsonMeta);
    }
    if (data.containsKey('answers_json')) {
      context.handle(
        _answersJsonMeta,
        answersJson.isAcceptableOrUnknown(
          data['answers_json']!,
          _answersJsonMeta,
        ),
      );
    }
    if (data.containsKey('flagged_question_ids_json')) {
      context.handle(
        _flaggedQuestionIdsJsonMeta,
        flaggedQuestionIdsJson.isAcceptableOrUnknown(
          data['flagged_question_ids_json']!,
          _flaggedQuestionIdsJsonMeta,
        ),
      );
    }
    if (data.containsKey('remaining_seconds')) {
      context.handle(
        _remainingSecondsMeta,
        remainingSeconds.isAcceptableOrUnknown(
          data['remaining_seconds']!,
          _remainingSecondsMeta,
        ),
      );
    } else if (isInserting) {
      context.missing(_remainingSecondsMeta);
    }
    if (data.containsKey('total_duration_seconds')) {
      context.handle(
        _totalDurationSecondsMeta,
        totalDurationSeconds.isAcceptableOrUnknown(
          data['total_duration_seconds']!,
          _totalDurationSecondsMeta,
        ),
      );
    } else if (isInserting) {
      context.missing(_totalDurationSecondsMeta);
    }
    if (data.containsKey('current_index')) {
      context.handle(
        _currentIndexMeta,
        currentIndex.isAcceptableOrUnknown(
          data['current_index']!,
          _currentIndexMeta,
        ),
      );
    }
    if (data.containsKey('started_at')) {
      context.handle(
        _startedAtMeta,
        startedAt.isAcceptableOrUnknown(data['started_at']!, _startedAtMeta),
      );
    } else if (isInserting) {
      context.missing(_startedAtMeta);
    }
    if (data.containsKey('updated_at')) {
      context.handle(
        _updatedAtMeta,
        updatedAt.isAcceptableOrUnknown(data['updated_at']!, _updatedAtMeta),
      );
    } else if (isInserting) {
      context.missing(_updatedAtMeta);
    }
    return context;
  }

  @override
  Set<GeneratedColumn> get $primaryKey => {sessionId};
  @override
  ActiveExamDraft map(Map<String, dynamic> data, {String? tablePrefix}) {
    final effectivePrefix = tablePrefix != null ? '$tablePrefix.' : '';
    return ActiveExamDraft(
      sessionId: attachedDatabase.typeMapping.read(
        DriftSqlType.string,
        data['${effectivePrefix}session_id'],
      )!,
      subjectId: attachedDatabase.typeMapping.read(
        DriftSqlType.string,
        data['${effectivePrefix}subject_id'],
      )!,
      chapterId: attachedDatabase.typeMapping.read(
        DriftSqlType.string,
        data['${effectivePrefix}chapter_id'],
      ),
      testType: attachedDatabase.typeMapping.read(
        DriftSqlType.string,
        data['${effectivePrefix}test_type'],
      )!,
      questionIdsJson: attachedDatabase.typeMapping.read(
        DriftSqlType.string,
        data['${effectivePrefix}question_ids_json'],
      )!,
      answersJson: attachedDatabase.typeMapping.read(
        DriftSqlType.string,
        data['${effectivePrefix}answers_json'],
      )!,
      flaggedQuestionIdsJson: attachedDatabase.typeMapping.read(
        DriftSqlType.string,
        data['${effectivePrefix}flagged_question_ids_json'],
      )!,
      remainingSeconds: attachedDatabase.typeMapping.read(
        DriftSqlType.int,
        data['${effectivePrefix}remaining_seconds'],
      )!,
      totalDurationSeconds: attachedDatabase.typeMapping.read(
        DriftSqlType.int,
        data['${effectivePrefix}total_duration_seconds'],
      )!,
      currentIndex: attachedDatabase.typeMapping.read(
        DriftSqlType.int,
        data['${effectivePrefix}current_index'],
      )!,
      startedAt: attachedDatabase.typeMapping.read(
        DriftSqlType.dateTime,
        data['${effectivePrefix}started_at'],
      )!,
      updatedAt: attachedDatabase.typeMapping.read(
        DriftSqlType.dateTime,
        data['${effectivePrefix}updated_at'],
      )!,
    );
  }

  @override
  $ActiveExamDraftsTable createAlias(String alias) {
    return $ActiveExamDraftsTable(attachedDatabase, alias);
  }
}

class ActiveExamDraft extends DataClass implements Insertable<ActiveExamDraft> {
  final String sessionId;
  final String subjectId;
  final String? chapterId;
  final String testType;
  final String questionIdsJson;
  final String answersJson;
  final String flaggedQuestionIdsJson;
  final int remainingSeconds;
  final int totalDurationSeconds;
  final int currentIndex;
  final DateTime startedAt;
  final DateTime updatedAt;
  const ActiveExamDraft({
    required this.sessionId,
    required this.subjectId,
    this.chapterId,
    required this.testType,
    required this.questionIdsJson,
    required this.answersJson,
    required this.flaggedQuestionIdsJson,
    required this.remainingSeconds,
    required this.totalDurationSeconds,
    required this.currentIndex,
    required this.startedAt,
    required this.updatedAt,
  });
  @override
  Map<String, Expression> toColumns(bool nullToAbsent) {
    final map = <String, Expression>{};
    map['session_id'] = Variable<String>(sessionId);
    map['subject_id'] = Variable<String>(subjectId);
    if (!nullToAbsent || chapterId != null) {
      map['chapter_id'] = Variable<String>(chapterId);
    }
    map['test_type'] = Variable<String>(testType);
    map['question_ids_json'] = Variable<String>(questionIdsJson);
    map['answers_json'] = Variable<String>(answersJson);
    map['flagged_question_ids_json'] = Variable<String>(flaggedQuestionIdsJson);
    map['remaining_seconds'] = Variable<int>(remainingSeconds);
    map['total_duration_seconds'] = Variable<int>(totalDurationSeconds);
    map['current_index'] = Variable<int>(currentIndex);
    map['started_at'] = Variable<DateTime>(startedAt);
    map['updated_at'] = Variable<DateTime>(updatedAt);
    return map;
  }

  ActiveExamDraftsCompanion toCompanion(bool nullToAbsent) {
    return ActiveExamDraftsCompanion(
      sessionId: Value(sessionId),
      subjectId: Value(subjectId),
      chapterId: chapterId == null && nullToAbsent
          ? const Value.absent()
          : Value(chapterId),
      testType: Value(testType),
      questionIdsJson: Value(questionIdsJson),
      answersJson: Value(answersJson),
      flaggedQuestionIdsJson: Value(flaggedQuestionIdsJson),
      remainingSeconds: Value(remainingSeconds),
      totalDurationSeconds: Value(totalDurationSeconds),
      currentIndex: Value(currentIndex),
      startedAt: Value(startedAt),
      updatedAt: Value(updatedAt),
    );
  }

  factory ActiveExamDraft.fromJson(
    Map<String, dynamic> json, {
    ValueSerializer? serializer,
  }) {
    serializer ??= driftRuntimeOptions.defaultSerializer;
    return ActiveExamDraft(
      sessionId: serializer.fromJson<String>(json['sessionId']),
      subjectId: serializer.fromJson<String>(json['subjectId']),
      chapterId: serializer.fromJson<String?>(json['chapterId']),
      testType: serializer.fromJson<String>(json['testType']),
      questionIdsJson: serializer.fromJson<String>(json['questionIdsJson']),
      answersJson: serializer.fromJson<String>(json['answersJson']),
      flaggedQuestionIdsJson: serializer.fromJson<String>(
        json['flaggedQuestionIdsJson'],
      ),
      remainingSeconds: serializer.fromJson<int>(json['remainingSeconds']),
      totalDurationSeconds: serializer.fromJson<int>(
        json['totalDurationSeconds'],
      ),
      currentIndex: serializer.fromJson<int>(json['currentIndex']),
      startedAt: serializer.fromJson<DateTime>(json['startedAt']),
      updatedAt: serializer.fromJson<DateTime>(json['updatedAt']),
    );
  }
  @override
  Map<String, dynamic> toJson({ValueSerializer? serializer}) {
    serializer ??= driftRuntimeOptions.defaultSerializer;
    return <String, dynamic>{
      'sessionId': serializer.toJson<String>(sessionId),
      'subjectId': serializer.toJson<String>(subjectId),
      'chapterId': serializer.toJson<String?>(chapterId),
      'testType': serializer.toJson<String>(testType),
      'questionIdsJson': serializer.toJson<String>(questionIdsJson),
      'answersJson': serializer.toJson<String>(answersJson),
      'flaggedQuestionIdsJson': serializer.toJson<String>(
        flaggedQuestionIdsJson,
      ),
      'remainingSeconds': serializer.toJson<int>(remainingSeconds),
      'totalDurationSeconds': serializer.toJson<int>(totalDurationSeconds),
      'currentIndex': serializer.toJson<int>(currentIndex),
      'startedAt': serializer.toJson<DateTime>(startedAt),
      'updatedAt': serializer.toJson<DateTime>(updatedAt),
    };
  }

  ActiveExamDraft copyWith({
    String? sessionId,
    String? subjectId,
    Value<String?> chapterId = const Value.absent(),
    String? testType,
    String? questionIdsJson,
    String? answersJson,
    String? flaggedQuestionIdsJson,
    int? remainingSeconds,
    int? totalDurationSeconds,
    int? currentIndex,
    DateTime? startedAt,
    DateTime? updatedAt,
  }) => ActiveExamDraft(
    sessionId: sessionId ?? this.sessionId,
    subjectId: subjectId ?? this.subjectId,
    chapterId: chapterId.present ? chapterId.value : this.chapterId,
    testType: testType ?? this.testType,
    questionIdsJson: questionIdsJson ?? this.questionIdsJson,
    answersJson: answersJson ?? this.answersJson,
    flaggedQuestionIdsJson:
        flaggedQuestionIdsJson ?? this.flaggedQuestionIdsJson,
    remainingSeconds: remainingSeconds ?? this.remainingSeconds,
    totalDurationSeconds: totalDurationSeconds ?? this.totalDurationSeconds,
    currentIndex: currentIndex ?? this.currentIndex,
    startedAt: startedAt ?? this.startedAt,
    updatedAt: updatedAt ?? this.updatedAt,
  );
  ActiveExamDraft copyWithCompanion(ActiveExamDraftsCompanion data) {
    return ActiveExamDraft(
      sessionId: data.sessionId.present ? data.sessionId.value : this.sessionId,
      subjectId: data.subjectId.present ? data.subjectId.value : this.subjectId,
      chapterId: data.chapterId.present ? data.chapterId.value : this.chapterId,
      testType: data.testType.present ? data.testType.value : this.testType,
      questionIdsJson: data.questionIdsJson.present
          ? data.questionIdsJson.value
          : this.questionIdsJson,
      answersJson: data.answersJson.present
          ? data.answersJson.value
          : this.answersJson,
      flaggedQuestionIdsJson: data.flaggedQuestionIdsJson.present
          ? data.flaggedQuestionIdsJson.value
          : this.flaggedQuestionIdsJson,
      remainingSeconds: data.remainingSeconds.present
          ? data.remainingSeconds.value
          : this.remainingSeconds,
      totalDurationSeconds: data.totalDurationSeconds.present
          ? data.totalDurationSeconds.value
          : this.totalDurationSeconds,
      currentIndex: data.currentIndex.present
          ? data.currentIndex.value
          : this.currentIndex,
      startedAt: data.startedAt.present ? data.startedAt.value : this.startedAt,
      updatedAt: data.updatedAt.present ? data.updatedAt.value : this.updatedAt,
    );
  }

  @override
  String toString() {
    return (StringBuffer('ActiveExamDraft(')
          ..write('sessionId: $sessionId, ')
          ..write('subjectId: $subjectId, ')
          ..write('chapterId: $chapterId, ')
          ..write('testType: $testType, ')
          ..write('questionIdsJson: $questionIdsJson, ')
          ..write('answersJson: $answersJson, ')
          ..write('flaggedQuestionIdsJson: $flaggedQuestionIdsJson, ')
          ..write('remainingSeconds: $remainingSeconds, ')
          ..write('totalDurationSeconds: $totalDurationSeconds, ')
          ..write('currentIndex: $currentIndex, ')
          ..write('startedAt: $startedAt, ')
          ..write('updatedAt: $updatedAt')
          ..write(')'))
        .toString();
  }

  @override
  int get hashCode => Object.hash(
    sessionId,
    subjectId,
    chapterId,
    testType,
    questionIdsJson,
    answersJson,
    flaggedQuestionIdsJson,
    remainingSeconds,
    totalDurationSeconds,
    currentIndex,
    startedAt,
    updatedAt,
  );
  @override
  bool operator ==(Object other) =>
      identical(this, other) ||
      (other is ActiveExamDraft &&
          other.sessionId == this.sessionId &&
          other.subjectId == this.subjectId &&
          other.chapterId == this.chapterId &&
          other.testType == this.testType &&
          other.questionIdsJson == this.questionIdsJson &&
          other.answersJson == this.answersJson &&
          other.flaggedQuestionIdsJson == this.flaggedQuestionIdsJson &&
          other.remainingSeconds == this.remainingSeconds &&
          other.totalDurationSeconds == this.totalDurationSeconds &&
          other.currentIndex == this.currentIndex &&
          other.startedAt == this.startedAt &&
          other.updatedAt == this.updatedAt);
}

class ActiveExamDraftsCompanion extends UpdateCompanion<ActiveExamDraft> {
  final Value<String> sessionId;
  final Value<String> subjectId;
  final Value<String?> chapterId;
  final Value<String> testType;
  final Value<String> questionIdsJson;
  final Value<String> answersJson;
  final Value<String> flaggedQuestionIdsJson;
  final Value<int> remainingSeconds;
  final Value<int> totalDurationSeconds;
  final Value<int> currentIndex;
  final Value<DateTime> startedAt;
  final Value<DateTime> updatedAt;
  final Value<int> rowid;
  const ActiveExamDraftsCompanion({
    this.sessionId = const Value.absent(),
    this.subjectId = const Value.absent(),
    this.chapterId = const Value.absent(),
    this.testType = const Value.absent(),
    this.questionIdsJson = const Value.absent(),
    this.answersJson = const Value.absent(),
    this.flaggedQuestionIdsJson = const Value.absent(),
    this.remainingSeconds = const Value.absent(),
    this.totalDurationSeconds = const Value.absent(),
    this.currentIndex = const Value.absent(),
    this.startedAt = const Value.absent(),
    this.updatedAt = const Value.absent(),
    this.rowid = const Value.absent(),
  });
  ActiveExamDraftsCompanion.insert({
    required String sessionId,
    required String subjectId,
    this.chapterId = const Value.absent(),
    this.testType = const Value.absent(),
    required String questionIdsJson,
    this.answersJson = const Value.absent(),
    this.flaggedQuestionIdsJson = const Value.absent(),
    required int remainingSeconds,
    required int totalDurationSeconds,
    this.currentIndex = const Value.absent(),
    required DateTime startedAt,
    required DateTime updatedAt,
    this.rowid = const Value.absent(),
  }) : sessionId = Value(sessionId),
       subjectId = Value(subjectId),
       questionIdsJson = Value(questionIdsJson),
       remainingSeconds = Value(remainingSeconds),
       totalDurationSeconds = Value(totalDurationSeconds),
       startedAt = Value(startedAt),
       updatedAt = Value(updatedAt);
  static Insertable<ActiveExamDraft> custom({
    Expression<String>? sessionId,
    Expression<String>? subjectId,
    Expression<String>? chapterId,
    Expression<String>? testType,
    Expression<String>? questionIdsJson,
    Expression<String>? answersJson,
    Expression<String>? flaggedQuestionIdsJson,
    Expression<int>? remainingSeconds,
    Expression<int>? totalDurationSeconds,
    Expression<int>? currentIndex,
    Expression<DateTime>? startedAt,
    Expression<DateTime>? updatedAt,
    Expression<int>? rowid,
  }) {
    return RawValuesInsertable({
      if (sessionId != null) 'session_id': sessionId,
      if (subjectId != null) 'subject_id': subjectId,
      if (chapterId != null) 'chapter_id': chapterId,
      if (testType != null) 'test_type': testType,
      if (questionIdsJson != null) 'question_ids_json': questionIdsJson,
      if (answersJson != null) 'answers_json': answersJson,
      if (flaggedQuestionIdsJson != null)
        'flagged_question_ids_json': flaggedQuestionIdsJson,
      if (remainingSeconds != null) 'remaining_seconds': remainingSeconds,
      if (totalDurationSeconds != null)
        'total_duration_seconds': totalDurationSeconds,
      if (currentIndex != null) 'current_index': currentIndex,
      if (startedAt != null) 'started_at': startedAt,
      if (updatedAt != null) 'updated_at': updatedAt,
      if (rowid != null) 'rowid': rowid,
    });
  }

  ActiveExamDraftsCompanion copyWith({
    Value<String>? sessionId,
    Value<String>? subjectId,
    Value<String?>? chapterId,
    Value<String>? testType,
    Value<String>? questionIdsJson,
    Value<String>? answersJson,
    Value<String>? flaggedQuestionIdsJson,
    Value<int>? remainingSeconds,
    Value<int>? totalDurationSeconds,
    Value<int>? currentIndex,
    Value<DateTime>? startedAt,
    Value<DateTime>? updatedAt,
    Value<int>? rowid,
  }) {
    return ActiveExamDraftsCompanion(
      sessionId: sessionId ?? this.sessionId,
      subjectId: subjectId ?? this.subjectId,
      chapterId: chapterId ?? this.chapterId,
      testType: testType ?? this.testType,
      questionIdsJson: questionIdsJson ?? this.questionIdsJson,
      answersJson: answersJson ?? this.answersJson,
      flaggedQuestionIdsJson:
          flaggedQuestionIdsJson ?? this.flaggedQuestionIdsJson,
      remainingSeconds: remainingSeconds ?? this.remainingSeconds,
      totalDurationSeconds: totalDurationSeconds ?? this.totalDurationSeconds,
      currentIndex: currentIndex ?? this.currentIndex,
      startedAt: startedAt ?? this.startedAt,
      updatedAt: updatedAt ?? this.updatedAt,
      rowid: rowid ?? this.rowid,
    );
  }

  @override
  Map<String, Expression> toColumns(bool nullToAbsent) {
    final map = <String, Expression>{};
    if (sessionId.present) {
      map['session_id'] = Variable<String>(sessionId.value);
    }
    if (subjectId.present) {
      map['subject_id'] = Variable<String>(subjectId.value);
    }
    if (chapterId.present) {
      map['chapter_id'] = Variable<String>(chapterId.value);
    }
    if (testType.present) {
      map['test_type'] = Variable<String>(testType.value);
    }
    if (questionIdsJson.present) {
      map['question_ids_json'] = Variable<String>(questionIdsJson.value);
    }
    if (answersJson.present) {
      map['answers_json'] = Variable<String>(answersJson.value);
    }
    if (flaggedQuestionIdsJson.present) {
      map['flagged_question_ids_json'] = Variable<String>(
        flaggedQuestionIdsJson.value,
      );
    }
    if (remainingSeconds.present) {
      map['remaining_seconds'] = Variable<int>(remainingSeconds.value);
    }
    if (totalDurationSeconds.present) {
      map['total_duration_seconds'] = Variable<int>(totalDurationSeconds.value);
    }
    if (currentIndex.present) {
      map['current_index'] = Variable<int>(currentIndex.value);
    }
    if (startedAt.present) {
      map['started_at'] = Variable<DateTime>(startedAt.value);
    }
    if (updatedAt.present) {
      map['updated_at'] = Variable<DateTime>(updatedAt.value);
    }
    if (rowid.present) {
      map['rowid'] = Variable<int>(rowid.value);
    }
    return map;
  }

  @override
  String toString() {
    return (StringBuffer('ActiveExamDraftsCompanion(')
          ..write('sessionId: $sessionId, ')
          ..write('subjectId: $subjectId, ')
          ..write('chapterId: $chapterId, ')
          ..write('testType: $testType, ')
          ..write('questionIdsJson: $questionIdsJson, ')
          ..write('answersJson: $answersJson, ')
          ..write('flaggedQuestionIdsJson: $flaggedQuestionIdsJson, ')
          ..write('remainingSeconds: $remainingSeconds, ')
          ..write('totalDurationSeconds: $totalDurationSeconds, ')
          ..write('currentIndex: $currentIndex, ')
          ..write('startedAt: $startedAt, ')
          ..write('updatedAt: $updatedAt, ')
          ..write('rowid: $rowid')
          ..write(')'))
        .toString();
  }
}

class $SyncQueueTable extends SyncQueue
    with TableInfo<$SyncQueueTable, SyncQueueData> {
  @override
  final GeneratedDatabase attachedDatabase;
  final String? _alias;
  $SyncQueueTable(this.attachedDatabase, [this._alias]);
  static const VerificationMeta _idMeta = const VerificationMeta('id');
  @override
  late final GeneratedColumn<int> id = GeneratedColumn<int>(
    'id',
    aliasedName,
    false,
    hasAutoIncrement: true,
    type: DriftSqlType.int,
    requiredDuringInsert: false,
    defaultConstraints: GeneratedColumn.constraintIsAlways(
      'PRIMARY KEY AUTOINCREMENT',
    ),
  );
  static const VerificationMeta _eventIdMeta = const VerificationMeta(
    'eventId',
  );
  @override
  late final GeneratedColumn<String> eventId = GeneratedColumn<String>(
    'event_id',
    aliasedName,
    false,
    type: DriftSqlType.string,
    requiredDuringInsert: true,
    defaultConstraints: GeneratedColumn.constraintIsAlways('UNIQUE'),
  );
  static const VerificationMeta _eventTypeMeta = const VerificationMeta(
    'eventType',
  );
  @override
  late final GeneratedColumn<String> eventType = GeneratedColumn<String>(
    'event_type',
    aliasedName,
    false,
    type: DriftSqlType.string,
    requiredDuringInsert: true,
  );
  static const VerificationMeta _payloadJsonMeta = const VerificationMeta(
    'payloadJson',
  );
  @override
  late final GeneratedColumn<String> payloadJson = GeneratedColumn<String>(
    'payload_json',
    aliasedName,
    false,
    type: DriftSqlType.string,
    requiredDuringInsert: true,
  );
  static const VerificationMeta _retryCountMeta = const VerificationMeta(
    'retryCount',
  );
  @override
  late final GeneratedColumn<int> retryCount = GeneratedColumn<int>(
    'retry_count',
    aliasedName,
    false,
    type: DriftSqlType.int,
    requiredDuringInsert: false,
    defaultValue: const Constant(0),
  );
  static const VerificationMeta _lastErrorMeta = const VerificationMeta(
    'lastError',
  );
  @override
  late final GeneratedColumn<String> lastError = GeneratedColumn<String>(
    'last_error',
    aliasedName,
    true,
    type: DriftSqlType.string,
    requiredDuringInsert: false,
  );
  static const VerificationMeta _createdAtMeta = const VerificationMeta(
    'createdAt',
  );
  @override
  late final GeneratedColumn<DateTime> createdAt = GeneratedColumn<DateTime>(
    'created_at',
    aliasedName,
    false,
    type: DriftSqlType.dateTime,
    requiredDuringInsert: true,
  );
  static const VerificationMeta _lastAttemptAtMeta = const VerificationMeta(
    'lastAttemptAt',
  );
  @override
  late final GeneratedColumn<DateTime> lastAttemptAt =
      GeneratedColumn<DateTime>(
        'last_attempt_at',
        aliasedName,
        true,
        type: DriftSqlType.dateTime,
        requiredDuringInsert: false,
      );
  @override
  List<GeneratedColumn> get $columns => [
    id,
    eventId,
    eventType,
    payloadJson,
    retryCount,
    lastError,
    createdAt,
    lastAttemptAt,
  ];
  @override
  String get aliasedName => _alias ?? actualTableName;
  @override
  String get actualTableName => $name;
  static const String $name = 'sync_queue';
  @override
  VerificationContext validateIntegrity(
    Insertable<SyncQueueData> instance, {
    bool isInserting = false,
  }) {
    final context = VerificationContext();
    final data = instance.toColumns(true);
    if (data.containsKey('id')) {
      context.handle(_idMeta, id.isAcceptableOrUnknown(data['id']!, _idMeta));
    }
    if (data.containsKey('event_id')) {
      context.handle(
        _eventIdMeta,
        eventId.isAcceptableOrUnknown(data['event_id']!, _eventIdMeta),
      );
    } else if (isInserting) {
      context.missing(_eventIdMeta);
    }
    if (data.containsKey('event_type')) {
      context.handle(
        _eventTypeMeta,
        eventType.isAcceptableOrUnknown(data['event_type']!, _eventTypeMeta),
      );
    } else if (isInserting) {
      context.missing(_eventTypeMeta);
    }
    if (data.containsKey('payload_json')) {
      context.handle(
        _payloadJsonMeta,
        payloadJson.isAcceptableOrUnknown(
          data['payload_json']!,
          _payloadJsonMeta,
        ),
      );
    } else if (isInserting) {
      context.missing(_payloadJsonMeta);
    }
    if (data.containsKey('retry_count')) {
      context.handle(
        _retryCountMeta,
        retryCount.isAcceptableOrUnknown(data['retry_count']!, _retryCountMeta),
      );
    }
    if (data.containsKey('last_error')) {
      context.handle(
        _lastErrorMeta,
        lastError.isAcceptableOrUnknown(data['last_error']!, _lastErrorMeta),
      );
    }
    if (data.containsKey('created_at')) {
      context.handle(
        _createdAtMeta,
        createdAt.isAcceptableOrUnknown(data['created_at']!, _createdAtMeta),
      );
    } else if (isInserting) {
      context.missing(_createdAtMeta);
    }
    if (data.containsKey('last_attempt_at')) {
      context.handle(
        _lastAttemptAtMeta,
        lastAttemptAt.isAcceptableOrUnknown(
          data['last_attempt_at']!,
          _lastAttemptAtMeta,
        ),
      );
    }
    return context;
  }

  @override
  Set<GeneratedColumn> get $primaryKey => {id};
  @override
  SyncQueueData map(Map<String, dynamic> data, {String? tablePrefix}) {
    final effectivePrefix = tablePrefix != null ? '$tablePrefix.' : '';
    return SyncQueueData(
      id: attachedDatabase.typeMapping.read(
        DriftSqlType.int,
        data['${effectivePrefix}id'],
      )!,
      eventId: attachedDatabase.typeMapping.read(
        DriftSqlType.string,
        data['${effectivePrefix}event_id'],
      )!,
      eventType: attachedDatabase.typeMapping.read(
        DriftSqlType.string,
        data['${effectivePrefix}event_type'],
      )!,
      payloadJson: attachedDatabase.typeMapping.read(
        DriftSqlType.string,
        data['${effectivePrefix}payload_json'],
      )!,
      retryCount: attachedDatabase.typeMapping.read(
        DriftSqlType.int,
        data['${effectivePrefix}retry_count'],
      )!,
      lastError: attachedDatabase.typeMapping.read(
        DriftSqlType.string,
        data['${effectivePrefix}last_error'],
      ),
      createdAt: attachedDatabase.typeMapping.read(
        DriftSqlType.dateTime,
        data['${effectivePrefix}created_at'],
      )!,
      lastAttemptAt: attachedDatabase.typeMapping.read(
        DriftSqlType.dateTime,
        data['${effectivePrefix}last_attempt_at'],
      ),
    );
  }

  @override
  $SyncQueueTable createAlias(String alias) {
    return $SyncQueueTable(attachedDatabase, alias);
  }
}

class SyncQueueData extends DataClass implements Insertable<SyncQueueData> {
  final int id;
  final String eventId;
  final String eventType;
  final String payloadJson;
  final int retryCount;
  final String? lastError;
  final DateTime createdAt;
  final DateTime? lastAttemptAt;
  const SyncQueueData({
    required this.id,
    required this.eventId,
    required this.eventType,
    required this.payloadJson,
    required this.retryCount,
    this.lastError,
    required this.createdAt,
    this.lastAttemptAt,
  });
  @override
  Map<String, Expression> toColumns(bool nullToAbsent) {
    final map = <String, Expression>{};
    map['id'] = Variable<int>(id);
    map['event_id'] = Variable<String>(eventId);
    map['event_type'] = Variable<String>(eventType);
    map['payload_json'] = Variable<String>(payloadJson);
    map['retry_count'] = Variable<int>(retryCount);
    if (!nullToAbsent || lastError != null) {
      map['last_error'] = Variable<String>(lastError);
    }
    map['created_at'] = Variable<DateTime>(createdAt);
    if (!nullToAbsent || lastAttemptAt != null) {
      map['last_attempt_at'] = Variable<DateTime>(lastAttemptAt);
    }
    return map;
  }

  SyncQueueCompanion toCompanion(bool nullToAbsent) {
    return SyncQueueCompanion(
      id: Value(id),
      eventId: Value(eventId),
      eventType: Value(eventType),
      payloadJson: Value(payloadJson),
      retryCount: Value(retryCount),
      lastError: lastError == null && nullToAbsent
          ? const Value.absent()
          : Value(lastError),
      createdAt: Value(createdAt),
      lastAttemptAt: lastAttemptAt == null && nullToAbsent
          ? const Value.absent()
          : Value(lastAttemptAt),
    );
  }

  factory SyncQueueData.fromJson(
    Map<String, dynamic> json, {
    ValueSerializer? serializer,
  }) {
    serializer ??= driftRuntimeOptions.defaultSerializer;
    return SyncQueueData(
      id: serializer.fromJson<int>(json['id']),
      eventId: serializer.fromJson<String>(json['eventId']),
      eventType: serializer.fromJson<String>(json['eventType']),
      payloadJson: serializer.fromJson<String>(json['payloadJson']),
      retryCount: serializer.fromJson<int>(json['retryCount']),
      lastError: serializer.fromJson<String?>(json['lastError']),
      createdAt: serializer.fromJson<DateTime>(json['createdAt']),
      lastAttemptAt: serializer.fromJson<DateTime?>(json['lastAttemptAt']),
    );
  }
  @override
  Map<String, dynamic> toJson({ValueSerializer? serializer}) {
    serializer ??= driftRuntimeOptions.defaultSerializer;
    return <String, dynamic>{
      'id': serializer.toJson<int>(id),
      'eventId': serializer.toJson<String>(eventId),
      'eventType': serializer.toJson<String>(eventType),
      'payloadJson': serializer.toJson<String>(payloadJson),
      'retryCount': serializer.toJson<int>(retryCount),
      'lastError': serializer.toJson<String?>(lastError),
      'createdAt': serializer.toJson<DateTime>(createdAt),
      'lastAttemptAt': serializer.toJson<DateTime?>(lastAttemptAt),
    };
  }

  SyncQueueData copyWith({
    int? id,
    String? eventId,
    String? eventType,
    String? payloadJson,
    int? retryCount,
    Value<String?> lastError = const Value.absent(),
    DateTime? createdAt,
    Value<DateTime?> lastAttemptAt = const Value.absent(),
  }) => SyncQueueData(
    id: id ?? this.id,
    eventId: eventId ?? this.eventId,
    eventType: eventType ?? this.eventType,
    payloadJson: payloadJson ?? this.payloadJson,
    retryCount: retryCount ?? this.retryCount,
    lastError: lastError.present ? lastError.value : this.lastError,
    createdAt: createdAt ?? this.createdAt,
    lastAttemptAt: lastAttemptAt.present
        ? lastAttemptAt.value
        : this.lastAttemptAt,
  );
  SyncQueueData copyWithCompanion(SyncQueueCompanion data) {
    return SyncQueueData(
      id: data.id.present ? data.id.value : this.id,
      eventId: data.eventId.present ? data.eventId.value : this.eventId,
      eventType: data.eventType.present ? data.eventType.value : this.eventType,
      payloadJson: data.payloadJson.present
          ? data.payloadJson.value
          : this.payloadJson,
      retryCount: data.retryCount.present
          ? data.retryCount.value
          : this.retryCount,
      lastError: data.lastError.present ? data.lastError.value : this.lastError,
      createdAt: data.createdAt.present ? data.createdAt.value : this.createdAt,
      lastAttemptAt: data.lastAttemptAt.present
          ? data.lastAttemptAt.value
          : this.lastAttemptAt,
    );
  }

  @override
  String toString() {
    return (StringBuffer('SyncQueueData(')
          ..write('id: $id, ')
          ..write('eventId: $eventId, ')
          ..write('eventType: $eventType, ')
          ..write('payloadJson: $payloadJson, ')
          ..write('retryCount: $retryCount, ')
          ..write('lastError: $lastError, ')
          ..write('createdAt: $createdAt, ')
          ..write('lastAttemptAt: $lastAttemptAt')
          ..write(')'))
        .toString();
  }

  @override
  int get hashCode => Object.hash(
    id,
    eventId,
    eventType,
    payloadJson,
    retryCount,
    lastError,
    createdAt,
    lastAttemptAt,
  );
  @override
  bool operator ==(Object other) =>
      identical(this, other) ||
      (other is SyncQueueData &&
          other.id == this.id &&
          other.eventId == this.eventId &&
          other.eventType == this.eventType &&
          other.payloadJson == this.payloadJson &&
          other.retryCount == this.retryCount &&
          other.lastError == this.lastError &&
          other.createdAt == this.createdAt &&
          other.lastAttemptAt == this.lastAttemptAt);
}

class SyncQueueCompanion extends UpdateCompanion<SyncQueueData> {
  final Value<int> id;
  final Value<String> eventId;
  final Value<String> eventType;
  final Value<String> payloadJson;
  final Value<int> retryCount;
  final Value<String?> lastError;
  final Value<DateTime> createdAt;
  final Value<DateTime?> lastAttemptAt;
  const SyncQueueCompanion({
    this.id = const Value.absent(),
    this.eventId = const Value.absent(),
    this.eventType = const Value.absent(),
    this.payloadJson = const Value.absent(),
    this.retryCount = const Value.absent(),
    this.lastError = const Value.absent(),
    this.createdAt = const Value.absent(),
    this.lastAttemptAt = const Value.absent(),
  });
  SyncQueueCompanion.insert({
    this.id = const Value.absent(),
    required String eventId,
    required String eventType,
    required String payloadJson,
    this.retryCount = const Value.absent(),
    this.lastError = const Value.absent(),
    required DateTime createdAt,
    this.lastAttemptAt = const Value.absent(),
  }) : eventId = Value(eventId),
       eventType = Value(eventType),
       payloadJson = Value(payloadJson),
       createdAt = Value(createdAt);
  static Insertable<SyncQueueData> custom({
    Expression<int>? id,
    Expression<String>? eventId,
    Expression<String>? eventType,
    Expression<String>? payloadJson,
    Expression<int>? retryCount,
    Expression<String>? lastError,
    Expression<DateTime>? createdAt,
    Expression<DateTime>? lastAttemptAt,
  }) {
    return RawValuesInsertable({
      if (id != null) 'id': id,
      if (eventId != null) 'event_id': eventId,
      if (eventType != null) 'event_type': eventType,
      if (payloadJson != null) 'payload_json': payloadJson,
      if (retryCount != null) 'retry_count': retryCount,
      if (lastError != null) 'last_error': lastError,
      if (createdAt != null) 'created_at': createdAt,
      if (lastAttemptAt != null) 'last_attempt_at': lastAttemptAt,
    });
  }

  SyncQueueCompanion copyWith({
    Value<int>? id,
    Value<String>? eventId,
    Value<String>? eventType,
    Value<String>? payloadJson,
    Value<int>? retryCount,
    Value<String?>? lastError,
    Value<DateTime>? createdAt,
    Value<DateTime?>? lastAttemptAt,
  }) {
    return SyncQueueCompanion(
      id: id ?? this.id,
      eventId: eventId ?? this.eventId,
      eventType: eventType ?? this.eventType,
      payloadJson: payloadJson ?? this.payloadJson,
      retryCount: retryCount ?? this.retryCount,
      lastError: lastError ?? this.lastError,
      createdAt: createdAt ?? this.createdAt,
      lastAttemptAt: lastAttemptAt ?? this.lastAttemptAt,
    );
  }

  @override
  Map<String, Expression> toColumns(bool nullToAbsent) {
    final map = <String, Expression>{};
    if (id.present) {
      map['id'] = Variable<int>(id.value);
    }
    if (eventId.present) {
      map['event_id'] = Variable<String>(eventId.value);
    }
    if (eventType.present) {
      map['event_type'] = Variable<String>(eventType.value);
    }
    if (payloadJson.present) {
      map['payload_json'] = Variable<String>(payloadJson.value);
    }
    if (retryCount.present) {
      map['retry_count'] = Variable<int>(retryCount.value);
    }
    if (lastError.present) {
      map['last_error'] = Variable<String>(lastError.value);
    }
    if (createdAt.present) {
      map['created_at'] = Variable<DateTime>(createdAt.value);
    }
    if (lastAttemptAt.present) {
      map['last_attempt_at'] = Variable<DateTime>(lastAttemptAt.value);
    }
    return map;
  }

  @override
  String toString() {
    return (StringBuffer('SyncQueueCompanion(')
          ..write('id: $id, ')
          ..write('eventId: $eventId, ')
          ..write('eventType: $eventType, ')
          ..write('payloadJson: $payloadJson, ')
          ..write('retryCount: $retryCount, ')
          ..write('lastError: $lastError, ')
          ..write('createdAt: $createdAt, ')
          ..write('lastAttemptAt: $lastAttemptAt')
          ..write(')'))
        .toString();
  }
}

class $LocalStudentCacheTable extends LocalStudentCache
    with TableInfo<$LocalStudentCacheTable, LocalStudentCacheData> {
  @override
  final GeneratedDatabase attachedDatabase;
  final String? _alias;
  $LocalStudentCacheTable(this.attachedDatabase, [this._alias]);
  static const VerificationMeta _cacheKeyMeta = const VerificationMeta(
    'cacheKey',
  );
  @override
  late final GeneratedColumn<String> cacheKey = GeneratedColumn<String>(
    'cache_key',
    aliasedName,
    false,
    type: DriftSqlType.string,
    requiredDuringInsert: true,
  );
  static const VerificationMeta _payloadJsonMeta = const VerificationMeta(
    'payloadJson',
  );
  @override
  late final GeneratedColumn<String> payloadJson = GeneratedColumn<String>(
    'payload_json',
    aliasedName,
    false,
    type: DriftSqlType.string,
    requiredDuringInsert: true,
  );
  static const VerificationMeta _updatedAtMeta = const VerificationMeta(
    'updatedAt',
  );
  @override
  late final GeneratedColumn<DateTime> updatedAt = GeneratedColumn<DateTime>(
    'updated_at',
    aliasedName,
    false,
    type: DriftSqlType.dateTime,
    requiredDuringInsert: true,
  );
  @override
  List<GeneratedColumn> get $columns => [cacheKey, payloadJson, updatedAt];
  @override
  String get aliasedName => _alias ?? actualTableName;
  @override
  String get actualTableName => $name;
  static const String $name = 'local_student_cache';
  @override
  VerificationContext validateIntegrity(
    Insertable<LocalStudentCacheData> instance, {
    bool isInserting = false,
  }) {
    final context = VerificationContext();
    final data = instance.toColumns(true);
    if (data.containsKey('cache_key')) {
      context.handle(
        _cacheKeyMeta,
        cacheKey.isAcceptableOrUnknown(data['cache_key']!, _cacheKeyMeta),
      );
    } else if (isInserting) {
      context.missing(_cacheKeyMeta);
    }
    if (data.containsKey('payload_json')) {
      context.handle(
        _payloadJsonMeta,
        payloadJson.isAcceptableOrUnknown(
          data['payload_json']!,
          _payloadJsonMeta,
        ),
      );
    } else if (isInserting) {
      context.missing(_payloadJsonMeta);
    }
    if (data.containsKey('updated_at')) {
      context.handle(
        _updatedAtMeta,
        updatedAt.isAcceptableOrUnknown(data['updated_at']!, _updatedAtMeta),
      );
    } else if (isInserting) {
      context.missing(_updatedAtMeta);
    }
    return context;
  }

  @override
  Set<GeneratedColumn> get $primaryKey => {cacheKey};
  @override
  LocalStudentCacheData map(Map<String, dynamic> data, {String? tablePrefix}) {
    final effectivePrefix = tablePrefix != null ? '$tablePrefix.' : '';
    return LocalStudentCacheData(
      cacheKey: attachedDatabase.typeMapping.read(
        DriftSqlType.string,
        data['${effectivePrefix}cache_key'],
      )!,
      payloadJson: attachedDatabase.typeMapping.read(
        DriftSqlType.string,
        data['${effectivePrefix}payload_json'],
      )!,
      updatedAt: attachedDatabase.typeMapping.read(
        DriftSqlType.dateTime,
        data['${effectivePrefix}updated_at'],
      )!,
    );
  }

  @override
  $LocalStudentCacheTable createAlias(String alias) {
    return $LocalStudentCacheTable(attachedDatabase, alias);
  }
}

class LocalStudentCacheData extends DataClass
    implements Insertable<LocalStudentCacheData> {
  final String cacheKey;
  final String payloadJson;
  final DateTime updatedAt;
  const LocalStudentCacheData({
    required this.cacheKey,
    required this.payloadJson,
    required this.updatedAt,
  });
  @override
  Map<String, Expression> toColumns(bool nullToAbsent) {
    final map = <String, Expression>{};
    map['cache_key'] = Variable<String>(cacheKey);
    map['payload_json'] = Variable<String>(payloadJson);
    map['updated_at'] = Variable<DateTime>(updatedAt);
    return map;
  }

  LocalStudentCacheCompanion toCompanion(bool nullToAbsent) {
    return LocalStudentCacheCompanion(
      cacheKey: Value(cacheKey),
      payloadJson: Value(payloadJson),
      updatedAt: Value(updatedAt),
    );
  }

  factory LocalStudentCacheData.fromJson(
    Map<String, dynamic> json, {
    ValueSerializer? serializer,
  }) {
    serializer ??= driftRuntimeOptions.defaultSerializer;
    return LocalStudentCacheData(
      cacheKey: serializer.fromJson<String>(json['cacheKey']),
      payloadJson: serializer.fromJson<String>(json['payloadJson']),
      updatedAt: serializer.fromJson<DateTime>(json['updatedAt']),
    );
  }
  @override
  Map<String, dynamic> toJson({ValueSerializer? serializer}) {
    serializer ??= driftRuntimeOptions.defaultSerializer;
    return <String, dynamic>{
      'cacheKey': serializer.toJson<String>(cacheKey),
      'payloadJson': serializer.toJson<String>(payloadJson),
      'updatedAt': serializer.toJson<DateTime>(updatedAt),
    };
  }

  LocalStudentCacheData copyWith({
    String? cacheKey,
    String? payloadJson,
    DateTime? updatedAt,
  }) => LocalStudentCacheData(
    cacheKey: cacheKey ?? this.cacheKey,
    payloadJson: payloadJson ?? this.payloadJson,
    updatedAt: updatedAt ?? this.updatedAt,
  );
  LocalStudentCacheData copyWithCompanion(LocalStudentCacheCompanion data) {
    return LocalStudentCacheData(
      cacheKey: data.cacheKey.present ? data.cacheKey.value : this.cacheKey,
      payloadJson: data.payloadJson.present
          ? data.payloadJson.value
          : this.payloadJson,
      updatedAt: data.updatedAt.present ? data.updatedAt.value : this.updatedAt,
    );
  }

  @override
  String toString() {
    return (StringBuffer('LocalStudentCacheData(')
          ..write('cacheKey: $cacheKey, ')
          ..write('payloadJson: $payloadJson, ')
          ..write('updatedAt: $updatedAt')
          ..write(')'))
        .toString();
  }

  @override
  int get hashCode => Object.hash(cacheKey, payloadJson, updatedAt);
  @override
  bool operator ==(Object other) =>
      identical(this, other) ||
      (other is LocalStudentCacheData &&
          other.cacheKey == this.cacheKey &&
          other.payloadJson == this.payloadJson &&
          other.updatedAt == this.updatedAt);
}

class LocalStudentCacheCompanion
    extends UpdateCompanion<LocalStudentCacheData> {
  final Value<String> cacheKey;
  final Value<String> payloadJson;
  final Value<DateTime> updatedAt;
  final Value<int> rowid;
  const LocalStudentCacheCompanion({
    this.cacheKey = const Value.absent(),
    this.payloadJson = const Value.absent(),
    this.updatedAt = const Value.absent(),
    this.rowid = const Value.absent(),
  });
  LocalStudentCacheCompanion.insert({
    required String cacheKey,
    required String payloadJson,
    required DateTime updatedAt,
    this.rowid = const Value.absent(),
  }) : cacheKey = Value(cacheKey),
       payloadJson = Value(payloadJson),
       updatedAt = Value(updatedAt);
  static Insertable<LocalStudentCacheData> custom({
    Expression<String>? cacheKey,
    Expression<String>? payloadJson,
    Expression<DateTime>? updatedAt,
    Expression<int>? rowid,
  }) {
    return RawValuesInsertable({
      if (cacheKey != null) 'cache_key': cacheKey,
      if (payloadJson != null) 'payload_json': payloadJson,
      if (updatedAt != null) 'updated_at': updatedAt,
      if (rowid != null) 'rowid': rowid,
    });
  }

  LocalStudentCacheCompanion copyWith({
    Value<String>? cacheKey,
    Value<String>? payloadJson,
    Value<DateTime>? updatedAt,
    Value<int>? rowid,
  }) {
    return LocalStudentCacheCompanion(
      cacheKey: cacheKey ?? this.cacheKey,
      payloadJson: payloadJson ?? this.payloadJson,
      updatedAt: updatedAt ?? this.updatedAt,
      rowid: rowid ?? this.rowid,
    );
  }

  @override
  Map<String, Expression> toColumns(bool nullToAbsent) {
    final map = <String, Expression>{};
    if (cacheKey.present) {
      map['cache_key'] = Variable<String>(cacheKey.value);
    }
    if (payloadJson.present) {
      map['payload_json'] = Variable<String>(payloadJson.value);
    }
    if (updatedAt.present) {
      map['updated_at'] = Variable<DateTime>(updatedAt.value);
    }
    if (rowid.present) {
      map['rowid'] = Variable<int>(rowid.value);
    }
    return map;
  }

  @override
  String toString() {
    return (StringBuffer('LocalStudentCacheCompanion(')
          ..write('cacheKey: $cacheKey, ')
          ..write('payloadJson: $payloadJson, ')
          ..write('updatedAt: $updatedAt, ')
          ..write('rowid: $rowid')
          ..write(')'))
        .toString();
  }
}

abstract class _$AppDatabase extends GeneratedDatabase {
  _$AppDatabase(QueryExecutor e) : super(e);
  $AppDatabaseManager get managers => $AppDatabaseManager(this);
  late final $DownloadedChaptersTable downloadedChapters =
      $DownloadedChaptersTable(this);
  late final $CachedLessonsTable cachedLessons = $CachedLessonsTable(this);
  late final $CachedQuestionsTable cachedQuestions = $CachedQuestionsTable(
    this,
  );
  late final $ActiveExamDraftsTable activeExamDrafts = $ActiveExamDraftsTable(
    this,
  );
  late final $SyncQueueTable syncQueue = $SyncQueueTable(this);
  late final $LocalStudentCacheTable localStudentCache =
      $LocalStudentCacheTable(this);
  @override
  Iterable<TableInfo<Table, Object?>> get allTables =>
      allSchemaEntities.whereType<TableInfo<Table, Object?>>();
  @override
  List<DatabaseSchemaEntity> get allSchemaEntities => [
    downloadedChapters,
    cachedLessons,
    cachedQuestions,
    activeExamDrafts,
    syncQueue,
    localStudentCache,
  ];
}

typedef $$DownloadedChaptersTableCreateCompanionBuilder =
    DownloadedChaptersCompanion Function({
      required String id,
      required String subjectId,
      required String titleBangla,
      Value<String?> titleEnglish,
      Value<int> version,
      Value<int> lessonCount,
      Value<int> questionCount,
      Value<int> sizeBytes,
      required DateTime downloadedAt,
      Value<String?> metadataJson,
      Value<int> rowid,
    });
typedef $$DownloadedChaptersTableUpdateCompanionBuilder =
    DownloadedChaptersCompanion Function({
      Value<String> id,
      Value<String> subjectId,
      Value<String> titleBangla,
      Value<String?> titleEnglish,
      Value<int> version,
      Value<int> lessonCount,
      Value<int> questionCount,
      Value<int> sizeBytes,
      Value<DateTime> downloadedAt,
      Value<String?> metadataJson,
      Value<int> rowid,
    });

class $$DownloadedChaptersTableFilterComposer
    extends Composer<_$AppDatabase, $DownloadedChaptersTable> {
  $$DownloadedChaptersTableFilterComposer({
    required super.$db,
    required super.$table,
    super.joinBuilder,
    super.$addJoinBuilderToRootComposer,
    super.$removeJoinBuilderFromRootComposer,
  });
  ColumnFilters<String> get id => $composableBuilder(
    column: $table.id,
    builder: (column) => ColumnFilters(column),
  );

  ColumnFilters<String> get subjectId => $composableBuilder(
    column: $table.subjectId,
    builder: (column) => ColumnFilters(column),
  );

  ColumnFilters<String> get titleBangla => $composableBuilder(
    column: $table.titleBangla,
    builder: (column) => ColumnFilters(column),
  );

  ColumnFilters<String> get titleEnglish => $composableBuilder(
    column: $table.titleEnglish,
    builder: (column) => ColumnFilters(column),
  );

  ColumnFilters<int> get version => $composableBuilder(
    column: $table.version,
    builder: (column) => ColumnFilters(column),
  );

  ColumnFilters<int> get lessonCount => $composableBuilder(
    column: $table.lessonCount,
    builder: (column) => ColumnFilters(column),
  );

  ColumnFilters<int> get questionCount => $composableBuilder(
    column: $table.questionCount,
    builder: (column) => ColumnFilters(column),
  );

  ColumnFilters<int> get sizeBytes => $composableBuilder(
    column: $table.sizeBytes,
    builder: (column) => ColumnFilters(column),
  );

  ColumnFilters<DateTime> get downloadedAt => $composableBuilder(
    column: $table.downloadedAt,
    builder: (column) => ColumnFilters(column),
  );

  ColumnFilters<String> get metadataJson => $composableBuilder(
    column: $table.metadataJson,
    builder: (column) => ColumnFilters(column),
  );
}

class $$DownloadedChaptersTableOrderingComposer
    extends Composer<_$AppDatabase, $DownloadedChaptersTable> {
  $$DownloadedChaptersTableOrderingComposer({
    required super.$db,
    required super.$table,
    super.joinBuilder,
    super.$addJoinBuilderToRootComposer,
    super.$removeJoinBuilderFromRootComposer,
  });
  ColumnOrderings<String> get id => $composableBuilder(
    column: $table.id,
    builder: (column) => ColumnOrderings(column),
  );

  ColumnOrderings<String> get subjectId => $composableBuilder(
    column: $table.subjectId,
    builder: (column) => ColumnOrderings(column),
  );

  ColumnOrderings<String> get titleBangla => $composableBuilder(
    column: $table.titleBangla,
    builder: (column) => ColumnOrderings(column),
  );

  ColumnOrderings<String> get titleEnglish => $composableBuilder(
    column: $table.titleEnglish,
    builder: (column) => ColumnOrderings(column),
  );

  ColumnOrderings<int> get version => $composableBuilder(
    column: $table.version,
    builder: (column) => ColumnOrderings(column),
  );

  ColumnOrderings<int> get lessonCount => $composableBuilder(
    column: $table.lessonCount,
    builder: (column) => ColumnOrderings(column),
  );

  ColumnOrderings<int> get questionCount => $composableBuilder(
    column: $table.questionCount,
    builder: (column) => ColumnOrderings(column),
  );

  ColumnOrderings<int> get sizeBytes => $composableBuilder(
    column: $table.sizeBytes,
    builder: (column) => ColumnOrderings(column),
  );

  ColumnOrderings<DateTime> get downloadedAt => $composableBuilder(
    column: $table.downloadedAt,
    builder: (column) => ColumnOrderings(column),
  );

  ColumnOrderings<String> get metadataJson => $composableBuilder(
    column: $table.metadataJson,
    builder: (column) => ColumnOrderings(column),
  );
}

class $$DownloadedChaptersTableAnnotationComposer
    extends Composer<_$AppDatabase, $DownloadedChaptersTable> {
  $$DownloadedChaptersTableAnnotationComposer({
    required super.$db,
    required super.$table,
    super.joinBuilder,
    super.$addJoinBuilderToRootComposer,
    super.$removeJoinBuilderFromRootComposer,
  });
  GeneratedColumn<String> get id =>
      $composableBuilder(column: $table.id, builder: (column) => column);

  GeneratedColumn<String> get subjectId =>
      $composableBuilder(column: $table.subjectId, builder: (column) => column);

  GeneratedColumn<String> get titleBangla => $composableBuilder(
    column: $table.titleBangla,
    builder: (column) => column,
  );

  GeneratedColumn<String> get titleEnglish => $composableBuilder(
    column: $table.titleEnglish,
    builder: (column) => column,
  );

  GeneratedColumn<int> get version =>
      $composableBuilder(column: $table.version, builder: (column) => column);

  GeneratedColumn<int> get lessonCount => $composableBuilder(
    column: $table.lessonCount,
    builder: (column) => column,
  );

  GeneratedColumn<int> get questionCount => $composableBuilder(
    column: $table.questionCount,
    builder: (column) => column,
  );

  GeneratedColumn<int> get sizeBytes =>
      $composableBuilder(column: $table.sizeBytes, builder: (column) => column);

  GeneratedColumn<DateTime> get downloadedAt => $composableBuilder(
    column: $table.downloadedAt,
    builder: (column) => column,
  );

  GeneratedColumn<String> get metadataJson => $composableBuilder(
    column: $table.metadataJson,
    builder: (column) => column,
  );
}

class $$DownloadedChaptersTableTableManager
    extends
        RootTableManager<
          _$AppDatabase,
          $DownloadedChaptersTable,
          DownloadedChapter,
          $$DownloadedChaptersTableFilterComposer,
          $$DownloadedChaptersTableOrderingComposer,
          $$DownloadedChaptersTableAnnotationComposer,
          $$DownloadedChaptersTableCreateCompanionBuilder,
          $$DownloadedChaptersTableUpdateCompanionBuilder,
          (
            DownloadedChapter,
            BaseReferences<
              _$AppDatabase,
              $DownloadedChaptersTable,
              DownloadedChapter
            >,
          ),
          DownloadedChapter,
          PrefetchHooks Function()
        > {
  $$DownloadedChaptersTableTableManager(
    _$AppDatabase db,
    $DownloadedChaptersTable table,
  ) : super(
        TableManagerState(
          db: db,
          table: table,
          createFilteringComposer: () =>
              $$DownloadedChaptersTableFilterComposer($db: db, $table: table),
          createOrderingComposer: () =>
              $$DownloadedChaptersTableOrderingComposer($db: db, $table: table),
          createComputedFieldComposer: () =>
              $$DownloadedChaptersTableAnnotationComposer(
                $db: db,
                $table: table,
              ),
          updateCompanionCallback:
              ({
                Value<String> id = const Value.absent(),
                Value<String> subjectId = const Value.absent(),
                Value<String> titleBangla = const Value.absent(),
                Value<String?> titleEnglish = const Value.absent(),
                Value<int> version = const Value.absent(),
                Value<int> lessonCount = const Value.absent(),
                Value<int> questionCount = const Value.absent(),
                Value<int> sizeBytes = const Value.absent(),
                Value<DateTime> downloadedAt = const Value.absent(),
                Value<String?> metadataJson = const Value.absent(),
                Value<int> rowid = const Value.absent(),
              }) => DownloadedChaptersCompanion(
                id: id,
                subjectId: subjectId,
                titleBangla: titleBangla,
                titleEnglish: titleEnglish,
                version: version,
                lessonCount: lessonCount,
                questionCount: questionCount,
                sizeBytes: sizeBytes,
                downloadedAt: downloadedAt,
                metadataJson: metadataJson,
                rowid: rowid,
              ),
          createCompanionCallback:
              ({
                required String id,
                required String subjectId,
                required String titleBangla,
                Value<String?> titleEnglish = const Value.absent(),
                Value<int> version = const Value.absent(),
                Value<int> lessonCount = const Value.absent(),
                Value<int> questionCount = const Value.absent(),
                Value<int> sizeBytes = const Value.absent(),
                required DateTime downloadedAt,
                Value<String?> metadataJson = const Value.absent(),
                Value<int> rowid = const Value.absent(),
              }) => DownloadedChaptersCompanion.insert(
                id: id,
                subjectId: subjectId,
                titleBangla: titleBangla,
                titleEnglish: titleEnglish,
                version: version,
                lessonCount: lessonCount,
                questionCount: questionCount,
                sizeBytes: sizeBytes,
                downloadedAt: downloadedAt,
                metadataJson: metadataJson,
                rowid: rowid,
              ),
          withReferenceMapper: (p0) => p0
              .map(
                (e) => (
                  e.readTable<$DownloadedChaptersTable, DownloadedChapter>(
                    table,
                  ),
                  BaseReferences<
                    _$AppDatabase,
                    $DownloadedChaptersTable,
                    DownloadedChapter
                  >(db, table, e),
                ),
              )
              .toList(),
          prefetchHooksCallback: null,
        ),
      );
}

typedef $$DownloadedChaptersTableProcessedTableManager =
    ProcessedTableManager<
      _$AppDatabase,
      $DownloadedChaptersTable,
      DownloadedChapter,
      $$DownloadedChaptersTableFilterComposer,
      $$DownloadedChaptersTableOrderingComposer,
      $$DownloadedChaptersTableAnnotationComposer,
      $$DownloadedChaptersTableCreateCompanionBuilder,
      $$DownloadedChaptersTableUpdateCompanionBuilder,
      (
        DownloadedChapter,
        BaseReferences<
          _$AppDatabase,
          $DownloadedChaptersTable,
          DownloadedChapter
        >,
      ),
      DownloadedChapter,
      PrefetchHooks Function()
    >;
typedef $$CachedLessonsTableCreateCompanionBuilder =
    CachedLessonsCompanion Function({
      required String id,
      required String topicId,
      required String chapterId,
      Value<String?> subjectId,
      required String titleBangla,
      Value<String?> titleEnglish,
      required String payloadJson,
      Value<bool> isCompleted,
      required DateTime updatedAt,
      Value<int> rowid,
    });
typedef $$CachedLessonsTableUpdateCompanionBuilder =
    CachedLessonsCompanion Function({
      Value<String> id,
      Value<String> topicId,
      Value<String> chapterId,
      Value<String?> subjectId,
      Value<String> titleBangla,
      Value<String?> titleEnglish,
      Value<String> payloadJson,
      Value<bool> isCompleted,
      Value<DateTime> updatedAt,
      Value<int> rowid,
    });

class $$CachedLessonsTableFilterComposer
    extends Composer<_$AppDatabase, $CachedLessonsTable> {
  $$CachedLessonsTableFilterComposer({
    required super.$db,
    required super.$table,
    super.joinBuilder,
    super.$addJoinBuilderToRootComposer,
    super.$removeJoinBuilderFromRootComposer,
  });
  ColumnFilters<String> get id => $composableBuilder(
    column: $table.id,
    builder: (column) => ColumnFilters(column),
  );

  ColumnFilters<String> get topicId => $composableBuilder(
    column: $table.topicId,
    builder: (column) => ColumnFilters(column),
  );

  ColumnFilters<String> get chapterId => $composableBuilder(
    column: $table.chapterId,
    builder: (column) => ColumnFilters(column),
  );

  ColumnFilters<String> get subjectId => $composableBuilder(
    column: $table.subjectId,
    builder: (column) => ColumnFilters(column),
  );

  ColumnFilters<String> get titleBangla => $composableBuilder(
    column: $table.titleBangla,
    builder: (column) => ColumnFilters(column),
  );

  ColumnFilters<String> get titleEnglish => $composableBuilder(
    column: $table.titleEnglish,
    builder: (column) => ColumnFilters(column),
  );

  ColumnFilters<String> get payloadJson => $composableBuilder(
    column: $table.payloadJson,
    builder: (column) => ColumnFilters(column),
  );

  ColumnFilters<bool> get isCompleted => $composableBuilder(
    column: $table.isCompleted,
    builder: (column) => ColumnFilters(column),
  );

  ColumnFilters<DateTime> get updatedAt => $composableBuilder(
    column: $table.updatedAt,
    builder: (column) => ColumnFilters(column),
  );
}

class $$CachedLessonsTableOrderingComposer
    extends Composer<_$AppDatabase, $CachedLessonsTable> {
  $$CachedLessonsTableOrderingComposer({
    required super.$db,
    required super.$table,
    super.joinBuilder,
    super.$addJoinBuilderToRootComposer,
    super.$removeJoinBuilderFromRootComposer,
  });
  ColumnOrderings<String> get id => $composableBuilder(
    column: $table.id,
    builder: (column) => ColumnOrderings(column),
  );

  ColumnOrderings<String> get topicId => $composableBuilder(
    column: $table.topicId,
    builder: (column) => ColumnOrderings(column),
  );

  ColumnOrderings<String> get chapterId => $composableBuilder(
    column: $table.chapterId,
    builder: (column) => ColumnOrderings(column),
  );

  ColumnOrderings<String> get subjectId => $composableBuilder(
    column: $table.subjectId,
    builder: (column) => ColumnOrderings(column),
  );

  ColumnOrderings<String> get titleBangla => $composableBuilder(
    column: $table.titleBangla,
    builder: (column) => ColumnOrderings(column),
  );

  ColumnOrderings<String> get titleEnglish => $composableBuilder(
    column: $table.titleEnglish,
    builder: (column) => ColumnOrderings(column),
  );

  ColumnOrderings<String> get payloadJson => $composableBuilder(
    column: $table.payloadJson,
    builder: (column) => ColumnOrderings(column),
  );

  ColumnOrderings<bool> get isCompleted => $composableBuilder(
    column: $table.isCompleted,
    builder: (column) => ColumnOrderings(column),
  );

  ColumnOrderings<DateTime> get updatedAt => $composableBuilder(
    column: $table.updatedAt,
    builder: (column) => ColumnOrderings(column),
  );
}

class $$CachedLessonsTableAnnotationComposer
    extends Composer<_$AppDatabase, $CachedLessonsTable> {
  $$CachedLessonsTableAnnotationComposer({
    required super.$db,
    required super.$table,
    super.joinBuilder,
    super.$addJoinBuilderToRootComposer,
    super.$removeJoinBuilderFromRootComposer,
  });
  GeneratedColumn<String> get id =>
      $composableBuilder(column: $table.id, builder: (column) => column);

  GeneratedColumn<String> get topicId =>
      $composableBuilder(column: $table.topicId, builder: (column) => column);

  GeneratedColumn<String> get chapterId =>
      $composableBuilder(column: $table.chapterId, builder: (column) => column);

  GeneratedColumn<String> get subjectId =>
      $composableBuilder(column: $table.subjectId, builder: (column) => column);

  GeneratedColumn<String> get titleBangla => $composableBuilder(
    column: $table.titleBangla,
    builder: (column) => column,
  );

  GeneratedColumn<String> get titleEnglish => $composableBuilder(
    column: $table.titleEnglish,
    builder: (column) => column,
  );

  GeneratedColumn<String> get payloadJson => $composableBuilder(
    column: $table.payloadJson,
    builder: (column) => column,
  );

  GeneratedColumn<bool> get isCompleted => $composableBuilder(
    column: $table.isCompleted,
    builder: (column) => column,
  );

  GeneratedColumn<DateTime> get updatedAt =>
      $composableBuilder(column: $table.updatedAt, builder: (column) => column);
}

class $$CachedLessonsTableTableManager
    extends
        RootTableManager<
          _$AppDatabase,
          $CachedLessonsTable,
          CachedLesson,
          $$CachedLessonsTableFilterComposer,
          $$CachedLessonsTableOrderingComposer,
          $$CachedLessonsTableAnnotationComposer,
          $$CachedLessonsTableCreateCompanionBuilder,
          $$CachedLessonsTableUpdateCompanionBuilder,
          (
            CachedLesson,
            BaseReferences<_$AppDatabase, $CachedLessonsTable, CachedLesson>,
          ),
          CachedLesson,
          PrefetchHooks Function()
        > {
  $$CachedLessonsTableTableManager(_$AppDatabase db, $CachedLessonsTable table)
    : super(
        TableManagerState(
          db: db,
          table: table,
          createFilteringComposer: () =>
              $$CachedLessonsTableFilterComposer($db: db, $table: table),
          createOrderingComposer: () =>
              $$CachedLessonsTableOrderingComposer($db: db, $table: table),
          createComputedFieldComposer: () =>
              $$CachedLessonsTableAnnotationComposer($db: db, $table: table),
          updateCompanionCallback:
              ({
                Value<String> id = const Value.absent(),
                Value<String> topicId = const Value.absent(),
                Value<String> chapterId = const Value.absent(),
                Value<String?> subjectId = const Value.absent(),
                Value<String> titleBangla = const Value.absent(),
                Value<String?> titleEnglish = const Value.absent(),
                Value<String> payloadJson = const Value.absent(),
                Value<bool> isCompleted = const Value.absent(),
                Value<DateTime> updatedAt = const Value.absent(),
                Value<int> rowid = const Value.absent(),
              }) => CachedLessonsCompanion(
                id: id,
                topicId: topicId,
                chapterId: chapterId,
                subjectId: subjectId,
                titleBangla: titleBangla,
                titleEnglish: titleEnglish,
                payloadJson: payloadJson,
                isCompleted: isCompleted,
                updatedAt: updatedAt,
                rowid: rowid,
              ),
          createCompanionCallback:
              ({
                required String id,
                required String topicId,
                required String chapterId,
                Value<String?> subjectId = const Value.absent(),
                required String titleBangla,
                Value<String?> titleEnglish = const Value.absent(),
                required String payloadJson,
                Value<bool> isCompleted = const Value.absent(),
                required DateTime updatedAt,
                Value<int> rowid = const Value.absent(),
              }) => CachedLessonsCompanion.insert(
                id: id,
                topicId: topicId,
                chapterId: chapterId,
                subjectId: subjectId,
                titleBangla: titleBangla,
                titleEnglish: titleEnglish,
                payloadJson: payloadJson,
                isCompleted: isCompleted,
                updatedAt: updatedAt,
                rowid: rowid,
              ),
          withReferenceMapper: (p0) => p0
              .map(
                (e) => (
                  e.readTable<$CachedLessonsTable, CachedLesson>(table),
                  BaseReferences<
                    _$AppDatabase,
                    $CachedLessonsTable,
                    CachedLesson
                  >(db, table, e),
                ),
              )
              .toList(),
          prefetchHooksCallback: null,
        ),
      );
}

typedef $$CachedLessonsTableProcessedTableManager =
    ProcessedTableManager<
      _$AppDatabase,
      $CachedLessonsTable,
      CachedLesson,
      $$CachedLessonsTableFilterComposer,
      $$CachedLessonsTableOrderingComposer,
      $$CachedLessonsTableAnnotationComposer,
      $$CachedLessonsTableCreateCompanionBuilder,
      $$CachedLessonsTableUpdateCompanionBuilder,
      (
        CachedLesson,
        BaseReferences<_$AppDatabase, $CachedLessonsTable, CachedLesson>,
      ),
      CachedLesson,
      PrefetchHooks Function()
    >;
typedef $$CachedQuestionsTableCreateCompanionBuilder =
    CachedQuestionsCompanion Function({
      required String id,
      Value<String?> topicId,
      required String chapterId,
      Value<String?> subjectId,
      required String questionType,
      Value<String?> difficulty,
      required String payloadJson,
      required DateTime updatedAt,
      Value<int> rowid,
    });
typedef $$CachedQuestionsTableUpdateCompanionBuilder =
    CachedQuestionsCompanion Function({
      Value<String> id,
      Value<String?> topicId,
      Value<String> chapterId,
      Value<String?> subjectId,
      Value<String> questionType,
      Value<String?> difficulty,
      Value<String> payloadJson,
      Value<DateTime> updatedAt,
      Value<int> rowid,
    });

class $$CachedQuestionsTableFilterComposer
    extends Composer<_$AppDatabase, $CachedQuestionsTable> {
  $$CachedQuestionsTableFilterComposer({
    required super.$db,
    required super.$table,
    super.joinBuilder,
    super.$addJoinBuilderToRootComposer,
    super.$removeJoinBuilderFromRootComposer,
  });
  ColumnFilters<String> get id => $composableBuilder(
    column: $table.id,
    builder: (column) => ColumnFilters(column),
  );

  ColumnFilters<String> get topicId => $composableBuilder(
    column: $table.topicId,
    builder: (column) => ColumnFilters(column),
  );

  ColumnFilters<String> get chapterId => $composableBuilder(
    column: $table.chapterId,
    builder: (column) => ColumnFilters(column),
  );

  ColumnFilters<String> get subjectId => $composableBuilder(
    column: $table.subjectId,
    builder: (column) => ColumnFilters(column),
  );

  ColumnFilters<String> get questionType => $composableBuilder(
    column: $table.questionType,
    builder: (column) => ColumnFilters(column),
  );

  ColumnFilters<String> get difficulty => $composableBuilder(
    column: $table.difficulty,
    builder: (column) => ColumnFilters(column),
  );

  ColumnFilters<String> get payloadJson => $composableBuilder(
    column: $table.payloadJson,
    builder: (column) => ColumnFilters(column),
  );

  ColumnFilters<DateTime> get updatedAt => $composableBuilder(
    column: $table.updatedAt,
    builder: (column) => ColumnFilters(column),
  );
}

class $$CachedQuestionsTableOrderingComposer
    extends Composer<_$AppDatabase, $CachedQuestionsTable> {
  $$CachedQuestionsTableOrderingComposer({
    required super.$db,
    required super.$table,
    super.joinBuilder,
    super.$addJoinBuilderToRootComposer,
    super.$removeJoinBuilderFromRootComposer,
  });
  ColumnOrderings<String> get id => $composableBuilder(
    column: $table.id,
    builder: (column) => ColumnOrderings(column),
  );

  ColumnOrderings<String> get topicId => $composableBuilder(
    column: $table.topicId,
    builder: (column) => ColumnOrderings(column),
  );

  ColumnOrderings<String> get chapterId => $composableBuilder(
    column: $table.chapterId,
    builder: (column) => ColumnOrderings(column),
  );

  ColumnOrderings<String> get subjectId => $composableBuilder(
    column: $table.subjectId,
    builder: (column) => ColumnOrderings(column),
  );

  ColumnOrderings<String> get questionType => $composableBuilder(
    column: $table.questionType,
    builder: (column) => ColumnOrderings(column),
  );

  ColumnOrderings<String> get difficulty => $composableBuilder(
    column: $table.difficulty,
    builder: (column) => ColumnOrderings(column),
  );

  ColumnOrderings<String> get payloadJson => $composableBuilder(
    column: $table.payloadJson,
    builder: (column) => ColumnOrderings(column),
  );

  ColumnOrderings<DateTime> get updatedAt => $composableBuilder(
    column: $table.updatedAt,
    builder: (column) => ColumnOrderings(column),
  );
}

class $$CachedQuestionsTableAnnotationComposer
    extends Composer<_$AppDatabase, $CachedQuestionsTable> {
  $$CachedQuestionsTableAnnotationComposer({
    required super.$db,
    required super.$table,
    super.joinBuilder,
    super.$addJoinBuilderToRootComposer,
    super.$removeJoinBuilderFromRootComposer,
  });
  GeneratedColumn<String> get id =>
      $composableBuilder(column: $table.id, builder: (column) => column);

  GeneratedColumn<String> get topicId =>
      $composableBuilder(column: $table.topicId, builder: (column) => column);

  GeneratedColumn<String> get chapterId =>
      $composableBuilder(column: $table.chapterId, builder: (column) => column);

  GeneratedColumn<String> get subjectId =>
      $composableBuilder(column: $table.subjectId, builder: (column) => column);

  GeneratedColumn<String> get questionType => $composableBuilder(
    column: $table.questionType,
    builder: (column) => column,
  );

  GeneratedColumn<String> get difficulty => $composableBuilder(
    column: $table.difficulty,
    builder: (column) => column,
  );

  GeneratedColumn<String> get payloadJson => $composableBuilder(
    column: $table.payloadJson,
    builder: (column) => column,
  );

  GeneratedColumn<DateTime> get updatedAt =>
      $composableBuilder(column: $table.updatedAt, builder: (column) => column);
}

class $$CachedQuestionsTableTableManager
    extends
        RootTableManager<
          _$AppDatabase,
          $CachedQuestionsTable,
          CachedQuestion,
          $$CachedQuestionsTableFilterComposer,
          $$CachedQuestionsTableOrderingComposer,
          $$CachedQuestionsTableAnnotationComposer,
          $$CachedQuestionsTableCreateCompanionBuilder,
          $$CachedQuestionsTableUpdateCompanionBuilder,
          (
            CachedQuestion,
            BaseReferences<
              _$AppDatabase,
              $CachedQuestionsTable,
              CachedQuestion
            >,
          ),
          CachedQuestion,
          PrefetchHooks Function()
        > {
  $$CachedQuestionsTableTableManager(
    _$AppDatabase db,
    $CachedQuestionsTable table,
  ) : super(
        TableManagerState(
          db: db,
          table: table,
          createFilteringComposer: () =>
              $$CachedQuestionsTableFilterComposer($db: db, $table: table),
          createOrderingComposer: () =>
              $$CachedQuestionsTableOrderingComposer($db: db, $table: table),
          createComputedFieldComposer: () =>
              $$CachedQuestionsTableAnnotationComposer($db: db, $table: table),
          updateCompanionCallback:
              ({
                Value<String> id = const Value.absent(),
                Value<String?> topicId = const Value.absent(),
                Value<String> chapterId = const Value.absent(),
                Value<String?> subjectId = const Value.absent(),
                Value<String> questionType = const Value.absent(),
                Value<String?> difficulty = const Value.absent(),
                Value<String> payloadJson = const Value.absent(),
                Value<DateTime> updatedAt = const Value.absent(),
                Value<int> rowid = const Value.absent(),
              }) => CachedQuestionsCompanion(
                id: id,
                topicId: topicId,
                chapterId: chapterId,
                subjectId: subjectId,
                questionType: questionType,
                difficulty: difficulty,
                payloadJson: payloadJson,
                updatedAt: updatedAt,
                rowid: rowid,
              ),
          createCompanionCallback:
              ({
                required String id,
                Value<String?> topicId = const Value.absent(),
                required String chapterId,
                Value<String?> subjectId = const Value.absent(),
                required String questionType,
                Value<String?> difficulty = const Value.absent(),
                required String payloadJson,
                required DateTime updatedAt,
                Value<int> rowid = const Value.absent(),
              }) => CachedQuestionsCompanion.insert(
                id: id,
                topicId: topicId,
                chapterId: chapterId,
                subjectId: subjectId,
                questionType: questionType,
                difficulty: difficulty,
                payloadJson: payloadJson,
                updatedAt: updatedAt,
                rowid: rowid,
              ),
          withReferenceMapper: (p0) => p0
              .map(
                (e) => (
                  e.readTable<$CachedQuestionsTable, CachedQuestion>(table),
                  BaseReferences<
                    _$AppDatabase,
                    $CachedQuestionsTable,
                    CachedQuestion
                  >(db, table, e),
                ),
              )
              .toList(),
          prefetchHooksCallback: null,
        ),
      );
}

typedef $$CachedQuestionsTableProcessedTableManager =
    ProcessedTableManager<
      _$AppDatabase,
      $CachedQuestionsTable,
      CachedQuestion,
      $$CachedQuestionsTableFilterComposer,
      $$CachedQuestionsTableOrderingComposer,
      $$CachedQuestionsTableAnnotationComposer,
      $$CachedQuestionsTableCreateCompanionBuilder,
      $$CachedQuestionsTableUpdateCompanionBuilder,
      (
        CachedQuestion,
        BaseReferences<_$AppDatabase, $CachedQuestionsTable, CachedQuestion>,
      ),
      CachedQuestion,
      PrefetchHooks Function()
    >;
typedef $$ActiveExamDraftsTableCreateCompanionBuilder =
    ActiveExamDraftsCompanion Function({
      required String sessionId,
      required String subjectId,
      Value<String?> chapterId,
      Value<String> testType,
      required String questionIdsJson,
      Value<String> answersJson,
      Value<String> flaggedQuestionIdsJson,
      required int remainingSeconds,
      required int totalDurationSeconds,
      Value<int> currentIndex,
      required DateTime startedAt,
      required DateTime updatedAt,
      Value<int> rowid,
    });
typedef $$ActiveExamDraftsTableUpdateCompanionBuilder =
    ActiveExamDraftsCompanion Function({
      Value<String> sessionId,
      Value<String> subjectId,
      Value<String?> chapterId,
      Value<String> testType,
      Value<String> questionIdsJson,
      Value<String> answersJson,
      Value<String> flaggedQuestionIdsJson,
      Value<int> remainingSeconds,
      Value<int> totalDurationSeconds,
      Value<int> currentIndex,
      Value<DateTime> startedAt,
      Value<DateTime> updatedAt,
      Value<int> rowid,
    });

class $$ActiveExamDraftsTableFilterComposer
    extends Composer<_$AppDatabase, $ActiveExamDraftsTable> {
  $$ActiveExamDraftsTableFilterComposer({
    required super.$db,
    required super.$table,
    super.joinBuilder,
    super.$addJoinBuilderToRootComposer,
    super.$removeJoinBuilderFromRootComposer,
  });
  ColumnFilters<String> get sessionId => $composableBuilder(
    column: $table.sessionId,
    builder: (column) => ColumnFilters(column),
  );

  ColumnFilters<String> get subjectId => $composableBuilder(
    column: $table.subjectId,
    builder: (column) => ColumnFilters(column),
  );

  ColumnFilters<String> get chapterId => $composableBuilder(
    column: $table.chapterId,
    builder: (column) => ColumnFilters(column),
  );

  ColumnFilters<String> get testType => $composableBuilder(
    column: $table.testType,
    builder: (column) => ColumnFilters(column),
  );

  ColumnFilters<String> get questionIdsJson => $composableBuilder(
    column: $table.questionIdsJson,
    builder: (column) => ColumnFilters(column),
  );

  ColumnFilters<String> get answersJson => $composableBuilder(
    column: $table.answersJson,
    builder: (column) => ColumnFilters(column),
  );

  ColumnFilters<String> get flaggedQuestionIdsJson => $composableBuilder(
    column: $table.flaggedQuestionIdsJson,
    builder: (column) => ColumnFilters(column),
  );

  ColumnFilters<int> get remainingSeconds => $composableBuilder(
    column: $table.remainingSeconds,
    builder: (column) => ColumnFilters(column),
  );

  ColumnFilters<int> get totalDurationSeconds => $composableBuilder(
    column: $table.totalDurationSeconds,
    builder: (column) => ColumnFilters(column),
  );

  ColumnFilters<int> get currentIndex => $composableBuilder(
    column: $table.currentIndex,
    builder: (column) => ColumnFilters(column),
  );

  ColumnFilters<DateTime> get startedAt => $composableBuilder(
    column: $table.startedAt,
    builder: (column) => ColumnFilters(column),
  );

  ColumnFilters<DateTime> get updatedAt => $composableBuilder(
    column: $table.updatedAt,
    builder: (column) => ColumnFilters(column),
  );
}

class $$ActiveExamDraftsTableOrderingComposer
    extends Composer<_$AppDatabase, $ActiveExamDraftsTable> {
  $$ActiveExamDraftsTableOrderingComposer({
    required super.$db,
    required super.$table,
    super.joinBuilder,
    super.$addJoinBuilderToRootComposer,
    super.$removeJoinBuilderFromRootComposer,
  });
  ColumnOrderings<String> get sessionId => $composableBuilder(
    column: $table.sessionId,
    builder: (column) => ColumnOrderings(column),
  );

  ColumnOrderings<String> get subjectId => $composableBuilder(
    column: $table.subjectId,
    builder: (column) => ColumnOrderings(column),
  );

  ColumnOrderings<String> get chapterId => $composableBuilder(
    column: $table.chapterId,
    builder: (column) => ColumnOrderings(column),
  );

  ColumnOrderings<String> get testType => $composableBuilder(
    column: $table.testType,
    builder: (column) => ColumnOrderings(column),
  );

  ColumnOrderings<String> get questionIdsJson => $composableBuilder(
    column: $table.questionIdsJson,
    builder: (column) => ColumnOrderings(column),
  );

  ColumnOrderings<String> get answersJson => $composableBuilder(
    column: $table.answersJson,
    builder: (column) => ColumnOrderings(column),
  );

  ColumnOrderings<String> get flaggedQuestionIdsJson => $composableBuilder(
    column: $table.flaggedQuestionIdsJson,
    builder: (column) => ColumnOrderings(column),
  );

  ColumnOrderings<int> get remainingSeconds => $composableBuilder(
    column: $table.remainingSeconds,
    builder: (column) => ColumnOrderings(column),
  );

  ColumnOrderings<int> get totalDurationSeconds => $composableBuilder(
    column: $table.totalDurationSeconds,
    builder: (column) => ColumnOrderings(column),
  );

  ColumnOrderings<int> get currentIndex => $composableBuilder(
    column: $table.currentIndex,
    builder: (column) => ColumnOrderings(column),
  );

  ColumnOrderings<DateTime> get startedAt => $composableBuilder(
    column: $table.startedAt,
    builder: (column) => ColumnOrderings(column),
  );

  ColumnOrderings<DateTime> get updatedAt => $composableBuilder(
    column: $table.updatedAt,
    builder: (column) => ColumnOrderings(column),
  );
}

class $$ActiveExamDraftsTableAnnotationComposer
    extends Composer<_$AppDatabase, $ActiveExamDraftsTable> {
  $$ActiveExamDraftsTableAnnotationComposer({
    required super.$db,
    required super.$table,
    super.joinBuilder,
    super.$addJoinBuilderToRootComposer,
    super.$removeJoinBuilderFromRootComposer,
  });
  GeneratedColumn<String> get sessionId =>
      $composableBuilder(column: $table.sessionId, builder: (column) => column);

  GeneratedColumn<String> get subjectId =>
      $composableBuilder(column: $table.subjectId, builder: (column) => column);

  GeneratedColumn<String> get chapterId =>
      $composableBuilder(column: $table.chapterId, builder: (column) => column);

  GeneratedColumn<String> get testType =>
      $composableBuilder(column: $table.testType, builder: (column) => column);

  GeneratedColumn<String> get questionIdsJson => $composableBuilder(
    column: $table.questionIdsJson,
    builder: (column) => column,
  );

  GeneratedColumn<String> get answersJson => $composableBuilder(
    column: $table.answersJson,
    builder: (column) => column,
  );

  GeneratedColumn<String> get flaggedQuestionIdsJson => $composableBuilder(
    column: $table.flaggedQuestionIdsJson,
    builder: (column) => column,
  );

  GeneratedColumn<int> get remainingSeconds => $composableBuilder(
    column: $table.remainingSeconds,
    builder: (column) => column,
  );

  GeneratedColumn<int> get totalDurationSeconds => $composableBuilder(
    column: $table.totalDurationSeconds,
    builder: (column) => column,
  );

  GeneratedColumn<int> get currentIndex => $composableBuilder(
    column: $table.currentIndex,
    builder: (column) => column,
  );

  GeneratedColumn<DateTime> get startedAt =>
      $composableBuilder(column: $table.startedAt, builder: (column) => column);

  GeneratedColumn<DateTime> get updatedAt =>
      $composableBuilder(column: $table.updatedAt, builder: (column) => column);
}

class $$ActiveExamDraftsTableTableManager
    extends
        RootTableManager<
          _$AppDatabase,
          $ActiveExamDraftsTable,
          ActiveExamDraft,
          $$ActiveExamDraftsTableFilterComposer,
          $$ActiveExamDraftsTableOrderingComposer,
          $$ActiveExamDraftsTableAnnotationComposer,
          $$ActiveExamDraftsTableCreateCompanionBuilder,
          $$ActiveExamDraftsTableUpdateCompanionBuilder,
          (
            ActiveExamDraft,
            BaseReferences<
              _$AppDatabase,
              $ActiveExamDraftsTable,
              ActiveExamDraft
            >,
          ),
          ActiveExamDraft,
          PrefetchHooks Function()
        > {
  $$ActiveExamDraftsTableTableManager(
    _$AppDatabase db,
    $ActiveExamDraftsTable table,
  ) : super(
        TableManagerState(
          db: db,
          table: table,
          createFilteringComposer: () =>
              $$ActiveExamDraftsTableFilterComposer($db: db, $table: table),
          createOrderingComposer: () =>
              $$ActiveExamDraftsTableOrderingComposer($db: db, $table: table),
          createComputedFieldComposer: () =>
              $$ActiveExamDraftsTableAnnotationComposer($db: db, $table: table),
          updateCompanionCallback:
              ({
                Value<String> sessionId = const Value.absent(),
                Value<String> subjectId = const Value.absent(),
                Value<String?> chapterId = const Value.absent(),
                Value<String> testType = const Value.absent(),
                Value<String> questionIdsJson = const Value.absent(),
                Value<String> answersJson = const Value.absent(),
                Value<String> flaggedQuestionIdsJson = const Value.absent(),
                Value<int> remainingSeconds = const Value.absent(),
                Value<int> totalDurationSeconds = const Value.absent(),
                Value<int> currentIndex = const Value.absent(),
                Value<DateTime> startedAt = const Value.absent(),
                Value<DateTime> updatedAt = const Value.absent(),
                Value<int> rowid = const Value.absent(),
              }) => ActiveExamDraftsCompanion(
                sessionId: sessionId,
                subjectId: subjectId,
                chapterId: chapterId,
                testType: testType,
                questionIdsJson: questionIdsJson,
                answersJson: answersJson,
                flaggedQuestionIdsJson: flaggedQuestionIdsJson,
                remainingSeconds: remainingSeconds,
                totalDurationSeconds: totalDurationSeconds,
                currentIndex: currentIndex,
                startedAt: startedAt,
                updatedAt: updatedAt,
                rowid: rowid,
              ),
          createCompanionCallback:
              ({
                required String sessionId,
                required String subjectId,
                Value<String?> chapterId = const Value.absent(),
                Value<String> testType = const Value.absent(),
                required String questionIdsJson,
                Value<String> answersJson = const Value.absent(),
                Value<String> flaggedQuestionIdsJson = const Value.absent(),
                required int remainingSeconds,
                required int totalDurationSeconds,
                Value<int> currentIndex = const Value.absent(),
                required DateTime startedAt,
                required DateTime updatedAt,
                Value<int> rowid = const Value.absent(),
              }) => ActiveExamDraftsCompanion.insert(
                sessionId: sessionId,
                subjectId: subjectId,
                chapterId: chapterId,
                testType: testType,
                questionIdsJson: questionIdsJson,
                answersJson: answersJson,
                flaggedQuestionIdsJson: flaggedQuestionIdsJson,
                remainingSeconds: remainingSeconds,
                totalDurationSeconds: totalDurationSeconds,
                currentIndex: currentIndex,
                startedAt: startedAt,
                updatedAt: updatedAt,
                rowid: rowid,
              ),
          withReferenceMapper: (p0) => p0
              .map(
                (e) => (
                  e.readTable<$ActiveExamDraftsTable, ActiveExamDraft>(table),
                  BaseReferences<
                    _$AppDatabase,
                    $ActiveExamDraftsTable,
                    ActiveExamDraft
                  >(db, table, e),
                ),
              )
              .toList(),
          prefetchHooksCallback: null,
        ),
      );
}

typedef $$ActiveExamDraftsTableProcessedTableManager =
    ProcessedTableManager<
      _$AppDatabase,
      $ActiveExamDraftsTable,
      ActiveExamDraft,
      $$ActiveExamDraftsTableFilterComposer,
      $$ActiveExamDraftsTableOrderingComposer,
      $$ActiveExamDraftsTableAnnotationComposer,
      $$ActiveExamDraftsTableCreateCompanionBuilder,
      $$ActiveExamDraftsTableUpdateCompanionBuilder,
      (
        ActiveExamDraft,
        BaseReferences<_$AppDatabase, $ActiveExamDraftsTable, ActiveExamDraft>,
      ),
      ActiveExamDraft,
      PrefetchHooks Function()
    >;
typedef $$SyncQueueTableCreateCompanionBuilder =
    SyncQueueCompanion Function({
      Value<int> id,
      required String eventId,
      required String eventType,
      required String payloadJson,
      Value<int> retryCount,
      Value<String?> lastError,
      required DateTime createdAt,
      Value<DateTime?> lastAttemptAt,
    });
typedef $$SyncQueueTableUpdateCompanionBuilder =
    SyncQueueCompanion Function({
      Value<int> id,
      Value<String> eventId,
      Value<String> eventType,
      Value<String> payloadJson,
      Value<int> retryCount,
      Value<String?> lastError,
      Value<DateTime> createdAt,
      Value<DateTime?> lastAttemptAt,
    });

class $$SyncQueueTableFilterComposer
    extends Composer<_$AppDatabase, $SyncQueueTable> {
  $$SyncQueueTableFilterComposer({
    required super.$db,
    required super.$table,
    super.joinBuilder,
    super.$addJoinBuilderToRootComposer,
    super.$removeJoinBuilderFromRootComposer,
  });
  ColumnFilters<int> get id => $composableBuilder(
    column: $table.id,
    builder: (column) => ColumnFilters(column),
  );

  ColumnFilters<String> get eventId => $composableBuilder(
    column: $table.eventId,
    builder: (column) => ColumnFilters(column),
  );

  ColumnFilters<String> get eventType => $composableBuilder(
    column: $table.eventType,
    builder: (column) => ColumnFilters(column),
  );

  ColumnFilters<String> get payloadJson => $composableBuilder(
    column: $table.payloadJson,
    builder: (column) => ColumnFilters(column),
  );

  ColumnFilters<int> get retryCount => $composableBuilder(
    column: $table.retryCount,
    builder: (column) => ColumnFilters(column),
  );

  ColumnFilters<String> get lastError => $composableBuilder(
    column: $table.lastError,
    builder: (column) => ColumnFilters(column),
  );

  ColumnFilters<DateTime> get createdAt => $composableBuilder(
    column: $table.createdAt,
    builder: (column) => ColumnFilters(column),
  );

  ColumnFilters<DateTime> get lastAttemptAt => $composableBuilder(
    column: $table.lastAttemptAt,
    builder: (column) => ColumnFilters(column),
  );
}

class $$SyncQueueTableOrderingComposer
    extends Composer<_$AppDatabase, $SyncQueueTable> {
  $$SyncQueueTableOrderingComposer({
    required super.$db,
    required super.$table,
    super.joinBuilder,
    super.$addJoinBuilderToRootComposer,
    super.$removeJoinBuilderFromRootComposer,
  });
  ColumnOrderings<int> get id => $composableBuilder(
    column: $table.id,
    builder: (column) => ColumnOrderings(column),
  );

  ColumnOrderings<String> get eventId => $composableBuilder(
    column: $table.eventId,
    builder: (column) => ColumnOrderings(column),
  );

  ColumnOrderings<String> get eventType => $composableBuilder(
    column: $table.eventType,
    builder: (column) => ColumnOrderings(column),
  );

  ColumnOrderings<String> get payloadJson => $composableBuilder(
    column: $table.payloadJson,
    builder: (column) => ColumnOrderings(column),
  );

  ColumnOrderings<int> get retryCount => $composableBuilder(
    column: $table.retryCount,
    builder: (column) => ColumnOrderings(column),
  );

  ColumnOrderings<String> get lastError => $composableBuilder(
    column: $table.lastError,
    builder: (column) => ColumnOrderings(column),
  );

  ColumnOrderings<DateTime> get createdAt => $composableBuilder(
    column: $table.createdAt,
    builder: (column) => ColumnOrderings(column),
  );

  ColumnOrderings<DateTime> get lastAttemptAt => $composableBuilder(
    column: $table.lastAttemptAt,
    builder: (column) => ColumnOrderings(column),
  );
}

class $$SyncQueueTableAnnotationComposer
    extends Composer<_$AppDatabase, $SyncQueueTable> {
  $$SyncQueueTableAnnotationComposer({
    required super.$db,
    required super.$table,
    super.joinBuilder,
    super.$addJoinBuilderToRootComposer,
    super.$removeJoinBuilderFromRootComposer,
  });
  GeneratedColumn<int> get id =>
      $composableBuilder(column: $table.id, builder: (column) => column);

  GeneratedColumn<String> get eventId =>
      $composableBuilder(column: $table.eventId, builder: (column) => column);

  GeneratedColumn<String> get eventType =>
      $composableBuilder(column: $table.eventType, builder: (column) => column);

  GeneratedColumn<String> get payloadJson => $composableBuilder(
    column: $table.payloadJson,
    builder: (column) => column,
  );

  GeneratedColumn<int> get retryCount => $composableBuilder(
    column: $table.retryCount,
    builder: (column) => column,
  );

  GeneratedColumn<String> get lastError =>
      $composableBuilder(column: $table.lastError, builder: (column) => column);

  GeneratedColumn<DateTime> get createdAt =>
      $composableBuilder(column: $table.createdAt, builder: (column) => column);

  GeneratedColumn<DateTime> get lastAttemptAt => $composableBuilder(
    column: $table.lastAttemptAt,
    builder: (column) => column,
  );
}

class $$SyncQueueTableTableManager
    extends
        RootTableManager<
          _$AppDatabase,
          $SyncQueueTable,
          SyncQueueData,
          $$SyncQueueTableFilterComposer,
          $$SyncQueueTableOrderingComposer,
          $$SyncQueueTableAnnotationComposer,
          $$SyncQueueTableCreateCompanionBuilder,
          $$SyncQueueTableUpdateCompanionBuilder,
          (
            SyncQueueData,
            BaseReferences<_$AppDatabase, $SyncQueueTable, SyncQueueData>,
          ),
          SyncQueueData,
          PrefetchHooks Function()
        > {
  $$SyncQueueTableTableManager(_$AppDatabase db, $SyncQueueTable table)
    : super(
        TableManagerState(
          db: db,
          table: table,
          createFilteringComposer: () =>
              $$SyncQueueTableFilterComposer($db: db, $table: table),
          createOrderingComposer: () =>
              $$SyncQueueTableOrderingComposer($db: db, $table: table),
          createComputedFieldComposer: () =>
              $$SyncQueueTableAnnotationComposer($db: db, $table: table),
          updateCompanionCallback:
              ({
                Value<int> id = const Value.absent(),
                Value<String> eventId = const Value.absent(),
                Value<String> eventType = const Value.absent(),
                Value<String> payloadJson = const Value.absent(),
                Value<int> retryCount = const Value.absent(),
                Value<String?> lastError = const Value.absent(),
                Value<DateTime> createdAt = const Value.absent(),
                Value<DateTime?> lastAttemptAt = const Value.absent(),
              }) => SyncQueueCompanion(
                id: id,
                eventId: eventId,
                eventType: eventType,
                payloadJson: payloadJson,
                retryCount: retryCount,
                lastError: lastError,
                createdAt: createdAt,
                lastAttemptAt: lastAttemptAt,
              ),
          createCompanionCallback:
              ({
                Value<int> id = const Value.absent(),
                required String eventId,
                required String eventType,
                required String payloadJson,
                Value<int> retryCount = const Value.absent(),
                Value<String?> lastError = const Value.absent(),
                required DateTime createdAt,
                Value<DateTime?> lastAttemptAt = const Value.absent(),
              }) => SyncQueueCompanion.insert(
                id: id,
                eventId: eventId,
                eventType: eventType,
                payloadJson: payloadJson,
                retryCount: retryCount,
                lastError: lastError,
                createdAt: createdAt,
                lastAttemptAt: lastAttemptAt,
              ),
          withReferenceMapper: (p0) => p0
              .map(
                (e) => (
                  e.readTable<$SyncQueueTable, SyncQueueData>(table),
                  BaseReferences<_$AppDatabase, $SyncQueueTable, SyncQueueData>(
                    db,
                    table,
                    e,
                  ),
                ),
              )
              .toList(),
          prefetchHooksCallback: null,
        ),
      );
}

typedef $$SyncQueueTableProcessedTableManager =
    ProcessedTableManager<
      _$AppDatabase,
      $SyncQueueTable,
      SyncQueueData,
      $$SyncQueueTableFilterComposer,
      $$SyncQueueTableOrderingComposer,
      $$SyncQueueTableAnnotationComposer,
      $$SyncQueueTableCreateCompanionBuilder,
      $$SyncQueueTableUpdateCompanionBuilder,
      (
        SyncQueueData,
        BaseReferences<_$AppDatabase, $SyncQueueTable, SyncQueueData>,
      ),
      SyncQueueData,
      PrefetchHooks Function()
    >;
typedef $$LocalStudentCacheTableCreateCompanionBuilder =
    LocalStudentCacheCompanion Function({
      required String cacheKey,
      required String payloadJson,
      required DateTime updatedAt,
      Value<int> rowid,
    });
typedef $$LocalStudentCacheTableUpdateCompanionBuilder =
    LocalStudentCacheCompanion Function({
      Value<String> cacheKey,
      Value<String> payloadJson,
      Value<DateTime> updatedAt,
      Value<int> rowid,
    });

class $$LocalStudentCacheTableFilterComposer
    extends Composer<_$AppDatabase, $LocalStudentCacheTable> {
  $$LocalStudentCacheTableFilterComposer({
    required super.$db,
    required super.$table,
    super.joinBuilder,
    super.$addJoinBuilderToRootComposer,
    super.$removeJoinBuilderFromRootComposer,
  });
  ColumnFilters<String> get cacheKey => $composableBuilder(
    column: $table.cacheKey,
    builder: (column) => ColumnFilters(column),
  );

  ColumnFilters<String> get payloadJson => $composableBuilder(
    column: $table.payloadJson,
    builder: (column) => ColumnFilters(column),
  );

  ColumnFilters<DateTime> get updatedAt => $composableBuilder(
    column: $table.updatedAt,
    builder: (column) => ColumnFilters(column),
  );
}

class $$LocalStudentCacheTableOrderingComposer
    extends Composer<_$AppDatabase, $LocalStudentCacheTable> {
  $$LocalStudentCacheTableOrderingComposer({
    required super.$db,
    required super.$table,
    super.joinBuilder,
    super.$addJoinBuilderToRootComposer,
    super.$removeJoinBuilderFromRootComposer,
  });
  ColumnOrderings<String> get cacheKey => $composableBuilder(
    column: $table.cacheKey,
    builder: (column) => ColumnOrderings(column),
  );

  ColumnOrderings<String> get payloadJson => $composableBuilder(
    column: $table.payloadJson,
    builder: (column) => ColumnOrderings(column),
  );

  ColumnOrderings<DateTime> get updatedAt => $composableBuilder(
    column: $table.updatedAt,
    builder: (column) => ColumnOrderings(column),
  );
}

class $$LocalStudentCacheTableAnnotationComposer
    extends Composer<_$AppDatabase, $LocalStudentCacheTable> {
  $$LocalStudentCacheTableAnnotationComposer({
    required super.$db,
    required super.$table,
    super.joinBuilder,
    super.$addJoinBuilderToRootComposer,
    super.$removeJoinBuilderFromRootComposer,
  });
  GeneratedColumn<String> get cacheKey =>
      $composableBuilder(column: $table.cacheKey, builder: (column) => column);

  GeneratedColumn<String> get payloadJson => $composableBuilder(
    column: $table.payloadJson,
    builder: (column) => column,
  );

  GeneratedColumn<DateTime> get updatedAt =>
      $composableBuilder(column: $table.updatedAt, builder: (column) => column);
}

class $$LocalStudentCacheTableTableManager
    extends
        RootTableManager<
          _$AppDatabase,
          $LocalStudentCacheTable,
          LocalStudentCacheData,
          $$LocalStudentCacheTableFilterComposer,
          $$LocalStudentCacheTableOrderingComposer,
          $$LocalStudentCacheTableAnnotationComposer,
          $$LocalStudentCacheTableCreateCompanionBuilder,
          $$LocalStudentCacheTableUpdateCompanionBuilder,
          (
            LocalStudentCacheData,
            BaseReferences<
              _$AppDatabase,
              $LocalStudentCacheTable,
              LocalStudentCacheData
            >,
          ),
          LocalStudentCacheData,
          PrefetchHooks Function()
        > {
  $$LocalStudentCacheTableTableManager(
    _$AppDatabase db,
    $LocalStudentCacheTable table,
  ) : super(
        TableManagerState(
          db: db,
          table: table,
          createFilteringComposer: () =>
              $$LocalStudentCacheTableFilterComposer($db: db, $table: table),
          createOrderingComposer: () =>
              $$LocalStudentCacheTableOrderingComposer($db: db, $table: table),
          createComputedFieldComposer: () =>
              $$LocalStudentCacheTableAnnotationComposer(
                $db: db,
                $table: table,
              ),
          updateCompanionCallback:
              ({
                Value<String> cacheKey = const Value.absent(),
                Value<String> payloadJson = const Value.absent(),
                Value<DateTime> updatedAt = const Value.absent(),
                Value<int> rowid = const Value.absent(),
              }) => LocalStudentCacheCompanion(
                cacheKey: cacheKey,
                payloadJson: payloadJson,
                updatedAt: updatedAt,
                rowid: rowid,
              ),
          createCompanionCallback:
              ({
                required String cacheKey,
                required String payloadJson,
                required DateTime updatedAt,
                Value<int> rowid = const Value.absent(),
              }) => LocalStudentCacheCompanion.insert(
                cacheKey: cacheKey,
                payloadJson: payloadJson,
                updatedAt: updatedAt,
                rowid: rowid,
              ),
          withReferenceMapper: (p0) => p0
              .map(
                (e) => (
                  e.readTable<$LocalStudentCacheTable, LocalStudentCacheData>(
                    table,
                  ),
                  BaseReferences<
                    _$AppDatabase,
                    $LocalStudentCacheTable,
                    LocalStudentCacheData
                  >(db, table, e),
                ),
              )
              .toList(),
          prefetchHooksCallback: null,
        ),
      );
}

typedef $$LocalStudentCacheTableProcessedTableManager =
    ProcessedTableManager<
      _$AppDatabase,
      $LocalStudentCacheTable,
      LocalStudentCacheData,
      $$LocalStudentCacheTableFilterComposer,
      $$LocalStudentCacheTableOrderingComposer,
      $$LocalStudentCacheTableAnnotationComposer,
      $$LocalStudentCacheTableCreateCompanionBuilder,
      $$LocalStudentCacheTableUpdateCompanionBuilder,
      (
        LocalStudentCacheData,
        BaseReferences<
          _$AppDatabase,
          $LocalStudentCacheTable,
          LocalStudentCacheData
        >,
      ),
      LocalStudentCacheData,
      PrefetchHooks Function()
    >;

class $AppDatabaseManager {
  final _$AppDatabase _db;
  $AppDatabaseManager(this._db);
  $$DownloadedChaptersTableTableManager get downloadedChapters =>
      $$DownloadedChaptersTableTableManager(_db, _db.downloadedChapters);
  $$CachedLessonsTableTableManager get cachedLessons =>
      $$CachedLessonsTableTableManager(_db, _db.cachedLessons);
  $$CachedQuestionsTableTableManager get cachedQuestions =>
      $$CachedQuestionsTableTableManager(_db, _db.cachedQuestions);
  $$ActiveExamDraftsTableTableManager get activeExamDrafts =>
      $$ActiveExamDraftsTableTableManager(_db, _db.activeExamDrafts);
  $$SyncQueueTableTableManager get syncQueue =>
      $$SyncQueueTableTableManager(_db, _db.syncQueue);
  $$LocalStudentCacheTableTableManager get localStudentCache =>
      $$LocalStudentCacheTableTableManager(_db, _db.localStudentCache);
}
