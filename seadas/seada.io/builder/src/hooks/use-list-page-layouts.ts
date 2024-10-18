import { useEffect } from 'react';
import listPageLayouts from '@seada.io/builder/server-actions/list-page-layouts';
import useAsyncAction from '@seada.io/core/hooks/use-async-action';

export interface IUseListPageVariants {
    layouts: string[];
    error: Error | null;
    loading: boolean;
}

const useListPageLayouts = (areaCode: string): IUseListPageVariants => {
    const { action, loading, data, error } = useAsyncAction(listPageLayouts);

    useEffect(() => {
        action(areaCode);
    }, [action, areaCode]);

    return { layouts: data, error, loading };
};

export default useListPageLayouts;
