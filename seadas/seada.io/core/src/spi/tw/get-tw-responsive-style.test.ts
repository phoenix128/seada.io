import getTwResponsiveStyle, { IResponsiveValue } from '@seada.io/core/spi/tw/get-tw-responsive-style';
import getTwBreakpointsSortMode, { ESortMode } from '@seada.io/core/spi/tw/get-tw-breakpoints-sort-mode';
import getTwBreakpointWidths from '@seada.io/core/spi/tw/get-tw-breakpoint-widths';
import { resetTwBreakpoints } from '@seada.io/core/spi/tw/get-tw-breakpoints';

jest.mock('@seada.io/core/spi/tw/get-tw-breakpoint-widths');
jest.mock('@seada.io/core/spi/tw/get-tw-breakpoints-sort-mode');

const mockBreakpointsMin = () => {
    (getTwBreakpointWidths as unknown as jest.Mock).mockImplementation(() => ({
        default: 0,
        sm: 640,
        md: 1024,
        lg: 1280,
        xl: 1536,
        '2xl': 1920,
    }));
    (getTwBreakpointsSortMode as unknown as jest.Mock).mockImplementation(() => ESortMode.MIN);
};

const mockLessBreakpointsMin = () => {
    (getTwBreakpointWidths as unknown as jest.Mock).mockImplementation(() => ({
        default: 0,
        sm: 640,
        md: 1024,
        lg: 1280,
    }));
    (getTwBreakpointsSortMode as unknown as jest.Mock).mockImplementation(() => ESortMode.MIN);
};

const mockBreakpointsMax = () => {
    (getTwBreakpointWidths as unknown as jest.Mock).mockImplementation(() => ({
        default: Infinity,
        sm: 640,
        md: 1024,
        lg: 1280,
        xl: 1536,
        '2xl': 1920,
    }));
    (getTwBreakpointsSortMode as unknown as jest.Mock).mockImplementation(() => ESortMode.MAX);
};

describe('getTwResponsiveStyle', () => {
    afterEach(() => {
        jest.clearAllMocks();
        resetTwBreakpoints();
    });

    beforeEach(() => {
        resetTwBreakpoints();
    });

    it('should create an array of classes based on a responsive value', () => {
        mockBreakpointsMin();
        const classPrefix = 'w-$';

        const value: IResponsiveValue = {
            default: 1,
            sm: 2,
            md: 3,
            lg: 4,
            xl: 5,
            '2xl': 6,
        };
        const result = getTwResponsiveStyle(value, classPrefix, undefined);

        expect(result).toEqual('w-1 sm:w-2 md:w-3 lg:w-4 xl:w-5 2xl:w-6');
    });

    it('should handle missing breakpoints gracefully', () => {
        mockBreakpointsMin();
        const classPrefix = 'w-$';
        const value: IResponsiveValue = {
            sm: 1,
            md: 2,
        };

        const result = getTwResponsiveStyle(value, classPrefix, undefined);

        expect(result).toEqual('w-1 md:w-2');
    });

    it('should handle unknown breakpoint gracefully', () => {
        mockLessBreakpointsMin();
        const classPrefix = 'w-$';
        const value: IResponsiveValue = {
            default: 1,
            sm: 2,
            md: 3,
            lg: 4,
            xl: 5,
            '2xl': 6,
        };

        const result = getTwResponsiveStyle(value, classPrefix, undefined);

        expect(result).toEqual('w-1 sm:w-2 md:w-3 lg:w-4');
    });

    it('should handle array of values', () => {
        mockBreakpointsMin();

        const classPrefix = [['p-$'], ['py-$', 'px-$']];
        const value: IResponsiveValue = {
            default: [1, 2],
            md: [3],
            lg: [4, 5],
            xl: [6, 7],
            '2xl': 8,
        };

        const result = getTwResponsiveStyle(value, classPrefix, undefined);

        expect(result).toEqual('py-1 px-2 md:p-3 lg:py-4 lg:px-5 xl:py-6 xl:px-7 2xl:p-8');
    });

    it('should use as default the smallest available breakpoint in MIN mode', () => {
        mockBreakpointsMin();

        const classPrefix = 'w-$';
        const value: IResponsiveValue = {
            lg: 3,
            xl: 4,
            '2xl': 5,
        };

        const result = getTwResponsiveStyle(value, classPrefix, undefined);

        expect(result).toEqual('w-3 xl:w-4 2xl:w-5');
    });

    it('should use as default the smallest available breakpoint in MAX mode', () => {
        mockBreakpointsMax();

        const classPrefix = 'w-$';
        const value: IResponsiveValue = {
            lg: 3,
            xl: 4,
            '2xl': 5,
        };

        const result = getTwResponsiveStyle(value, classPrefix, undefined);

        expect(result).toEqual('w-5 xl:w-4 lg:w-3');
    });

    it('should handle a non responsive value', () => {
        mockBreakpointsMin();

        const result = getTwResponsiveStyle(1, 'w-$', undefined);

        expect(result).toEqual('w-1');
    });

    it('should handle a non responsive value array', () => {
        mockBreakpointsMin();

        const result = getTwResponsiveStyle([1, 2], ['w-$', 'h-$'], undefined);

        expect(result).toEqual('w-1 h-2');
    });

    it('should handle default as non responsive value array', () => {
        mockBreakpointsMin();

        const result = getTwResponsiveStyle(
            {
                default: [1, 2],
            },
            ['w-$', 'h-$'],
            undefined
        );

        expect(result).toEqual('w-1 h-2');
    });
});
