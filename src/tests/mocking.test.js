import { vi, it, expect, describe } from 'vitest';

describe('test suite', () => {
  it('test case', () => {
    const greet = vi.fn();
    greet.mockReturnValue('Hello'); // Mock to return a value
    greet.mockResolvedValue('Hi Promise'); // Mock to return a promise
    greet.mockImplementation((name) => 'Hello ' + name); // Add implementation to a mock function

    // greet().then((result) => console.log(result));

    const result = greet('Moussa');
    console.log(result);

    expect(greet).toHaveBeenCalled();
  });
});
