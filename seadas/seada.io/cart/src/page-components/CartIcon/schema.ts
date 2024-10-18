import { IPageComponentSchema, ISchema, ISchemaFieldsGroup } from '@seada.io/core-schema/spi/components/interface';
import { CgFormatText, CgShoppingCart } from 'react-icons/cg';
import BoxSchema, { IBoxSchema } from '@seada.io/basic-ui/page-components/Box/schema';
import copySchemaFieldsWithDefaultValues from '@seada.io/core-schema/spi/components/copy-schema-fields-with-default-values';
import { ISwitchSchemaType } from '@seada.io/core-schema/schema-components/Switch/schema';
import { IOnCartClickSchemaType } from '@seada.io/cart/schema-components/OnCartClick/schema';

export type ICartIconBehaviourSchema = ISchema<{
    displayCount: ISwitchSchemaType;
    onClick: IOnCartClickSchemaType;
}>;

export type ICartIconSchema = ISchema<IBoxSchema & ICartIconBehaviourSchema>;

export const SchemaGroupBehaviour: ISchemaFieldsGroup<ICartIconBehaviourSchema> = {
    title: 'schema.commerceUi.cartIcon.behaviour.groupTitle',
    icon: CgFormatText,
    fields: {
        displayCount: {
            label: 'schema.commerceUi.cartIcon.behaviour.displayCount',
            type: '@seada.io/core-schema/Switch',
            defaultValue: true,
        },
        onClick: {
            label: 'schema.commerceUi.cartIcon.behaviour.onClick',
            type: '@seada.io/cart/OnCartClick',
            defaultValue: 'sidecart',
            advanced: true,
        },
    },
};

const Schema: IPageComponentSchema<ICartIconSchema> = {
    title: 'schema.commerceUi.cartIcon.componentTitle',
    description: 'schema.commerceUi.cartIcon.componentDescription',
    group: 'schema.commerceUi.groupTitle',
    icon: CgShoppingCart,
    maxChildren: 0,
    fields: {
        behaviour: SchemaGroupBehaviour,
        ...copySchemaFieldsWithDefaultValues<IBoxSchema>(BoxSchema.fields, {
            size: '10',
        }),
    },
};

export default Schema;
