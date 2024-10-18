import { IPageComponentSchema } from '@seada.io/core-schema/spi/components/interface';
import SimpleNavSchema, { ISimpleNavSchema } from '@seada.io/basic-ui/components/SimpleNav/schema';

export type ICategoryNavBarSchema = ISimpleNavSchema;

const Schema: IPageComponentSchema<ICategoryNavBarSchema> = {
    ...SimpleNavSchema,
    title: 'schema.commerce.categoryNavBar.componentTitle',
    description: 'schema.commerce.categoryNavBar.componentDescription',
    group: 'schema.commerce.groupTitle',
};

export default Schema;
