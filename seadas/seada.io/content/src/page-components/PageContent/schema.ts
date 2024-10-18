import { IPageComponentSchema } from '@seada.io/core-schema/spi/components/interface';
import { CgFormatText } from 'react-icons/cg';
import TextSchema, { ITextSchema } from '@seada.io/basic-ui/page-components/Text/schema';
import copySchemaFieldsWithoutGroups from '@seada.io/core-schema/spi/components/copy-schema-fields-without-groups';

export type IPageContentSchema = ITextSchema;

const Schema: IPageComponentSchema<IPageContentSchema> = {
    title: 'schema.content.pageContent.componentTitle',
    description: 'schema.content.pageContent.componentDescription',
    group: 'schema.content.page.groupTitle',
    icon: CgFormatText,
    maxChildren: 0,
    fields: {
        ...copySchemaFieldsWithoutGroups(TextSchema.fields, ['textContent', 'hasHtml']),
    },
};

export default Schema;
