import { BadRequestException } from '@nestjs/common';
import { beforeEach, describe, expect, it } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';
import AdmZip from 'adm-zip';
import { MediaAdminService } from './media-admin.service';

describe('MediaAdminService', () => {
  let service: MediaAdminService;
  const testUploadDir = path.join(process.cwd(), 'test-uploads');

  beforeEach(() => {
    if (fs.existsSync(testUploadDir)) {
      fs.rmSync(testUploadDir, { recursive: true, force: true });
    }
    service = new MediaAdminService();
    service.setBaseUploadDir(testUploadDir);
  });

  function createMockFile(
    filename: string,
    mimetype: string,
    buffer: Buffer,
    size = buffer.length,
  ): Express.Multer.File {
    return {
      fieldname: 'file',
      originalname: filename,
      encoding: '7bit',
      mimetype,
      buffer,
      size,
      destination: '',
      filename,
      path: '',
      stream: null as any,
    };
  }

  it('uploads an image and returns public URL under /uploads/images/', async () => {
    const file = createMockFile('prism.png', 'image/png', Buffer.from('fake-image-bytes'));
    const result = await service.processUpload(file, 'IMAGE');

    expect(result.category).toBe('IMAGE');
    expect(result.url).toMatch(/^\/uploads\/images\/.*\.png$/);
    expect(result.originalName).toBe('prism.png');
    expect(result.mimeType).toBe('image/png');

    const relativePath = result.url.replace('/uploads/', '');
    expect(fs.existsSync(path.join(testUploadDir, relativePath))).toBe(true);
  });

  it('uploads an audio file and returns public URL under /uploads/audio/', async () => {
    const file = createMockFile('low-freq.mp3', 'audio/mpeg', Buffer.from('fake-audio-bytes'));
    const result = await service.processUpload(file, 'AUDIO');

    expect(result.category).toBe('AUDIO');
    expect(result.url).toMatch(/^\/uploads\/audio\/.*\.mp3$/);
    expect(result.originalName).toBe('low-freq.mp3');
  });

  it('uploads a video file and returns public URL under /uploads/video/', async () => {
    const file = createMockFile('optics.mp4', 'video/mp4', Buffer.from('fake-video-bytes'));
    const result = await service.processUpload(file, 'VIDEO');

    expect(result.category).toBe('VIDEO');
    expect(result.url).toMatch(/^\/uploads\/video\/.*\.mp4$/);
  });

  it('uploads a single HTML simulation file and returns URL under /uploads/interactive/', async () => {
    const htmlContent = '<html><body><h1>Wave Simulator</h1></body></html>';
    const file = createMockFile('sim.html', 'text/html', Buffer.from(htmlContent));
    const result = await service.processUpload(file, 'INTERACTIVE');

    expect(result.category).toBe('INTERACTIVE');
    expect(result.url).toMatch(/^\/uploads\/interactive\/.*\.html$/);

    const relativePath = result.url.replace('/uploads/', '');
    const diskContent = fs.readFileSync(path.join(testUploadDir, relativePath), 'utf-8');
    expect(diskContent).toBe(htmlContent);
  });

  it('uploads a ZIP simulation bundle and extracts index.html', async () => {
    const zip = new AdmZip();
    zip.addFile('index.html', Buffer.from('<h1>Interactive Optics Lab</h1>'));
    zip.addFile('style.css', Buffer.from('body { color: blue; }'));
    const zipBuffer = zip.toBuffer();

    const file = createMockFile('optics-sim.zip', 'application/zip', zipBuffer);
    const result = await service.processUpload(file, 'INTERACTIVE');

    expect(result.category).toBe('INTERACTIVE');
    expect(result.url).toMatch(/^\/uploads\/interactive\/.*\/index\.html$/);

    const relativePath = result.url.replace('/uploads/', '');
    expect(fs.existsSync(path.join(testUploadDir, relativePath))).toBe(true);
  });

  it('rejects ZIP bundle containing path traversal attempts', async () => {
    const zip = new AdmZip();
    zip.addFile('../../../evil.sh', Buffer.from('rm -rf /'));
    const zipBuffer = zip.toBuffer();

    const file = createMockFile('evil.zip', 'application/zip', zipBuffer);
    await expect(service.processUpload(file, 'INTERACTIVE')).rejects.toThrow(BadRequestException);
  });

  it('rejects files exceeding size limits', async () => {
    // Image > 10MB
    const bigImage = createMockFile(
      'huge.png',
      'image/png',
      Buffer.alloc(1),
      11 * 1024 * 1024,
    );
    await expect(service.processUpload(bigImage, 'IMAGE')).rejects.toThrow(BadRequestException);
  });

  it('rejects unsupported file formats', async () => {
    const executable = createMockFile('malware.exe', 'application/x-msdownload', Buffer.from('MZ'));
    await expect(service.processUpload(executable)).rejects.toThrow(BadRequestException);
  });
});
