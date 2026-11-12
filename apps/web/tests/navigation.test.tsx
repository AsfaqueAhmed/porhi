import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { PersistentNav } from '../src/components/navigation/persistent-nav';
import { useUserStore } from '../src/store/user-store';
import { findAdjacentTopics } from '../src/lib/curriculum-data';

describe('PersistentNav', () => {
  beforeEach(() => {
    useUserStore.setState({
      activeSubject: {
        id: 'sub-phy',
        code: 'PHY101',
        nameBangla: 'পদার্থবিজ্ঞান',
        syllabusYear: 2026,
        program: 'SSC',
      },
      completedTopics: [],
      lastVisitedTopic: null,
      topicMastery: {},
      savedMistakes: [],
      examHistory: [],
      bookmarks: [],
      lessonNotes: {},
      studyDates: [],
    });
  });

  it('renders three persistent destinations: হোম, বিষয়সমূহ, অগ্রগতি', () => {
    render(<PersistentNav currentPath="/dashboard" />);

    expect(screen.getAllByRole('link', { name: /হোম/i }).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByRole('link', { name: /বিষয়সমূহ/i }).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByRole('link', { name: /অগ্রগতি/i }).length).toBeGreaterThanOrEqual(1);
  });

  it('contains correct href destinations', () => {
    render(<PersistentNav currentPath="/dashboard" />);

    const homeLinks = screen.getAllByRole('link', { name: /হোম/i });
    const subjectsLinks = screen.getAllByRole('link', { name: /বিষয়সমূহ/i });
    const progressLinks = screen.getAllByRole('link', { name: /অগ্রগতি/i });

    expect(homeLinks[0].getAttribute('href')).toBe('/dashboard');
    expect(subjectsLinks[0].getAttribute('href')).toBe('/subjects');
    expect(progressLinks[0].getAttribute('href')).toBe('/progress');
  });

  it('shows active subject indicator badge with subject and program/year', () => {
    render(<PersistentNav currentPath="/dashboard" />);

    expect(screen.getByText(/বর্তমান বিষয়: পদার্থবিজ্ঞান \(SSC ২০২৬\)/i)).toBeDefined();
  });

  it('handles empty active subject gracefully', () => {
    useUserStore.setState({ activeSubject: null });
    render(<PersistentNav currentPath="/dashboard" />);

    expect(screen.getByText(/বিষয় নির্বাচন করুন/i)).toBeDefined();
  });

  it('opens quick search modal and filters topics by query', () => {
    render(<PersistentNav currentPath="/dashboard" />);

    const searchBtn = screen.getByRole('button', { name: /দ্রুত অনুসন্ধান/i });
    fireEvent.click(searchBtn);

    const searchInput = screen.getByPlaceholderText(/অধ্যায় বা টপিক খুঁজুন/i);
    fireEvent.change(searchInput, { target: { value: 'ভৌত রাশি' } });

    const topicLinks = screen.getAllByRole('link', { name: /১\.১ পদার্থবিজ্ঞান/i });
    expect(topicLinks.length).toBeGreaterThanOrEqual(1);
    expect(topicLinks[0].getAttribute('href')).toBe('/lesson/top_ssc_physics_ch1_1');
  });

  it('renders compact Account & Settings link pointing to /account', () => {
    render(<PersistentNav currentPath="/dashboard" />);

    const accountLink = screen.getByRole('link', { name: /অ্যাকাউন্ট ও সেটিংস|Account/i });
    expect(accountLink.getAttribute('href')).toBe('/account');
  });
});

describe('useUserStore & curriculum-data helpers', () => {
  beforeEach(() => {
    useUserStore.setState({
      completedTopics: [],
      lastVisitedTopic: null,
      topicMastery: {},
      savedMistakes: [],
      examHistory: [],
      bookmarks: [],
      lessonNotes: {},
      studyDates: [],
    });
  });

  it('tracks topic completion, practice attempts, mistake auto-resolution, bookmarks, and notes', () => {
    const store = useUserStore.getState();

    store.markTopicCompleted('top_ssc_physics_ch1_1', '১.১ পদার্থবিজ্ঞান (Physics)', 'chap_ssc_physics_ch1', 'প্রথম অধ্যায়: ভৌত রাশি ও পরিমাপ');
    expect(useUserStore.getState().completedTopics).toContain('top_ssc_physics_ch1_1');

    // Record a wrong attempt
    store.recordPracticeAttempt({
      questionId: 'q_test_1',
      stemBangla: 'বল এর একক কী?',
      topicId: 'top_ssc_physics_ch1_1',
      topicTitle: '১.১ পদার্থবিজ্ঞান (Physics)',
      chapterId: 'chap_ssc_physics_ch1',
      chapterTitle: 'প্রথম অধ্যায়: ভৌত রাশি ও পরিমাপ',
      selectedKey: 'B',
      correctKey: 'A',
      explanationBangla: 'নিউটন হলো বলের একক।',
      isCorrect: false,
    });

    expect(useUserStore.getState().savedMistakes.length).toBe(1);
    expect(useUserStore.getState().savedMistakes[0].resolved).toBe(false);
    expect(useUserStore.getState().topicMastery['top_ssc_physics_ch1_1']).toEqual(
      expect.objectContaining({ attempted: 1, correct: 0 })
    );

    // Record a correct attempt for the same question -> auto-resolves mistake
    store.recordPracticeAttempt({
      questionId: 'q_test_1',
      stemBangla: 'বল এর একক কী?',
      topicId: 'top_ssc_physics_ch1_1',
      topicTitle: '১.১ পদার্থবিজ্ঞান (Physics)',
      chapterId: 'chap_ssc_physics_ch1',
      chapterTitle: 'প্রথম অধ্যায়: ভৌত রাশি ও পরিমাপ',
      selectedKey: 'A',
      correctKey: 'A',
      isCorrect: true,
    });

    expect(useUserStore.getState().savedMistakes[0].resolved).toBe(true);
    expect(useUserStore.getState().topicMastery['top_ssc_physics_ch1_1']).toEqual(
      expect.objectContaining({ attempted: 2, correct: 1 })
    );

    // Toggle bookmark & save note
    store.toggleBookmark({
      id: 'top_ssc_physics_ch1_1',
      type: 'topic',
      titleBangla: '১.১ পদার্থবিজ্ঞান (Physics)',
      subtitleBangla: 'প্রথম অধ্যায়: ভৌত রাশি ও পরিমাপ',
      href: '/lesson/top_ssc_physics_ch1_1',
    });
    expect(useUserStore.getState().bookmarks.length).toBe(1);

    store.saveLessonNote('top_ssc_physics_ch1_1', 'মাত্রা সমীকরণ মনে রাখতে হবে');
    expect(useUserStore.getState().lessonNotes['top_ssc_physics_ch1_1']).toBe('মাত্রা সমীকরণ মনে রাখতে হবে');
  });

  it('computes adjacent topics across chapters accurately', () => {
    const adjFirst = findAdjacentTopics('top_ssc_physics_ch1_1');
    expect(adjFirst.prevTopic).toBeNull();
    expect(adjFirst.nextTopic?.id).toBe('top_ssc_physics_ch1_2');
    expect(adjFirst.topicIndex).toBe(1);
    expect(adjFirst.totalInChapter).toBe(7);

    const adjBoundary = findAdjacentTopics('top_ssc_physics_ch1_7');
    expect(adjBoundary.prevTopic?.id).toBe('top_ssc_physics_ch1_6');
    expect(adjBoundary.nextTopic?.id).toBe('top_ssc_physics_ch2_1');
  });
});
