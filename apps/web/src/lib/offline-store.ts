import {
  ContentStatus,
  QuestionType,
  type CQRubric,
  type LessonDTO,
  type OfflineChapterPackDTO,
  type OfflineExamSubmissionItem,
  type OfflineLessonCompleteItem,
  type OfflinePracticeAttemptItem,
  type OfflineSyncPayload,
  type QuestionDTO,
  type QuestionDifficulty,
} from '@pori/shared';

const DB_NAME = 'pori-offline-db';
const DB_VERSION = 1;
const PACKS_STORE = 'packs';
const SYNC_QUEUE_STORE = 'syncQueue';

const FALLBACK_PACKS_KEY = 'pori_offline_packs_v1';
const FALLBACK_QUEUE_KEY = 'pori_offline_queue_v1';

export const OFFLINE_QUEUE_EVENT = 'pori:offline-queue-updated';

interface QueuedSyncEntry {
  id: string;
  kind: 'lesson' | 'practice' | 'exam';
  data:
    | OfflineLessonCompleteItem
    | OfflinePracticeAttemptItem
    | OfflineExamSubmissionItem;
}

function hasIndexedDb(): boolean {
  return typeof window !== 'undefined' && typeof window.indexedDB !== 'undefined';
}

function emitQueueUpdated(): void {
  if (typeof window !== 'undefined' && typeof window.dispatchEvent === 'function') {
    window.dispatchEvent(new Event(OFFLINE_QUEUE_EVENT));
  }
}

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = window.indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(PACKS_STORE)) {
        db.createObjectStore(PACKS_STORE, { keyPath: 'chapterId' });
      }
      if (!db.objectStoreNames.contains(SYNC_QUEUE_STORE)) {
        db.createObjectStore(SYNC_QUEUE_STORE, { keyPath: 'id' });
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

function readFallbackMap<T>(key: string): Record<string, T> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as Record<string, T>) : {};
  } catch {
    return {};
  }
}

function writeFallbackMap<T>(key: string, value: Record<string, T>): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Ignore storage quota issues cleanly
  }
}

async function putRecord<T>(
  storeName: string,
  fallbackKey: string,
  id: string,
  value: T,
): Promise<void> {
  if (!hasIndexedDb()) {
    const current = readFallbackMap<T>(fallbackKey);
    current[id] = value;
    writeFallbackMap(fallbackKey, current);
    return;
  }

  try {
    const db = await openDb();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(storeName, 'readwrite');
      tx.objectStore(storeName).put(value);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  } catch {
    const current = readFallbackMap<T>(fallbackKey);
    current[id] = value;
    writeFallbackMap(fallbackKey, current);
  }
}

async function getRecord<T>(
  storeName: string,
  fallbackKey: string,
  id: string,
): Promise<T | null> {
  if (!hasIndexedDb()) {
    const current = readFallbackMap<T>(fallbackKey);
    return current[id] ?? null;
  }

  try {
    const db = await openDb();
    return await new Promise<T | null>((resolve, reject) => {
      const tx = db.transaction(storeName, 'readonly');
      const req = tx.objectStore(storeName).get(id);
      req.onsuccess = () => resolve((req.result as T) ?? null);
      req.onerror = () => reject(req.error);
    });
  } catch {
    const current = readFallbackMap<T>(fallbackKey);
    return current[id] ?? null;
  }
}

async function getAllRecords<T>(
  storeName: string,
  fallbackKey: string,
): Promise<T[]> {
  if (!hasIndexedDb()) {
    return Object.values(readFallbackMap<T>(fallbackKey));
  }

  try {
    const db = await openDb();
    return await new Promise<T[]>((resolve, reject) => {
      const tx = db.transaction(storeName, 'readonly');
      const req = tx.objectStore(storeName).getAll();
      req.onsuccess = () => resolve((req.result as T[]) || []);
      req.onerror = () => reject(req.error);
    });
  } catch {
    return Object.values(readFallbackMap<T>(fallbackKey));
  }
}

