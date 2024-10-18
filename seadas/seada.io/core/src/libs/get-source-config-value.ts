import getEnvPath from '@seada.io/core/libs/get-env-path';

/**
 * Get the value for area code config
 * @param sourceId
 * @param path
 */
const getSourceConfigValue = (sourceId: string, path: string): any => {
    return getEnvPath(`source.${sourceId}.config.${path}`);
};

/**
 * Get the value for area code config or throw
 * @param sourceId
 * @param path
 */
export const getSourceConfigValueOrThrow = (sourceId: string, path: string): any => {
    const value = getSourceConfigValue(sourceId, path);

    if (value === undefined) {
        throw new Error(`Missing config for source.${sourceId}.config.${path}`);
    }

    return value;
};

export default getSourceConfigValue;
