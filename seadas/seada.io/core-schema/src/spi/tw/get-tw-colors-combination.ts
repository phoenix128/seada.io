import getTwColors from '@seada.io/core-schema/spi/tw/get-tw-colors';

const getTwColorsCombination = (): string[] => {
    const colors = getTwColors();
    const res: string[] = [];

    for (const [color, colorInfo] of Object.entries(colors)) {
        if (typeof colorInfo === 'string') {
            res.push(color);
        } else {
            for (const shade of Object.keys(colorInfo)) {
                res.push(`${color}-${shade}`);
            }
        }
    }

    return res;
};

export default getTwColorsCombination;
