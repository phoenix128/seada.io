import { IDataProvider } from '@seada.io/core/spi/components/interface';
import adapterDataProvider from '@seada.io/core/spi/data-providers/adapter-data-provider';
import { INavBarData } from '@seada.io/basic-ui/interface/simple-nav';
import catalogPortClass from '@seada.io/catalog/spi/catalog-port-class';

export interface IINavBarDataProviderResult {
    navBar: INavBarData;
}

const dataProvider: IDataProvider<IINavBarDataProviderResult> = (component, pageData, variables) =>
    adapterDataProvider(component, pageData, variables, catalogPortClass, 'category-nav-bar');

export default dataProvider;
