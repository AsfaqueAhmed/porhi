import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { LatexRenderer } from '../src/components/math/latex-renderer';

describe('LatexRenderer', () => {
  it('renders plain text without math correctly', () => {
    render(<LatexRenderer content="সাধারণ বাংলা টেক্সট" />);
    expect(screen.getByText('সাধারণ বাংলা টেক্সট')).toBeDefined();
  });

  it('renders inline math $E = mc^2$ with katex', () => {
    const { container } = render(<LatexRenderer content="শক্তি $E = mc^2$ সমীকরণ" />);
    expect(container.textContent).toContain('শক্তি');
    expect(container.textContent).toContain('সমীকরণ');
    const katexElement = container.querySelector('.katex');
    expect(katexElement).not.toBeNull();
  });

  it('renders display block math $$a^2 + b^2 = c^2$$', () => {
    const { container } = render(<LatexRenderer content="পীথাগোরাস:\n$$a^2 + b^2 = c^2$$" />);
    expect(container.textContent).toContain('পীথাগোরাস:');
    const displayElement = container.querySelector('.katex-display');
    expect(displayElement).not.toBeNull();
  });

  it('safely handles malformed latex without throwing an error', () => {
    expect(() => {
      render(<LatexRenderer content="ত্রুটিপূর্ণ $\frac{unclosed$ সূত্র" />);
    }).not.toThrow();
  });

  it('renders multiple mixed formulas in sequence', () => {
    const { container } = render(
      <LatexRenderer content="প্রথম $v = u + at$ এবং দ্বিতীয় $s = ut + \frac{1}{2}at^2$" />
    );
    const katexElements = container.querySelectorAll('.katex');
    expect(katexElements.length).toBeGreaterThanOrEqual(2);
  });
});
