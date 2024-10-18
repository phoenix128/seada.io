import useTwBreakpointsWidth from '@seada.io/core/hooks/tw/use-tw-breakpoints-width';
import { useWindowSize } from 'usehooks-ts';
import { renderHook } from '@testing-library/react';
import useTwBreakpoint from '@seada.io/core/hooks/tw/use-tw-breakpoint';

jest.mock('@seada.io/core/hooks/tw/use-tw-breakpoints-width');
jest.mock('usehooks-ts');

describe('useTwBreakpoint', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should return default breakpoint when width is undefined', () => {
        (useTwBreakpointsWidth as jest.Mock).mockReturnValue({
            sm: 640,
            md: 768,
            lg: 1024,
            xl: 1280,
        });
        (useWindowSize as jest.Mock).mockReturnValue({
            width: undefined,
            height: 800,
        });

        const { result } = renderHook(() => useTwBreakpoint());

        expect(result.current).toBe('default');
    });

    it('should return the correct breakpoint for the given width', () => {
        (useTwBreakpointsWidth as jest.Mock).mockReturnValue({
            sm: 640,
            md: 768,
            lg: 1024,
            xl: 1280,
        });
        (useWindowSize as jest.Mock).mockReturnValue({
            width: 800,
            height: 800,
        });

        const { result } = renderHook(() => useTwBreakpoint());

        expect(result.current).toBe('lg');
    });

    it('should return the smallest breakpoint if width is below the smallest breakpoint', () => {
        (useTwBreakpointsWidth as jest.Mock).mockReturnValue({
            sm: 640,
            md: 768,
            lg: 1024,
            xl: 1280,
        });
        (useWindowSize as jest.Mock).mockReturnValue({
            width: 2000,
            height: 800,
        });

        const { result } = renderHook(() => useTwBreakpoint());

        expect(result.current).toBe('default');
    });
});
