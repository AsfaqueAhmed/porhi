export type BoardKey =
  | 'DHAKA'
  | 'RAJSHAHI'
  | 'CHATTOGRAM'
  | 'CUMILLA'
  | 'JASHORE'
  | 'SYLHET'
  | 'DINAJPUR'
  | 'BARISHAL'
  | 'MYMENSINGH'
  | 'ALL_BOARDS'
  | 'OTHER';

export interface BoardMetadataItem {
  key: Exclude<BoardKey, 'OTHER'>;
  labelBangla: string;
  labelEnglish: string;
  shortBangla: string;
}

export const BOARD_METADATA: readonly BoardMetadataItem[] = [
  { key: 'DHAKA', labelBangla: 'ঢাকা বোর্ড', labelEnglish: 'Dhaka Board', shortBangla: 'ঢাকা' },
  { key: 'RAJSHAHI', labelBangla: 'রাজশাহী বোর্ড', labelEnglish: 'Rajshahi Board', shortBangla: 'রাজশাহী' },
  { key: 'CHATTOGRAM', labelBangla: 'চট্টগ্রাম বোর্ড', labelEnglish: 'Chattogram Board', shortBangla: 'চট্টগ্রাম' },
  { key: 'CUMILLA', labelBangla: 'কুমিল্লা বোর্ড', labelEnglish: 'Cumilla Board', shortBangla: 'কুমিল্লা' },
  { key: 'JASHORE', labelBangla: 'যশোর বোর্ড', labelEnglish: 'Jashore Board', shortBangla: 'যশোর' },
  { key: 'SYLHET', labelBangla: 'সিলেট বোর্ড', labelEnglish: 'Sylhet Board', shortBangla: 'সিলেট' },
  { key: 'DINAJPUR', labelBangla: 'দিনাজপুর বোর্ড', labelEnglish: 'Dinajpur Board', shortBangla: 'দিনাজপুর' },
  { key: 'BARISHAL', labelBangla: 'বরিশাল বোর্ড', labelEnglish: 'Barishal Board', shortBangla: 'বরিশাল' },
  { key: 'MYMENSINGH', labelBangla: 'ময়মনসিংহ বোর্ড', labelEnglish: 'Mymensingh Board', shortBangla: 'ময়মনসিংহ' },
  { key: 'ALL_BOARDS', labelBangla: 'সকল বোর্ড', labelEnglish: 'All Boards', shortBangla: 'সকল বোর্ড' },
] as const;

export type TrackProgramCode = 'CLASS_6_8' | 'SSC' | 'HSC' | 'ADMISSION' | 'BCS';

export interface ProgramTrackMetadataItem {
  program: TrackProgramCode;
  labelBangla: string;
  labelEnglish: string;
  shortBangla: string;
  classLevel: string;
  descriptionBangla: string;
}

export const PROGRAM_TRACK_METADATA: readonly ProgramTrackMetadataItem[] = [
  {
    program: 'CLASS_6_8',
    labelBangla: 'ষষ্ঠ–অষ্টম শ্রেণি',
    labelEnglish: 'Class 6–8',
    shortBangla: '৬ষ্ঠ–৮ম',
    classLevel: 'CLASS_6_8',
    descriptionBangla: 'মৌলিক বিজ্ঞান ও গণিতের দৃঢ় ভিত্তি',
  },
  {
    program: 'SSC',
    labelBangla: 'SSC (৯ম–১০ম শ্রেণি)',
    labelEnglish: 'SSC (Class 9–10)',
    shortBangla: 'SSC',
    classLevel: 'CLASS_9_10',
    descriptionBangla: 'এনসিটিবি বোর্ড ও সৃজনশীল-MCQ পূর্ণাঙ্গ প্রস্তুতি',
  },
  {
    program: 'HSC',
    labelBangla: 'HSC (একাদশ–দ্বাদশ)',
    labelEnglish: 'HSC (Class 11–12)',
    shortBangla: 'HSC',
    classLevel: 'CLASS_11_12',
    descriptionBangla: 'উচ্চমাধ্যমিক ১ম ও ২য় পত্র কনসেপ্ট ও গাণিতিক সমস্যা',
  },
  {
    program: 'ADMISSION',
    labelBangla: 'বিশ্ববিদ্যালয় ভর্তি',
    labelEnglish: 'University Admission',
    shortBangla: 'ভর্তি প্রস্তুতি',
    classLevel: 'ADMISSION',
    descriptionBangla: 'ঢাবি, বুয়েট ও মেডিকেল ক-ইউনিট দ্রুত সমাধান কৌশল',
  },
  {
    program: 'BCS',
    labelBangla: 'BCS ও চাকরি প্রস্তুতি',
    labelEnglish: 'BCS & Career Prep',
    shortBangla: 'BCS',
    classLevel: 'BCS',
    descriptionBangla: 'প্রিলিমিনারি বিজ্ঞান, সাধারণ জ্ঞান ও বিশ্লেষণাত্মক দক্ষতা',
  },
] as const;

