import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { afterEach, describe, expect, it } from 'vitest';
import { InteractiveSimulationRunner } from '../src/components/content/interactive-simulation-runner';

describe('InteractiveSimulationRunner', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders sandboxed iframe with allow-scripts allow-same-origin allow-downloads', () => {
    render(
      <InteractiveSimulationRunner
        widgetUrl="/uploads/interactive/wave-lab/index.html"
        title="শব্দ তরঙ্গ সিমুলেশন ল্যাব"
      />,
    );

    expect(screen.getByText(/শব্দ তরঙ্গ সিমুলেশন ল্যাব/i)).toBeDefined();
    expect(screen.getByText(/ল্যাব সিমুলেশন/i)).toBeDefined();

    const iframe = screen.getByTitle(/শব্দ তরঙ্গ সিমুলেশন ল্যাব/i);
    expect(iframe).toBeDefined();
    expect(iframe.getAttribute('sandbox')).toBe('allow-scripts allow-same-origin allow-downloads');
    expect(iframe.getAttribute('src')).toContain('/uploads/interactive/wave-lab/index.html');
  });

  it('supports fullscreen toggle', () => {
    render(
      <InteractiveSimulationRunner
        widgetUrl="/uploads/interactive/optics.html"
        title="অপটিক্স পরীক্ষা"
      />,
    );

    const fullscreenBtn = screen.getByRole('button', { name: /পূর্ণস্ক্রীন|fullscreen/i });
    expect(fullscreenBtn).toBeDefined();

    fireEvent.click(fullscreenBtn);
    expect(screen.getByRole('button', { name: /স্ক্রীন ছোট করুন|exit fullscreen/i })).toBeDefined();
  });

  it('supports simulation reset/reload button', () => {
    render(
      <InteractiveSimulationRunner
        widgetUrl="/uploads/interactive/optics.html"
        title="অপটিক্স পরীক্ষা"
      />,
    );

    const reloadBtn = screen.getByRole('button', { name: /রিলোড|রিসেট|reload/i });
    expect(reloadBtn).toBeDefined();

    const iframeBefore = screen.getByTitle(/অপটিক্স পরীক্ষা/i) as HTMLIFrameElement;
    fireEvent.click(reloadBtn);
    const iframeAfter = screen.getByTitle(/অপটিক্স পরীক্ষা/i) as HTMLIFrameElement;
    expect(iframeAfter).toBeDefined();
  });
});
