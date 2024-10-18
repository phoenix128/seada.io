const getTwRelativeSizeFromIdx = (n: number): string => {
    switch (n) {
        case 0:
        case undefined:
        case null:
        case 13:
            return 'auto';
        case 12:
            return 'full';
        default:
            return `${n}/12`;
    }
};

export default getTwRelativeSizeFromIdx;
