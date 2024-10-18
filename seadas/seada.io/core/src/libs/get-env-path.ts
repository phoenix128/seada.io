/* eslint turbo/no-undeclared-env-vars:0 */
const cachedResults: Record<string, any> = {};

/**
 * Clear the cache
 */
export const clearCache = () => {
    Object.keys(cachedResults).forEach((key) => {
        delete cachedResults[key];
    });
};

export const mergeCache = (data: Record<string, any>) => {};

const getEnvPathRec = (
    path: string,
    envVars: Record<string, string>
): Record<string, Record<string, string> | string> | string => {
    const toUpperSnakeCase = (str: string): string => {
        return str.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1_$2').toUpperCase();
    };

    const toLowerCamelCase = (str: string): string => {
        const words = str.toLowerCase().split('_');
        for (let i = 1; i < words.length; i++) {
            words[i] = words[i][0].toUpperCase() + words[i].slice(1);
        }
        return words.join('');
    };

    const transformedPath = toUpperSnakeCase(path.replaceAll('.', '__'));
    if (envVars.hasOwnProperty(transformedPath)) {
        return envVars[transformedPath];
    }

    const involvedEnvValues = Object.keys(envVars)
        .filter((key) => key.startsWith(transformedPath + '__'))
        .map((key) => key.replace(transformedPath + '__', ''));

    const res = involvedEnvValues.reduce((acc, key) => {
        const [part, ...rest] = key.split('__');

        const nextKey = path + '.' + toLowerCamelCase(part.toLowerCase());

        acc[toLowerCamelCase(part.toLowerCase())] = getEnvPathRec(nextKey, envVars);
        return acc;
    }, {} as any);

    return Object.keys(res).length ? res : undefined;
};

/**
 * Get the value for a given environment path
 * @param path
 * @param defaultValue
 */
const getEnvPath = <TData = Record<string, Record<string, string> | string> | string>(
    path: string,
    defaultValue?: TData
): TData => {
    if (!cachedResults.hasOwnProperty(path)) {
        const res = getEnvPathRec(path, process.env as any);
        cachedResults[path] = res ?? defaultValue;
    }

    return cachedResults[path];
};

export const getEnvPathNumber = (path: string, defaultValue?: number): number | undefined => {
    const res = getEnvPath<string>(path, '' + defaultValue);

    if (typeof res === 'string') {
        return parseInt(res);
    }

    return undefined;
};

export const getEnvPathBool = (path: string, defaultValue?: boolean): boolean => {
    const res = getEnvPath<string>(path, 'false');
    if (typeof res !== 'string') {
        return defaultValue ?? false;
    }

    const lRes = res.toLowerCase();

    return lRes === 'true' || lRes === '1' || lRes === 'yes' || lRes === 'on' || lRes === 'y' || lRes === 'enabled';
};

export default getEnvPath;
