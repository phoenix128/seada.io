import { ESeadaObjectType } from '@seada.io/core/spi/seada-pages/interface';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * Get json schema by type
 * @param fromPath
 * @param schemaType
 */
const getJsonSchemaFile = (fromPath: string, schemaType: ESeadaObjectType): string => {
    const selfFile = fileURLToPath(import.meta.url);

    return path
        .relative(fromPath, path.join(path.dirname(selfFile), `../../../generated/json-schema/${schemaType}.json`))
        .replace(/\\/g, '/');
};

export default getJsonSchemaFile;
