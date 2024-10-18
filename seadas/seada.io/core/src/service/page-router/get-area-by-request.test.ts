/* eslint turbo/no-undeclared-env-vars:0 */

import getAreaByRequest, { IAreaInfo, resetAreasCache } from '@seada.io/core/service/page-router/get-area-by-request';
import { IPageRouterRequest } from '@seada.io/core/spi/page-router/interface';
import { clearCache } from '@seada.io/core/libs/get-env-path';

describe('getAreaByRequest', () => {
    afterEach(() => {
        delete process.env.AREA__DEFAULT__BASE_PATH;
        delete process.env.AREA__AREA1__BASE_PATH;
        delete process.env.AREA__AREA2__BASE_PATH;
        delete process.env.AREA__AREA11__BASE_PATH;

        resetAreasCache();
        clearCache();
    });

    beforeEach(() => {
        process.env.AREA__DEFAULT__BASE_PATH = '/';
        process.env.AREA__AREA1__BASE_PATH = '/area1';
        process.env.AREA__AREA2__BASE_PATH = '/area2';
        process.env.AREA__AREA11__BASE_PATH = '/area11';

        resetAreasCache();
        clearCache();
    });

    it('should return the correct area with root path', () => {
        const request: IPageRouterRequest = {
            path: [],
            searchParams: {},
            cookies: {},
        };

        const areaInfo: IAreaInfo = getAreaByRequest(request);

        expect(areaInfo.areaCode).toEqual('default');
    });

    it('should return the correct area with path', () => {
        const request: IPageRouterRequest = {
            path: ['area1'],
            searchParams: {},
            cookies: {},
        };

        const areaInfo: IAreaInfo = getAreaByRequest(request);

        expect(areaInfo.areaCode).toEqual('area1');
    });

    it('should return the correct area with path and trailing slash', () => {
        const request: IPageRouterRequest = {
            path: ['area1', ''],
            searchParams: {},
            cookies: {},
        };

        const areaInfo: IAreaInfo = getAreaByRequest(request);

        expect(areaInfo.areaCode).toEqual('area1');
    });

    it('should return the correct area with same prefix of another', () => {
        const request: IPageRouterRequest = {
            path: ['area11'],
            searchParams: {},
            cookies: {},
        };

        const areaInfo: IAreaInfo = getAreaByRequest(request);

        expect(areaInfo.areaCode).toEqual('area11');
    });

    it('should throw an error when no area is found', () => {
        delete process.env.AREA__DEFAULT__BASE_PATH;
        process.env.AREA__DEFAULT__BASE_PATH = '/somepath';
        resetAreasCache();
        clearCache();

        const request: IPageRouterRequest = {
            path: ['unknown'],
            searchParams: {},
            cookies: {},
        };

        expect(() => getAreaByRequest(request)).toThrowError();
    });
});
