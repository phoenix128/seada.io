import { ESeadaObjectType } from '@seada.io/core/spi/seada-pages/interface';
import fetchSeadaFile from '@seada.io/core/service/seada-files/fetch-seada-file';

/**
 * Read a page template from file
 * @param areaCode
 * @param fileType
 * @param fileName
 */
const getSeadaFile = async <T = any>(areaCode: string, fileType: ESeadaObjectType, fileName: string): Promise<T> => {
    if (!fileName) return null;

    const normalizedFileName = fileName.replace(/[^a-z0-9-.\/]/gi, '');

    try {
        return await fetchSeadaFile<T>(areaCode, fileType, normalizedFileName);
    } catch (e) {
        console.log(`Error loading template: ${areaCode}/${fileType}/${normalizedFileName}`);
        throw e;
    }
};

export default getSeadaFile;
