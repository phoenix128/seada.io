import { IValueType } from '@seada.io/core/spi/tw/get-tw-classes';
import { IDimensionsLock } from '@seada.io/core-schema/components/TwDimensionsWrapper/TwDimensionsWrapper';

/**
 * Find the best lock for given data
 * @param data
 * @param locks
 */
const useBestLock = (data: IValueType[], locks: IDimensionsLock[]): number => {
    if (!locks.length) {
        return -1;
    }

    for (let i = 0; i < locks.length; i++) {
        const lock = locks[i];
        let isBestLock = true;

        for (const keys of lock.keys) {
            if (!keys.every((k) => data[k] === data[keys[0]])) {
                isBestLock = false;
                break;
            }
        }

        if (isBestLock) {
            return i;
        }
    }

    return -1;
};

export default useBestLock;
