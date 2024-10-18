import { renderHook } from '@testing-library/react';
import useTwBreakpoints from '@seada.io/core/hooks/tw/use-tw-breakpoints';
import useTwProcessVisibilityClasses from '@seada.io/basic-ui/hooks/tw/use-tw-box-visibility';

jest.mock('@seada.io/core/hooks/tw/use-tw-breakpoints');

describe('useTwProcessVisibilityClasses', () => {
    beforeEach(() => {
        (useTwBreakpoints as jest.Mock).mockClear();
        (useTwBreakpoints as jest.Mock).mockReturnValue(['default', 'lg', 'md', 'sm', 'xs']);
    });

    it('should return the correct visibility class when visibility is set', () => {
        const props = { visibility: 'sm:hidden' };
        const otherClasses = 'block';

        const { result } = renderHook(() => useTwProcessVisibilityClasses(props, otherClasses));

        expect(result.current).toBe('block sm:hidden');
    });

    it('should reactivate with the closest highest display mode if the element is marked to be visible', () => {
        const props = { visibility: 'md:hidden xs:visible' };
        const otherClasses = 'flex';

        const { result } = renderHook(() => useTwProcessVisibilityClasses(props, otherClasses));

        expect(result.current).toBe('flex md:hidden xs:visible xs:flex');
    });

    it('should reactivate only the closest highest display mode if the element is marked to be visible', () => {
        const props = { visibility: 'sm:hidden xs:visible' };
        const otherClasses = 'flex md:block';

        const { result } = renderHook(() => useTwProcessVisibilityClasses(props, otherClasses));

        expect(result.current).toBe('flex md:block sm:hidden xs:visible xs:block');
    });

    it('should remove the display utility if at the same breakpoint should be hidden', () => {
        const props = { visibility: 'md:hidden' };
        const otherClasses = 'flex md:block';

        const { result } = renderHook(() => useTwProcessVisibilityClasses(props, otherClasses));

        expect(result.current).toBe('flex md:hidden');
    });

    it('should preserve the existing display class in a lower breakpoint if the element is marked to be visible', () => {
        const props = { visibility: 'hidden sm:visible' };
        const otherClasses = 'flex lg:grid md:block';

        const { result } = renderHook(() => useTwProcessVisibilityClasses(props, otherClasses));

        expect(result.current).toBe('hidden sm:visible sm:block');
    });

    it('should handle complex scenario with different display types per breakpoint', () => {
        const props = { visibility: 'hidden md:visible sm:hidden xs:visible' };
        const otherClasses = 'flex lg:grid md:block sm:inline-block xs:inline';

        const { result } = renderHook(() => useTwProcessVisibilityClasses(props, otherClasses));

        expect(result.current).toBe('md:block xs:inline hidden md:visible sm:hidden xs:visible');
    });
});
