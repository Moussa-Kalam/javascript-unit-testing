"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const main_1 = require("../../main");
(0, vitest_1.describe)('calculate discounts', () => {
    (0, vitest_1.it)('should return discounted price if given a valid code', () => {
        (0, vitest_1.expect)((0, main_1.calculateDiscount)(10, 'SAVE10')).toBe(9);
        (0, vitest_1.expect)((0, main_1.calculateDiscount)(10, 'SAVE20')).toBe(8);
    });
    (0, vitest_1.it)('should handle negative price', () => {
        (0, vitest_1.expect)((0, main_1.calculateDiscount)(-10, 'SAVE10')).toMatch(/invalid/i);
    });
    (0, vitest_1.it)('should handle non-valid discount code', () => {
        (0, vitest_1.expect)((0, main_1.calculateDiscount)(10, 'SAVE30')).toBe(10);
    });
});
