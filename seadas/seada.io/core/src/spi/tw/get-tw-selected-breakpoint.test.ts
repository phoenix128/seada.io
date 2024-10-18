import getTwBreakpointWidths from '@seada.io/core/spi/tw/get-tw-breakpoint-widths';
import getTwSelectedBreakpoint from '@seada.io/core/spi/tw/get-tw-selected-breakpoint';
import getTwBreakpointsSortMode, { ESortMode } from '@seada.io/core/spi/tw/get-tw-breakpoints-sort-mode';
import { resetTwBreakpoints } from '@seada.io/core/spi/tw/get-tw-breakpoints';

jest.mock('@seada.io/core/spi/tw/get-tw-breakpoint-widths');
jest.mock('@seada.io/core/spi/tw/get-tw-breakpoints-sort-mode');

const mockMinMode = () => {
    (getTwBreakpointsSortMode as unknown as jest.Mock).mockImplementation(() => ESortMode.MIN);
    (getTwBreakpointWidths as unknown as jest.Mock).mockImplementation(() => ({
        default: 0,
        sm: 640,
        md: 1024,
        lg: 1280,
        xl: 1536,
        '2xl': 1920,
    }));
};

const mockMaxMode = () => {
    (getTwBreakpointsSortMode as unknown as jest.Mock).mockImplementation(() => ESortMode.MAX);
    (getTwBreakpointWidths as unknown as jest.Mock).mockImplementation(() => ({
        default: Infinity,
        sm: 640,
        md: 1024,
        lg: 1280,
        xl: 1536,
        '2xl': 1920,
    }));
};

describe('getTwSelectedBreakpoint', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        resetTwBreakpoints();
    });

    afterEach(() => {
        jest.clearAllMocks();
        resetTwBreakpoints();
    });

    it('should return "default" for non-object input', () => {
        mockMinMode();
        expect(getTwSelectedBreakpoint('string', 'md')).toEqual('default');
        expect(getTwSelectedBreakpoint(123, 'lg')).toEqual('default');
        expect(getTwSelectedBreakpoint(['array'], 'xl')).toEqual('default');
    });

    it('should return the specified breakpoint if it exists', () => {
        mockMinMode();
        const data = { sm: 'sm-value', lg: 'lg-value' };
        expect(getTwSelectedBreakpoint(data, 'sm')).toEqual('sm');
        expect(getTwSelectedBreakpoint(data, 'lg')).toEqual('lg');
    });

    it('should return the closest smallest breakpoint in MIN mode if specified breakpoint does not exist', () => {
        mockMinMode();
        const data = { sm: 'sm-value', lg: 'lg-value' };
        expect(getTwSelectedBreakpoint(data, 'md')).toEqual('sm');
        expect(getTwSelectedBreakpoint(data, 'xl')).toEqual('lg');
    });

    it('should return the closest smallest breakpoint in MIN mode if specified breakpoint does not exist and breakpoints are far', () => {
        mockMinMode();
        const data = { sm: 'sm-value', '2xl': 'lg-value' };
        expect(getTwSelectedBreakpoint(data, 'md')).toEqual('sm');
        expect(getTwSelectedBreakpoint(data, 'xl')).toEqual('sm');
    });

    it('should return the closest biggest breakpoint in MAX mode if specified breakpoint does not exist', () => {
        mockMaxMode();
        const data = { md: 'sm-value', xl: 'lg-value' };
        expect(getTwSelectedBreakpoint(data, 'sm')).toEqual('md');
        expect(getTwSelectedBreakpoint(data, 'lg')).toEqual('xl');
    });

    it('should return "default" if no breakpoints are defined', () => {
        mockMinMode();
        const data = {};
        expect(getTwSelectedBreakpoint(data, 'sm')).toEqual('default');
    });

    it('should return "default" if the specified breakpoint is not in the breakpoints list', () => {
        mockMinMode();
        const data = { sm: 'sm-value', lg: 'lg-value' };
        expect(getTwSelectedBreakpoint(data, 'unknown')).toEqual('default');
    });
});
