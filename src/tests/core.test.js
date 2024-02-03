import { it, expect, describe } from 'vitest';
import {
  calculateDiscount,
  getCoupons,
  isPriceInRange,
  validateUserInput,
} from '../core';

describe('test suite', () => {
  it('test case', () => {
    const result = 'The user was not found!';

    expect(result).toBeDefined();
    expect(result).toMatch('found');
  });
});

describe('getCoupons', () => {
  it('should return an array of coupons', () => {
    const coupons = getCoupons();
    expect(Array.isArray(coupons)).toBe(true);
    expect(coupons.length).toBeGreaterThan(0);
  });

  it('should return an array with valid coupon codes', () => {
    const coupons = getCoupons();

    coupons.forEach((coupon) => {
      expect(coupon).toHaveProperty('code');
      expect(typeof coupon.code).toBe('string');
      expect(coupon.code).toBeTruthy();
    });
  });

  it('should return an array with valid discounts', () => {
    const coupons = getCoupons();

    coupons.forEach((coupon) => {
      expect(coupon).toHaveProperty('discount');
      expect(typeof coupon.discount).toBe('number');
      expect(coupon.discount).toBeGreaterThan(0);
      expect(coupon.discount).toBeLessThan(1);
    });
  });
});

describe('calculate discounts', () => {
  it('should return discounted price if given a valid code', () => {
    expect(calculateDiscount(10, 'SAVE10')).toBe(9);
    expect(calculateDiscount(10, 'SAVE20')).toBe(8);
  });

  it('should handle non-numeric price', () => {
    expect(calculateDiscount('10', 'SAVE10')).toMatch(/invalid/i);
  });

  it('should handle negative price', () => {
    expect(calculateDiscount(-10, 'SAVE10')).toMatch(/invalid/i);
  });

  it('should handle non-string discount code', () => {
    expect(calculateDiscount(10, 34)).toMatch(/invalid/i);
  });

  it('should handle non-valid discount code', () => {
    expect(calculateDiscount(10, 'SAVE30')).toBe(10);
  });
});

describe('validate user input', () => {
  it('should return validation successful if given valid input', () => {
    expect(validateUserInput('Moussa', 25)).toMatch(/success/i);
  });

  it('should return an error if username is not a string', () => {
    expect(validateUserInput(13, 25)).toMatch(/invalid/i);
  });

  it('should return an error if username is less than 3 characters', () => {
    expect(validateUserInput('Mo', 25)).toMatch(/invalid/i);
  });

  it('should return an error if username is more than 255 characters', () => {
    expect(validateUserInput('m'.repeat(256), 25)).toMatch(/invalid/i);
  });

  it('should return an error if age is not a number', () => {
    expect(validateUserInput('Moussa', '34')).toMatch(/invalid/i);
  });

  it('should return an error if age is less than 18', () => {
    expect(validateUserInput('Moussa', 16)).toMatch(/invalid/i);
  });

  it('should return an error if age is greater than 100', () => {
    expect(validateUserInput('Moussa', 101)).toMatch(/invalid/i);
  });

  it('should return an error if both username and age are invalid', () => {
    expect(validateUserInput('', 0)).toMatch(/Invalid username/i);
    expect(validateUserInput('', 0)).toMatch(/Invalid age/i);
  });
});

describe('isPriceinRange', () => {
  it('should return false when the price is outside the range', () => {
    expect(isPriceInRange(-10, 0, 100)).toBe(false);
    expect(isPriceInRange(200, 0, 100)).toBe(false);
  });

  it('should return true when the price is equal to the min or to the max', () => {
    expect(isPriceInRange(0, 0, 10)).toBe(true);
    expect(isPriceInRange(100, 0, 100)).toBe(true);
  });

  it('should return true if the price is within the range', () => {
    expect(isPriceInRange(50, 30, 100)).toBe(true);
  });
});
