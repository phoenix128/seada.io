import { IPageComponentSchema, ISchema, ISchemaFieldsGroup } from '@seada.io/core-schema/spi/components/interface';
import { CgFileDocument, CgImage, CgScreen } from 'react-icons/cg';
import copySchemaFieldsWithDefaultValues from '@seada.io/core-schema/spi/components/copy-schema-fields-with-default-values';
import BoxSchema, { IBoxSchema } from '@seada.io/basic-ui/page-components/Box/schema';
import { IUrlSchemaType } from '@seada.io/core-schema/schema-components/Url/schema';
import { ISimpleTextSchemaType } from '@seada.io/core-schema/schema-components/SimpleText/schema';
import { ITwTextAlignSchemaType } from '@seada.io/core-schema/schema-components/TwTextAlign/schema';
import { ITwAlignItemsVerticalSchemaType } from '@seada.io/core-schema/schema-components/TwAlignItemsVertical/schema';
import { ITwTextColorSchemaType } from '@seada.io/core-schema/schema-components/TwTextColor/schema';

export type IBannerFieldsContentSchema = ISchema<{
    title?: ISimpleTextSchemaType;
    subtitle?: ISimpleTextSchemaType;
    buttonLabel?: ISimpleTextSchemaType;
    buttonLink?: IUrlSchemaType;
}>;

export type IBannerFieldsDisplaySchema = ISchema<{
    textAlign?: ITwTextAlignSchemaType;
    verticalAlign?: ITwAlignItemsVerticalSchemaType;
    titleColor?: ITwTextColorSchemaType;
    subtitleColor?: ITwTextColorSchemaType;
    buttonColor?: ITwTextColorSchemaType;
}>;

export type IBannerSchema = ISchema<IBannerFieldsContentSchema & IBannerFieldsDisplaySchema>;

export const SchemaGroupBannerContent: ISchemaFieldsGroup<IBannerFieldsContentSchema> = {
    title: 'schema.basicUi.banner.content.groupTitle',
    icon: CgFileDocument,
    sort: 20,
    fields: {
        title: {
            label: 'schema.basicUi.banner.content.title',
            type: '@seada.io/core-schema/SimpleText',
            defaultValue: 'Title',
            localizable: true,
        },
        subtitle: {
            label: 'schema.basicUi.banner.content.subtitle',
            type: '@seada.io/core-schema/SimpleText',
            defaultValue: 'Lorem Ipsum Dolor Sit Amet',
            localizable: true,
        },
        buttonLabel: {
            label: 'schema.basicUi.banner.content.buttonLabel',
            type: '@seada.io/core-schema/SimpleText',
            localizable: true,
        },
        buttonLink: {
            label: 'schema.basicUi.banner.content.buttonLink',
            type: '@seada.io/core-schema/Url',
            localizable: true,
        },
    },
};

export const SchemaGroupBannerDisplay: ISchemaFieldsGroup<IBannerFieldsDisplaySchema> = {
    title: 'schema.basicUi.banner.display.groupTitle',
    icon: CgScreen,
    fields: {
        textAlign: {
            label: 'schema.basicUi.banner.display.textAlign',
            type: '@seada.io/core-schema/TwTextAlign',
            defaultValue: 'center',
        },
        verticalAlign: {
            label: 'schema.basicUi.banner.display.verticalAlign',
            type: '@seada.io/core-schema/TwAlignItemsVertical',
            defaultValue: 'center',
        },
        titleColor: {
            label: 'schema.basicUi.banner.display.titleColor',
            type: '@seada.io/core-schema/TwTextColor',
            defaultValue: 'black',
        },
        subtitleColor: {
            label: 'schema.basicUi.banner.display.subtitleColor',
            type: '@seada.io/core-schema/TwTextColor',
            defaultValue: 'black',
        },
        buttonColor: {
            label: 'schema.basicUi.banner.display.buttonColor',
            type: '@seada.io/core-schema/TwTextColor',
            defaultValue: 'black',
        },
    },
};

const Schema: IPageComponentSchema<IBannerSchema> = {
    title: 'schema.basicUi.banner.componentTitle',
    description: 'schema.basicUi.banner.componentDescription',
    maxChildren: 0,
    group: 'schema.general.groupTitle',
    icon: CgImage,
    fields: {
        bannerContent: SchemaGroupBannerContent,
        bannerDisplay: SchemaGroupBannerDisplay,
        ...copySchemaFieldsWithDefaultValues<IBoxSchema>(BoxSchema.fields, {
            aspectRatio: 'square',
            overlayColor: 'gray-500',
            overlayOpacity: 50,
        }),
    },
};

export default Schema;
