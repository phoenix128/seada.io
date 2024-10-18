import BoxSchema, { IBoxSchema } from '@seada.io/basic-ui/page-components/Box/schema';
import { IPageComponentSchema } from '@seada.io/core-schema/spi/components/interface';
import { CgPen } from 'react-icons/cg';

export type IModifyUserDataSchema = IBoxSchema;

const Schema: IPageComponentSchema<IModifyUserDataSchema> = {
    title: 'schema.userUi.modifyUserData.componentTitle',
    description: 'schema.userUi.modifyUserData.componentDescription',
    group: 'schema.userUi.groupTitle',
    icon: CgPen,
    maxChildren: 0,
    fields: {
        ...BoxSchema.fields,
    },
};

export default Schema;
