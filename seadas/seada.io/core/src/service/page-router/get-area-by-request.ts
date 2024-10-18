import { IPageRouterRequest } from '@seada.io/core/spi/page-router/interface';
import getEnvPath from '@seada.io/core/libs/get-env-path';

export interface IAreaInfo extends Record<string, Record<string, string> | string> {
    areaCode: string;
    basePath: string;
    locale: string;
}

export interface IAreasCollection {
    [key: string]: IAreaInfo;
}

let areasPairs: [string, IAreaInfo][] = undefined;

/**
 * Reset areas pairs
 */
export const resetAreasCache = () => {
    areasPairs = undefined;
};

/**
 * Get areas pairs sorted by path length
 */
const getAreasPairs = (): [string, IAreaInfo][] => {
    const areas = getEnvPath<IAreasCollection>('area');

    if (areasPairs === undefined) {
        areasPairs = Object.entries(areas).sort(([, areaInfoA], [, areaInfoB]) => {
            return areaInfoB.basePath.length - areaInfoA.basePath.length;
        });
    }

    return areasPairs;
};

/**
 * Get area code by path
 * @param path
 */
const getAreaByPath = (path: string[]): IAreaInfo => {
    const pathAsString = '/' + (path || []).join('/');
    const areas = getAreasPairs();

    const sortedAreaByPathLength = areas.sort(([, areaInfoA], [, areaInfoB]) => {
        return areaInfoB.basePath.length - areaInfoA.basePath.length;
    });

    for (const [area, areaInfo] of sortedAreaByPathLength) {
        if (pathAsString.startsWith(areaInfo.basePath) || pathAsString + '/' === areaInfo.basePath) {
            return {
                ...areaInfo,
                areaCode: area,
            };
        }
    }

    throw new Error(`No area found for path ${pathAsString}`);
};

/**
 * Get area code by request
 * @param request
 */
const getAreaByRequest = (request: IPageRouterRequest): IAreaInfo => {
    const { path } = request;

    return getAreaByPath(path);
};

export default getAreaByRequest;
