import clamp from './clamp';

describe('clamp function', () => {
    it('should clamp a value within the specified range', () => {
        expect(clamp(5, 0, 10)).toBe(5);
        expect(clamp(-5, 0, 10)).toBe(0);
        expect(clamp(15, 0, 10)).toBe(10);
    });

    it('should handle negative ranges', () => {
        expect(clamp(-3, -5, -1)).toBe(-3);
        expect(clamp(-10, -5, -1)).toBe(-5);
        expect(clamp(-1, -5, -3)).toBe(-3);
    });

    it('should handle floating-point numbers', () => {
        expect(clamp(3.5, 1.5, 5.5)).toBe(3.5);
        expect(clamp(1.2, 1.5, 5.5)).toBe(1.5);
        expect(clamp(6.7, 1.5, 5.5)).toBe(5.5);
    });
});
