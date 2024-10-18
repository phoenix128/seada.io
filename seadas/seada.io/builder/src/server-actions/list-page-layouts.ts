'use server';

import getStorageAdapter from '@seada.io/builder/service/storage/get-storage-adapter';
import path from 'path';
import getSeadaFilesBasePath from '@seada.io/core/spi/seada-pages/get-seada-files-base-path';

/**
 * List all page variants by page type
 * @param areaCode
 */
const listPageLayouts = async (areaCode: string): Promise<string[]> => {
    const filesPath = getSeadaFilesBasePath(areaCode);
    const adapter = getStorageAdapter('objects');
    const layouts = await adapter.rawList(`${filesPath}/layouts`);

    return layouts.map((layout) => path.basename(layout.fileName, '.yml'));
};

export default listPageLayouts;
