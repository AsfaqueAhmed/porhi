import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { afterEach, describe, expect, it } from 'vitest';
import { RichContentRenderer } from '../src/components/content/rich-content-renderer';

describe('RichContentRenderer', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders standard text and KaTeX math formulas', () => {
    render(<RichContentRenderer content="বলের সূত্র $F = ma$ এবং কাজের সূত্র $$W = Fs$$" />);

    expect(screen.getByText(/বলের সূত্র/i)).toBeDefined();
    expect(screen.getByText(/কাজের সূত্র/i)).toBeDefined();
  });

  it('renders educational audio player card for <audio> tags with title', () => {
    const content = `
শব্দের তীব্রতা ও কম্পাঙ্ক:
<audio controls src="/uploads/audio/low-freq.mp3" title="১০০ Hz কম কম্পাঙ্কের শব্দ তরঙ্গ"></audio>
তুলনামূলক আলোচনা নিচে দেওয়া হলো।
    `;

    render(<RichContentRenderer content={content} />);

    expect(screen.getByText(/১০০ Hz কম কম্পাঙ্কের শব্দ তরঙ্গ/i)).toBeDefined();
    // Play button
    const playBtn = screen.getByRole('button', { name: /শব্দ শুনুন|প্লে|play/i });
    expect(playBtn).toBeDefined();
  });

  it('renders responsive video player card for <video> tags with title', () => {
    const content = `
আলোর প্রতিসরণ পরীক্ষা:
<video controls src="/uploads/video/refraction.mp4" title="কাচ প্রিজমে আলোর প্রতিসরণ"></video>
    `;

    render(<RichContentRenderer content={content} />);

    expect(screen.getByText(/কাচ প্রিজমে আলোর প্রতিসরণ/i)).toBeDefined();
    const video = document.querySelector('video');
    expect(video).not.toBeNull();
    expect(video?.getAttribute('src')).toContain('/uploads/video/refraction.mp4');
  });

  it('renders markdown images with captions and click-to-zoom lightbox', () => {
    const content = '![উত্তল লেন্সের প্রতিবিম্ব গঠন](/uploads/images/convex-lens.png)';

    render(<RichContentRenderer content={content} />);

    expect(screen.getByText(/উত্তল লেন্সের প্রতিবিম্ব গঠন/i)).toBeDefined();
    const img = screen.getByAltText(/উত্তল লেন্সের প্রতিবিম্ব গঠন/i);
    expect(img).toBeDefined();

    // Click to zoom opens lightbox
    fireEvent.click(img);
    expect(screen.getByLabelText(/জুম বন্ধ করুন|close lightbox/i)).toBeDefined();
  });

  it('renders markdown headings, dividers, callout boxes, and lists with styled elements', () => {
    const content = `
# পদার্থবিজ্ঞান (Physics)

বিজ্ঞানের প্রাচীনতম শাখা হলো **পদার্থবিজ্ঞান**।

---

### পদার্থবিজ্ঞান কী?
> **সংজ্ঞা:** বিজ্ঞানের যে শাখায় পদার্থ ও শক্তি নিয়ে আলোচনা করা হয়।

- **পদার্থ (Matter):** যার ভর আছে।
- **শক্তি (Energy):** কাজ করার সামর্থ্য।

১. সুনির্দিষ্ট পর্যবেক্ষণ (Observation)
২. তথ্য সংগ্রহ (Questioning)
`;

    const { container } = render(<RichContentRenderer content={content} />);

    // Check heading h1 and h3
    const h1 = container.querySelector('h1');
    expect(h1).not.toBeNull();
    expect(h1?.textContent).toContain('পদার্থবিজ্ঞান (Physics)');

    const h3 = container.querySelector('h3');
    expect(h3).not.toBeNull();
    expect(h3?.textContent).toContain('পদার্থবিজ্ঞান কী?');

    // Bold tags
    const strongs = container.querySelectorAll('strong');
    expect(strongs.length).toBeGreaterThanOrEqual(3);

    // Callout box / blockquote definition
    expect(container.textContent).toContain('বিজ্ঞানের যে শাখায় পদার্থ ও শক্তি নিয়ে আলোচনা করা হয়');

    // Lists
    const ul = container.querySelector('ul');
    expect(ul).not.toBeNull();
    const ol = container.querySelector('ol');
    expect(ol).not.toBeNull();
    expect(container.textContent).toContain('সুনির্দিষ্ট পর্যবেক্ষণ');
  });
});
