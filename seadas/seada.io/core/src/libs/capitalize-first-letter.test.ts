import capitalizeFirstLetter from '@seada.io/core/libs/capitalize-first-letter';

describe('capitalizeFirstLetter', () => {
    it('should return the same string if it is empty', () => {
        const input = '';
        const result = capitalizeFirstLetter(input);
        expect(result).toBe(input);
    });

    it('should capitalize the first letter of a single-letter string', () => {
        const input = 'a';
        const result = capitalizeFirstLetter(input);
        expect(result).toBe('A');
    });

    it('should capitalize the first letter of a string with multiple letters', () => {
        const input = 'hello';
        const result = capitalizeFirstLetter(input);
        expect(result).toBe('Hello');
    });

    it('should not change the case of other letters', () => {
        const input = 'hELLo';
        const result = capitalizeFirstLetter(input);
        expect(result).toBe('HELLo');
    });

    it('should return the same string if the first letter is already capitalized', () => {
        const input = 'Hello';
        const result = capitalizeFirstLetter(input);
        expect(result).toBe('Hello');
    });

    it('should handle strings with leading whitespace correctly', () => {
        const input = ' hello';
        const result = capitalizeFirstLetter(input);
        expect(result).toBe(' hello');
    });

    it('should handle strings with special characters', () => {
        const input = '!hello';
        const result = capitalizeFirstLetter(input);
        expect(result).toBe('!hello');
    });

    it('should capitalize the first letter of a string with leading special characters', () => {
        const input = '.hello';
        const result = capitalizeFirstLetter(input);
        expect(result).toBe('.hello');
    });
});
