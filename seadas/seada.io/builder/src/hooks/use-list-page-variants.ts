import listPageVariants from '@seada.io/builder/server-actions/list-page-variants';
import { useCallback, useEffect } from 'react';
import useAsyncAction from '@seada.io/core/hooks/use-async-action';

export interface IUseListPageVariants {
    variants: string[];
    error: Error | null;
    loading: boolean;
    reload: (pageType: string) => void;
}

const useListPageVariants = (areaCode: string, pageType: string): IUseListPageVariants => {
    const { action, data, error, loading } = useAsyncAction(listPageVariants);

    const reload = useCallback(
        (pageType: string) => {
            if (!pageType) return;
            action(areaCode, pageType);
        },
        [action, areaCode]
    );

    useEffect(() => {
        reload(pageType);
    }, [pageType, reload]);

    return { variants: data, error, loading, reload };
};

export default useListPageVariants;
