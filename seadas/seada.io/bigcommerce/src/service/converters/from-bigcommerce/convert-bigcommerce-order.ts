import { IOrderData } from '@seada.io/customer/interface/orders';

const convertBigcommerceOrder = (order: any): IOrderData => {
    return {
        id: order.id,
        orderDate: new Date(order.date_created).toISOString(),
        orderNumber: order.id,
        status: order.status,
        total: order.total_inc_tax,
        currency: order.currency_code,
    };
};

export default convertBigcommerceOrder;
