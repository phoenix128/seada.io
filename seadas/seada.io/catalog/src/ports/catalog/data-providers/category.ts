import { IDataProvider } from '@seada.io/core/spi/components/interface';
import adapterDataProvider from '@seada.io/core/spi/data-providers/adapter-data-provider';
import { ICategoryData } from '@seada.io/catalog/interface/category';
import catalogPortClass from '@seada.io/catalog/spi/catalog-port-class';

export interface ICategoryDataProviderResult {
    category?: ICategoryData;
}

const dataProvider: IDataProvider<ICategoryDataProviderResult> = (component, pageData, variables) =>
    adapterDataProvider(component, pageData, variables, catalogPortClass, 'category');

export default dataProvider;
