import { SliderStepMark } from '@nextui-org/react';

const getRelativeSizeMarks = (): SliderStepMark[] => {
    const res: SliderStepMark[] = [];
    res.push({ label: 'auto', value: 0 });
    for (let i = 1; i <= 11; i++) {
        res.push({ label: i.toString(), value: i });
    }
    res.push({ label: 'full', value: 12 });

    return res;
};

export default getRelativeSizeMarks;
