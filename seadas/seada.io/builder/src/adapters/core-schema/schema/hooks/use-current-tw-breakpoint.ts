import { useContext } from 'react';
import BuilderContext from '@seada.io/builder/contexts/BuilderContext';
import { IUseCurrentTwBreakpoint } from '@seada.io/core-schema/ports/schema/hooks/use-current-tw-breakpoint-port';

const useCurrentTwBreakpoint: IUseCurrentTwBreakpoint = () => {
    const { currentTwBreakpoint } = useContext(BuilderContext);
    return currentTwBreakpoint;
};

export default useCurrentTwBreakpoint;
