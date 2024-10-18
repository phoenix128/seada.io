'use server';

import getStorageAdapter from '@seada.io/builder/service/storage/get-storage-adapter';
import path from 'path';
import getSeadaFilesBasePath from '@seada.io/core/spi/seada-pages/get-seada-files-base-path';

/**
 * List all page variants by page type
 * @param areaCode
 * @param pageType
 */
const listPageVariants = async (areaCode: string, pageType: string): Promise<string[]> => {
    const filesPath = getSeadaFilesBasePath(areaCode);
    const adapter = getStorageAdapter('objects');
    const variants = await adapter.rawList(`${filesPath}/templates/${pageType}`);

    return variants.map((variant) => path.basename(variant.fileName, '.yml'));
};

export default listPageVariants;
