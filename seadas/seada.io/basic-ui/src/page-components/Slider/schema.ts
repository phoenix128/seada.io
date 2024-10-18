import { IPageComponentSchema, ISchema, ISchemaFieldsGroup } from '@seada.io/core-schema/spi/components/interface';
import { CgCarousel, CgImage, CgPlayList } from 'react-icons/cg';
import BoxSchema, { IBoxSchema } from '@seada.io/basic-ui/page-components/Box/schema';
import { ISimpleNumberSchemaType } from '@seada.io/core-schema/schema-components/SimpleNumber/schema';
import { ISwitchSchemaType } from '@seada.io/core-schema/schema-components/Switch/schema';

export type ISliderAppearanceSchema = ISchema<{
    slidesPerView: ISimpleNumberSchemaType;
    spaceBetween?: ISimpleNumberSchemaType;
    navigation?: ISwitchSchemaType;
    pagination?: ISwitchSchemaType;
    centeredSlides?: ISwitchSchemaType;
}>;

export type ISliderPlaySchema = ISchema<{
    autoplay?: ISwitchSchemaType;
    autoplayDelay?: ISimpleNumberSchemaType;
    pauseOnMouseEnter?: ISwitchSchemaType;
}>;

export type ISliderSchema = ISchema<ISliderPlaySchema & ISliderAppearanceSchema & IBoxSchema>;

export const SchemaGroupSliderAppearance: ISchemaFieldsGroup<ISliderAppearanceSchema> = {
    title: 'schema.basicUi.slider.appearance.groupTitle',
    icon: CgImage,
    fields: {
        slidesPerView: {
            label: 'schema.basicUi.slider.appearance.slidesPerView',
            type: '@seada.io/core-schema/SimpleNumber',
            responsive: true,
            defaultValue: 1,
        },
        spaceBetween: {
            label: 'schema.basicUi.slider.appearance.spaceBetween',
            type: '@seada.io/core-schema/SimpleNumber',
            responsive: true,
            defaultValue: 10,
        },
        navigation: {
            label: 'schema.basicUi.slider.appearance.navigation',
            type: '@seada.io/core-schema/Switch',
            defaultValue: false,
        },
        pagination: {
            label: 'schema.basicUi.slider.appearance.pagination',
            type: '@seada.io/core-schema/Switch',
            defaultValue: false,
        },
        centeredSlides: {
            label: 'schema.basicUi.slider.appearance.centeredSlides',
            type: '@seada.io/core-schema/Switch',
            defaultValue: false,
        },
    },
};

export const SchemaGroupSliderPlay: ISchemaFieldsGroup<ISliderPlaySchema> = {
    title: 'schema.basicUi.slider.play.groupTitle',
    icon: CgPlayList,
    fields: {
        autoplay: {
            label: 'schema.basicUi.slider.play.autoplay',
            type: '@seada.io/core-schema/Switch',
            defaultValue: false,
        },
        autoplayDelay: {
            label: 'schema.basicUi.slider.play.autoplayDelay',
            type: '@seada.io/core-schema/SimpleNumber',
            defaultValue: 5000,
        },
        pauseOnMouseEnter: {
            label: 'schema.basicUi.slider.play.pauseOnMouseEnter',
            type: '@seada.io/core-schema/Switch',
            defaultValue: false,
        },
    },
};

const Schema: IPageComponentSchema<ISliderSchema> = {
    title: 'schema.basicUi.slider.componentTitle',
    description: 'schema.basicUi.slider.componentDescription',
    group: 'schema.general.groupTitle',
    icon: CgCarousel,
    maxChildren: Infinity,
    fields: {
        appearance: SchemaGroupSliderAppearance,
        play: SchemaGroupSliderPlay,
        ...BoxSchema.fields,
    },
};

export default Schema;
