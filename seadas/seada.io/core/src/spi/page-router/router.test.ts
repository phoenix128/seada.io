import {
    ICorePageRouterResponse,
    IPageRouterHandler,
    IPageRouterRequest,
} from '@seada.io/core/spi/page-router/interface';
import router from '@seada.io/core/spi/page-router/router';

import getAreaByRequestModule from '@seada.io/core/service/page-router/get-area-by-request';

jest.mock('@seada.io/core/service/page-router/get-area-by-request');

const mockHandler1: jest.Mocked<IPageRouterHandler> = jest.fn().mockImplementation(async (request) => {
    if (request.path.includes('test1')) {
        return {
            pageTemplate: {
                components: [
                    {
                        type: 'component1',
                    },
                ],
            },
        } as ICorePageRouterResponse;
    }
    return null;
});

const mockHandler2: jest.Mocked<IPageRouterHandler> = jest.fn().mockImplementation(async (request) => {
    if (request.path.includes('test2')) {
        return {
            pageTemplate: {
                components: [
                    {
                        type: 'component2',
                    },
                ],
            },
        } as ICorePageRouterResponse;
    }
    return null;
});

describe('router', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should route to the correct handler', async () => {
        (getAreaByRequestModule as unknown as jest.Mock).mockImplementation(() => ({ areaCode: 'area-test' }));

        const request: IPageRouterRequest = {
            path: ['test2'],
            searchParams: {},
            cookies: {},
        };
        const response = await router(request, [mockHandler1, mockHandler2]);
        expect(response.areaCode).toBe('area-test');
        expect(response.pageTemplate.components[0].type).toBe('component2');
    });

    it('should throw an error if no handler is provided', async () => {
        const request: IPageRouterRequest = {
            path: ['test1'],
            searchParams: {},
            cookies: {},
        };
        await expect(router(request)).rejects.toThrow('No router handler provided');
    });

    it('should throw an error if no handler is found for a given path', async () => {
        const request = {
            path: ['unknownPath'],
            searchParams: {},
            cookies: {},
        };
        await expect(router(request, [mockHandler1, mockHandler2])).rejects.toThrow(
            'No handler found for path unknownPath'
        );
    });
});
