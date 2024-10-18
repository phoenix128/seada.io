import TextSchema, { ITextSchema } from '@seada.io/basic-ui/page-components/Text/schema';
import { IPageComponentSchema } from '@seada.io/core-schema/spi/components/interface';
import { CgToolbarTop } from 'react-icons/cg';
import copySchemaFieldsWithoutGroups from '@seada.io/core-schema/spi/components/copy-schema-fields-without-groups';

export type ISearchTermSchema = ITextSchema;

const Schema: IPageComponentSchema<ISearchTermSchema> = {
    title: 'schema.search.searchTerm.componentTitle',
    description: 'schema.search.searchTerm.componentDescription',
    icon: CgToolbarTop,
    group: 'schema.search.groupTitle',
    maxChildren: 0,
    fields: {
        ...copySchemaFieldsWithoutGroups(TextSchema.fields, ['textContent', 'hasHtml']),
    },
};

export default Schema;
