import { cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest';

vi.mock('next/navigation', () => ({
  usePathname: () => '/dashboard',
  useRouter: () => ({ push: vi.fn(), replace: vi.fn() }),
  useParams: () => ({ subjectId: 'sub-ssc-phy', chapterId: 'ch-motion', topicId: 'topic-motion-3' }),
}));

afterEach(() => {
  cleanup();
});
