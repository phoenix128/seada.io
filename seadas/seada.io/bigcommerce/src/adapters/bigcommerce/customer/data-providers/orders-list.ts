import { IDataProvider } from '@seada.io/core/spi/components/interface';
import managementApi from '@seada.io/bigcommerce/spi/rest/management-api';
import getSourceIdByPortClass from '@seada.io/core/spi/get-source-id-by-port-class';
import { IOrdersListDataProviderResult } from '@seada.io/customer/ports/customer/data-providers/orders-list';
import getUserDataFromPageData from '@seada.io/user/spi/get-user-data-from-page-data';
import convertBigcommerceOrder from '@seada.io/bigcommerce/service/converters/from-bigcommerce/convert-bigcommerce-order';
import customerPortClass from '@seada.io/customer/spi/customer-port-class';

const ordersList: IDataProvider<IOrdersListDataProviderResult> = (component, pageData) => {
    const sourceId = getSourceIdByPortClass(customerPortClass, pageData);
    const customerId = getUserDataFromPageData(pageData)?.userId;

    if (!customerId) {
        return {
            operationId: `bigcommerce-orders-list:empty`,
            loader: async () => ({
                ordersList: {
                    orders: [],
                    pagination: {
                        totalItems: 0,
                        totalPages: 0,
                        limit: 10,
                        currentPage: 1,
                    },
                },
            }),
        };
    }

    return {
        operationId: `bigcommerce-orders-list`,
        loader: async () => {
            const orders = await managementApi(sourceId, 'GET', '/v2/orders', {
                customer_id: customerId,
            });

            return {
                ordersList: {
                    orders: orders.map(convertBigcommerceOrder),
                    pagination: {
                        totalItems: orders.length,
                        totalPages: 1,
                        limit: 10,
                        currentPage: 1,
                    },
                },
            };
        },
    };
};

export default ordersList;
