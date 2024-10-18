import BoxSchema, { IBoxSchema } from '@seada.io/basic-ui/page-components/Box/schema';
import { IPageComponentSchema, ISchema, ISchemaFieldsGroup } from '@seada.io/core-schema/spi/components/interface';
import { CgDisplayGrid } from 'react-icons/cg';
import { ITwColumnsSchemaType } from '@seada.io/core-schema/schema-components/TwColumns/schema';
import { ITwGapSchemaType } from '@seada.io/core-schema/schema-components/TwGap/schema';
import { ISwitchSchemaType } from '@seada.io/core-schema/schema-components/Switch/schema';

export type IGridLayoutLayoutSchema = ISchema<{
    columns?: ITwColumnsSchemaType;
    gap?: ITwGapSchemaType;
    innerBordersX?: ISwitchSchemaType;
    innerBordersY?: ISwitchSchemaType;
}>;

export type IGridLayoutSchema = ISchema<IBoxSchema & IGridLayoutLayoutSchema>;

export const SchemaGroupGridLayout: ISchemaFieldsGroup = {
    title: 'schema.basicUi.grid.layout.groupTitle',
    icon: CgDisplayGrid,
    fields: {
        columns: {
            label: 'schema.basicUi.grid.layout.columns',
            type: '@seada.io/core-schema/TwGridColumns',
            responsive: true,
            defaultValue: 2,
        },
        gap: {
            label: 'schema.basicUi.grid.layout.gap',
            type: '@seada.io/core-schema/TwGap',
            responsive: true,
            defaultValue: 2,
        },
        innerBordersX: {
            label: 'schema.basicUi.grid.layout.innerBordersX',
            type: '@seada.io/core-schema/Switch',
            defaultValue: false,
        },
        innerBordersY: {
            label: 'schema.basicUi.grid.layout.innerBordersY',
            type: '@seada.io/core-schema/Switch',
            defaultValue: false,
        },
    },
};

const Schema: IPageComponentSchema<IGridLayoutSchema> = {
    title: 'schema.basicUi.grid.componentTitle',
    description: 'schema.basicUi.grid.componentDescription',
    group: 'schema.basicUi.layout.groupTitle',
    icon: CgDisplayGrid,
    maxChildren: Infinity,
    fields: {
        gridLayout: SchemaGroupGridLayout,
        ...BoxSchema.fields,
    },
};

export default Schema;
