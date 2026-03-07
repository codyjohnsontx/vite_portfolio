import { cleanup } from '@testing-library/react';
import { afterEach, beforeAll, vi } from 'vitest';

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

beforeAll(() => {
  Object.defineProperty(window, 'scrollTo', {
    value: vi.fn(),
    writable: true,
  });

  Object.defineProperty(window, 'matchMedia', {
    value: vi.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
    writable: true,
  });

  Object.defineProperty(window, 'requestAnimationFrame', {
    value: vi.fn((callback) => setTimeout(callback, 0)),
    writable: true,
  });

  Object.defineProperty(window, 'cancelAnimationFrame', {
    value: vi.fn((handle) => clearTimeout(handle)),
    writable: true,
  });
});
