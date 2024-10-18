import { IPageComponentSchema } from '@seada.io/core-schema/spi/components/interface';
import { CgList } from 'react-icons/cg';
import BoxSchema, { IBoxSchema } from '@seada.io/basic-ui/page-components/Box/schema';

export type IOrdersTableSchema = IBoxSchema;

const Schema: IPageComponentSchema<IOrdersTableSchema> = {
    title: 'schema.customer.ordersTable.componentTitle',
    description: 'schema.customer.ordersTable.componentDescription',
    group: 'schema.general.groupTitle',
    icon: CgList,
    maxChildren: 0,
    fields: {
        ...BoxSchema.fields,
    },
};

export default Schema;
