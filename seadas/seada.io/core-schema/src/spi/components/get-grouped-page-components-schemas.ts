import getPageComponentsSchemaCollection from '@seada.io/core-schema/spi/components/get-page-components-schema-collection';
import { IPageComponentSchema } from '@seada.io/core-schema/spi/components/interface';

export interface IGroupedPageComponentsCollection {
    [key: string]: Record<string, IPageComponentSchema>;
}

/**
 * Get page components collection
 */
const getGroupedPageComponentsSchemas = (): IGroupedPageComponentsCollection => {
    const schemas = getPageComponentsSchemaCollection();
    const res: IGroupedPageComponentsCollection = {};

    return Object.entries(schemas).reduce<IGroupedPageComponentsCollection>((acc, [componentName, schema]) => {
        const { group } = schema;
        const groupCode = group || 'schema.general.groupTitle';

        if (!res[groupCode]) {
            res[groupCode] = {};
        }
        res[groupCode][componentName] = schema;
        return res;
    }, {});
};

export default getGroupedPageComponentsSchemas;
