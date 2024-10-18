import getStorageAdapter from '@seada.io/builder/service/storage/get-storage-adapter';
import { IImage } from '@seada.io/core-schema/ports/schema/hooks/use-list-images-urls-port';

/**
 * List all images urls in the storage
 */
const listImagesUrls = async (): Promise<IImage[]> => {
    const adapter = getStorageAdapter('images');
    return (await adapter.rawList('/')).map((entry) => {
        return {
            name: entry.fileName,
            url: entry.url,
        };
    });
};

export default listImagesUrls;
