import { IValueType } from '@seada.io/core/spi/tw/get-tw-classes';

const compactDimensionedValue = (values: IValueType[]): IValueType | IValueType[] => {
    const allSame = values.every((val) => val === values[0]);
    if (allSame) {
        return values[0];
    }

    const findRepeatingPattern = (arr: IValueType[]): IValueType[] | null => {
        for (let patternLength = 1; patternLength <= arr.length / 2; patternLength++) {
            let pattern = arr.slice(0, patternLength);
            let matchesPattern = true;
            for (let i = patternLength; i < arr.length; i += patternLength) {
                for (let j = 0; j < patternLength; j++) {
                    if (arr[i + j] !== pattern[j]) {
                        matchesPattern = false;
                        break;
                    }
                }
                if (!matchesPattern) break;
            }
            if (matchesPattern && arr.length % patternLength === 0) {
                return pattern;
            }
        }
        return null;
    };

    const pattern = findRepeatingPattern(values);
    if (pattern !== null) {
        return pattern;
    }

    return values;
};

export default compactDimensionedValue;
