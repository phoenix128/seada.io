import { useContext } from 'react';
import PageDataContext from '@seada.io/core/contexts/PageDataContext';
import { ICorePageRouterAreaDefinition } from '@seada.io/core/spi/page-router/interface';

const useAreaDefinition = (): ICorePageRouterAreaDefinition => {
    const context = useContext(PageDataContext);
    if (!context) {
        throw new Error('usePageData must be used within a PageDataContextProvider');
    }

    return context.areaDefinition;
};

export default useAreaDefinition;
