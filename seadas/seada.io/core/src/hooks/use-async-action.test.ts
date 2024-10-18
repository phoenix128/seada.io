import { act, renderHook } from '@testing-library/react';
import useAsyncAction from '@seada.io/core/hooks/use-async-action';

const mockAsyncAction = (ms: number, result: any, shouldReject = false) =>
    jest.fn(
        () =>
            new Promise((resolve, reject) => {
                setTimeout(() => (shouldReject ? reject(new Error(result)) : resolve(result)), ms);
            })
    );

describe('useAsyncAction', () => {
    it('should ignore the previous promise result if a new promise is called', async () => {
        const asyncAction1 = mockAsyncAction(2000, 'result1');
        const asyncAction2 = mockAsyncAction(1000, 'result2');

        const { result } = renderHook(() =>
            useAsyncAction((param: string) => {
                if (param === 'test1') {
                    return asyncAction1();
                } else {
                    return asyncAction2();
                }
            })
        );

        await act(async () => {
            result.current.action('test1');
            result.current.action('test2');
        });

        // Wait for the second action to complete
        await act(async () => {
            await new Promise((r) => setTimeout(r, 1100));
        });

        expect(result.current.loading).toBe(false);
        expect(result.current.data).toBe('result2');
        expect(result.current.error).toBeUndefined();
        expect(asyncAction1).toHaveBeenCalled();
        expect(asyncAction2).toHaveBeenCalled();
    });

    it('should handle error correctly', async () => {
        const asyncActionError = mockAsyncAction(1000, 'Test Error', true);

        const { result } = renderHook(() => useAsyncAction(() => asyncActionError()));

        await act(async () => {
            result.current.action();
        });

        // Wait for the action to complete
        await act(async () => {
            await new Promise((r) => setTimeout(r, 1100));
        });

        expect(result.current.loading).toBe(false);
        expect(result.current.data).toBeUndefined();
        expect(result.current.error).toEqual(new Error('Test Error'));
    });

    it('should update loading state correctly', async () => {
        const asyncAction = mockAsyncAction(1000, 'result');

        const { result } = renderHook(() => useAsyncAction(() => asyncAction()));

        await act(async () => {
            result.current.action();
        });

        expect(result.current.loading).toBe(true);

        // Wait for the action to complete
        await act(async () => {
            await new Promise((r) => setTimeout(r, 1100));
        });

        expect(result.current.loading).toBe(false);
        expect(result.current.data).toBe('result');
        expect(result.current.error).toBeUndefined();
    });

    it('should call onSuccess callback correctly', async () => {
        const asyncAction = mockAsyncAction(1000, 'result');
        const onSuccess = jest.fn();

        const { result } = renderHook(() => useAsyncAction(() => asyncAction(), onSuccess));

        await act(async () => {
            result.current.action();
        });

        // Wait for the action to complete
        await act(async () => {
            await new Promise((r) => setTimeout(r, 1100));
        });

        expect(onSuccess).toHaveBeenCalledWith('result');
    });

    it('should call onError callback correctly', async () => {
        const asyncActionError = mockAsyncAction(1000, 'Test Error', true);
        const onError = jest.fn();

        const { result } = renderHook(() => useAsyncAction(() => asyncActionError(), undefined, onError));

        await act(async () => {
            result.current.action();
        });

        // Wait for the action to complete
        await act(async () => {
            await new Promise((r) => setTimeout(r, 1100));
        });

        expect(onError).toHaveBeenCalledWith(new Error('Test Error'));
    });
});
