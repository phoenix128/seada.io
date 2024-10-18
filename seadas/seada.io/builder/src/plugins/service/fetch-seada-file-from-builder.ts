import getEnvPath from '@seada.io/core/libs/get-env-path';
import fetchSeadaFile from '@seada.io.source/core/service/seada-files/fetch-seada-file';
import { ESeadaObjectType } from '@seada.io/core/spi/seada-pages/interface';
import cacheWrapper from '@seada.io/core/spi/cache/cache-wrapper';
import getSeadaFilesBasePath from '@seada.io/core/spi/seada-pages/get-seada-files-base-path';
import { IPlugin } from '@seada.io/core/interface';

const fetchSeadaFileFromBuilderPlugin: IPlugin<typeof fetchSeadaFile, 100> = async <T = any>(
    callback: typeof fetchSeadaFile,
    areaCode: string,
    fileType: ESeadaObjectType,
    fileName: string
): Promise<T> => {
    const basePath = getSeadaFilesBasePath(areaCode);
    const cacheKey = `seada-file:${basePath}/${fileType}/${fileName}`;

    return cacheWrapper<T>(cacheKey, async () => {
        const pagesUrl = getEnvPath<string>('builderFilesUrl');

        const res = await fetch(`${pagesUrl}/${basePath}/${fileType}/${fileName}`, {
            cache: 'force-cache',
            next: {
                tags: [cacheKey],
            },
        } as RequestInit);

        try {
            const data = await res.json();
            return data as T;
        } catch (e) {
            console.error(`Error fetching seada file: ${e}`);
        }

        return null;
    });
};

export default fetchSeadaFileFromBuilderPlugin;
