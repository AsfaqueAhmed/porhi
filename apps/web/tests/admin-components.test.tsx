import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { MathToolbar } from '../src/components/admin/math-toolbar';
import { ReviewConsole } from '../src/components/admin/review-console';
import { CurriculumManager } from '../src/components/admin/curriculum-manager';
import { AuthoringStudio } from '../src/components/admin/authoring-studio';
import { ModelTestManager } from '../src/components/admin/model-test-manager';
import { ContentStatus } from '@pori/shared';

describe('Admin Portal Components', () => {
  describe('MathToolbar', () => {
    it('renders math formula categories and calls onInsert when a formula is clicked', () => {
      const handleInsert = vi.fn();
      render(<MathToolbar onInsert={handleInsert} />);

      expect(screen.getByText(/LaTeX গণিত ও সমীকরণ টুলবার/i)).toBeDefined();
      expect(screen.getByText(/মৌলিক সমীকরণ/i)).toBeDefined();
      expect(screen.getByText(/গতির সূত্র/i)).toBeDefined();

      // Click on Kinematics category
      fireEvent.click(screen.getByText(/গতির সূত্র/i));
      expect(screen.getByText(/১ম সূত্র/i)).toBeDefined();

      // Click the 1st formula button
      fireEvent.click(screen.getByText(/১ম সূত্র/i));
      expect(handleInsert).toHaveBeenCalledWith('v = u + at');
    });
  });

  describe('ReviewConsole', () => {
    const mockContent = [
      {
        id: 'item-1',
        topicId: 'topic-1',
        type: 'QUESTION' as const,
        titleBangla: 'গতির প্রথম সমীকরণ',
        contentSnippet: 'স্থির অবস্থান থেকে সুষম ত্বরণে চলা...',
        status: ContentStatus.REVIEW,
        version: 1,
        authorName: 'লেখক ১',
        payload: {
          options: [
            { id: 'opt_1', text: '10 m/s', isCorrect: true },
            { id: 'opt_2', text: '20 m/s', isCorrect: false },
          ],
          explanation: {
            directAnswer: '10 m/s',
            coreConcept: 'v = u + at',
          },
        },
      },
    ];

    it('renders filter tabs, items list, and review decision buttons', () => {
      render(<ReviewConsole contentList={mockContent} />);

      expect(screen.getByText(/রিভিউ তালিকা/i)).toBeDefined();
      expect(screen.getAllByText(/গতির প্রথম সমীকরণ/i).length).toBeGreaterThanOrEqual(1);
      expect(screen.getByRole('button', { name: /অনুমোদন ও প্রকাশ/i })).toBeDefined();
      expect(screen.getByRole('button', { name: /সংশোধন অনুরোধ/i })).toBeDefined();
      expect(screen.getByRole('button', { name: /বাতিল \(Reject\)/i })).toBeDefined();
    });

    it('toggles between student simulator and raw view', () => {
      render(<ReviewConsole contentList={mockContent} />);

      expect(screen.getByText(/শিক্ষার্থী সিমুলেটর/i)).toBeDefined();
      expect(screen.getByText(/র ডাটা ভিউ/i)).toBeDefined();

      fireEvent.click(screen.getByText(/র ডাটা ভিউ/i));
      expect(screen.getByText(/v = u \+ at/i)).toBeDefined();
    });
  });

  describe('CurriculumManager', () => {
    it('renders subject controls including Add Subject and subject-wise chapter actions', () => {
      render(<CurriculumManager />);

      expect(screen.getByText(/কারিকুলাম বিষয় ও অধ্যায় কন্ট্রোল প্যানেল/i)).toBeDefined();
      expect(screen.getByRole('button', { name: /নতুন বিষয় যোগ করুন/i })).toBeDefined();
      expect(screen.getByRole('button', { name: /\+ এই বিষয়ে নতুন অধ্যায় যোগ করুন/i })).toBeDefined();
    });

    it('renders enterprise subjects directory list with search filter and selection', () => {
      render(<CurriculumManager />);

      // Verify subject directory table headers and elements
      expect(screen.getByText(/বিষয় ও পরিচিতি/i)).toBeDefined();
      expect(screen.getByText(/শ্রেণী ও সিলেবাস বছর/i)).toBeDefined();
      expect(screen.getAllByText(/পদার্থবিজ্ঞান/i).length).toBeGreaterThanOrEqual(1);
      expect(screen.getByText(/রসায়ন/i)).toBeDefined();

      // Search filtering
      const searchInput = screen.getByPlaceholderText(/বিষয় খুঁজুন.../i);
      expect(searchInput).toBeDefined();

      fireEvent.change(searchInput, { target: { value: 'রসায়ন' } });
      expect(screen.getByText(/রসায়ন/i)).toBeDefined();
    });
  });

  describe('AuthoringStudio', () => {
    it('renders Question-only MCQ and CQ modes without Lesson tab', () => {
      render(<AuthoringStudio />);

      expect(screen.getByText(/অথরিং স্টুডিও/i)).toBeDefined();
      expect(screen.getByText(/৬-স্তরের ব্যাখ্যাসহ প্রশ্ন জমা দাও/i)).toBeDefined();
      expect(screen.getByText(/স্তরের বিশ্লেষণ ও ডিপ এক্সপ্ল্যানেশন সিস্টেম/i)).toBeDefined();
      expect(screen.queryByText(/পাঠ্য লেসন \(Lesson\)/i)).toBeNull();

      // Switch to CQ authoring
      fireEvent.click(screen.getByText(/সৃজনশীল \(CQ\)/i));
      expect(screen.getByText(/সৃজনশীল উদ্দীপক/i)).toBeDefined();
      expect(screen.getByText(/সৃজনশীল \(CQ\) ৪ অংশের প্রশ্ন ও মূল্যায়ন রুব্রিক/i)).toBeDefined();
    });
  });

  describe('ModelTestManager', () => {
    it('renders model test presets and launch actions', () => {
      render(<ModelTestManager />);

      expect(screen.getByText(/অধ্যায় ও বিষয়ভিত্তিক মডেল টেস্ট কনফিগারেশন/i)).toBeDefined();
      expect(screen.getByRole('button', { name: /নতুন মডেল টেস্ট তৈরি করো/i })).toBeDefined();
      expect(screen.getAllByText(/লাইভ টেস্ট রান দেখুন/i).length).toBeGreaterThanOrEqual(1);
    });
  });
});
