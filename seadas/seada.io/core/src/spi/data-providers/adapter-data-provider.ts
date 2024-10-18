import { IPageComponentDefinition } from '@seada.io/core/spi/seada-pages/interface';
import { IDataProviderConfig, IPageData, IVariables } from '@seada.io/core/spi/components/interface';
import getDataProviderAdapter from '@seada.io/core/spi/adapters/get-data-provider-adapter';

const adapterDataProvider = <TData = any>(
    component: IPageComponentDefinition,
    pageData: IPageData,
    variables: IVariables,
    portClass: string,
    portCode: string
): IDataProviderConfig<TData> => {
    const dataProvider = getDataProviderAdapter<TData>(pageData, portClass, portCode);
    if (!dataProvider) {
        console.warn(`Can't find data provider adapter "${portClass}/${portCode}" for area "${pageData.areaCode}"`);
        return null;
    }

    return dataProvider(component, pageData, variables);
};

export default adapterDataProvider;
