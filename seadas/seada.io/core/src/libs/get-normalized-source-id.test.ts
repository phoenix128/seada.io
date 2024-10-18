import getNormalizedSourceId from '@seada.io/core/libs/get-normalized-source-id';

describe('getNormalizedSourceId', () => {
    it('should return "default" when sourceId is null', () => {
        const sourceId = null;
        const result = getNormalizedSourceId(sourceId);
        expect(result).toBe('default');
    });

    it('should return "default" when sourceId is undefined', () => {
        const sourceId = undefined;
        const result = getNormalizedSourceId(sourceId);
        expect(result).toBe('default');
    });

    it('should return "default" when sourceId is an empty string', () => {
        const sourceId = '';
        const result = getNormalizedSourceId(sourceId);
        expect(result).toBe('default');
    });

    it('should return the lowercase of sourceId when it is a non-empty string', () => {
        const sourceId = 'SourceId123';
        const result = getNormalizedSourceId(sourceId);
        expect(result).toBe('sourceid123');
    });
});
