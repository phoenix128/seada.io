import useTwBreakpointsWidth from '@seada.io/core/hooks/tw/use-tw-breakpoints-width';
import { useWindowSize } from 'usehooks-ts';
import { useEffect, useState } from 'react';

const useTwBreakpoint = (): string => {
    const breakpointsWidth = useTwBreakpointsWidth();
    const [breakpoint, setBreakpoint] = useState<string>('default');

    const { width } = useWindowSize({
        debounceDelay: 100,
    });

    useEffect(() => {
        let matchedBreakpoint: string = 'default';

        for (const [key, max] of Object.entries(breakpointsWidth).sort((a, b) => b[1] - a[1])) {
            if (width <= max) {
                matchedBreakpoint = key;
            }
        }

        setBreakpoint(matchedBreakpoint);
    }, [breakpointsWidth, width]);

    return breakpoint;
};

export default useTwBreakpoint;
