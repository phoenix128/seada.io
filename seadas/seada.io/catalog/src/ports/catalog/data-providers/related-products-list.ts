import { IDataProvider } from '@seada.io/core/spi/components/interface';
import adapterDataProvider from '@seada.io/core/spi/data-providers/adapter-data-provider';
import { IProductData } from '@seada.io/catalog/interface/product';
import catalogPortClass from '@seada.io/catalog/spi/catalog-port-class';

export interface IRelatedProductsListDataProviderResult {
    products: IProductData[];
}

const dataProvider: IDataProvider<IRelatedProductsListDataProviderResult> = (component, pageData, variables) =>
    adapterDataProvider(component, pageData, variables, catalogPortClass, 'related-products-list');

export default dataProvider;
