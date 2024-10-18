import { IPageComponentSchema, ISchema, ISchemaFieldsGroup } from '@seada.io/core-schema/spi/components/interface';
import { CgShoppingCart } from 'react-icons/cg';
import { ISwitchSchemaType } from '@seada.io/core-schema/schema-components/Switch/schema';
import { ISimpleNumberSchemaType } from '@seada.io/core-schema/schema-components/SimpleNumber/schema';

export type ISideCartBehaviourSchema = ISchema<{
    autoOpen: ISwitchSchemaType;
    autoOpenGracePeriod: ISimpleNumberSchemaType;
    autoCloseTimeout: ISimpleNumberSchemaType;
    autoCloseTimeoutOnMouseLeave: ISimpleNumberSchemaType;
}>;

export type ISideCartSchema = ISideCartBehaviourSchema;

export const SchemaBehaviour: ISchemaFieldsGroup<ISideCartBehaviourSchema> = {
    title: 'schema.commerceUi.sideCart.behaviour.groupTitle',
    fields: {
        autoOpen: {
            label: 'schema.commerceUi.sideCart.behaviour.autoOpen',
            type: '@seada.io/core-schema/Switch',
            defaultValue: false,
        },
        autoOpenGracePeriod: {
            label: 'schema.commerceUi.sideCart.behaviour.autoOpenGracePeriod',
            type: '@seada.io/core-schema/SimpleNumber',
            defaultValue: 1000,
            advanced: true,
        },
        autoCloseTimeout: {
            label: 'schema.commerceUi.sideCart.behaviour.autoCloseTimeout',
            type: '@seada.io/core-schema/SimpleNumber',
            defaultValue: 5000,
        },
        autoCloseTimeoutOnMouseLeave: {
            label: 'schema.commerceUi.sideCart.behaviour.autoCloseTimeoutOnMouseLeave',
            type: '@seada.io/core-schema/SimpleNumber',
            defaultValue: 500,
            advanced: true,
        },
    },
};

const Schema: IPageComponentSchema<ISideCartSchema> = {
    title: 'schema.commerceUi.sideCart.componentTitle',
    description: 'schema.commerceUi.sideCart.componentDescription',
    group: 'schema.commerceUi.groupTitle',
    icon: CgShoppingCart,
    maxChildren: 0,
    fields: {
        behaviour: SchemaBehaviour,
    },
};

export default Schema;
