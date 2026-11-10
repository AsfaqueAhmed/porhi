import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { useLanguageStore } from '../src/store/language-store';
import { LanguageToggle } from '../src/components/navigation/LanguageToggle';
import { t, formatDigits } from '../src/lib/i18n/translations';

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
});
