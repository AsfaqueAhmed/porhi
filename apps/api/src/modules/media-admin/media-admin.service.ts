import { BadRequestException, Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import * as fs from 'fs';
import * as path from 'path';
import AdmZip from 'adm-zip';
import { MediaCategory, MediaUploadResponse } from '@pori/shared';

const MAX_IMAGE_SIZE = 10 * 1024 * 1024; // 10MB
const MAX_AUDIO_SIZE = 25 * 1024 * 1024; // 25MB
const MAX_VIDEO_SIZE = 100 * 1024 * 1024; // 100MB
const MAX_INTERACTIVE_SIZE = 15 * 1024 * 1024; // 15MB

const ALLOWED_MIME_CATEGORIES: Record<string, { category: MediaCategory; maxSize: number; dir: string }> = {
  // Images
  'image/png': { category: 'IMAGE', maxSize: MAX_IMAGE_SIZE, dir: 'images' },
  'image/jpeg': { category: 'IMAGE', maxSize: MAX_IMAGE_SIZE, dir: 'images' },
  'image/webp': { category: 'IMAGE', maxSize: MAX_IMAGE_SIZE, dir: 'images' },
  'image/svg+xml': { category: 'IMAGE', maxSize: MAX_IMAGE_SIZE, dir: 'images' },

  // Audio
  'audio/mpeg': { category: 'AUDIO', maxSize: MAX_AUDIO_SIZE, dir: 'audio' },
  'audio/mp3': { category: 'AUDIO', maxSize: MAX_AUDIO_SIZE, dir: 'audio' },
  'audio/wav': { category: 'AUDIO', maxSize: MAX_AUDIO_SIZE, dir: 'audio' },
  'audio/x-wav': { category: 'AUDIO', maxSize: MAX_AUDIO_SIZE, dir: 'audio' },
  'audio/ogg': { category: 'AUDIO', maxSize: MAX_AUDIO_SIZE, dir: 'audio' },
  'audio/mp4': { category: 'AUDIO', maxSize: MAX_AUDIO_SIZE, dir: 'audio' },
  'audio/x-m4a': { category: 'AUDIO', maxSize: MAX_AUDIO_SIZE, dir: 'audio' },

  // Video
  'video/mp4': { category: 'VIDEO', maxSize: MAX_VIDEO_SIZE, dir: 'video' },
  'video/webm': { category: 'VIDEO', maxSize: MAX_VIDEO_SIZE, dir: 'video' },

  // Interactive
  'text/html': { category: 'INTERACTIVE', maxSize: MAX_INTERACTIVE_SIZE, dir: 'interactive' },
  'application/zip': { category: 'INTERACTIVE', maxSize: MAX_INTERACTIVE_SIZE, dir: 'interactive' },
  'application/x-zip-compressed': { category: 'INTERACTIVE', maxSize: MAX_INTERACTIVE_SIZE, dir: 'interactive' },
};

@Injectable()
export class MediaAdminService {
  private baseUploadDir: string;

  constructor() {
    this.baseUploadDir = process.env.UPLOAD_DIR || path.join(process.cwd(), 'uploads');
    this.ensureDirectories();
  }

  setBaseUploadDir(dir: string) {
    this.baseUploadDir = dir;
    this.ensureDirectories();
  }

  private ensureDirectories() {
    const subdirs = ['images', 'audio', 'video', 'interactive'];
    for (const dir of subdirs) {
      const fullPath = path.join(this.baseUploadDir, dir);
      if (!fs.existsSync(fullPath)) {
        fs.mkdirSync(fullPath, { recursive: true });
      }
    }
  }

  async processUpload(
    file: Express.Multer.File,
    requestedCategory?: MediaCategory,
  ): Promise<MediaUploadResponse> {
    if (!file || !file.buffer) {
      throw new BadRequestException('No file provided');
    }

    const config = ALLOWED_MIME_CATEGORIES[file.mimetype.toLowerCase()];
    if (!config) {
      throw new BadRequestException(
        `Unsupported media format (${file.mimetype}). Please upload valid image, audio, video, or HTML/ZIP simulation files.`,
      );
    }

    const category = requestedCategory || config.category;
    if (requestedCategory && requestedCategory !== config.category) {
      throw new BadRequestException(
        `File mimetype (${file.mimetype}) does not match requested category (${requestedCategory})`,
      );
    }

    if (file.size > config.maxSize) {
      const limitMb = Math.round(config.maxSize / (1024 * 1024));
      throw new BadRequestException(
        `File size (${(file.size / (1024 * 1024)).toFixed(1)}MB) exceeds maximum allowed limit for ${category} (${limitMb}MB)`,
      );
    }

    const fileId = crypto.randomUUID();
    const originalExt = path.extname(file.originalname).toLowerCase() || this.getDefaultExt(file.mimetype);

    // Interactive ZIP handling
    if (category === 'INTERACTIVE' && (file.mimetype === 'application/zip' || file.mimetype === 'application/x-zip-compressed' || originalExt === '.zip')) {
      return this.handleZipUpload(file, fileId);
    }

    // Single file upload
    const safeFilename = `${Date.now()}-${fileId}${originalExt}`;
    const targetDir = path.join(this.baseUploadDir, config.dir);
    const targetPath = path.join(targetDir, safeFilename);

    fs.writeFileSync(targetPath, file.buffer);

    const publicUrl = `/uploads/${config.dir}/${safeFilename}`;
    return {
      url: publicUrl,
      originalName: file.originalname,
      mimeType: file.mimetype,
      size: file.size,
      category,
    };
  }

  private handleZipUpload(file: Express.Multer.File, fileId: string): MediaUploadResponse {
    let zip: AdmZip;
    try {
      zip = new AdmZip(file.buffer);
    } catch {
      throw new BadRequestException('Invalid ZIP archive format');
    }

    const entries = zip.getEntries();
    if (entries.length === 0) {
      throw new BadRequestException('ZIP archive is empty');
    }

    // Security check: Guard against zip slip (path traversal)
    for (const entry of entries) {
      const normalized = path.normalize(entry.entryName);
      if (normalized.startsWith('..') || path.isAbsolute(normalized)) {
        throw new BadRequestException('ZIP contains unsafe entry paths with directory traversal');
      }
    }

    const bundleDirName = `${Date.now()}-${fileId}`;
    const extractTargetDir = path.join(this.baseUploadDir, 'interactive', bundleDirName);
    fs.mkdirSync(extractTargetDir, { recursive: true });

    zip.extractAllTo(extractTargetDir, true);

    // Find index.html or first html file in extracted folder
    const hasRootIndex = fs.existsSync(path.join(extractTargetDir, 'index.html'));
    let entryHtmlPath = 'index.html';
    if (!hasRootIndex) {
      const foundHtml = entries.find((e) => e.entryName.toLowerCase().endsWith('.html'));
      if (foundHtml) {
        entryHtmlPath = foundHtml.entryName;
      } else {
        throw new BadRequestException('Simulation ZIP must contain an index.html or entry HTML file');
      }
    }

    const publicUrl = `/uploads/interactive/${bundleDirName}/${entryHtmlPath}`;
    return {
      url: publicUrl,
      originalName: file.originalname,
      mimeType: file.mimetype,
      size: file.size,
      category: 'INTERACTIVE',
    };
  }

  private getDefaultExt(mimetype: string): string {
    switch (mimetype) {
      case 'image/png':
        return '.png';
      case 'image/jpeg':
        return '.jpg';
      case 'image/webp':
        return '.webp';
      case 'image/svg+xml':
        return '.svg';
      case 'audio/mpeg':
      case 'audio/mp3':
        return '.mp3';
      case 'audio/wav':
        return '.wav';
      case 'video/mp4':
        return '.mp4';
      case 'video/webm':
        return '.webm';
      case 'text/html':
        return '.html';
      case 'application/zip':
        return '.zip';
      default:
        return '';
    }
  }
}
