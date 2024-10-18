import { IValueType } from '@seada.io/core/spi/tw/get-tw-classes';
import { IDimensionsLock } from '@seada.io/core-schema/components/TwDimensionsWrapper/TwDimensionsWrapper';
import { renderHook } from '@testing-library/react';
import useBestLock from '@seada.io/core-schema/hooks/use-best-lock';

describe('useBestLock', () => {
    it('should find the best lock when all parameters are identical', () => {
        const data: IValueType[] = [1, 1, 1, 1];
        const locks: IDimensionsLock[] = [
            { keys: [[0, 1, 2, 3]] },
            {
                keys: [
                    [0, 1],
                    [2, 3],
                ],
            },
            { keys: [[0], [1], [2], [3]] },
        ];

        const {
            result: { current },
        } = renderHook(() => useBestLock(data, locks));

        expect(current).toBe(0);
    });

    it('should find the best lock when a specific pattern is found', () => {
        const data: IValueType[] = [1, 1, 2, 2];
        const locks: IDimensionsLock[] = [
            { keys: [[0, 1, 2, 3]] },
            {
                keys: [
                    [0, 1],
                    [2, 3],
                ],
            },
            { keys: [[0], [1], [2], [3]] },
        ];

        const {
            result: { current },
        } = renderHook(() => useBestLock(data, locks));

        expect(current).toBe(1);
    });

    it('should find the best lock when no pattern is found', () => {
        const data: IValueType[] = [1, 2, 3, 4];
        const locks: IDimensionsLock[] = [
            { keys: [[0, 1, 2, 3]] },
            {
                keys: [
                    [0, 1],
                    [2, 3],
                ],
            },
            { keys: [[0], [1], [2], [3]] },
        ];

        const {
            result: { current },
        } = renderHook(() => useBestLock(data, locks));

        expect(current).toBe(2);
    });

    it('should find the best lock when no pattern is found 2', () => {
        const data: IValueType[] = [1, 1, 3, 4];
        const locks: IDimensionsLock[] = [
            { keys: [[0, 1, 2, 3]] },
            {
                keys: [
                    [0, 1],
                    [2, 3],
                ],
            },
            { keys: [[0], [1], [2], [3]] },
        ];

        const {
            result: { current },
        } = renderHook(() => useBestLock(data, locks));

        expect(current).toBe(2);
    });

    it('should return -1 when no lock is found', () => {
        const data: IValueType[] = [1, 2, 3, 4];
        const locks: IDimensionsLock[] = [
            { keys: [[0, 1, 2, 3]] },
            {
                keys: [
                    [0, 1],
                    [2, 3],
                ],
            },
        ];

        const {
            result: { current },
        } = renderHook(() => useBestLock(data, locks));

        expect(current).toBe(-1);
    });
});
