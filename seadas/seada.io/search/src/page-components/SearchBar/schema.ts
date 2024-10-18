import { IPageComponentSchema, ISchema, ISchemaFieldsGroup } from '@seada.io/core-schema/spi/components/interface';
import { CgSearch } from 'react-icons/cg';
import BoxSchema, { IBoxSchema } from '@seada.io/basic-ui/page-components/Box/schema';
import { ISimpleNumberSchemaType } from '@seada.io/core-schema/schema-components/SimpleNumber/schema';

export type ISearchBarSearchSchema = ISchema<{
    maxResults?: ISimpleNumberSchemaType;
    minChars?: ISimpleNumberSchemaType;
}>;

export type ISearchBarSchema = IBoxSchema & ISearchBarSearchSchema;

export const SchemaGroupSearch: ISchemaFieldsGroup<ISearchBarSearchSchema> = {
    title: 'schema.search.searchBar.search.groupTitle',
    icon: CgSearch,
    fields: {
        minChars: {
            label: 'schema.search.searchBar.search.minChars',
            type: '@seada.io/core-schema/SimpleNumber',
            defaultValue: 2,
        },
        maxResults: {
            label: 'schema.search.searchBar.search.maxResults',
            type: '@seada.io/core-schema/SimpleNumber',
            defaultValue: 5,
        },
    },
};

const Schema: IPageComponentSchema<ISearchBarSchema> = {
    title: 'schema.search.searchBar.componentTitle',
    description: 'schema.search.searchBar.componentDescription',
    group: 'schema.search.groupTitle',
    icon: CgSearch,
    maxChildren: 0,
    fields: {
        searchBar: SchemaGroupSearch,
        ...BoxSchema.fields,
    },
};

export default Schema;
