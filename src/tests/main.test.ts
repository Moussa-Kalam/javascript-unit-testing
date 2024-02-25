import { it, expect, describe } from 'vitest';
import { calculateDiscount } from '../../main';

describe('calculate discounts', () => {
  it('should return discounted price if given a valid code', () => {
    expect(calculateDiscount(10, 'SAVE10')).toBe(9);
    expect(calculateDiscount(10, 'SAVE20')).toBe(8);
  });

  it('should handle negative price', () => {
    expect(calculateDiscount(-10, 'SAVE10')).toMatch(/invalid/i);
  });

  it('should handle non-valid discount code', () => {
    expect(calculateDiscount(10, 'SAVE30')).toBe(10);
  });
});
