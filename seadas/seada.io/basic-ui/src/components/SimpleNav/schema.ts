import { IPageComponentSchema, ISchema, ISchemaFieldsGroup } from '@seada.io/core-schema/spi/components/interface';
import { CgMenu } from 'react-icons/cg';
import BoxSchema, { IBoxSchema } from '@seada.io/basic-ui/page-components/Box/schema';
import { ITwFlexJustifySchemaType } from '@seada.io/core-schema/schema-components/TwFlexJustify/schema';
import { ITwFontSizeSchemaType } from '@seada.io/core-schema/schema-components/TwFontSize/schema';
import { ITwFontWeightSchemaType } from '@seada.io/core-schema/schema-components/TwFontWeight/schema';
import { ITwLetterSpacingSchemaType } from '@seada.io/core-schema/schema-components/TwLetterSpacing/schema';
import { ITwTextColorSchemaType } from '@seada.io/core-schema/schema-components/TwTextColor/schema';
import { ITwFontStyleSchemaType } from '@seada.io/core-schema/schema-components/TwFontStyle/schema';
import { IMobileModeSchemaType } from '@seada.io/core-schema/schema-components/MobileMode/schema';

export type ISimpleNavAppearanceSchema = ISchema<{
    mobileMenu: IMobileModeSchemaType;
    justify: ITwFlexJustifySchemaType;
    fontSize: ITwFontSizeSchemaType;
    fontWeight: ITwFontWeightSchemaType;
    letterSpacing: ITwLetterSpacingSchemaType;
    textColor: ITwTextColorSchemaType;
    fontStyle: ITwFontStyleSchemaType;
}>;

export type ISimpleNavSchema = ISchema<ISimpleNavAppearanceSchema & IBoxSchema>;

export const SchemaGroupNavBarMenuItems: ISchemaFieldsGroup<ISimpleNavAppearanceSchema> = {
    title: 'schema.basicUi.simpleNav.appearance.groupTitle',
    icon: CgMenu,
    fields: {
        mobileMenu: {
            label: 'schema.basicUi.simpleNav.appearance.mobileMenu',
            type: '@seada.io/core-schema/MobileMode',
            defaultValue: {
                default: false,
                sm: true,
            },
            responsive: true,
        },
        justify: {
            label: 'schema.basicUi.simpleNav.appearance.justify',
            type: '@seada.io/core-schema/TwFlexJustify',
            responsive: true,
            defaultValue: {
                default: 'center',
                sm: 'start',
            },
            options: {
                withNormal: false,
                extended: false,
                forceDirection: 'row',
            },
        },
        fontSize: {
            label: 'schema.basicUi.text.appearance.size',
            type: '@seada.io/core-schema/TwFontSize',
            responsive: true,
            defaultValue: 'base',
            advanced: true,
        },
        fontWeight: {
            label: 'schema.basicUi.text.appearance.weight',
            type: '@seada.io/core-schema/TwFontWeight',
            responsive: true,
            defaultValue: 'normal',
            advanced: true,
        },
        letterSpacing: {
            label: 'schema.basicUi.text.appearance.spacing',
            type: '@seada.io/core-schema/TwLetterSpacing',
            responsive: true,
            defaultValue: 'normal',
            advanced: true,
        },
        textColor: {
            label: 'schema.basicUi.text.appearance.color',
            type: '@seada.io/core-schema/TwTextColor',
            defaultValue: 'black',
        },
        fontStyle: {
            label: 'schema.basicUi.text.appearance.style',
            type: '@seada.io/core-schema/TwFontStyle',
            defaultValue: 'not-italic',
            advanced: true,
        },
    },
};

const Schema: IPageComponentSchema<ISimpleNavSchema> = {
    title: 'schema.basicUi.simpleNav.componentTitle',
    group: 'schema.basicUi.layout.groupTitle',
    description: 'schema.basicUi.simpleNav.componentDescription',
    icon: CgMenu,
    maxChildren: 0,
    fields: {
        menuItems: SchemaGroupNavBarMenuItems,
        ...BoxSchema.fields,
    },
};

export default Schema;
