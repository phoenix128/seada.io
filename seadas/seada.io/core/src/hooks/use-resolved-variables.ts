import { useMemo } from 'react';
import convertVariables from '@seada.io/core/spi/convert-variables';
import useDataContext from '@seada.io/core/hooks/use-data-context';

/**
 * Apply variables conversion to the props
 * @param props
 */
const useResolvedVariables = <TProps = Record<string, any>>(props: TProps) => {
    const nestableContextData = useDataContext();
    return useMemo(() => {
        if (!nestableContextData) {
            return props;
        }

        return convertVariables(props, nestableContextData);
    }, [nestableContextData, props]);
};

export default useResolvedVariables;
