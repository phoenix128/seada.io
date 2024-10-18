import { useMemo } from 'react';
import localizeProps from '@seada.io/core/spi/locale/localize-props';
import usePageData from '@seada.io/core/hooks/use-page-data';

/**
 * Apply variables conversion to the props
 * @param props
 */
const useLocalizedVariables = <TProps = Record<string, any>>(props: TProps) => {
    const { locale, allLocales } = usePageData();
    return useMemo(() => localizeProps(props, locale, allLocales), [allLocales, locale, props]);
};

export default useLocalizedVariables;
