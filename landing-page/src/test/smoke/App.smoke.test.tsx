/**
 * Smoke test for App — verifies the top-level component renders
 * all major sections without crashing.
 */
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from '../../App';

describe('App (smoke)', () => {
  it('renders without crashing', () => {
    const { container } = render(<App />);
    expect(container.firstChild).not.toBeNull();
  });

  it('renders all major landmark sections', () => {
    render(<App />);
    // nav + main + footer are the structural landmarks
    expect(document.querySelector('nav')).toBeInTheDocument();
    expect(document.querySelector('main')).toBeInTheDocument();
    expect(document.querySelector('footer')).toBeInTheDocument();
  });

  it('renders at least one CTA link to #cta', () => {
    render(<App />);
    const ctaLinks = document.querySelectorAll('a[href="#cta"]');
    expect(ctaLinks.length).toBeGreaterThan(0);
  });
});
