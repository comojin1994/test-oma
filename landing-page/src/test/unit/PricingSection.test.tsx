/**
 * Unit test for PricingSection — billing toggle switches displayed prices.
 *
 * UT-03: Verifying the core business logic: annual pricing shows discounted rates.
 */
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { PricingSection } from '../../components/PricingSection';

describe('PricingSection — billing toggle', () => {
  it('switches from monthly to annual prices when toggle is clicked', async () => {
    render(<PricingSection />);

    // Monthly prices shown by default
    expect(screen.getByText(/29,000/)).toBeInTheDocument();

    // Click the annual billing toggle
    const toggle = screen.getByRole('switch', { name: /연간 결제로 전환/i });
    await userEvent.click(toggle);

    // Annual price for Starter (₩24,000) now visible; monthly (₩29,000) in comparison note
    expect(screen.getByText(/24,000/)).toBeInTheDocument();
    // Comparison note mentions the original monthly price
    expect(screen.getByText(/29,000/)).toBeInTheDocument();
  });
});
