import { IPageComponentSchema, ISchema, ISchemaFieldsGroup } from '@seada.io/core-schema/spi/components/interface';
import { CgData } from 'react-icons/cg';
import { ISimpleTextSchemaType } from '@seada.io/core-schema/schema-components/SimpleText/schema';

export type IPageDataContextSourceSchema = ISchema<{
    pageKey: ISimpleTextSchemaType;
}>;

export const SchemaGroupPageDataContextSource: ISchemaFieldsGroup<IPageDataContextSourceSchema> = {
    title: 'schema.content.pageContext.source.groupTitle',
    icon: CgData,
    fields: {
        pageKey: {
            label: 'schema.content.pageContext.source.pageKey',
            type: '@seada.io/core-schema/SimpleText',
        },
    },
};

export type IPageContextSchema = IPageDataContextSourceSchema;

const Schema: IPageComponentSchema<IPageContextSchema> = {
    title: 'schema.content.pageContext.componentTitle',
    description: 'schema.content.pageContext.componentDescription',
    group: 'schema.context.groupTitle',
    icon: CgData,
    maxChildren: Infinity,
    fields: {
        source: SchemaGroupPageDataContextSource,
    },
};

export default Schema;
