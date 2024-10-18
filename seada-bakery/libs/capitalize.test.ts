import capitalizeFirstLetter from './capitalize.js';

describe('capitalizeFirstLetter', () => {
    it('should capitalize the first letter of a string', () => {
        expect(capitalizeFirstLetter('hello')).toBe('Hello');
        expect(capitalizeFirstLetter('world')).toBe('World');
    });

    it('should not modify an already capitalized string', () => {
        expect(capitalizeFirstLetter('Hello')).toBe('Hello');
        expect(capitalizeFirstLetter('World')).toBe('World');
    });

    it('should handle single character strings', () => {
        expect(capitalizeFirstLetter('h')).toBe('H');
        expect(capitalizeFirstLetter('W')).toBe('W');
    });

    it('should not modify numbers or special characters', () => {
        expect(capitalizeFirstLetter('123hello')).toBe('123hello');
        expect(capitalizeFirstLetter('!hello')).toBe('!hello');
    });

    it('should handle empty strings', () => {
        expect(capitalizeFirstLetter('')).toBe('');
    });
});
