import { IDataProvider, IDataProvidersCollection } from '@seada.io/core/spi/components/interface';

/**
 * Get data providers for component type
 * @param type
 * @param dataProviders
 */
const getDataProviders = <TData = any>(
    type: string,
    dataProviders?: IDataProvidersCollection
): IDataProvider<TData>[] => {
    if (dataProviders?.[type]) {
        if (Array.isArray(dataProviders[type])) {
            return dataProviders[type] as IDataProvider<TData>[];
        }

        return [dataProviders[type] as IDataProvider<TData>];
    }

    return null;
};

export default getDataProviders;
