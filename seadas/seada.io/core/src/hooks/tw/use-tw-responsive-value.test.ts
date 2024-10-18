import useTwBreakpoint from '@seada.io/core/hooks/tw/use-tw-breakpoint';
import { renderHook } from '@testing-library/react';
import useTwResponsiveValue from '@seada.io/core/hooks/tw/use-tw-responsive-value';

jest.mock('@seada.io/core/hooks/tw/use-tw-breakpoint');

describe('useTwResponsiveValue', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should return the correct value for the current breakpoint', () => {
        (useTwBreakpoint as jest.Mock).mockReturnValue('md');
        const { result } = renderHook(() =>
            useTwResponsiveValue({
                default: 'defaultValue',
                sm: 'smallValue',
                md: 'mediumValue',
            })
        );

        expect(result.current).toBe('mediumValue');
    });

    it('should fallback to default value if current breakpoint value is not defined', () => {
        (useTwBreakpoint as jest.Mock).mockReturnValue('lg');

        const { result } = renderHook(() =>
            useTwResponsiveValue({
                default: 'defaultValue',
                sm: 'smallValue',
                md: 'mediumValue',
            })
        );

        expect(result.current).toBe('defaultValue');
    });

    it('should handle simple data types correctly', () => {
        (useTwBreakpoint as jest.Mock).mockReturnValue('md');

        const { result } = renderHook(() => useTwResponsiveValue('value'));

        expect(result.current).toBe('value');
    });
});
