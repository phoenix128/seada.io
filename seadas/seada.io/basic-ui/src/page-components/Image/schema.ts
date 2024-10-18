import { IPageComponentSchema, ISchema, ISchemaFieldsGroup } from '@seada.io/core-schema/spi/components/interface';
import { CgImage } from 'react-icons/cg';
import { ITextSchema } from '@seada.io/basic-ui/page-components/Text/schema';
import copySchemaFieldsWithDefaultValues from '@seada.io/core-schema/spi/components/copy-schema-fields-with-default-values';
import BoxSchema, { IBoxSchema } from '@seada.io/basic-ui/page-components/Box/schema';
import copySchemaFieldsWithoutGroups from '@seada.io/core-schema/spi/components/copy-schema-fields-without-groups';
import { ISimpleTextSchemaType } from '@seada.io/core-schema/schema-components/SimpleText/schema';
import { ISimpleNumberSchemaType } from '@seada.io/core-schema/schema-components/SimpleNumber/schema';
import { IImageSchemaType } from '@seada.io/core-schema/schema-components/Image/schema';

export type IImageImageSchema = ISchema<{
    imageUrl?: IImageSchemaType;
    title?: ISimpleTextSchemaType;
    sourceWidth?: ISimpleNumberSchemaType;
    sourceHeight?: ISimpleNumberSchemaType;
}>;

export type IImageSchema = ISchema<ITextSchema & IImageImageSchema>;

export const SchemaGroupImageImage: ISchemaFieldsGroup<IImageImageSchema> = {
    title: 'schema.basicUi.image.image.groupTitle',
    icon: CgImage,
    fields: {
        imageUrl: {
            label: 'schema.basicUi.image.image.image',
            type: '@seada.io/core-schema/Image',
            responsive: true,
        },
        title: {
            label: 'schema.basicUi.image.image.title',
            type: '@seada.io/core-schema/SimpleText',
            responsive: true,
        },
        sourceWidth: {
            label: 'schema.basicUi.image.image.sourceWidth',
            type: '@seada.io/core-schema/SimpleNumber',
            defaultValue: 600,
        },
        sourceHeight: {
            label: 'schema.basicUi.image.image.sourceHeight',
            type: '@seada.io/core-schema/SimpleNumber',
            defaultValue: 600,
        },
    },
};

const Schema: IPageComponentSchema<IImageSchema> = {
    title: 'schema.basicUi.image.componentTitle',
    description: 'schema.basicUi.image.componentDescription',
    group: 'schema.general.groupTitle',
    icon: CgImage,
    maxChildren: 0,
    fields: {
        image: SchemaGroupImageImage,
        ...copySchemaFieldsWithDefaultValues<IBoxSchema>(
            copySchemaFieldsWithoutGroups(BoxSchema.fields, ['background']),
            {
                aspectRatio: 'auto',
            }
        ),
    },
};

export default Schema;
