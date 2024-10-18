import { IUsePageDataAdapter } from '@seada.io/core-schema/ports/schema/hooks/use-page-data-port';
import { useContext } from 'react';
import BuilderContext from '@seada.io/builder/contexts/BuilderContext';

const usePageData: IUsePageDataAdapter = () => {
    const { pageData } = useContext(BuilderContext);
    return pageData;
};

export default usePageData;
