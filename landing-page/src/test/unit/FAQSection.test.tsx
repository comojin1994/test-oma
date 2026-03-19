/**
 * Unit test for FAQSection — category filter narrows displayed items.
 *
 * UT-04: Verifying the category tab interaction shows only matching FAQs.
 */
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { FAQSection } from '../../components/FAQSection';

describe('FAQSection — category filter', () => {
  it('shows only pricing FAQs when the pricing tab is selected', async () => {
    render(<FAQSection />);

    // Default 'all' view: general FAQ present
    expect(screen.getByText('Hook이란 무엇인가요?')).toBeInTheDocument();

    // Click the '가격' (pricing) category tab
    const pricingTab = screen.getByRole('tab', { name: '가격' });
    await userEvent.click(pricingTab);

    // Only pricing FAQs visible
    expect(screen.getByText('플랜을 언제든지 변경할 수 있나요?')).toBeInTheDocument();
    expect(screen.getByText('연간 결제 시 할인은 어떻게 되나요?')).toBeInTheDocument();

    // General FAQ no longer rendered
    expect(screen.queryByText('Hook이란 무엇인가요?')).not.toBeInTheDocument();
  });
});