export interface ParsedBoardInfo {
  boardKey: BoardKey;
  boardKeys: BoardKey[];
  boardLabelBangla: string;
  boardLabelEnglish: string;
  year: number | null;
  isVerifiedBoard: boolean;
  raw: string | null;
}

const BANGLA_DIGITS: Record<string, string> = {
  '০': '0',
  '১': '1',
  '২': '2',
  '৩': '3',
  '৪': '4',
  '৫': '5',
  '৬': '6',
  '৭': '7',
  '৮': '8',
  '৯': '9',
};

const BOARD_MATCHERS: Array<{
  key: Exclude<BoardKey, 'OTHER'>;
  patterns: RegExp[];
}> = [
  { key: 'ALL_BOARDS', patterns: [/all\s*_?\s*boards?/i, /combined\s+boards?/i, /সকল\s*বোর্ড/, /সমন্বিত\s*বোর্ড/] },
  { key: 'DHAKA', patterns: [/\bdhaka\b/i, /ঢাকা/] },
  { key: 'RAJSHAHI', patterns: [/\brajshahi\b/i, /রাজশাহী/] },
  { key: 'CHATTOGRAM', patterns: [/\bchattogram\b/i, /\bchittagong\b/i, /চট্টগ্রাম/] },
  { key: 'CUMILLA', patterns: [/\bcumilla\b/i, /\bcomilla\b/i, /কুমিল্লা/] },
  { key: 'JASHORE', patterns: [/\bjashore\b/i, /\bjessore\b/i, /যশোর/] },
  { key: 'SYLHET', patterns: [/\bsylhet\b/i, /সিলেট/] },
  { key: 'DINAJPUR', patterns: [/\bdinajpur\b/i, /দিনাজপুর/] },
  { key: 'BARISHAL', patterns: [/\bbarishal\b/i, /\bbarisal\b/i, /বরিশাল/] },
  { key: 'MYMENSINGH', patterns: [/\bmymensingh\b/i, /ময়মনসিংহ/, /ময়মনসিংহ/] },
];

export function normalizeDigitsToEnglish(value: string): string {
  return value.replace(/[০-৯]/g, (digit) => BANGLA_DIGITS[digit] ?? digit);
}

export function getBoardMetadata(key: BoardKey): { labelBangla: string; labelEnglish: string } {
  const found = BOARD_METADATA.find((item) => item.key === key);
  if (found) {
    return { labelBangla: found.labelBangla, labelEnglish: found.labelEnglish };
  }
  return { labelBangla: 'অন্যান্য / প্র্যাকটিস', labelEnglish: 'Other / Practice' };
}

export function parseBoardSource(raw?: string | null): ParsedBoardInfo {
  const trimmed = raw?.trim() || null;
  if (!trimmed) {
    return {
      boardKey: 'OTHER',
      boardKeys: ['OTHER'],
      boardLabelBangla: 'অন্যান্য / প্র্যাকটিস',
      boardLabelEnglish: 'Other / Practice',
      year: null,
      isVerifiedBoard: false,
      raw: null,
    };
  }

  const normalized = normalizeDigitsToEnglish(trimmed);
  const yearMatch = normalized.match(/\b(19\d{2}|20\d{2})\b/);
  const year = yearMatch ? Number(yearMatch[1]) : null;

  const matchedKeys: BoardKey[] = [];
  for (const matcher of BOARD_MATCHERS) {
    if (matcher.patterns.some((pattern) => pattern.test(normalized))) {
      matchedKeys.push(matcher.key);
    }
  }

  const primaryKey: BoardKey = matchedKeys[0] ?? 'OTHER';
  const boardKeys: BoardKey[] = matchedKeys.length > 0 ? matchedKeys : ['OTHER'];
  const meta = getBoardMetadata(primaryKey);
  const hasExplicitNonBoardPracticeTag = /\b(model|practice|sample)\b|মডেল|প্র্যাকটিস/i.test(normalized);
  const isVerifiedBoard = primaryKey !== 'OTHER' && !hasExplicitNonBoardPracticeTag;

  return {
    boardKey: primaryKey,
    boardKeys,
    boardLabelBangla: meta.labelBangla,
    boardLabelEnglish: meta.labelEnglish,
    year,
    isVerifiedBoard,
    raw: trimmed,
  };
}

export function matchesBoardYearFilter(questionYear: number | null, filterYear?: string | null): boolean {
  if (!filterYear || filterYear === 'ALL') {
    return true;
  }
  if (questionYear === null) {
    return false;
  }
  const normalized = normalizeDigitsToEnglish(filterYear.trim());
  if (normalized === '2024+') {
    return questionYear >= 2024;
  }
  const exactYear = Number(normalized);
  if (!Number.isFinite(exactYear)) {
    return true;
  }
  return questionYear === exactYear;
}
