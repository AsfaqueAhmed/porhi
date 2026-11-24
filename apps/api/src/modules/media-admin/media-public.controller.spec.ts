import { describe, expect, it, vi } from 'vitest';
import { NotFoundException } from '@nestjs/common';
import { MediaPublicController } from './media-public.controller';

describe('MediaPublicController', () => {
  const controller = new MediaPublicController();

  it('serves files that exist in uploads', () => {
    let sentFile = '';
    const req = {
      params: ['interactive/five-kingdom-microscope-lab.html'],
      path: '/uploads/interactive/five-kingdom-microscope-lab.html',
    } as any;
    const res = {
      sendFile: vi.fn((file: string) => {
        sentFile = file;
      }),
    } as any;

    controller.serveFile(req, res);
    expect(res.sendFile).toHaveBeenCalled();
    expect(sentFile).toContain('five-kingdom-microscope-lab.html');
  });

  it('serves files requested via /interactive prefix', () => {
    let sentFile = '';
    const req = {
      params: ['mitosis-cell-division-lab.html'],
      path: '/interactive/mitosis-cell-division-lab.html',
      baseUrl: '/interactive',
    } as any;
    const res = {
      sendFile: vi.fn((file: string) => {
        sentFile = file;
      }),
    } as any;

    controller.serveFile(req, res);
    expect(res.sendFile).toHaveBeenCalled();
    expect(sentFile).toContain('mitosis-cell-division-lab.html');
  });

  it('falls back to prisma/sample-simulations if missing in uploads', () => {
    let sentFile = '';
    // chemical-bonding-simulator-lab.html is in sample-simulations but not in uploads
    const req = {
      params: ['interactive/chemical-bonding-simulator-lab.html'],
      path: '/uploads/interactive/chemical-bonding-simulator-lab.html',
    } as any;
    const res = {
      sendFile: vi.fn((file: string) => {
        sentFile = file;
      }),
    } as any;

    controller.serveFile(req, res);
    expect(res.sendFile).toHaveBeenCalled();
    expect(sentFile).toContain('chemical-bonding-simulator-lab.html');
    expect(sentFile).toContain('sample-simulations');
  });

  it('throws NotFoundException on nonexistent file', () => {
    const req = {
      params: ['non-existent-lab-12345.html'],
      path: '/uploads/non-existent-lab-12345.html',
    } as any;
    const res = {
      sendFile: vi.fn(),
    } as any;

    expect(() => controller.serveFile(req, res)).toThrow(NotFoundException);
  });
});
