import { ISchemaComponentsSchemaCollection } from '@seada.io/core-schema/spi/components/interface';

/**
 * Get schema component schema by type code
 * @param schemas
 */
const getComponentTypeSchemas = (schemas?: ISchemaComponentsSchemaCollection): ISchemaComponentsSchemaCollection => {
    return schemas ?? {};
};

export default getComponentTypeSchemas;
