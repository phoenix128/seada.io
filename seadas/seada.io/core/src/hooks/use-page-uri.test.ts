import { renderHook } from '@testing-library/react';
import usePageData from '@seada.io/core/hooks/use-page-data';
import usePageUri from '@seada.io/core/hooks/use-page-uri';

jest.mock('@seada.io/core/hooks/use-page-data');

describe('usePageUri', () => {
    it('should return only the pathname if search params are empty', () => {
        (usePageData as jest.Mock).mockReturnValue({
            pagePath: '/about',
        });

        const { result } = renderHook(() => usePageUri());
        expect(result.current).toEqual('/about');
    });

    it('should return the pathname and search params when present', () => {
        (usePageData as jest.Mock).mockReturnValue({
            pagePath: '/search?query=test',
        });

        const { result } = renderHook(() => usePageUri());
        expect(result.current).toEqual('/search?query=test');
    });

    it('should handle relative paths and default to the base URL', () => {
        (usePageData as jest.Mock).mockReturnValue({
            pagePath: '/contact?dept=sales',
        });

        const { result } = renderHook(() => usePageUri());
        expect(result.current).toEqual('/contact?dept=sales');
    });

    it('should handle cases where pagePath is undefined or null', () => {
        (usePageData as jest.Mock).mockReturnValue({
            pagePath: undefined,
        });

        const { result } = renderHook(() => usePageUri());
        expect(result.current).toEqual('/');
    });
});
