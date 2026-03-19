/**
 * Smoke tests for new components added in task-2026-03-19-008:
 * PricingSection, FAQSection, ThemeContext.
 *
 * Verifies import, render, and primary UI elements without crashing.
 */
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { PricingSection } from '../../components/PricingSection';
import { FAQSection } from '../../components/FAQSection';
import { ThemeProvider, useTheme } from '../../context/ThemeContext';

// SM-04: PricingSection renders all 3 plans and the billing toggle
describe('PricingSection (smoke)', () => {
  it('renders all three pricing plans and billing toggle', () => {
    render(<PricingSection />);
    expect(screen.getByText('Starter')).toBeInTheDocument();
    expect(screen.getByText('Professional')).toBeInTheDocument();
    expect(screen.getByText('Enterprise')).toBeInTheDocument();
    expect(screen.getByRole('switch', { name: /연간 결제로 전환/i })).toBeInTheDocument();
  });
});

// SM-05: FAQSection renders category tabs and FAQ items
describe('FAQSection (smoke)', () => {
  it('renders category filter tabs and FAQ items', () => {
    render(<FAQSection />);
    // Category tabs rendered via role="tab"
    expect(screen.getAllByRole('tab').length).toBeGreaterThanOrEqual(5);
    // At least one FAQ question visible in default 'all' view
    expect(screen.getByText('Hook이란 무엇인가요?')).toBeInTheDocument();
  });
});

// SM-06: ThemeProvider renders children and provides theme context
function ThemeConsumer() {
  const { theme } = useTheme();
  return <span data-testid="theme">{theme}</span>;
}

describe('ThemeContext (smoke)', () => {
  it('provides theme value to children', () => {
    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>
    );
    const themeEl = screen.getByTestId('theme');
    expect(['dark', 'light']).toContain(themeEl.textContent);
  });
});
