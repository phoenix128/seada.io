import { IPageComponentSchema, ISchema, ISchemaFieldsGroup } from '@seada.io/core-schema/spi/components/interface';
import { CgEyeAlt, CgImage, CgRuler, CgSquare } from 'react-icons/cg';
import { IBoxGeometrySchema } from '@seada.io/basic-ui/hooks/tw/use-tw-box-geometry-classes';
import { IBoxBackgroundSchema } from '@seada.io/basic-ui/hooks/tw/use-tw-box-background-classes';
import { IBoxBordersSchema } from '@seada.io/basic-ui/hooks/tw/use-tw-box-border-classes';
import { IBoxVisibilitySchema } from '@seada.io/basic-ui/hooks/tw/use-tw-box-visibility';

export type IBoxSchema = ISchema<IBoxGeometrySchema & IBoxBackgroundSchema & IBoxBordersSchema & IBoxVisibilitySchema>;

export const SchemaGroupBoxGeneral: ISchemaFieldsGroup<IBoxVisibilitySchema> = {
    title: 'schema.basicUi.box.visibility.groupTitle',
    sort: 0,
    icon: CgEyeAlt,
    fields: {
        visibility: {
            label: 'schema.basicUi.box.visibility.visibility',
            type: '@seada.io/core-schema/TwVisibility',
            advanced: true,
            defaultValue: 'visible',
            responsive: true,
        },
    },
};

export const SchemaGroupBoxGeometry: ISchemaFieldsGroup<IBoxGeometrySchema> = {
    title: 'schema.basicUi.box.geometry.groupTitle',
    sort: 50,
    icon: CgRuler,
    fields: {
        size: {
            label: 'schema.basicUi.box.geometry.size',
            type: '@seada.io/core-schema/TwSizeDimensions',
            responsive: true,
            defaultValue: 'full',
        },
        minSize: {
            label: 'schema.basicUi.box.geometry.minSize',
            type: '@seada.io/core-schema/TwMinSizeDimensions',
            responsive: true,
            advanced: true,
            defaultValue: 'auto',
        },
        maxSize: {
            label: 'schema.basicUi.box.geometry.maxSize',
            type: '@seada.io/core-schema/TwMaxSizeDimensions',
            responsive: true,
            advanced: true,
            defaultValue: 'auto',
        },
        margin: {
            label: 'schema.basicUi.box.geometry.margin',
            type: '@seada.io/core-schema/TwMargin',
            responsive: true,
            defaultValue: 0,
        },
        padding: {
            label: 'schema.basicUi.box.geometry.padding',
            type: '@seada.io/core-schema/TwPadding',
            responsive: true,
            defaultValue: 0,
        },
        aspectRatio: {
            label: 'schema.basicUi.box.geometry.aspectRatio',
            type: '@seada.io/core-schema/TwAspectRatio',
            responsive: true,
            defaultValue: 'auto',
        },
    },
};

export const SchemaGroupBoxBackground: ISchemaFieldsGroup<IBoxBackgroundSchema> = {
    title: 'schema.basicUi.box.background.groupTitle',
    icon: CgImage,
    sort: 1000,
    fields: {
        backgroundImage: {
            label: 'schema.basicUi.box.background.backgroundImage',
            type: '@seada.io/core-schema/TwBackgroundImage',
            responsive: true,
        },
        overlayColor: {
            label: 'schema.basicUi.box.background.overlayColor',
            type: '@seada.io/core-schema/TwBackgroundColor',
            options: {
                withTransparent: true,
            },
            defaultValue: 'transparent',
        },
        overlayOpacity: {
            label: 'schema.basicUi.box.background.overlayOpacity',
            type: '@seada.io/core-schema/TwBackgroundOpacity',
            defaultValue: 100,
        },
    },
};

export const SchemaGroupBoxBorders: ISchemaFieldsGroup<IBoxBordersSchema> = {
    title: 'schema.basicUi.box.borders.groupTitle',
    icon: CgSquare,
    fields: {
        borderWidth: {
            label: 'schema.basicUi.box.borders.borderWidth',
            type: '@seada.io/core-schema/TwBorderWidth',
            responsive: true,
            defaultValue: '0',
        },
        borderRadius: {
            label: 'schema.basicUi.box.borders.borderRadius',
            type: '@seada.io/core-schema/TwBorderRadius',
            responsive: true,
            defaultValue: 'none',
        },
        borderColor: {
            label: 'schema.basicUi.box.borders.borderColor',
            type: '@seada.io/core-schema/TwBorderColor',
            defaultValue: 'black',
        },
        borderStyle: {
            label: 'schema.basicUi.box.borders.borderStyle',
            type: '@seada.io/core-schema/TwBorderStyle',
            defaultValue: 'solid',
        },
    },
};

const Schema: IPageComponentSchema<IBoxSchema> = {
    title: 'schema.basicUi.box.componentTitle',
    description: 'schema.basicUi.box.componentDescription',
    maxChildren: Infinity,
    group: 'schema.general.groupTitle',
    icon: CgSquare,
    fields: {
        visibility: SchemaGroupBoxGeneral,
        boxGeometry: SchemaGroupBoxGeometry,
        borders: SchemaGroupBoxBorders,
        background: SchemaGroupBoxBackground,
    },
};

export default Schema;
