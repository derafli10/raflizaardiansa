import { describe, it, expect } from 'vitest';
import { Input } from './Input';
import { Textarea } from './Textarea';

describe('Form Input Primitives', () => {
  it('should export Input and Textarea components with valid display names', () => {
    expect(Input.displayName).toBe('Input');
    expect(Textarea.displayName).toBe('Textarea');
  });
});
