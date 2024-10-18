import getTwBreakpointWidths from '@seada.io/core/spi/tw/get-tw-breakpoint-widths';
import getTwBreakpointsSortMode, { ESortMode } from '@seada.io/core/spi/tw/get-tw-breakpoints-sort-mode';
import getTwBreakpoints, { resetTwBreakpoints } from '@seada.io/core/spi/tw/get-tw-breakpoints';

jest.mock('@seada.io/core/spi/tw/get-tw-breakpoint-widths');
jest.mock('@seada.io/core/spi/tw/get-tw-breakpoints-sort-mode');

describe('getTwSelectedBreakpoint', () => {
    beforeEach(() => {
        resetTwBreakpoints();
    });
    afterEach(() => {
        jest.clearAllMocks();
        resetTwBreakpoints();
    });

    it('should return sorted breakpoints in descending order when sort mode is MIN', () => {
        (getTwBreakpointsSortMode as unknown as jest.Mock).mockImplementation(() => ESortMode.MIN);
        (getTwBreakpointWidths as unknown as jest.Mock).mockImplementation(() => ({
            default: 0,
            sm: 640,
            md: 1024,
            lg: 1280,
            xl: 1536,
            '2xl': 1920,
        }));
        expect(getTwBreakpoints()).toEqual(['default', 'sm', 'md', 'lg', 'xl', '2xl']);
    });

    it('should return sorted breakpoints in ascending order when sort mode is MIN', () => {
        (getTwBreakpointsSortMode as unknown as jest.Mock).mockImplementation(() => ESortMode.MAX);
        (getTwBreakpointWidths as unknown as jest.Mock).mockImplementation(() => ({
            default: Infinity,
            sm: 640,
            md: 1024,
            lg: 1280,
            xl: 1536,
            '2xl': 1920,
        }));
        expect(getTwBreakpoints()).toEqual(['default', '2xl', 'xl', 'lg', 'md', 'sm']);
    });
});
