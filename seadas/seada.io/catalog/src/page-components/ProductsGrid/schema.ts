import { IPageComponentSchema, ISchema, ISchemaFieldsGroup } from '@seada.io/core-schema/spi/components/interface';
import { CgDisplayGrid, CgList } from 'react-icons/cg';
import GridSchema, { IGridLayoutSchema } from '@seada.io/basic-ui/page-components/GridLayout/schema';
import { ISimpleNumberSchemaType } from '@seada.io/core-schema/schema-components/SimpleNumber/schema';

export type IProductsListSchema = ISchema<{
    productsPerPage: ISimpleNumberSchemaType;
}>;

export const SchemaGroupProductsList: ISchemaFieldsGroup<IProductsListSchema> = {
    title: 'schema.commerce.productsGrid.productsList.groupTitle',
    icon: CgList,
    fields: {
        productsPerPage: {
            label: 'schema.commerce.productsGrid.productsList.productsPerPage',
            type: '@seada.io/core-schema/SimpleNumber',
            defaultValue: 12,
        },
    },
};

export type IProductsGridSchema = IProductsListSchema & IGridLayoutSchema;

const Schema: IPageComponentSchema<IProductsGridSchema> = {
    title: 'schema.commerce.productsGrid.componentTitle',
    description: 'schema.commerce.productsGrid.componentDescription',
    group: 'schema.commerce.productsList.groupTitle',
    icon: CgDisplayGrid,
    maxChildren: 0,
    fields: {
        productsList: SchemaGroupProductsList,
        ...GridSchema.fields,
    },
};

export default Schema;
