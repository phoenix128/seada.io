import getEnvPath from '@seada.io/core/libs/get-env-path';
import yaml from 'js-yaml';
import cacheWrapper from '@seada.io/core/spi/cache/cache-wrapper';
import getSeadaFilesBasePath from '@seada.io/core/spi/seada-pages/get-seada-files-base-path';

/**
 * Fetch a page template from file
 * @param areaCode
 * @param fileType
 * @param fileName
 */
const fetchSeadaFile = async <T = any>(areaCode: string, fileType: string, fileName: string): Promise<T> => {
    const basePath = getSeadaFilesBasePath(areaCode);
    const cacheKey = `seada-file:${basePath}/${fileType}/${fileName}`;

    return cacheWrapper(cacheKey, async () => {
        const pagesUrl = getEnvPath<string>('seadaYmlFilesUrl');
        const res = await fetch(`${pagesUrl}/${basePath}/${fileType}/${fileName}.yml`, {
            cache: 'force-cache',
            next: {
                tags: [cacheKey],
            },
        } as RequestInit);

        return yaml.load(await res.text()) as T;
    });
};

export default fetchSeadaFile;
