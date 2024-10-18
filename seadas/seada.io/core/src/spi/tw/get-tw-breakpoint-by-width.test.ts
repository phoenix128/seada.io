import getTwBreakpointByWidth from '@seada.io/core/spi/tw/get-tw-breakpoint-by-width';

import getTwBreakpointsSortMode, { ESortMode } from '@seada.io/core/spi/tw/get-tw-breakpoints-sort-mode';
import getTwBreakpointWidths from '@seada.io/core/spi/tw/get-tw-breakpoint-widths';

jest.mock('@seada.io/core/spi/tw/get-tw-breakpoint-widths');
jest.mock('@seada.io/core/spi/tw/get-tw-breakpoints-sort-mode');

describe('getTwBreakpointByWidth', () => {
    it('should return the correct breakpoint for a given width in MIN mode', () => {
        (getTwBreakpointsSortMode as unknown as jest.Mock).mockImplementation(() => ESortMode.MIN);
        (getTwBreakpointWidths as unknown as jest.Mock).mockImplementation(() => ({
            default: 0,
            sm: 640,
            md: 1024,
            lg: 1280,
            xl: 1536,
            '2xl': 1920,
        }));

        expect(getTwBreakpointByWidth(500)).toBe('default');
        expect(getTwBreakpointByWidth(700)).toBe('sm');
        expect(getTwBreakpointByWidth(1100)).toBe('md');
        expect(getTwBreakpointByWidth(1300)).toBe('lg');
        expect(getTwBreakpointByWidth(1600)).toBe('xl');
        expect(getTwBreakpointByWidth(3600)).toBe('2xl');
    });

    it('should return the correct breakpoint for a given width in MAX mode', () => {
        (getTwBreakpointsSortMode as unknown as jest.Mock).mockImplementation(() => ESortMode.MAX);
        (getTwBreakpointWidths as unknown as jest.Mock).mockImplementation(() => ({
            default: Infinity,
            sm: 640,
            md: 1024,
            lg: 1280,
            xl: 1536,
            '2xl': 1920,
        }));

        expect(getTwBreakpointByWidth(500)).toBe('sm');
        expect(getTwBreakpointByWidth(700)).toBe('md');
        expect(getTwBreakpointByWidth(1100)).toBe('lg');
        expect(getTwBreakpointByWidth(1300)).toBe('xl');
        expect(getTwBreakpointByWidth(1600)).toBe('2xl');
        expect(getTwBreakpointByWidth(3600)).toBe('default');
    });
});
