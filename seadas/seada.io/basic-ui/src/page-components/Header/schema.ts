import TextSchema, { ITextSchema } from '@seada.io/basic-ui/page-components/Text/schema';
import { IPageComponentSchema } from '@seada.io/core-schema/spi/components/interface';
import { CgToolbarTop } from 'react-icons/cg';
import copySchemaFieldsWithoutGroups from '@seada.io/core-schema/spi/components/copy-schema-fields-without-groups';

export type IHeaderSchema = ITextSchema;

const Schema: IPageComponentSchema<IHeaderSchema> = {
    title: 'schema.basicUi.header.componentTitle',
    description: 'schema.basicUi.header.componentDescription',
    icon: CgToolbarTop,
    group: 'schema.basicUi.page.groupTitle',
    maxChildren: 0,
    fields: {
        ...copySchemaFieldsWithoutGroups(TextSchema.fields, ['textContent', 'hasHtml']),
    },
};

export default Schema;
