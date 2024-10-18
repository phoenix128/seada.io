import { IPageComponentSchema } from '@seada.io/core-schema/spi/components/interface';
import { CgFile } from 'react-icons/cg';
import BoxSchema, { IBoxSchema } from '@seada.io/basic-ui/page-components/Box/schema';

export type IPageContentSchema = IBoxSchema;

const Schema: IPageComponentSchema<IPageContentSchema> = {
    title: 'schema.basicUi.pageContent.componentTitle',
    description: 'schema.basicUi.pageContent.componentDescription',
    group: 'schema.basicUi.structure.groupTitle',
    icon: CgFile,
    maxChildren: 0,
    fields: {
        ...BoxSchema.fields,
    },
};

export default Schema;
