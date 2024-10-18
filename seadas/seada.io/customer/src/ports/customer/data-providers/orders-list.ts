import { IDataProvider } from '@seada.io/core/spi/components/interface';
import adapterDataProvider from '@seada.io/core/spi/data-providers/adapter-data-provider';
import { IOrdersListData } from '@seada.io/customer/interface/orders';
import customerPortClass from '@seada.io/customer/spi/customer-port-class';

export interface IOrdersListDataProviderResult {
    ordersList: IOrdersListData;
}

const dataProvider: IDataProvider<IOrdersListDataProviderResult> = (component, pageData, variables) =>
    adapterDataProvider(component, pageData, variables, customerPortClass, 'orders-list');

export default dataProvider;
