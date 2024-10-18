import { IDataProvider } from '@seada.io/core/spi/components/interface';
import adapterDataProvider from '@seada.io/core/spi/data-providers/adapter-data-provider';
import { IProductsListData } from '@seada.io/catalog/interface/product';
import findComponent from '@seada.io/core/spi/seada-pages/manipulation/find-component';
import catalogPortClass from '@seada.io/catalog/spi/catalog-port-class';

export interface IProductsListDataProviderResult {
    productsList: IProductsListData;
}

const dataProvider: IDataProvider<IProductsListDataProviderResult> = (component, pageData, variables) => {
    const sourceComponent = component.props.componentReference
        ? findComponent(pageData, component.props.componentReference)
        : component;

    return adapterDataProvider(sourceComponent, pageData, variables, catalogPortClass, 'products-list');
};

export default dataProvider;
