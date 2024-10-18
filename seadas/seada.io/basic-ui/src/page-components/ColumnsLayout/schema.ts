import { IPageComponentSchema, ISchema, ISchemaFieldsGroup } from '@seada.io/core-schema/spi/components/interface';
import { CgDisplayFlex, CgViewCols } from 'react-icons/cg';
import BoxSchema, { IBoxSchema } from '@seada.io/basic-ui/page-components/Box/schema';
import { ITwColumnsSchemaType } from '@seada.io/core-schema/schema-components/TwColumns/schema';
import { ITwGapSchemaType } from '@seada.io/core-schema/schema-components/TwGap/schema';

export type IColumnsLayoutLayoutSchema = ISchema<{
    columns?: ITwColumnsSchemaType;
    gap?: ITwGapSchemaType;
}>;

export type IColumnsLayoutSchema = ISchema<IColumnsLayoutLayoutSchema & IBoxSchema>;

export const SchemaGroupLayout: ISchemaFieldsGroup<IColumnsLayoutLayoutSchema> = {
    title: 'schema.basicUi.columnsLayout.layout',
    icon: CgDisplayFlex,
    fields: {
        columns: {
            label: 'schema.basicUi.columnsLayout.columns',
            type: '@seada.io/core-schema/TwColumns',
            responsive: true,
        },
        gap: {
            label: 'schema.basicUi.columnsLayout.gap',
            type: '@seada.io/core-schema/TwGap',
            responsive: true,
        },
    },
};

const Schema: IPageComponentSchema<IColumnsLayoutSchema> = {
    title: 'schema.basicUi.columnsLayout.componentTitle',
    description: 'schema.basicUi.columnsLayout.componentDescription',
    group: 'schema.basicUi.layout.groupTitle',
    icon: CgViewCols,
    maxChildren: Infinity,
    fields: {
        ...BoxSchema.fields,
        layout: SchemaGroupLayout,
    },
};

export default Schema;
