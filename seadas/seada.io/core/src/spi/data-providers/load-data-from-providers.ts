import { IPageData } from '@seada.io/core/spi/components/interface';
import getProvidersData from '@seada.io/core/service/data-providers/get-providers-data';
import hydratePageComponents from '@seada.io/core/service/data-providers/hydrate-page-components';

const loadDataFromProviders = async (pageData: IPageData, componentIds: string[] = undefined): Promise<IPageData> => {
    const providedData = await getProvidersData(pageData, componentIds);
    return hydratePageComponents(pageData, providedData);
};

export default loadDataFromProviders;
