import { describe, it, expect } from 'vitest';
import {
  BOARD_METADATA,
  PROGRAM_TRACK_METADATA,
  parseBoardSource,
  matchesBoardYearFilter,
  type LessonDTO,
  type SubjectDTO,
  type MultiExamRehearsalDTO,
  type GuardianReportDTO,
} from '../src';

describe('parseBoardSource', () => {
  it('normalizes English spelling variants cleanly', () => {
    expect(parseBoardSource('Chittagong Board 2022')).toEqual({
      boardKey: 'CHATTOGRAM',
      boardKeys: ['CHATTOGRAM'],
      boardLabelBangla: 'চট্টগ্রাম বোর্ড',
      boardLabelEnglish: 'Chattogram Board',
      year: 2022,
      isVerifiedBoard: true,
      raw: 'Chittagong Board 2022',
    });

    expect(parseBoardSource('Comilla Board 2020')).toMatchObject({
      boardKey: 'CUMILLA',
      year: 2020,
      isVerifiedBoard: true,
    });

    expect(parseBoardSource('Barisal Board 2021')).toMatchObject({
      boardKey: 'BARISHAL',
      year: 2021,
      isVerifiedBoard: true,
    });

    expect(parseBoardSource('Jessore Board 2023')).toMatchObject({
      boardKey: 'JASHORE',
      year: 2023,
      isVerifiedBoard: true,
    });
  });

  it('parses Bangla board names and Bangla numerals', () => {
    expect(parseBoardSource('ঢাকা বোর্ড ২০২৪')).toMatchObject({
      boardKey: 'DHAKA',
      boardLabelBangla: 'ঢাকা বোর্ড',
      year: 2024,
      isVerifiedBoard: true,
    });

    expect(parseBoardSource('ময়মনসিংহ বোর্ড ২০২৫')).toMatchObject({
      boardKey: 'MYMENSINGH',
      year: 2025,
      isVerifiedBoard: true,
    });
  });

  it('handles All Boards and multi-board tags', () => {
    expect(parseBoardSource('All Boards 2024')).toMatchObject({
      boardKey: 'ALL_BOARDS',
      year: 2024,
      isVerifiedBoard: true,
    });

    const multi = parseBoardSource('Dhaka & Rajshahi Board 2023');
    expect(multi.boardKey).toBe('DHAKA');
    expect(multi.boardKeys).toEqual(['DHAKA', 'RAJSHAHI']);
    expect(multi.isVerifiedBoard).toBe(true);
  });

  it('marks non-board practice items as unverified OTHER', () => {
    expect(parseBoardSource('Model Practice Set 1')).toMatchObject({
      boardKey: 'OTHER',
      boardKeys: ['OTHER'],
      year: null,
      isVerifiedBoard: false,
    });
    expect(parseBoardSource(null)).toMatchObject({
      boardKey: 'OTHER',
      year: null,
      isVerifiedBoard: false,
    });
  });

  it('evaluates year filter including 2024+ range', () => {
    expect(matchesBoardYearFilter(2024, '2024+')).toBe(true);
    expect(matchesBoardYearFilter(2025, '2024+')).toBe(true);
    expect(matchesBoardYearFilter(2023, '2024+')).toBe(false);
    expect(matchesBoardYearFilter(2020, '2020')).toBe(true);
    expect(matchesBoardYearFilter(2020, 'ALL')).toBe(true);
  });

  it('exposes canonical board and program metadata lists and Phase 2 DTO augmentations', () => {
    expect(BOARD_METADATA.some((b) => b.key === 'DHAKA')).toBe(true);
    expect(BOARD_METADATA.some((b) => b.key === 'CHATTOGRAM')).toBe(true);
    expect(PROGRAM_TRACK_METADATA.map((t) => t.program)).toEqual([
      'CLASS_6_8',
      'SSC',
      'HSC',
      'ADMISSION',
      'BCS',
    ]);

    const subject: SubjectDTO = {
      id: 'sub_hsc',
      code: 'hsc_physics_1',
      nameBangla: 'HSC পদার্থবিজ্ঞান ১ম পত্র',
      classLevel: 'CLASS_11_12',
      program: 'HSC',
      syllabusYear: 2026,
      isReady: true,
    };
    const lessonAudioCheck: Partial<LessonDTO> = {
      audioUrl: '/audio/lesson-intro.wav',
      audioDurationSeconds: 120,
    };
    const rehearsalCheck: Pick<MultiExamRehearsalDTO, 'id' | 'status'> = {
      id: 'reh_1',
      status: 'INTERMISSION',
    };
    const guardianCheck: Pick<GuardianReportDTO, 'audience' | 'shareCode'> = {
      audience: 'PARENT',
      shareCode: 'ABC123',
    };

    expect(subject.program).toBe('HSC');
    expect(lessonAudioCheck.audioUrl).toBe('/audio/lesson-intro.wav');
    expect(rehearsalCheck.status).toBe('INTERMISSION');
    expect(guardianCheck.audience).toBe('PARENT');
  });
});
