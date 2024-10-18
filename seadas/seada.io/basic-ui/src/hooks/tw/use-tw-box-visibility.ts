import { useMemo } from 'react';
import useTwBreakpoints from '@seada.io/core/hooks/tw/use-tw-breakpoints';
import { twMerge } from 'tailwind-merge';
import { ITwVisibilitySchemaType } from '@seada.io/core-schema/schema-components/TwVisibility/schema';

export type IBoxVisibilitySchema = {
    visibility?: ITwVisibilitySchemaType;
};

export interface IBoxVisibilityProps {
    visibility?: string;
}

/**
 * Get the variant for a utility at a specific breakpoint
 * @param utility
 * @param breakpoint
 */
const getVariant = (utility: string, breakpoint: string): string => {
    if (breakpoint === 'default') {
        return utility;
    }

    return `${breakpoint}:${utility}`;
};

/**
 * Extract the utility from a breakpoint variant
 * @param utility
 */
const extractUtility = (utility: string): string => {
    return utility.includes(':') ? utility.split(':', 2)[1] : utility;
};

/**
 * Process visibility classes and use hidden as generic utility to disable any kind of display utility
 * @param props
 * @param existingUtilitiesIn
 */
const useTwProcessVisibilityClasses = (props: IBoxVisibilityProps, existingUtilitiesIn: string): string => {
    const breakpoints = useTwBreakpoints(); // ['default', 'lg', 'md', 'sm', 'xs']

    return useMemo(() => {
        const visibilityUtilities = props.visibility ? props.visibility.split(/\s+/) : [];
        const existingUtilities = existingUtilitiesIn.split(/\s+/);

        const displayUtilities = [
            'block',
            'inline-block',
            'inline',
            'flex',
            'inline-flex',
            'grid',
            'inline-grid',
            'table',
            'table-row',
            'table-cell',
            'inline-table',
            'table-caption',
            'table-column',
            'table-column-group',
            'table-footer-group',
            'table-header-group',
            'table-row-group',
            'flow-root',
            'contents',
            'list-item',
            'hidden',
        ];

        const conflictingUtilities = [];
        const rollbackUtilities = [];

        let shouldDisplay = true;
        let lastDisplayUtility = 'block';
        for (let i = 0; i < breakpoints.length; i++) {
            const breakpoint = breakpoints[i];
            const breakpointHiddenUtility = getVariant('hidden', breakpoint);
            const breakpointVisibleUtility = getVariant('visible', breakpoint);
            const breakpointInvisibleUtility = getVariant('invisible', breakpoint);

            // Get all the possible variants for the display utilities
            const otherBreakpointDisplayUtilities = displayUtilities.map((displayClass) =>
                getVariant(displayClass, breakpoint)
            );

            // Current breakpoint display utility
            const breakpointDisplay = existingUtilities.find((utility) =>
                otherBreakpointDisplayUtilities.includes(utility)
            );

            if (visibilityUtilities.includes(breakpointHiddenUtility)) {
                shouldDisplay = false;
            } else if (
                visibilityUtilities.includes(breakpointVisibleUtility) ||
                visibilityUtilities.includes(breakpointInvisibleUtility)
            ) {
                if (!breakpointDisplay) {
                    rollbackUtilities.push(getVariant(lastDisplayUtility, breakpoint));
                }
                shouldDisplay = true;
            }

            // Remove conflicting utilities until a display utility is found
            if (!shouldDisplay) {
                const breakpointConflicts = existingUtilities.filter((utility) =>
                    otherBreakpointDisplayUtilities.includes(utility)
                );

                conflictingUtilities.push(...breakpointConflicts);
            }

            if (breakpointDisplay) {
                lastDisplayUtility = extractUtility(breakpointDisplay);
            }
        }

        const filteredUtilities = existingUtilities.filter((utility) => !conflictingUtilities.includes(utility));
        return twMerge(...filteredUtilities, ...visibilityUtilities, ...rollbackUtilities);
    }, [breakpoints, existingUtilitiesIn, props.visibility]);
};

export default useTwProcessVisibilityClasses;
