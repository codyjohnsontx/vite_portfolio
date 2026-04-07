import { describe, expect, it, vi } from 'vitest';
import { getStatusLabel } from './productHelpers';

describe('getStatusLabel', () => {
  it('maps the active build token to the active build label', () => {
    expect(getStatusLabel('active-build')).toBe('Active build');
  });

  it('maps the explicit prototype token to the prototype label', () => {
    expect(getStatusLabel('prototype')).toBe('Prototype concept');
  });

  it('warns and returns a fallback for unknown statuses', () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    expect(getStatusLabel('typo-status')).toBe('Unknown status');
    expect(warnSpy).toHaveBeenCalledWith('Unknown product status: typo-status');

    warnSpy.mockRestore();
  });
});
