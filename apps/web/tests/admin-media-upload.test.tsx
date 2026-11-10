import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { act, cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { MediaUploadModal } from '../src/components/admin/lessons/MediaUploadModal';
import { apiClient } from '../src/lib/api-client';

vi.mock('../src/lib/api-client', () => ({
  apiClient: {
    post: vi.fn(),
  },
}));

const mockedApi = vi.mocked(apiClient);

describe('MediaUploadModal', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  it('renders modal with category tabs and file dropzone', () => {
    render(
      <MediaUploadModal
        isOpen={true}
        initialCategory="IMAGE"
        onClose={vi.fn()}
        onInsertTag={vi.fn()}
        onSelectSimulation={vi.fn()}
      />,
    );

    expect(screen.getByText(/মিডিয়া ও সিমুলেশন আপলোড/i)).toBeDefined();
    expect(screen.getByRole('button', { name: /ছবি/i })).toBeDefined();
    expect(screen.getByRole('button', { name: /অডিও/i })).toBeDefined();
    expect(screen.getByRole('button', { name: /ভিডিও/i })).toBeDefined();
    expect(screen.getByRole('button', { name: /সিমুলেশন/i })).toBeDefined();
  });

  it('uploads an audio file and triggers onInsertTag with audio element', async () => {
    mockedApi.post.mockResolvedValueOnce({
      category: 'AUDIO',
      url: '/uploads/audio/test-sound.mp3',
      filename: 'test-sound.mp3',
      originalName: 'wave.mp3',
      mimeType: 'audio/mpeg',
      sizeBytes: 1048576,
    });

    const handleInsert = vi.fn();
    const handleClose = vi.fn();

    render(
      <MediaUploadModal
        isOpen={true}
        initialCategory="AUDIO"
        onClose={handleClose}
        onInsertTag={handleInsert}
        onSelectSimulation={vi.fn()}
      />,
    );

    const fileInput = screen.getByTestId('media-file-input') as HTMLInputElement;
    const file = new File(['dummy-audio-bytes'], 'wave.mp3', { type: 'audio/mpeg' });

    await act(async () => {
      fireEvent.change(fileInput, { target: { files: [file] } });
    });

    await waitFor(() => {
      expect(mockedApi.post).toHaveBeenCalledWith(
        '/admin/media/upload',
        expect.any(FormData),
        { scope: 'admin' },
      );
    });

    // Check title input
    const titleInput = screen.getByLabelText(/অ্যাসেটের শিরোনাম বা ক্যাপশন/i);
    fireEvent.change(titleInput, { target: { value: 'কম্পাঙ্ক পরীক্ষা ১০০ Hz' } });

    // Check audio preview is rendered
    expect(screen.getByTestId('modal-audio-preview')).toBeDefined();

    // Click insert button
    const insertBtn = screen.getByRole('button', { name: /লেসনে যুক্ত করুন/i });
    fireEvent.click(insertBtn);

    expect(handleInsert).toHaveBeenCalledWith(
      '<audio controls src="/uploads/audio/test-sound.mp3" title="কম্পাঙ্ক পরীক্ষা ১০০ Hz"></audio>',
    );
    expect(handleClose).toHaveBeenCalled();
  });

  it('uploads an image file and triggers onInsertTag with markdown image tag', async () => {
    mockedApi.post.mockResolvedValueOnce({
      category: 'IMAGE',
      url: '/uploads/images/prism.png',
      filename: 'prism.png',
      originalName: 'prism.png',
      mimeType: 'image/png',
      sizeBytes: 204800,
    });

    const handleInsert = vi.fn();

    render(
      <MediaUploadModal
        isOpen={true}
        initialCategory="IMAGE"
        onClose={vi.fn()}
        onInsertTag={handleInsert}
        onSelectSimulation={vi.fn()}
      />,
    );

    const fileInput = screen.getByTestId('media-file-input') as HTMLInputElement;
    const file = new File(['dummy-img'], 'prism.png', { type: 'image/png' });

    await act(async () => {
      fireEvent.change(fileInput, { target: { files: [file] } });
    });

    await waitFor(() => {
      expect(mockedApi.post).toHaveBeenCalled();
    });

    const titleInput = screen.getByLabelText(/অ্যাসেটের শিরোনাম বা ক্যাপশন/i);
    fireEvent.change(titleInput, { target: { value: 'আলোর প্রতিসরণ' } });

    const insertBtn = screen.getByRole('button', { name: /লেসনে যুক্ত করুন/i });
    fireEvent.click(insertBtn);

    expect(handleInsert).toHaveBeenCalledWith('![আলোর প্রতিসরণ](/uploads/images/prism.png)');
  });

  it('uploads an interactive simulation file and triggers onSelectSimulation', async () => {
    mockedApi.post.mockResolvedValueOnce({
      category: 'INTERACTIVE',
      url: '/uploads/interactive/sim-123/index.html',
      filename: 'index.html',
      originalName: 'sim.zip',
      mimeType: 'application/zip',
      sizeBytes: 524288,
    });

    const handleSelectSim = vi.fn();
    const handleClose = vi.fn();

    render(
      <MediaUploadModal
        isOpen={true}
        initialCategory="INTERACTIVE"
        onClose={handleClose}
        onInsertTag={vi.fn()}
        onSelectSimulation={handleSelectSim}
      />,
    );

    const fileInput = screen.getByTestId('media-file-input') as HTMLInputElement;
    const file = new File(['dummy-zip'], 'sim.zip', { type: 'application/zip' });

    await act(async () => {
      fireEvent.change(fileInput, { target: { files: [file] } });
    });

    await waitFor(() => {
      expect(mockedApi.post).toHaveBeenCalledWith(
        '/admin/media/upload',
        expect.any(FormData),
        { scope: 'admin' },
      );
    });

    expect(screen.getByTestId('modal-interactive-preview')).toBeDefined();

    const setSimBtn = screen.getByRole('button', { name: /লেসনের সিমুলেশন হিসেবে সেট করুন/i });
    fireEvent.click(setSimBtn);

    expect(handleSelectSim).toHaveBeenCalledWith('/uploads/interactive/sim-123/index.html');
    expect(handleClose).toHaveBeenCalled();
  });

  it('displays error message when upload fails', async () => {
    mockedApi.post.mockRejectedValueOnce({
      message: 'ফাইলের সাইজ অনুমোদিত সীমার বেশি (সর্বোচ্চ 10MB)',
    });

    render(
      <MediaUploadModal
        isOpen={true}
        initialCategory="IMAGE"
        onClose={vi.fn()}
        onInsertTag={vi.fn()}
        onSelectSimulation={vi.fn()}
      />,
    );

    const fileInput = screen.getByTestId('media-file-input') as HTMLInputElement;
    const file = new File(['giant'], 'big.png', { type: 'image/png' });

    await act(async () => {
      fireEvent.change(fileInput, { target: { files: [file] } });
    });

    await waitFor(() => {
      expect(screen.getByRole('alert')).toBeDefined();
      expect(screen.getByText(/ফাইলের সাইজ অনুমোদিত সীমার বেশি/i)).toBeDefined();
    });
  });
});
