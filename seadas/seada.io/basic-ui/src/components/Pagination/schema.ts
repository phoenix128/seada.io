import { IPageComponentSchema, ISchema, ISchemaFieldsGroup } from '@seada.io/core-schema/spi/components/interface';
import { CgArrowsScrollH, CgScreen } from 'react-icons/cg';
import BoxSchema, { IBoxSchema } from '@seada.io/basic-ui/page-components/Box/schema';
import { ITwFlexAlignItemsSchemaType } from '@seada.io/core-schema/schema-components/TwFlexAlignItems/schema';
import { ISwitchSchemaType } from '@seada.io/core-schema/schema-components/Switch/schema';
import { IDropdownSchemaType } from '@seada.io/core-schema/schema-components/Dropdown/schema';

export type IPaginationAppearanceSchema = ISchema<{
    align?: ITwFlexAlignItemsSchemaType;
    showControls?: ISwitchSchemaType;
    siblings?: IDropdownSchemaType;
}>;

export type IPaginationSchema = IPaginationAppearanceSchema & IBoxSchema;

export const SchemaAppearanceFlex: ISchemaFieldsGroup<IPaginationAppearanceSchema> = {
    title: 'schema.basicUi.pagination.appearance.groupTitle',
    icon: CgScreen,
    fields: {
        showControls: {
            label: 'schema.basicUi.pagination.appearance.showControls',
            defaultValue: false,
            advanced: true,
            type: '@seada.io/core-schema/Switch',
        },
        align: {
            label: 'schema.basicUi.pagination.appearance.align',
            type: '@seada.io/core-schema/TwFlexAlignItems',
            defaultValue: 'center',
            options: {
                extended: false,
                forceDirection: 'col',
            },
        },
        siblings: {
            label: 'schema.basicUi.pagination.appearance.siblings',
            type: '@seada.io/core-schema/Dropdown',
            defaultValue: '1',
            advanced: true,
            options: {
                options: ['1', '2', '3'],
            },
        },
    },
};

const Schema: IPageComponentSchema = {
    title: 'schema.basicUi.pagination.title',
    group: 'schema.basicUi.layout.groupTitle',
    maxChildren: 0,
    description: 'schema.basicUi.pagination.componentDescription',
    icon: CgArrowsScrollH,
    fields: {
        layout: SchemaAppearanceFlex,
        ...BoxSchema.fields,
    },
};

export default Schema;
