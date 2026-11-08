import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { StudentSimulatorFrame } from '../src/components/admin/student-simulator-frame';

describe('StudentSimulatorFrame', () => {
  it('renders student mobile device preview with stem, options, and live feedback', () => {
    const options = [
      { id: 'opt_1', text: 'v = u + at', isCorrect: true },
      { id: 'opt_2', text: 's = vt^2', isCorrect: false },
      { id: 'opt_3', text: 'v^2 = u^2 - 2as', isCorrect: false },
      { id: 'opt_4', text: 's = ut', isCorrect: false },
    ];

    render(
      <StudentSimulatorFrame
        stem="কোনটি সুষম ত্বরণে গতির প্রথম সমীকরণ?"
        options={options}
        coreConcept="ত্বরণ ধ্রুব থাকলে বেগের বৃদ্ধি সময়ের সমানুপাতিক।"
        proTip="স্থির অবস্থান বললে u = 0 ধরবে।"
      />
    );

    expect(screen.getByText(/লাইভ স্টুডেন্ট সিমুলেটর/i)).toBeDefined();
    expect(screen.getByText(/কোনটি সুষম ত্বরণে গতির প্রথম সমীকরণ/i)).toBeDefined();
    expect(screen.getByText(/v = u \+ at/i)).toBeDefined();

    // Click on option 1
    const optionBtn = screen.getByText(/v = u \+ at/i);
    fireEvent.click(optionBtn);

    // Correct feedback badge
    expect(screen.getByText(/সঠিক উত্তর!/i)).toBeDefined();
  });
});
