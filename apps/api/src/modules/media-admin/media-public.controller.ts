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

@Controller('uploads')
export class MediaPublicController {
  @Get('*')
  serveFile(@Req() req: Request, @Res() res: Response) {
    // Strip leading /uploads if present
    const rawPath = req.params[0] || req.path.replace(/^\/uploads\/?/, '');
    const normalized = path.normalize(rawPath).replace(/^(\.\.[\/\\])+/, '');
    const uploadsRoot = path.join(process.cwd(), 'uploads');
    const fullPath = path.join(uploadsRoot, normalized);

    // Guard: must stay within uploads root
    if (!fullPath.startsWith(uploadsRoot)) {
      throw new NotFoundException('File not found');
    }

    if (!fs.existsSync(fullPath) || fs.statSync(fullPath).isDirectory()) {
      throw new NotFoundException('File not found');
    }

    res.sendFile(fullPath);
  }
}
