import { IPageData } from '@seada.io/core/spi/components/interface';
import getDataProviders from '@seada.io/core/spi/data-providers/get-data-providers';
import getProvidersData from '@seada.io/core/service/data-providers/get-providers-data';

jest.mock('@seada.io/core/spi/data-providers/get-data-providers', () => ({
    __esModule: true,
    default: jest.fn(),
}));

describe('getProvidersData', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should return an empty collection if there are no components', async () => {
        const pageData = {
            pageTemplate: {
                components: [],
            },
            pageLayout: {
                components: [],
            },
            variables: {},
        } as IPageData;

        const result = await getProvidersData(pageData);
        expect(result).toEqual({});
    });

    it('should return data for new components added to the page', async () => {
        const mockDataProvider = {
            operationId: 'key1',
            loader: jest.fn().mockResolvedValue({ data: 'value1' }),
            propsDependencies: ['prop1'],
        };

        (getDataProviders as jest.Mock).mockImplementation((type) => {
            if (type === 'new-component') {
                return [() => mockDataProvider]; // Return a function that returns the mockDataProvider
            }
            return [];
        });

        const pageData = {
            pageTemplate: {
                components: [
                    {
                        id: '1',
                        type: 'new-component',
                        props: { prop1: 'value1' } as Record<string, any>,
                    },
                ],
            },
            pageLayout: {
                components: [],
            },
            variables: {},
        } as IPageData;

        const result = await getProvidersData(pageData, ['1']);
        expect(result).toEqual({
            '1': {
                propsDependencies: ['prop1'],
                payload: { data: 'value1' },
            },
        });
        expect(mockDataProvider.loader).toHaveBeenCalledTimes(1);
    });

    it('should propagate context variables for DataContext components', async () => {
        const mockDataProvider = {
            operationId: 'key1',
            loader: jest.fn().mockResolvedValue({ contextData: 'value1' }),
            propsDependencies: ['prop1'],
        };

        (getDataProviders as jest.Mock).mockImplementation((type) => {
            if (type === 'ComponentDataContext') {
                return [() => mockDataProvider];
            }
            if (type === 'child-component') {
                return [
                    () => ({
                        operationId: 'key2',
                        loader: jest.fn().mockResolvedValue({ childData: 'value2' }),
                        propsDependencies: ['prop2'],
                    }),
                ];
            }
            return [];
        });

        const pageData = {
            pageTemplate: {
                components: [
                    {
                        id: '1',
                        type: 'ComponentDataContext',
                        props: { prop1: 'value1' } as Record<string, any>,
                        children: [
                            {
                                id: '1-1',
                                type: 'child-component',
                                props: { prop2: 'value2' } as Record<string, any>,
                            },
                        ],
                    },
                ],
            },
            pageLayout: {
                components: [],
            },
            variables: {},
        } as IPageData;

        const result = await getProvidersData(pageData, ['1', '1-1']);
        expect(result).toEqual({
            '1': {
                propsDependencies: ['prop1'],
                payload: { contextData: 'value1' },
            },
            '1-1': {
                propsDependencies: ['prop2'],
                payload: { childData: 'value2' },
            },
        });
    });

    it('should handle errors in data provider loading gracefully', async () => {
        const mockDataProvider = {
            operationId: 'key1',
            loader: jest.fn().mockRejectedValue(new Error('Load error')),
            propsDependencies: ['prop1'],
        };

        (getDataProviders as jest.Mock).mockImplementation((type) => {
            if (type === 'error-component') {
                return [() => mockDataProvider];
            }
            return [];
        });

        const pageData = {
            pageTemplate: {
                components: [
                    {
                        id: '1',
                        type: 'error-component',
                        props: { prop1: 'value1' } as Record<string, any>,
                    },
                ],
            },
            pageLayout: {
                components: [],
            },
            variables: {},
        } as IPageData;

        await expect(getProvidersData(pageData, ['1'])).rejects.toThrow('Load error');
    });

    it('should return data for components in both page template and layout', async () => {
        const mockDataProviderPage = {
            operationId: 'key1',
            loader: jest.fn().mockResolvedValue({ data: 'value1' }),
            propsDependencies: ['prop1'],
        };

        const mockDataProviderLayout = {
            operationId: 'key2',
            loader: jest.fn().mockResolvedValue({ data: 'value2' }),
            propsDependencies: ['prop2'],
        };

        (getDataProviders as jest.Mock).mockImplementation((type) => {
            if (type === 'page-component') {
                return [() => mockDataProviderPage];
            }
            if (type === 'layout-component') {
                return [() => mockDataProviderLayout];
            }
            return [];
        });

        const pageData = {
            pageTemplate: {
                components: [
                    {
                        id: '1',
                        type: 'page-component',
                        props: { prop1: 'value1' } as Record<string, any>,
                    },
                ],
            },
            pageLayout: {
                components: [
                    {
                        id: '2',
                        type: 'layout-component',
                        props: { prop2: 'value2' } as Record<string, any>,
                    },
                ],
            },
            variables: {},
        } as IPageData;

        const result = await getProvidersData(pageData, ['1', '2']);
        expect(result).toEqual({
            '1': {
                propsDependencies: ['prop1'],
                payload: { data: 'value1' },
            },
            '2': {
                propsDependencies: ['prop2'],
                payload: { data: 'value2' },
            },
        });
        expect(mockDataProviderPage.loader).toHaveBeenCalledTimes(1);
        expect(mockDataProviderLayout.loader).toHaveBeenCalledTimes(1);
    });

    it('should not fail if a component has no providers', async () => {
        (getDataProviders as jest.Mock).mockImplementation((type) => {
            return [];
        });

        const pageData = {
            pageTemplate: {
                components: [
                    {
                        id: '1',
                        type: 'no-provider-component',
                        props: { prop1: 'value1' } as Record<string, any>,
                    },
                ],
            },
            pageLayout: {
                components: [],
            },
            variables: {},
        } as IPageData;

        const result = await getProvidersData(pageData, ['1']);
        expect(result).toEqual({});
    });

    it('should handle components with no children gracefully', async () => {
        const mockDataProvider = {
            operationId: 'key1',
            loader: jest.fn().mockResolvedValue({ data: 'value1' }),
            propsDependencies: ['prop1'],
        };

        (getDataProviders as jest.Mock).mockImplementation((type) => {
            if (type === 'some-component') {
                return [() => mockDataProvider];
            }
            return [];
        });

        const pageData = {
            pageTemplate: {
                components: [
                    {
                        id: '1',
                        type: 'some-component',
                        props: { prop1: 'value1' } as Record<string, any>,
                        children: [],
                    },
                ],
            },
            pageLayout: {
                components: [],
            },
            variables: {},
        } as IPageData;

        const result = await getProvidersData(pageData, ['1']);
        expect(result).toEqual({
            '1': {
                propsDependencies: ['prop1'],
                payload: { data: 'value1' },
            },
        });
        expect(mockDataProvider.loader).toHaveBeenCalledTimes(1);
    });

    it('should propagate variables correctly in nested DataContext components', async () => {
        const mockDataProvider = {
            operationId: 'key1',
            loader: jest.fn().mockResolvedValue({ contextData: 'value1' }),
            propsDependencies: ['prop1'],
        };

        const mockChildDataProvider = {
            operationId: 'key2',
            loader: jest.fn().mockResolvedValue({ nestedData: 'value2' }),
            propsDependencies: ['prop2'],
        };

        (getDataProviders as jest.Mock).mockImplementation((type) => {
            if (type === 'DataContextComponent') {
                return [() => mockDataProvider];
            }
            if (type === 'nested-DataContextComponent') {
                return [() => mockChildDataProvider];
            }
            return [];
        });

        const pageData = {
            pageTemplate: {
                components: [
                    {
                        id: '1',
                        type: 'DataContextComponent',
                        props: { prop1: 'value1' } as Record<string, any>,
                        children: [
                            {
                                id: '1-1',
                                type: 'nested-DataContextComponent',
                                props: { prop2: 'value2' } as Record<string, any>,
                            },
                        ],
                    },
                ],
            },
            pageLayout: {
                components: [],
            },
            variables: {},
        } as IPageData;

        const result = await getProvidersData(pageData, ['1', '1-1']);
        expect(result).toEqual({
            '1': {
                propsDependencies: ['prop1'],
                payload: { contextData: 'value1' },
            },
            '1-1': {
                propsDependencies: ['prop2'],
                payload: { nestedData: 'value2' },
            },
        });
        expect(mockDataProvider.loader).toHaveBeenCalledTimes(1);
        expect(mockChildDataProvider.loader).toHaveBeenCalledTimes(1);
    });
});
