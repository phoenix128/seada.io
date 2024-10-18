import { renderHook } from '@testing-library/react';
import useSubscribe from '@seada.io/core/hooks/use-subscribe';

describe('useSubscribe', () => {
    it('should call the callback with the new and previous value when the value changes', () => {
        const callback = jest.fn();
        const { rerender } = renderHook(({ value }) => useSubscribe(value, callback), {
            initialProps: { value: 1 },
        });

        expect(callback).not.toHaveBeenCalled();

        rerender({ value: 2 });

        expect(callback).toHaveBeenCalledTimes(1);
        expect(callback).toHaveBeenCalledWith(2, 1);

        rerender({ value: 3 });

        expect(callback).toHaveBeenCalledTimes(2);
        expect(callback).toHaveBeenCalledWith(3, 2);
    });

    it('should not call the callback if the value does not change', () => {
        const callback = jest.fn();
        const { rerender } = renderHook(({ value }) => useSubscribe(value, callback), {
            initialProps: { value: 1 },
        });

        expect(callback).not.toHaveBeenCalled();
        rerender({ value: 1 });

        expect(callback).not.toHaveBeenCalled();
    });

    it('should update the callback reference', () => {
        const initialCallback = jest.fn();
        const updatedCallback = jest.fn();
        const { rerender } = renderHook(({ value, callback }) => useSubscribe(value, callback), {
            initialProps: { value: 1, callback: initialCallback },
        });

        expect(initialCallback).not.toHaveBeenCalled();

        rerender({ value: 2, callback: initialCallback });

        expect(initialCallback).toHaveBeenCalledTimes(1);
        expect(initialCallback).toHaveBeenCalledWith(2, 1);

        rerender({ value: 3, callback: updatedCallback });

        expect(updatedCallback).toHaveBeenCalledTimes(1);
        expect(updatedCallback).toHaveBeenCalledWith(3, 2);
        expect(initialCallback).toHaveBeenCalledTimes(1);
    });
});
