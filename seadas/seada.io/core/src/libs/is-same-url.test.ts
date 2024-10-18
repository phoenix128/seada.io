import isSameUrl from '@seada.io/core/libs/is-same-url';

describe('isSameUrl', () => {
    test('should return true for identical URLs', () => {
        expect(isSameUrl('http://example.com', 'http://example.com')).toBe(true);
        expect(isSameUrl('https://example.com', 'https://example.com')).toBe(true);
    });

    test('should return false for different URLs', () => {
        expect(isSameUrl('http://example.com', 'http://example.org')).toBe(false);
        expect(isSameUrl('https://example.com/page', 'https://example.com/other')).toBe(false);
    });

    test('should consider http and https schemes as different', () => {
        expect(isSameUrl('http://example.com', 'https://example.com')).toBe(false);
    });

    test('should ignore trailing slashes', () => {
        expect(isSameUrl('http://example.com/', 'http://example.com')).toBe(true);
    });

    test('should compare paths and query strings', () => {
        expect(isSameUrl('http://example.com/path?query=123', 'http://example.com/path?query=123')).toBe(true);
        expect(isSameUrl('http://example.com/path?query=123', 'http://example.com/path')).toBe(false);
        expect(isSameUrl('http://example.com/path', 'http://example.com/other')).toBe(false);
    });

    test('should return false if either URL is invalid', () => {
        expect(isSameUrl('http://example.com', 'not-a-url')).toBe(false);
        expect(isSameUrl('not-a-url', 'http://example.com')).toBe(false);
    });

    test('should return true for identical URL paths', () => {
        expect(isSameUrl('/path', '/path')).toBe(true);
    });

    test('should return true for URL paths with trailing slashes', () => {
        expect(isSameUrl('/path/', '/path')).toBe(true);
    });

    test('should return false for different URL paths', () => {
        expect(isSameUrl('/path', '/other')).toBe(false);
    });

    test('should return true for identical URL paths and query strings', () => {
        expect(isSameUrl('/path?query=123', '/path?query=123')).toBe(true);
    });

    test('should return false for different URL paths with trailing slashes and query strings', () => {
        expect(isSameUrl('/path?query=123', '/path/?query=123')).toBe(true);
    });
});
