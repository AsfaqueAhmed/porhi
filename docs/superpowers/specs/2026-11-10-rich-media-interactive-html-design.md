# Technical Specification: Rich Media Uploads (Audio, Video, Images) & Sandboxed Interactive HTML Simulations for Lessons

- **Status:** Approved Draft
- **Date:** 2026-11-10
- **Author:** Antigravity Engineering Agent
- **Target Systems:** `packages/shared`, `apps/api`, `apps/web`

---

## 1. Overview & Objectives

In science education (Physics, Chemistry, Biology), static text and formulas alone cannot convey dynamic phenomena such as sound wave frequencies (low vs. high frequency acoustic comparisons), wave propagation, light refraction through lenses, and physical mechanics. 

This specification establishes an end-to-end rich media and interactive simulation infrastructure for the poRi EdTech platform:
1. **Local Media Upload & Static Hosting:** Self-hosted on local server disk (`apps/api/uploads/`) with dedicated size and MIME-type validation for images, audio clips, video demonstrations, and HTML/ZIP simulation bundles.
2. **Schema & Contract Parity:** Extending Prisma `Lesson` and shared `@pori/shared` contracts with `interactiveWidgetUrl?: string | null;` and inline media support in explanations.
3. **Admin Studio Authoring Experience:** Integrated media toolbar in the Lesson Studio with drag-and-drop, audio waveform/playback preview, video preview, image thumbnailing, 1-click markdown/HTML tag insertion, and a dedicated interactive simulation upload slot.
4. **Student & Reviewer Experience:** Custom rich content rendering with branded audio player cards, responsive 16:9 video embeds, zoomable diagrams, and an isolated, sandboxed `<iframe>` runner with fullscreen toggle and reset controls.

---

## 2. Architecture & File Storage

### 2.1 File Storage Hierarchy
Uploaded media files are stored locally within the API directory under `apps/api/uploads/`:
```
apps/api/
  uploads/
    images/       # .png, .jpg, .jpeg, .webp, .svg (max 10MB)
    audio/        # .mp3, .wav, .ogg, .m4a (max 25MB)
    video/        # .mp4, .webm (max 100MB)
    interactive/  # .html single pages or unzipped simulation folders (max 15MB)
```

### 2.2 Static Asset Delivery
- Implemented via `@nestjs/serve-static`:
  - Root: `/Users/technonext/Desktop/poRi/apps/api/uploads`
  - URL Prefix: `/uploads`
  - Served headers: `Cross-Origin-Resource-Policy: cross-origin`, proper `Content-Type` for audio, video, webm, and html.
- Public URLs: `http://localhost:3001/uploads/{images|audio|video|interactive}/...`

### 2.3 Upload Endpoint
- **Route:** `POST /admin/media/upload`
- **Security:** `@UseGuards(AdminAuthGuard, RolesGuard)` requiring `ADMIN` or `EDITOR`.
- **Payload:** `multipart/form-data` with:
  - `file`: binary buffer
  - `category`: optional `'IMAGE' | 'AUDIO' | 'VIDEO' | 'INTERACTIVE'` (auto-detected from MIME type if omitted)
- **Validation Rules:**
  - `IMAGE`: `image/png`, `image/jpeg`, `image/webp`, `image/svg+xml`; size <= 10MB
  - `AUDIO`: `audio/mpeg`, `audio/wav`, `audio/ogg`, `audio/mp4`, `audio/x-m4a`; size <= 25MB
  - `VIDEO`: `video/mp4`, `video/webm`; size <= 100MB
  - `INTERACTIVE`: `text/html`, `application/zip`, `application/x-zip-compressed`; size <= 15MB
- **Sanitization:**
  - Filename sanitized: `${Date.now()}-${crypto.randomUUID()}.${ext}`
  - ZIP archive extraction: validates that entry paths do not escape target directory (`..` traversal check), extracting to `interactive/${uuid}/index.html`.
- **Response:**
  ```json
  {
    "url": "/uploads/audio/179428-low-frequency-wave.mp3",
    "originalName": "low-frequency-wave.mp3",
    "mimeType": "audio/mpeg",
    "size": 1420500,
    "category": "AUDIO"
  }
  ```

---

## 3. Data Contracts & Schema Updates

### 3.1 Prisma Schema (`apps/api/prisma/schema.prisma`)
Update `Lesson` model:
```prisma
model Lesson {
  id                   String        @id @default(uuid())
  topicId              String
  topic                Topic         @relation(fields: [topicId], references: [id])
  titleBangla          String
  learningGoal         String
  explanation          String        // Formatted Markdown with KaTeX math & inline media tags
  interactiveWidgetUrl String?       // Optional URL to sandboxed HTML simulation
  importantTerms       Json          // Array of { termBangla, termEnglish, definition }
  workedExample        Json?         // { problem, stepByStepSolution }
  memoryAid            String?
  status               ContentStatus @default(DRAFT)
  version              Int           @default(1)
  createdAt            DateTime      @default(now())
  updatedAt            DateTime      @updatedAt

  @@index([topicId, status])
  @@index([status, updatedAt])
}
```

