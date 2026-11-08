import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { CurriculumManager } from '../src/components/admin/curriculum-manager';

// Mock next/navigation
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
  useSearchParams: () => new URLSearchParams(),
}));

describe('CurriculumManager with AdminDrawer', () => {
  it('opens AdminDrawer when "+ নতুন বিষয় যোগ করুন" is clicked', () => {
    render(<CurriculumManager />);

    const addSubjectBtn = screen.getByRole('button', { name: /\+ নতুন বিষয় যোগ করুন/i });
    fireEvent.click(addSubjectBtn);

    // Should render the drawer heading and input
    expect(screen.getByRole('heading', { name: /নতুন বিষয় যোগ করুন/i })).toBeDefined();
    expect(screen.getByLabelText(/বিষয়ের বাংলা নাম/i)).toBeDefined();
  });

  it('renders direct navigation buttons to question authoring and model tests', () => {
    const handleAuthoring = vi.fn();
    const handleModelTest = vi.fn();

    render(
      <CurriculumManager
        onNavigateToAuthoring={handleAuthoring}
        onNavigateToModelTest={handleModelTest}
      />
    );

    expect(screen.getByText(/কারিকুলাম বিষয় ও অধ্যায় কন্ট্রোল প্যানেল/i)).toBeDefined();
  });
});
