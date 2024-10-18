import { useMemo } from 'react';
import getTableColumnsList, { ITableColumn } from '@seada.io/customer/service/orders/get-table-columns-list';
import { useTranslation } from 'react-i18next';

export interface IUseTableColumnsList {
    columns: ITableColumn[];
    columnsByKey: Record<string, ITableColumn>;
}

const useOrdersTableColumnsList = (): IUseTableColumnsList => {
    const { t } = useTranslation();
    return useMemo(() => {
        const res = getTableColumnsList().map<ITableColumn>((column) => ({
            ...column,
            label: t(column.label),
        }));

        return {
            columns: res,
            columnsByKey: res.reduce<Record<string, ITableColumn>>((acc, column) => {
                acc[column.uid] = column;
                return acc;
            }, {}),
        };
    }, [t]);
};

export default useOrdersTableColumnsList;
