import { IPageComponentSchema, ISchema, ISchemaFieldsGroup } from '@seada.io/core-schema/spi/components/interface';
import { CgArrowsScrollH, CgLink } from 'react-icons/cg';
import PaginationSchema, { IPaginationSchema } from '@seada.io/basic-ui/components/Pagination/schema';
import { IComponentReferenceSchemaType } from '@seada.io/core-schema/schema-components/ComponentReference/schema';

export type IReferenceReferenceSchema = ISchema<{
    componentReference: IComponentReferenceSchemaType;
}>;

export const SchemaGroupReferenceList: ISchemaFieldsGroup<IReferenceReferenceSchema> = {
    title: 'schema.commerce.productsPagination.productsList.groupTitle',
    icon: CgLink,
    fields: {
        componentReference: {
            label: 'schema.commerce.productsPagination.productsList.reference',
            type: '@seada.io/core-schema/ComponentReference',
            options: {
                requiredProps: ['productsPerPage'],
            },
        },
    },
};

export type IProductsPaginationSchema = IReferenceReferenceSchema & IPaginationSchema;

const Schema: IPageComponentSchema<IProductsPaginationSchema> = {
    title: 'schema.commerce.productsPagination.componentTitle',
    description: 'schema.commerce.productsPagination.componentDescription',
    group: 'schema.commerce.productsList.groupTitle',
    maxChildren: 0,
    icon: CgArrowsScrollH,
    fields: {
        reference: SchemaGroupReferenceList,
        ...PaginationSchema.fields,
    },
};

export default Schema;
