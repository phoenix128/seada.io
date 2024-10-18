import { IPageComponentSchema, ISchema, ISchemaFieldsGroup } from '@seada.io/core-schema/spi/components/interface';
import { CgLogIn, CgUser } from 'react-icons/cg';
import BoxSchema, { IBoxSchema } from '@seada.io/basic-ui/page-components/Box/schema';
import { ILoginRedirectSchemaType } from '@seada.io/user/schema-components/LoginRedirect/schema';

export enum ELoginRedirect {
    None = 'none',
    Home = 'home',
    Account = 'account',
}

export type ILoginFormBehaviourSchema = ISchema<{
    redirect: ILoginRedirectSchemaType;
}>;

export type ILoginFormSchema = IBoxSchema & ILoginFormBehaviourSchema;

export const SchemaGroupLoginFormBehaviour: ISchemaFieldsGroup<ILoginFormBehaviourSchema> = {
    title: 'schema.userUi.loginForm.behaviour.groupTitle',
    icon: CgUser,
    fields: {
        redirect: {
            type: '@seada.io/user/LoginRedirect',
            label: 'schema.userUi.loginForm.behaviour.loginRedirect',
            defaultValue: ELoginRedirect.Account,
        },
    },
};

const Schema: IPageComponentSchema<ILoginFormSchema> = {
    title: 'schema.userUi.loginForm.componentTitle',
    description: 'schema.userUi.loginForm.componentDescription',
    group: 'schema.userUi.groupTitle',
    icon: CgLogIn,
    maxChildren: 0,
    fields: {
        behaviour: SchemaGroupLoginFormBehaviour,
        ...BoxSchema.fields,
    },
};

export default Schema;
