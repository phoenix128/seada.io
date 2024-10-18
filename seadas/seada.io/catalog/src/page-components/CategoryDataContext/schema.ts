import { IPageComponentSchema, ISchema, ISchemaFieldsGroup } from '@seada.io/core-schema/spi/components/interface';
import { CgData } from 'react-icons/cg';
import { ICatalogCategorySchemaType } from '@seada.io/catalog/schema-components/Category/schema';

export type ICategoryDataContextSourceSchema = ISchema<{
    categoryKey: ICatalogCategorySchemaType;
}>;

export const SchemaGroupCategoryDataContextSource: ISchemaFieldsGroup<ICategoryDataContextSourceSchema> = {
    title: 'schema.commerce.categoryContext.source.groupTitle',
    icon: CgData,
    fields: {
        categoryKey: {
            label: 'schema.commerce.categoryContext.source.categoryKey',
            type: '@seada.io/catalog/Category',
            options: {
                maxItems: 1,
            },
        },
    },
};

export type ICategoryContextSchema = ICategoryDataContextSourceSchema;

const Schema: IPageComponentSchema<ICategoryContextSchema> = {
    title: 'schema.commerce.categoryContext.componentTitle',
    description: 'schema.commerce.categoryContext.componentDescription',
    group: 'schema.context.groupTitle',
    icon: CgData,
    maxChildren: Infinity,
    fields: {
        source: SchemaGroupCategoryDataContextSource,
    },
};

export default Schema;
