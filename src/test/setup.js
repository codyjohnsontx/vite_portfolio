import { cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest';

/* These run at module scope, not in beforeAll: GSAP/ScrollTrigger call
   window.matchMedia while the module graph is still being imported, which
   happens before any hook fires. */

Object.defineProperty(window, 'scrollTo', {
  value: vi.fn(),
  writable: true,
});

/* jsdom has no compositor, so every component takes its reduced-motion
   path here. That skips the preloader's 1.5s timeline and 3.5s ceiling
   timer on each render, which is what pushed slower cases past vitest's
   timeouts and made the suite flaky. */
Object.defineProperty(window, 'matchMedia', {
  value: vi.fn().mockImplementation((query) => ({
    matches: /prefers-reduced-motion/.test(query),
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

if (!globalThis.ResizeObserver) {
  globalThis.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
}

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});