### 3.2 Shared Contracts (`packages/shared/src/types/content.ts`)
```ts
export interface AdminLessonItem {
  id: string;
  topicId: string;
  titleBangla: string;
  learningGoal: string;
  explanation: string;
  interactiveWidgetUrl?: string | null;
  importantTerms: LessonTermItem[];
  workedExample?: LessonWorkedExample | null;
  memoryAid?: string | null;
  status: ContentStatus;
  version: number;
  createdAt: Date | string;
  updatedAt: Date | string;
  topic?: {
    id: string;
    titleBangla: string;
    chapter?: {
      id: string;
      titleBangla: string;
      subject?: {
        id: string;
        code: string;
        nameBangla: string;
      };
    };
  };
}
```

### 3.3 DTOs (`apps/api/src/modules/content-admin/dto/`)
In `CreateLessonAdminDto`:
```ts
@IsOptional()
@IsString()
interactiveWidgetUrl?: string;
```
In `UpdateLessonAdminDto`:
```ts
@IsOptional()
@ValidateIf((_, value) => value !== null)
@IsString()
interactiveWidgetUrl?: string | null;
```

---

## 4. Admin Studio UI & Authoring Workflow

### 4.1 Asset Upload Toolbar (`MediaUploadModal` & `MediaToolbar`)
Located in `LessonAuthoringForm.tsx` right above the explanation textarea:
- Quick action buttons:
  - `📷 ছবি যোগ (Image)`
  - `🎵 অডিও ক্লিপ (Audio)`
  - `🎥 ভিডিও লেকচার (Video)`
  - `⚡ সিমুলেশন ফাইল (Simulation)`
- Modal features:
  - Drag & drop zone with progress indicator
  - Live media player for testing audio waveforms and video streams
  - Dimension preview for images
  - 1-click insertion buttons inserting:
    - Audio: `<audio controls src="/uploads/audio/..." title="কম কম্পাঙ্কের শব্দ তরঙ্গ"></audio>`
    - Video: `<video controls src="/uploads/video/..." title="আলোর প্রতিফলন"></video>`
    - Image: `![চিত্র পরিচিতি](/uploads/images/...)`

### 4.2 Interactive Simulation Slot
Dedicated form section with:
- Upload file input for `.html` or `.zip`
- Direct external/internal URL input
- Sandboxed live preview frame in the studio
- Reset / Remove button

### 4.3 Studio Live Split Preview
Renders side-by-side:
- Left: Markdown & KaTeX source with media embed tags
- Right: Real-time formatted Bengali typography, KaTeX equations, working audio player widgets, responsive video players, and live simulation iframe.

---

## 5. Student View & Reviewer Drawer

### 5.1 `<RichContentRenderer />` Component
Replaces/extends `<LatexRenderer />`:
- Identifies and renders:
  - KaTeX math: `$formula$` and `$$display$$`
  - Audio tags `<audio controls src="...">`: Converts into a styled educational Audio Card with play/pause, time tracker, and frequency comparison labels.
  - Video tags `<video controls src="...">`: Converts into a responsive 16:9 player with custom playback controls.
  - Images: Renders responsive styled figures with caption below and lightbox click-to-zoom.

### 5.2 `<InteractiveSimulationRunner />` Component
- Embedded sandbox iframe:
  ```tsx
  <iframe
    src={interactiveWidgetUrl.startsWith('/') ? `${API_BASE_URL}${interactiveWidgetUrl}` : interactiveWidgetUrl}
    sandbox="allow-scripts allow-same-origin allow-downloads"
    loading="lazy"
    className="w-full h-[520px] rounded-2xl border border-slate-200 bg-slate-900"
    title="ইন্টারেক্টিভ সিমুলেশন"
  />
  ```
- Control bar:
  - Fullscreen toggle button
  - Reset / Reload simulation button
  - Interactive lab badge and helper tip

### 5.3 Parity in `LessonDetailDrawer`
The admin "বিস্তারিত দেখুন" drawer on `/admin/curriculum/lessons` displays the simulation runner and playable audio/video cards so reviewers can fully test interactive lab assets before approving lessons.

---

## 6. Testing Strategy

1. **API Unit & E2E Tests (`apps/api`)**:
   - `media.controller.spec.ts` & `media.e2e.spec.ts`: Test file uploads for image, audio, video, HTML, and ZIP bundles.
   - Assert MIME type validation, file size limits (reject > limits), and directory traversal rejection.
   - Test `POST /admin/content/lessons` and `PATCH /admin/content/lessons/:id` with `interactiveWidgetUrl`.
2. **Web Component Tests (`apps/web`)**:
   - `MediaUploadModal.test.tsx`: Test file selection, upload API call, audio/video preview, and text insertion callback.
   - `RichContentRenderer.test.tsx`: Test parsing of KaTeX math, audio player rendering, video player rendering, and image lightbox.
   - `InteractiveSimulationRunner.test.tsx`: Test iframe rendering with proper `sandbox` attributes, fullscreen toggle, and reload trigger.
   - `LessonDetailDrawer.test.tsx`: Verify drawer renders interactive simulation and media players when present.
3. **Monorepo Build & Verification**:
   - `pnpm -r test`, `pnpm -r lint`, `pnpm -r build` must pass cleanly.