async function deleteRecord(
  storeName: string,
  fallbackKey: string,
  id: string,
): Promise<void> {
  if (!hasIndexedDb()) {
    const current = readFallbackMap<any>(fallbackKey);
    delete current[id];
    writeFallbackMap(fallbackKey, current);
    return;
  }

  try {
    const db = await openDb();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(storeName, 'readwrite');
      tx.objectStore(storeName).delete(id);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  } catch {
    const current = readFallbackMap<any>(fallbackKey);
    delete current[id];
    writeFallbackMap(fallbackKey, current);
  }
}

export async function saveChapterPack(pack: OfflineChapterPackDTO): Promise<void> {
  await putRecord(PACKS_STORE, FALLBACK_PACKS_KEY, pack.chapterId, pack);
}

export async function getChapterPack(
  chapterId: string,
): Promise<OfflineChapterPackDTO | null> {
  return getRecord<OfflineChapterPackDTO>(PACKS_STORE, FALLBACK_PACKS_KEY, chapterId);
}

export async function listDownloadedPacks(): Promise<OfflineChapterPackDTO[]> {
  return getAllRecords<OfflineChapterPackDTO>(PACKS_STORE, FALLBACK_PACKS_KEY);
}

export async function removeChapterPack(chapterId: string): Promise<void> {
  await deleteRecord(PACKS_STORE, FALLBACK_PACKS_KEY, chapterId);
}

export async function findOfflineLessonByTopic(
  topicId: string,
): Promise<LessonDTO | null> {
  const packs = await listDownloadedPacks();
  for (const pack of packs) {
    const matched = (pack.lessons || []).find((l) => l.topicId === topicId);
    if (matched) {
      return {
        id: matched.id,
        topicId: matched.topicId,
        titleBangla: matched.titleBangla,
        learningGoal: matched.learningGoal,
        explanation: matched.explanation,
        importantTerms: matched.importantTerms || [],
        workedExample: matched.workedExample ?? undefined,
        memoryAid: matched.memoryAid ?? undefined,
        interactiveWidgetUrl: matched.interactiveWidgetUrl ?? null,
        status: ContentStatus.PUBLISHED,
        version: matched.version ?? 1,
      };
    }
  }
  return null;
}

type PackQuestion = OfflineChapterPackDTO['questions'][number];

function mapPackQuestionToDto(q: PackQuestion): QuestionDTO {
  const cqRubric: CQRubric = {
    ka: { mark: 1, criteria: '' },
    kha: { mark: 2, criteria: '' },
    ga: { mark: 3, criteria: '' },
    gha: { mark: 4, criteria: '' },
  };
  let hasRubric = false;
  if (Array.isArray(q.rubric)) {
    for (const item of q.rubric) {
      if (
        item.part === 'ka' ||
        item.part === 'kha' ||
        item.part === 'ga' ||
        item.part === 'gha'
      ) {
        cqRubric[item.part] = {
          mark: item.maxMarks,
          criteria: item.criteria,
        };
        hasRubric = true;
      }
    }
  }

  return {
    id: q.id,
    topicId: q.topicId,
    type: (q.type as QuestionType) || QuestionType.MCQ,
    stem: q.stem,
    options: (q.options || []).map((opt) => ({
      id: opt.id,
      text: opt.text,
      isCorrect: Boolean(opt.isCorrect),
    })),
    explanation: (q.explanation as QuestionDTO['explanation']) || {
      directAnswer: '',
      coreConcept: '',
    },
    ...(hasRubric ? { cqRubric } : {}),
    difficulty: (q.difficulty as QuestionDifficulty) || 'MEDIUM',
    status: ContentStatus.PUBLISHED,
    version: q.version ?? 1,
  };
}

/**
 * Loads cached questions from an offline chapter pack with optional type/topic filtering.
 */
