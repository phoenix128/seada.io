import { renderHook } from '@testing-library/react';
import * as useSeadaSearchParams from '@seada.io/core/hooks/use-seada-search-params';
import useModifySearchParams from '@seada.io/core/hooks/use-modify-search-params';

jest.mock('next/navigation', () => ({
    usePathname: jest.fn().mockReturnValue('/some.route'),
    useRouter: jest.fn().mockReturnValue({
        push: jest.fn(),
    }),
}));

jest.mock('@seada.io/core/hooks/use-page-uri', () => jest.fn().mockReturnValue('/some.route'));

describe('useModifyQs', () => {
    it('should add new parameters to an existing query string', () => {
        jest.spyOn(useSeadaSearchParams, 'default').mockReturnValue({
            a: '1',
            b: '2',
        });

        const updateParams = {
            c: '1',
        };

        const { result } = renderHook(() => useModifySearchParams()(updateParams));

        expect(result.current).toBe('a=1&b=2&c=1');
    });

    it('should replace existing parameters in a query string', () => {
        jest.spyOn(useSeadaSearchParams, 'default').mockReturnValue({
            a: '1',
            b: '2',
        });

        const updateParams = {
            a: 'a',
        };

        const { result } = renderHook(() => useModifySearchParams()(updateParams));

        expect(result.current).toBe('b=2&a=a');
    });

    it('should remove existing parameters in an query string', () => {
        jest.spyOn(useSeadaSearchParams, 'default').mockReturnValue({
            a: '1',
            b: '2',
        });

        const updateParams = {
            a: undefined,
        };

        const { result } = renderHook(() => useModifySearchParams()(updateParams));

        expect(result.current).toBe('b=2');
    });

    it('should add new parameters to an existing query string with array values', () => {
        jest.spyOn(useSeadaSearchParams, 'default').mockReturnValue({
            a: '1',
            b: '2',
        });

        const updateParams = {
            c: ['1', '2'],
        };

        const { result } = renderHook(() => useModifySearchParams()(updateParams));

        expect(result.current).toBe('a=1&b=2&c=1&c=2');
    });

    it('should replace existing parameters in an query string with array values', () => {
        jest.spyOn(useSeadaSearchParams, 'default').mockReturnValue({
            a: ['1', '2'],
            b: '2',
        });

        const updateParams = {
            a: ['a', 'b'],
        };

        const { result } = renderHook(() => useModifySearchParams()(updateParams));

        expect(result.current).toBe('b=2&a=a&a=b');
    });

    it('should create a query string if currently empty', () => {
        jest.spyOn(useSeadaSearchParams, 'default').mockReturnValue({});

        const updateParams = {
            a: '1',
            b: '2',
        };

        const { result } = renderHook(() => useModifySearchParams()(updateParams));

        expect(result.current).toBe('a=1&b=2');
    });

    it('should handle php arrays notation', () => {
        jest.spyOn(useSeadaSearchParams, 'default').mockReturnValue({});

        const updateParams = {
            a: ['1', '2'],
            b: '2',
        };

        const { result } = renderHook(() => useModifySearchParams({ phpArrays: true })(updateParams));

        expect(result.current).toBe('a%5B%5D=1&a%5B%5D=2&b=2');
    });

    it('should handle php arrays notation when removing parameters', () => {
        jest.spyOn(useSeadaSearchParams, 'default').mockReturnValue({
            a: ['1', '2'],
            b: '2',
        });

        const updateParams = {
            a: ['1'],
            b: ['1', '2', '3'],
        };

        const { result } = renderHook(() => useModifySearchParams({ phpArrays: true })(updateParams));

        expect(result.current).toBe('a=1&b%5B%5D=1&b%5B%5D=2&b%5B%5D=3');
    });
});
