import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { PersistentNav } from '../src/components/navigation/persistent-nav';
import { useUserStore } from '../src/store/user-store';

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
});
