import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { useLanguageStore } from '../src/store/language-store';
import { LanguageToggle } from '../src/components/navigation/LanguageToggle';
import { t, formatDigits } from '../src/lib/i18n/translations';
import { getContentStatusBadge } from '../src/components/admin/content-status-badge';
import { ContentStatus } from '@pori/shared';
import { LessonBankManager } from '../src/components/admin/lessons/LessonBankManager';
import { ModelTestManager } from '../src/components/admin/model-test-manager';

vi.mock('@/lib/api-client', () => ({
  apiClient: {
    get: vi.fn().mockResolvedValue([]),
    post: vi.fn().mockResolvedValue({}),
    put: vi.fn().mockResolvedValue({}),
    delete: vi.fn().mockResolvedValue({}),
  },
  ApiError: class extends Error {},
}));

describe('Language Store & i18n Translations', () => {
  beforeEach(() => {
    useLanguageStore.setState({ language: 'bn' });
    localStorage.clear();
  });

  afterEach(() => {
    cleanup();
  });

  it('translates navigation keys accurately in both languages', () => {
    expect(t('nav.home', 'bn')).toBe('হোম');
    expect(t('nav.home', 'en')).toBe('Home');

    expect(t('nav.questions', 'bn')).toBe('প্রশ্ন ভান্ডার');
    expect(t('nav.questions', 'en')).toBe('Question Bank');

    expect(t('action.save', 'bn')).toBe('সংরক্ষণ করুন');
    expect(t('action.save', 'en')).toBe('Save');
  });

  it('converts digits between Bengali and English correctly', () => {
    expect(formatDigits('45', 'bn')).toBe('৪৫');
    expect(formatDigits('৪৫', 'en')).toBe('45');
    expect(formatDigits(100, 'bn')).toBe('১০০');
    expect(formatDigits(100, 'en')).toBe('100');
  });

  it('toggles language in store and updates translations', () => {
    const store = useLanguageStore.getState();
    expect(store.language).toBe('bn');
    expect(store.t('nav.lessons')).toBe('পাঠ্য লেসন');

    store.toggleLanguage();
    expect(useLanguageStore.getState().language).toBe('en');
    expect(useLanguageStore.getState().t('nav.lessons')).toBe('Lessons Bank');

    store.toggleLanguage();
    expect(useLanguageStore.getState().language).toBe('bn');
    expect(useLanguageStore.getState().t('nav.lessons')).toBe('পাঠ্য লেসন');
  });

  it('renders LanguageToggle button and toggles language on click', () => {
    render(<LanguageToggle />);

    const bnBtn = screen.getByRole('button', { name: /বাংলা/i });
    const enBtn = screen.getByRole('button', { name: /english/i });
    expect(bnBtn).toBeDefined();
    expect(enBtn).toBeDefined();

    // Click English button
    fireEvent.click(enBtn);
    expect(useLanguageStore.getState().language).toBe('en');

    // Click Bangla button
    fireEvent.click(bnBtn);
    expect(useLanguageStore.getState().language).toBe('bn');
  });

  it('localizes status badges accurately in bn and en', () => {
    const pubBn = getContentStatusBadge(ContentStatus.PUBLISHED, 'bn');
    const pubEn = getContentStatusBadge(ContentStatus.PUBLISHED, 'en');
    expect(pubBn.label).toContain('প্রকাশিত');
    expect(pubEn.label).toBe('Published');

    const revBn = getContentStatusBadge(ContentStatus.REVIEW, 'bn');
    const revEn = getContentStatusBadge(ContentStatus.REVIEW, 'en');
    expect(revBn.label).toContain('রিভিউ');
    expect(revEn.label).toBe('In Review');
  });

  it('renders LessonBankManager in English when language is en', () => {
    useLanguageStore.setState({ language: 'en' });
    render(<LessonBankManager />);

    expect(screen.getByText('Lesson Bank & Directory')).toBeDefined();
    expect(screen.getByPlaceholderText('Search by lesson title or goal...')).toBeDefined();
    expect(screen.getByText('Reset Filters')).toBeDefined();
  });

  it('renders ModelTestManager in English when language is en', () => {
    useLanguageStore.setState({ language: 'en' });
    render(<ModelTestManager />);

    expect(
      screen.getByText('Chapter & Subject-wise Model Test Configuration')
    ).toBeDefined();
    expect(
      screen.getByRole('button', { name: /\+ Create Model Test/i })
    ).toBeDefined();
  });
});
