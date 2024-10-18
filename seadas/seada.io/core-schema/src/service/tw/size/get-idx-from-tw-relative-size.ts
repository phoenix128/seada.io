const getIdxFromTwRelativeSize = (n: string): number => {
    if (n === 'full') {
        return 12;
    }

    if (n && n.includes('/')) {
        const idx = n.split('/')[0];
        return Number(idx);
    }

    if (n === 'auto') {
        return 0;
    }

    return -1;
};

export default getIdxFromTwRelativeSize;
