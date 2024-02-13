import { vi, it, expect, describe } from 'vitest';
import { getPriceInCurrency, getShippingInfo } from '../mocking';
import { getExchangeRate } from '../libs/currency';
import { getShippingQuote } from '../libs/shipping';

vi.mock('../libs/currency');
vi.mock('../libs/shipping');

describe('test suite', () => {
  it('test case', () => {
    // Create the mock function
    const sendText = vi.fn();
    sendText.mockReturnValue('ok');

    // Call the mock function
    const result = sendText('message');

    // Assert that the mock function is called
    expect(sendText).toHaveBeenCalledWith('message');

    // Assert that the result is "ok"
    expect(result).toBe('ok');
  });
});

// Mocking Modules
describe('getPriceInCurrency', () => {
  it('should return price in target currency', () => {
    vi.mocked(getExchangeRate).mockReturnValue(1.5);

    const price = getPriceInCurrency(10, 'AUD');

    expect(price).toBe(15);
  });
});

describe('getShippingInfo', () => {
  it('should return shipping unavailable if quote cannot be fetched', () => {
    vi.mocked(getShippingQuote).mockReturnValue(null);

    const result = getShippingInfo('London');
    expect(result).toMatch(/unavailable/i);
  });

  it('should return the shipping info if quote can be fetched', () => {
    vi.mocked(getShippingQuote).mockReturnValue({ cost: 20, estimatedDays: 2 });

    const info = getShippingInfo('Kigali');

    expect(info).toMatch(/shipping cost: \$20 \(2 days\)/i);
  });
});
