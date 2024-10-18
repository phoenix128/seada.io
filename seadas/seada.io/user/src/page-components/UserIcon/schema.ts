import { IPageComponentSchema } from '@seada.io/core-schema/spi/components/interface';
import { CgUser } from 'react-icons/cg';
import BoxSchema, { IBoxSchema } from '@seada.io/basic-ui/page-components/Box/schema';

export type IUserIconSchema = IBoxSchema;

const Schema: IPageComponentSchema<IUserIconSchema> = {
    title: 'schema.userUi.userIcon.componentTitle',
    description: 'schema.userUi.userIcon.componentDescription',
    group: 'schema.userUi.groupTitle',
    icon: CgUser,
    maxChildren: 0,
    fields: {
        ...BoxSchema.fields,
    },
};

export default Schema;
