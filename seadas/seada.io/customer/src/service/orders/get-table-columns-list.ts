import React from 'react';
import DateRenderer from '@seada.io/customer/components/OrderTableRenderers/DateRenderer';
import { IOrderTableRendererProps } from '@seada.io/customer/components/OrderTableRenderers/interface';
import TextRenderer from '@seada.io/customer/components/OrderTableRenderers/TextRenderer';
import CurrencyRender from '@seada.io/customer/components/OrderTableRenderers/CurrencyRenderer';

export interface ITableColumn {
    uid: string;
    label: string;
    sortable?: boolean;
    renderer: React.FC<IOrderTableRendererProps>;
}

const getTableColumnsList = (): ITableColumn[] => {
    return [
        {
            uid: 'orderNumber',
            label: 'customer.order.number',
            sortable: true,
            renderer: TextRenderer,
        },
        {
            uid: 'orderDate',
            label: 'customer.order.date',
            sortable: true,
            renderer: DateRenderer,
        },
        {
            uid: 'status',
            label: 'customer.order.status',
            sortable: true,
            renderer: TextRenderer,
        },
        {
            uid: 'total',
            label: 'customer.order.total',
            sortable: true,
            renderer: CurrencyRender,
        },
    ];
};

export default getTableColumnsList;
