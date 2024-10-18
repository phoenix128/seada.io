import { IDataProvider } from '@seada.io/core/spi/components/interface';
import adapterDataProvider from '@seada.io/core/spi/data-providers/adapter-data-provider';
import { IProductCardData } from '@seada.io/catalog/interface/product';
import catalogPortClass from '@seada.io/catalog/spi/catalog-port-class';

export interface IProductCardDataProviderResult {
    product?: IProductCardData;
}

const dataProvider: IDataProvider<IProductCardDataProviderResult> = (component, pageData, variables) =>
    adapterDataProvider(component, pageData, variables, catalogPortClass, 'product-card');

export default dataProvider;
