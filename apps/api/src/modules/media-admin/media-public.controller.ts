import {
  Controller,
  Get,
  NotFoundException,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';

@Controller(['uploads', 'interactive'])
export class MediaPublicController {
  @Get('*')
  serveFile(@Req() req: Request, @Res() res: Response) {
    let rawPath = req.params[0] || req.path.replace(/^\/(uploads|interactive)\/?/, '');

    const isInteractivePrefix =
      (req.baseUrl && req.baseUrl.includes('interactive')) ||
      (req.path && req.path.startsWith('/interactive')) ||
      (req.originalUrl && req.originalUrl.includes('/interactive'));

    if (
      isInteractivePrefix &&
      !rawPath.startsWith('interactive/') &&
      !rawPath.startsWith('/interactive/')
    ) {
      rawPath = `interactive/${rawPath}`;
    } else {
      rawPath = rawPath.replace(/^\/(uploads|interactive)\/?/, '');
    }

    const normalized = path.normalize(rawPath).replace(/^(\.\.[\/\\])+/, '');
    const uploadsRoot = path.join(process.cwd(), 'uploads');
    let fullPath = path.join(uploadsRoot, normalized);

    // Guard: within uploads root if resolving under uploadsRoot
    const isWithinUploads = fullPath.startsWith(uploadsRoot);

    if (
      !isWithinUploads ||
      !fs.existsSync(fullPath) ||
      fs.statSync(fullPath).isDirectory()
    ) {
      // Fallback: Check prisma/sample-simulations for standalone simulations
      const fileName = path.basename(normalized);
      const candidates = [
        path.join(process.cwd(), 'prisma', 'sample-simulations', fileName),
        path.join(process.cwd(), 'apps', 'api', 'prisma', 'sample-simulations', fileName),
        path.join(__dirname, '../../../prisma/sample-simulations', fileName),
        path.join(__dirname, '../../prisma/sample-simulations', fileName),
      ];
      const found = candidates.find(
        (c) => fs.existsSync(c) && !fs.statSync(c).isDirectory(),
      );

      if (found) {
        fullPath = found;
      } else {
        throw new NotFoundException('File not found');
      }
    }

    res.sendFile(fullPath);
  }
}
