import camelize from './camelize.js';

describe('camelize', () => {
    it('should convert a hyphenated string to camel case', () => {
        expect(camelize('my-string')).toBe('myString');
        expect(camelize('this-is-a-string')).toBe('thisIsAString');
        expect(camelize('alreadyCamelCase')).toBe('alreadyCamelCase');
    });

    it('should camelize an array of strings', () => {
        expect(camelize(['my', 'string'])).toBe('myString');
        expect(camelize(['this', 'is', 'a', 'string'])).toBe('thisIsAString');
    });

    it('should handle single word strings and arrays', () => {
        expect(camelize('word')).toBe('word');
        expect(camelize(['word'])).toBe('word');
    });

    it('should not modify numbers or special characters', () => {
        expect(camelize('123-456')).toBe('123456');
        expect(camelize(['123', '456'])).toBe('123456');
        expect(camelize('!@#$%-^&*')).toBe('!@#$%^&*');
    });
});
