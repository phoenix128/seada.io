/**
 * Get normalized source code
 * @param sourceId
 */
const getNormalizedSourceId = (sourceId: string | null | undefined): string => {
    if (sourceId === null || sourceId === undefined || sourceId === '') {
        return 'default';
    }

    return sourceId.toLowerCase();
};

export default getNormalizedSourceId;
