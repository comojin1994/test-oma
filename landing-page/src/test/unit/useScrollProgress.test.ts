/**
 * Unit test for useScrollProgress hook.
 *
 * Tests the core calculation logic: progress = scrollY / (totalHeight - viewport).
 */
import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { useScrollProgress } from '../../hooks/useScrollProgress';

describe('useScrollProgress', () => {
  beforeEach(() => {
    // Set up a scrollable document
    Object.defineProperty(document.documentElement, 'scrollHeight', {
      configurable: true,
      value: 2000,
    });
    Object.defineProperty(window, 'innerHeight', {
      configurable: true,
      value: 500,
    });
  });

  afterEach(() => {
    Object.defineProperty(window, 'scrollY', { configurable: true, value: 0 });
  });

  it('returns 0 progress at top of page', () => {
    const { result } = renderHook(() => useScrollProgress());
    expect(result.current.progress).toBe(0);
    expect(result.current.scrollY).toBe(0);
  });

  it('updates progress on scroll event', () => {
    const { result } = renderHook(() => useScrollProgress());

    act(() => {
      // Simulate scrolling 750px on a 1500px scrollable area (2000 - 500)
      Object.defineProperty(window, 'scrollY', { configurable: true, value: 750 });
      window.dispatchEvent(new Event('scroll'));
    });

    expect(result.current.scrollY).toBe(750);
    expect(result.current.progress).toBeCloseTo(0.5, 2);
  });
});
