import { IPageComponentSchema, ISchema, ISchemaFieldsGroup } from '@seada.io/core-schema/spi/components/interface';
import { CgData } from 'react-icons/cg';
import { IProductsPickerSchemaType } from '@seada.io/catalog/schema-components/ProductsPicker/schema';

export type IProductDataContextSourceSchema = ISchema<{
    productKey: IProductsPickerSchemaType;
}>;

export const SchemaGroupProductDataContextSource: ISchemaFieldsGroup<IProductDataContextSourceSchema> = {
    title: 'schema.commerce.productContext.source.groupTitle',
    icon: CgData,
    fields: {
        productKey: {
            label: 'schema.commerce.productContext.source.productKey',
            type: '@seada.io/catalog/ProductsPicker',
            options: {
                maxItems: 1,
            },
        },
    },
};

export type IProductDataContextSchema = IProductDataContextSourceSchema;

const Schema: IPageComponentSchema<IProductDataContextSchema> = {
    title: 'schema.commerce.productContext.componentTitle',
    description: 'schema.commerce.productContext.componentDescription',
    group: 'schema.context.groupTitle',
    icon: CgData,
    maxChildren: Infinity,
    fields: {
        source: SchemaGroupProductDataContextSource,
    },
};

export default Schema;
