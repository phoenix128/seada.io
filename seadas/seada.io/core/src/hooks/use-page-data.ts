import { useContext } from 'react';
import PageDataContext from '@seada.io/core/contexts/PageDataContext';
import { IPageData } from '@seada.io/core/spi/components/interface';

const usePageData = (): IPageData => {
    const context = useContext(PageDataContext);
    if (!context) {
        throw new Error('usePageData must be used within a PageDataContextProvider');
    }

    return context.pageData;
};

export default usePageData;
