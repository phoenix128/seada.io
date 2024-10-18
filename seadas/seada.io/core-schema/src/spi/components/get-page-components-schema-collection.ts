import { IPageComponentSchemaCollection } from '@seada.io/core-schema/spi/components/interface';

/**
 * Get React component schema collection
 * @param schemas
 */
const getPageComponentsSchemaCollection = (
    schemas?: IPageComponentSchemaCollection
): IPageComponentSchemaCollection => {
    return schemas ?? {};
};

export default getPageComponentsSchemaCollection;
