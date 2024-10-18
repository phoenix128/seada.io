import { renderHook } from '@testing-library/react';
import useAsyncActionResult from '@seada.io/core/hooks/use-async-action-result';
import { useTranslation } from 'react-i18next';
import useToast from '@seada.io/core/hooks/use-toast';

jest.mock('react-i18next');
jest.mock('@seada.io/core/hooks/use-toast');

describe('useAsyncActionResult', () => {
    beforeEach(() => {
        jest.clearAllMocks();

        (useTranslation as jest.Mock).mockReturnValue({
            t: (key: string) => key,
        });
    });

    test('should call onSuccess function with data when data changes and is defined', () => {
        const onSuccess = jest.fn();
        const { rerender } = renderHook(({ result }) => useAsyncActionResult(result, onSuccess), {
            initialProps: {
                result: {
                    data: null,
                    loading: false,
                    error: null,
                    action: () => {},
                },
            },
        });

        rerender({
            result: {
                data: { message: 'Success!' },
                loading: false,
                error: null,
                action: () => {},
            },
        });

        expect(onSuccess).toHaveBeenCalledWith({ message: 'Success!' });
    });

    test('should call onError function with data when data changes and is defined', () => {
        global.console = {
            ...console,
            error: jest.fn(),
        };

        const onError = jest.fn();
        const { rerender } = renderHook(({ result }) => useAsyncActionResult(result, undefined, onError), {
            initialProps: {
                result: {
                    data: null,
                    loading: false,
                    error: null,
                    action: () => {},
                },
            },
        });

        rerender({
            result: {
                data: null,
                loading: false,
                error: new Error('Error!'),
                action: () => {},
            },
        });

        expect(onError).toHaveBeenCalled();
        expect(global.console.error).toHaveBeenCalled();
    });

    test('should not call onSuccess or onError if data or error has not changed or still loading', () => {
        const onSuccess = jest.fn();
        const onError = jest.fn();
        const initialData = { message: 'Initial data' };
        const { rerender } = renderHook(({ result }) => useAsyncActionResult(result, onSuccess, onError), {
            initialProps: {
                result: {
                    data: initialData,
                    loading: true,
                    error: null,
                    action: () => {},
                },
            },
        });

        rerender({
            result: {
                data: initialData,
                loading: true,
                error: null,
                action: () => {},
            },
        });

        expect(onSuccess).not.toHaveBeenCalled();
        expect(onError).not.toHaveBeenCalled();
    });

    test('should display a success toast message if a string is passed to onSuccess', () => {
        const toast = jest.fn();
        (useToast as jest.Mock).mockImplementation(() => toast);

        const onSuccess = 'Success!';
        const { rerender } = renderHook(({ result }) => useAsyncActionResult(result, onSuccess), {
            initialProps: {
                result: {
                    data: null,
                    loading: false,
                    error: null,
                    action: () => {},
                },
            },
        });

        rerender({
            result: {
                data: { message: 'Success!' },
                loading: false,
                error: null,
                action: () => {},
            },
        });

        expect(toast).toHaveBeenCalledWith('Success!', { type: 'success' });
    });

    test('should display a success toast message if a string is passed to onError', () => {
        global.console = {
            ...console,
            error: jest.fn(),
        };

        const toast = jest.fn();
        (useToast as jest.Mock).mockImplementation(() => toast);

        const onError = 'Error!';
        const { rerender } = renderHook(({ result }) => useAsyncActionResult(result, undefined, onError), {
            initialProps: {
                result: {
                    data: null,
                    loading: false,
                    error: null,
                    action: () => {},
                },
            },
        });

        rerender({
            result: {
                data: null,
                loading: false,
                error: new Error('Error!'),
                action: () => {},
            },
        });

        expect(toast).toHaveBeenCalledWith('Error!', { type: 'error' });
        expect(global.console.error).toHaveBeenCalled();
    });
});
