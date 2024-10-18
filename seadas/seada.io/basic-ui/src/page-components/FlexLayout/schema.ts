import { IPageComponentSchema, ISchema, ISchemaFieldsGroup } from '@seada.io/core-schema/spi/components/interface';
import { CgDisplayFlex } from 'react-icons/cg';
import BoxSchema, { IBoxSchema } from '@seada.io/basic-ui/page-components/Box/schema';
import { ITwFlexDirectionSchemaType } from '@seada.io/core-schema/schema-components/TwFlexDirection/schema';
import { ITwFlexAlignItemsSchemaType } from '@seada.io/core-schema/schema-components/TwFlexAlignItems/schema';
import { ITwFlexJustifySchemaType } from '@seada.io/core-schema/schema-components/TwFlexJustify/schema';
import { ITwGapSchemaType } from '@seada.io/core-schema/schema-components/TwGap/schema';

export type IFlexLayoutLayoutSchema = ISchema<{
    flexDirection?: ITwFlexDirectionSchemaType;
    flexAlign?: ITwFlexAlignItemsSchemaType;
    flexJustify?: ITwFlexJustifySchemaType;
    gap?: ITwGapSchemaType;
}>;

export type IFlexLayoutSchema = ISchema<IFlexLayoutLayoutSchema & IBoxSchema>;

export const SchemaGroupFlex: ISchemaFieldsGroup<IFlexLayoutLayoutSchema> = {
    title: 'schema.basicUi.flexLayout.groupTitle',
    icon: CgDisplayFlex,
    fields: {
        flexDirection: {
            label: 'schema.basicUi.flexLayout.flexDirection',
            type: '@seada.io/core-schema/TwFlexDirection',
            responsive: true,
            defaultValue: 'row',
        },
        flexAlign: {
            label: 'schema.basicUi.flexLayout.flexAlign',
            type: '@seada.io/core-schema/TwFlexAlignItems',
            responsive: true,
            defaultValue: 'start',
            options: {
                directionProp: 'flexDirection',
            },
        },
        flexJustify: {
            label: 'schema.basicUi.flexLayout.flexJustify',
            type: '@seada.io/core-schema/TwFlexJustify',
            responsive: true,
            defaultValue: 'start',
            advanced: true,
            options: {
                extended: true,
                directionProp: 'flexDirection',
            },
        },
        gap: {
            label: 'schema.basicUi.flexLayout.gap',
            type: '@seada.io/core-schema/TwGap',
            responsive: true,
            defaultValue: 0,
        },
    },
};

const Schema: IPageComponentSchema<IFlexLayoutSchema> = {
    title: 'schema.basicUi.flexLayout.componentTitle',
    description: 'schema.basicUi.flexLayout.componentDescription',
    group: 'schema.basicUi.layout.groupTitle',
    icon: CgDisplayFlex,
    maxChildren: Infinity,
    fields: {
        flexLayout: SchemaGroupFlex,
        ...BoxSchema.fields,
    },
};

export default Schema;
