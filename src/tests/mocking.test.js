import { vi, it, expect, describe } from 'vitest';
import {
  getPriceInCurrency,
  getShippingInfo,
  renderPage,
  signUp,
  submitOrder,
} from '../mocking';
import { getExchangeRate } from '../libs/currency';
import { getShippingQuote } from '../libs/shipping';
import { trackPageView } from '../libs/analytics';
import { charge } from '../libs/payment';
import { isValidEmail, sendEmail } from '../libs/email';

vi.mock('../libs/currency');
vi.mock('../libs/shipping');
vi.mock('../libs/analytics');
vi.mock('../libs/payment');
vi.mock('../libs/email', async (importOriginal) => {
  const originalModule = await importOriginal();
  return {
    ...originalModule,
    sendEmail: vi.fn(),
  };
});

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

describe('renderPage', () => {
  it('should return correct content', async () => {
    const result = await renderPage();

    expect(result).toMatch(/content/i);
  });

  it('should call analytics', async () => {
    await renderPage();

    expect(trackPageView).toHaveBeenCalledWith('/home');
  });
});

describe('submitOrder', () => {
  const order = { totalAmount: 10 };
  const creditCard = { creditCardNumber: '7958' };

  it('should charge the customer', async () => {
    vi.mocked(charge).mockResolvedValue({ status: 'success' });

    await submitOrder(order, creditCard);

    expect(charge).toHaveBeenCalledWith(creditCard, order.totalAmount);
  });

  it('should return success when payment is successful', async () => {
    vi.mocked(charge).mockResolvedValue({ status: 'success' });

    const result = await submitOrder(order, creditCard);

    expect(result).toEqual({ success: true });
  });

  it('should return false when payment fails ', async () => {
    vi.mocked(charge).mockResolvedValue({ status: 'failed' });

    const result = await submitOrder(order, creditCard);

    expect(result).toEqual({ success: false, error: 'payment_error' });
  });
});

describe('signUp', () => {
  const email = 'student@gmail.com';

  it('should return false if email is not valid', () => {
    expect(isValidEmail('email')).toBe(false);
  });

  it('should return true if email is valid', () => {
    expect(isValidEmail(email)).toBe(true);
  });

  it('should send the welcome email if email is valid', async () => {
    const result = await signUp(email);

    expect(sendEmail).toHaveBeenCalled();

    const args = vi.mocked(sendEmail).mock.calls[0];

    expect(args[0]).toBe(email);
    expect(args[1]).toMatch(/welcome/i);
  });
});