export async function getOfflinePackQuestions(
  chapterId: string,
  filters?: { type?: string; topicId?: string },
): Promise<QuestionDTO[]> {
  const pack = await getChapterPack(chapterId);
  if (!pack || !Array.isArray(pack.questions)) return [];
  return pack.questions
    .filter((q) => {
      if (filters?.type && q.type !== filters.type) return false;
      if (filters?.topicId && q.topicId !== filters.topicId) return false;
      return true;
    })
    .map(mapPackQuestionToDto);
}

/**
 * Aggregates cached MCQ questions across all downloaded packs for a subject.
 */
export async function getOfflineSubjectQuestions(
  subjectId: string,
  type: string = 'MCQ',
): Promise<QuestionDTO[]> {
  const packs = await listDownloadedPacks();
  return packs
    .filter((pack) => pack.subjectId === subjectId)
    .flatMap((pack) =>
      (pack.questions || [])
        .filter((q) => !type || q.type === type)
        .map(mapPackQuestionToDto),
    );
}

export async function enqueueLessonComplete(
  item: OfflineLessonCompleteItem,
): Promise<void> {
  const id = `lesson_${item.offlineEventId}`;
  await putRecord<QueuedSyncEntry>(SYNC_QUEUE_STORE, FALLBACK_QUEUE_KEY, id, {
    id,
    kind: 'lesson',
    data: item,
  });
  emitQueueUpdated();
}

export async function enqueuePracticeAttempt(
  item: OfflinePracticeAttemptItem,
): Promise<void> {
  const id = `practice_${item.offlineEventId}`;
  await putRecord<QueuedSyncEntry>(SYNC_QUEUE_STORE, FALLBACK_QUEUE_KEY, id, {
    id,
    kind: 'practice',
    data: item,
  });
  emitQueueUpdated();
}

export async function enqueueExamSubmission(
  item: OfflineExamSubmissionItem,
): Promise<void> {
  const id = `exam_${item.offlineSessionId}`;
  await putRecord<QueuedSyncEntry>(SYNC_QUEUE_STORE, FALLBACK_QUEUE_KEY, id, {
    id,
    kind: 'exam',
    data: item,
  });
  emitQueueUpdated();
}

export async function getPendingSyncPayload(): Promise<OfflineSyncPayload> {
  const entries = await getAllRecords<QueuedSyncEntry>(
    SYNC_QUEUE_STORE,
    FALLBACK_QUEUE_KEY,
  );
  const lessonCompletes: OfflineLessonCompleteItem[] = [];
  const practiceAttempts: OfflinePracticeAttemptItem[] = [];
  const examSubmissions: OfflineExamSubmissionItem[] = [];

  for (const entry of entries) {
    if (entry.kind === 'lesson') {
      lessonCompletes.push(entry.data as OfflineLessonCompleteItem);
    } else if (entry.kind === 'practice') {
      practiceAttempts.push(entry.data as OfflinePracticeAttemptItem);
    } else if (entry.kind === 'exam') {
      examSubmissions.push(entry.data as OfflineExamSubmissionItem);
    }
  }

  return { lessonCompletes, practiceAttempts, examSubmissions };
}

export async function getPendingCount(): Promise<number> {
  const entries = await getAllRecords<QueuedSyncEntry>(
    SYNC_QUEUE_STORE,
    FALLBACK_QUEUE_KEY,
  );
  return entries.length;
}

export async function clearSyncQueue(): Promise<void> {
  if (typeof window !== 'undefined') {
    window.localStorage.removeItem(FALLBACK_QUEUE_KEY);
  }
  if (hasIndexedDb()) {
    try {
      const db = await openDb();
      await new Promise<void>((resolve, reject) => {
        const tx = db.transaction(SYNC_QUEUE_STORE, 'readwrite');
        tx.objectStore(SYNC_QUEUE_STORE).clear();
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
      });
    } catch {
      // Fallback already cleared
    }
  }
  emitQueueUpdated();
}
