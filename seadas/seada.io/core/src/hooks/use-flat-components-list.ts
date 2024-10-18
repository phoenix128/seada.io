import { useMemo } from 'react';
import getFlatComponentsList from '@seada.io/core/spi/seada-pages/manipulation/get-flat-components-list';
import { IPageData } from '@seada.io/core/spi/components/interface';

const useFlatComponentsList = (pageData: IPageData, excludeIds: string[] = []) => {
    return useMemo(() => {
        return getFlatComponentsList(pageData).filter((e) => !excludeIds.includes(e.id));
    }, [excludeIds, pageData]);
};

export default useFlatComponentsList;
