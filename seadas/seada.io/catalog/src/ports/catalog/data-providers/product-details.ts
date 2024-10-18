import { IProductData } from '@seada.io/catalog/interface/product';
import { IDataProvider } from '@seada.io/core/spi/components/interface';
import adapterDataProvider from '@seada.io/core/spi/data-providers/adapter-data-provider';
import catalogPortClass from '@seada.io/catalog/spi/catalog-port-class';

export interface IProductDetailsDataProviderResult {
    product?: IProductData;
}

const dataProvider: IDataProvider<IProductDetailsDataProviderResult> = (component, pageData, variables) =>
    adapterDataProvider(component, pageData, variables, catalogPortClass, 'product-details');

export default dataProvider;
