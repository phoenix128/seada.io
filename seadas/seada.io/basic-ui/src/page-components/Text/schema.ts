import { IPageComponentSchema, ISchema, ISchemaFieldsGroup } from '@seada.io/core-schema/spi/components/interface';
import { ITextAppearanceSchema } from '@seada.io/basic-ui/hooks/tw/use-tw-text-appearance';
import { CgEye, CgFormatText } from 'react-icons/cg';
import BoxSchema, { IBoxSchema } from '@seada.io/basic-ui/page-components/Box/schema';
import { ISwitchSchemaType } from '@seada.io/core-schema/schema-components/Switch/schema';
import { ISimpleTextSchemaType } from '@seada.io/core-schema/schema-components/SimpleText/schema';

export type ITextContentSchema = ISchema<{
    hasHtml?: ISwitchSchemaType;
    text?: ISimpleTextSchemaType;
}>;

export type ITextSchema = ISchema<ITextAppearanceSchema & IBoxSchema & ITextContentSchema>;

export const SchemaGroupTextAppearance: ISchemaFieldsGroup<ITextAppearanceSchema> = {
    title: 'schema.basicUi.text.appearance.groupTitle',
    icon: CgEye,
    fields: {
        fontSize: {
            label: 'schema.basicUi.text.appearance.size',
            type: '@seada.io/core-schema/TwFontSize',
            responsive: true,
            defaultValue: 'base',
        },
        textAlign: {
            label: 'schema.basicUi.text.appearance.align',
            type: '@seada.io/core-schema/TwTextAlign',
            defaultValue: 'left',
            options: {
                extended: false,
                forceDirection: 'col',
            },
        },
        textColor: {
            label: 'schema.basicUi.text.appearance.color',
            type: '@seada.io/core-schema/TwTextColor',
            defaultValue: 'black',
        },
        letterSpacing: {
            label: 'schema.basicUi.text.appearance.spacing',
            type: '@seada.io/core-schema/TwLetterSpacing',
            responsive: true,
            defaultValue: 'normal',
            advanced: true,
        },
        leading: {
            label: 'schema.basicUi.text.appearance.leading',
            type: '@seada.io/core-schema/TwLeading',
            responsive: true,
            defaultValue: 'normal',
            advanced: true,
        },
        fontWeight: {
            label: 'schema.basicUi.text.appearance.weight',
            type: '@seada.io/core-schema/TwFontWeight',
            responsive: true,
            defaultValue: 'normal',
        },
        fontStyle: {
            label: 'schema.basicUi.text.appearance.style',
            type: '@seada.io/core-schema/TwFontStyle',
            defaultValue: 'not-italic',
        },
        textDecoration: {
            label: 'schema.basicUi.text.appearance.decoration',
            type: '@seada.io/core-schema/TwTextDecoration',
            defaultValue: 'no-underline',
        },
        textDecorationColor: {
            label: 'schema.basicUi.text.appearance.decorationColor',
            type: '@seada.io/core-schema/TwTextDecorationColor',
            defaultValue: 'black',
        },
    },
};

export const SchemaGroupTextContent: ISchemaFieldsGroup<ITextContentSchema> = {
    title: 'schema.basicUi.text.content.groupTitle',
    icon: CgFormatText,
    fields: {
        hasHtml: {
            label: 'schema.basicUi.text.content.hasHtml',
            type: '@seada.io/core-schema/Switch',
            defaultValue: false,
            advanced: true,
        },
        text: {
            label: 'schema.basicUi.text.content.text',
            type: '@seada.io/core-schema/SimpleText',
            localizable: true,
            defaultValue: 'Lorem Ipsum...',
        },
    },
};

const Schema: IPageComponentSchema<ITextSchema> = {
    title: 'schema.basicUi.text.componentTitle',
    description: 'schema.basicUi.text.componentDescription',
    icon: CgFormatText,
    group: 'schema.general.groupTitle',
    maxChildren: 0,
    fields: {
        textContent: SchemaGroupTextContent,
        textAppearance: SchemaGroupTextAppearance,
        ...BoxSchema.fields,
    },
};

export default Schema;
