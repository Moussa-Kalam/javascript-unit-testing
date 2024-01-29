import { describe, test, it, expect } from "vitest";
import { fizzBuzz, max } from "../intro";

describe("max", () => {
  it("should return the first argument if it is greater", () => {
    // Arrange: Set up test environment including necessary data and configuration
    // Act: Perform the action we want to test
    // Assert: Check the outcome to see if the result matches our expectations

    expect(max(2, 1)).toBe(2);
  });

  it("should return the second argument if is is greater", () => {
    expect(max(3, 5)).toBe(5);
  });

  it("should return the first argument if both arguments are equal", () => {
    expect(max(3, 3)).toBe(3);
  });
});

describe("fizzbuzz", () => {
  it("should return FizzBuzz if argument is divisible by 3 and 5", () => {
    expect(fizzBuzz(15)).toBe("FizzBuzz");
  });

  it("should return Fizz if argument is only divisible by 3", () => {
    expect(fizzBuzz(3)).toBe("Fizz");
  });

  it("should return Buzz if argument is only divisible by 5", () => {
    expect(fizzBuzz(5)).toBe("Buzz");
  });

  it("should return argument as a string if it is not divisible by 3 or 5", () => {
    expect(fizzBuzz(1)).toBe("1");
  });
});