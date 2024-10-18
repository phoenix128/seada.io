import { IPageComponentSchema } from '@seada.io/core-schema/spi/components/interface';
import { CgTab } from 'react-icons/cg';
import GridLayoutSchema, { IGridLayoutSchema } from '@seada.io/basic-ui/page-components/GridLayout/schema';

export type IModifyAddressesSchema = IGridLayoutSchema;

const Schema: IPageComponentSchema<IModifyAddressesSchema> = {
    title: 'schema.customer.modifyAddresses.componentTitle',
    description: 'schema.customer.modifyAddresses.componentDescription',
    group: 'schema.general.groupTitle',
    icon: CgTab,
    maxChildren: 0,
    fields: {
        ...GridLayoutSchema.fields,
    },
};

export default Schema;
