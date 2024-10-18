import React, { ChangeEvent, useCallback, useContext } from 'react';
import BuilderContext from '@seada.io/builder/contexts/BuilderContext';
import { useTranslation } from 'react-i18next';
import useTwBreakpoints from '@seada.io/core/hooks/tw/use-tw-breakpoints';
import { Select, SelectItem } from '@nextui-org/react';
import { twMerge } from 'tailwind-merge';
import { CgLaptop, CgMaximize, CgScreen, CgScreenWide, CgSmartphone } from 'react-icons/cg';
import { IconType } from 'react-icons';
import useTwBreakpointWidths from '@seada.io/core/hooks/tw/use-tw-breakpoint-widths';

export interface IBreakpointSelectorProps {
    className?: string;
}

const breakpointsIcon: Record<string, IconType> = {
    xs: CgSmartphone,
    sm: CgSmartphone,
    md: CgLaptop,
    lg: CgScreen,
    xl: CgScreenWide,
    '2xl': CgScreenWide,
    default: CgMaximize,
};

const BreakpointSelector: React.FC<IBreakpointSelectorProps> = ({ className }) => {
    const { setCurrentTwBreakpoint, currentTwBreakpoint } = useContext(BuilderContext);
    const { t } = useTranslation();

    const breakpointWidths = useTwBreakpointWidths();
    const breakpoints = useTwBreakpoints();

    const handleChange = useCallback(
        (evt: ChangeEvent<HTMLSelectElement>) => {
            setCurrentTwBreakpoint(evt.target.value);
        },
        [setCurrentTwBreakpoint]
    );

    const SelectedIcon = breakpointsIcon[currentTwBreakpoint];

    return (
        <Select
            size={'sm'}
            variant={'faded'}
            isLoading={!currentTwBreakpoint}
            label={t('builder.breakpointSelector')}
            className={twMerge(className, 'w-56')}
            selectedKeys={currentTwBreakpoint ? [currentTwBreakpoint] : []}
            onChange={handleChange}
            startContent={SelectedIcon && <SelectedIcon className={'w-4 h-4 text-gray-500'} />}
        >
            {breakpoints.map((breakpoint) => {
                const Icon = breakpointsIcon[breakpoint] || CgMaximize;

                return (
                    <SelectItem
                        key={breakpoint}
                        value={breakpoint}
                        startContent={<Icon className={'w-4 h-4 text-gray-500'} />}
                        endContent={
                            breakpoint === 'default' ? null : (
                                <span className={'text-gray-500'}>{breakpointWidths[breakpoint]}px</span>
                            )
                        }
                    >
                        {t(`builder.breakpoints.${breakpoint}`)}
                    </SelectItem>
                );
            })}
        </Select>
    );
};

export default BreakpointSelector;
