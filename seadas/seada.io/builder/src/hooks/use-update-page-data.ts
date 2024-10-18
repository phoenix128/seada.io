import { useCallback, useContext } from 'react';
import PageDataContext from '@seada.io/core/contexts/PageDataContext';
import { IPageData } from '@seada.io/core/spi/components/interface';
import removePageDynamicData from '@seada.io/core/spi/seada-pages/manipulation/remove-page-dynamic-data';

interface IUpdatePageData {
    (newPageData: IPageData): void;
}

const useUpdatePageData = (): IUpdatePageData => {
    const { pageData, setPageData } = useContext(PageDataContext);

    return useCallback(
        (newPageData: IPageData) => {
            if (!pageData) {
                return;
            }

            const newPageDataNoDynamic = removePageDynamicData(newPageData);
            const pageDataNoDynamic = removePageDynamicData(pageData);

            if (JSON.stringify(newPageDataNoDynamic) !== JSON.stringify(pageDataNoDynamic)) {
                setPageData(newPageData);
            }
        },
        [pageData, setPageData]
    );
};

export default useUpdatePageData;
