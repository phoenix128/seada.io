import { IDataProvider, IPageData, ISourcesProvidersCollection } from '@seada.io/core/spi/components/interface';
import getSourceAdapterCodeById from '@seada.io/core/spi/get-source-adapter-code-by-id';
import getSourceIdByPortClass from '@seada.io/core/spi/get-source-id-by-port-class';

/**
 * Get data provider for source type
 * @param pageData
 * @param portClass
 * @param portCode
 * @param dataProviderAdapters
 */
const getDataProviderAdapter = <TData = any>(
    pageData: IPageData,
    portClass: string,
    portCode: string,
    dataProviderAdapters?: ISourcesProvidersCollection
): IDataProvider<TData> => {
    const fqPort = `${portClass}/${portCode}`;

    const sourceId = getSourceIdByPortClass(portClass, pageData);
    const sourceAdapter = getSourceAdapterCodeById(sourceId, pageData);

    if (dataProviderAdapters?.[sourceAdapter]?.[fqPort]) {
        return dataProviderAdapters[sourceAdapter][fqPort] as IDataProvider<TData>;
    }

    return null;
};

export default getDataProviderAdapter;
