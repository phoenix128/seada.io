'use client';

import React from 'react';
import Box from '@seada.io/basic-ui/page-components/Box';
import { IOrdersTableSchema } from '@seada.io/customer/page-components/OrdersTable/schema';
import { IOrdersListDataProviderResult } from '@seada.io/customer/ports/customer/data-providers/orders-list';
import { getKeyValue, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react';
import useOrdersTableColumnsList from '@seada.io/customer/hooks/use-orders-table-columns-list';
import { IPageComponentSchemaPropsWithDataProvider } from '@seada.io/core-schema/spi/components/interface';
import { IOrderData } from '@seada.io/customer/interface/orders';
import SeadaTable from '@seada.io/foundation-ui/components/SeadaTable';

const OrdersTable: React.FC<
    IPageComponentSchemaPropsWithDataProvider<IOrdersTableSchema, IOrdersListDataProviderResult>
> = (props) => {
    const ordersList = props.providersData.ordersList.orders;
    const { columns, columnsByKey } = useOrdersTableColumnsList();

    return (
        <Box {...props}>
            <SeadaTable>
                <TableHeader columns={columns}>
                    {(column) => (
                        <TableColumn
                            key={column.uid}
                            align={column.uid === 'actions' ? 'center' : 'start'}
                            allowsSorting={column?.sortable}
                        >
                            {column.label}
                        </TableColumn>
                    )}
                </TableHeader>
                <TableBody emptyContent={'No users found'} items={ordersList}>
                    {(order: IOrderData) => (
                        <TableRow key={order.id}>
                            {(columnKey) => {
                                const Renderer = columnsByKey[columnKey].renderer;

                                return (
                                    <TableCell>
                                        <Renderer order={order} value={getKeyValue(order, columnKey)} />
                                    </TableCell>
                                );
                            }}
                        </TableRow>
                    )}
                </TableBody>
            </SeadaTable>
        </Box>
    );
};

export default OrdersTable;
