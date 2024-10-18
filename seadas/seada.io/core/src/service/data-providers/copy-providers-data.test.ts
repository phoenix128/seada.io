import { IPageData } from '@seada.io/core/spi/components/interface';
import copyProvidersData from '@seada.io/core/service/data-providers/copy-providers-data';

describe('copyProvidersData', () => {
    const oldPage = {
        pageTemplate: {
            components: [
                {
                    id: 'comp1',
                    providersData: { data: 'oldData1' } as Record<string, any>,
                    providersPropsDependencies: [],
                    children: [],
                },
                {
                    id: 'comp2',
                    providersData: { data: 'oldData2' },
                    children: [{ id: 'child1', providersData: { data: 'oldDataChild1' }, children: [] }],
                    providersPropsDependencies: [],
                },
            ],
        },
        pageLayout: {
            components: [],
        },
    } as IPageData;

    const newPage: IPageData = {
        pageTemplate: {
            components: [
                { id: 'comp1', providersPropsDependencies: [], children: [] },
                {
                    id: 'comp2',
                    providersPropsDependencies: [],
                    children: [{ id: 'child1', providersPropsDependencies: [], children: [] }],
                },
            ],
        },
        pageLayout: {
            components: [],
        },
    } as IPageData;

    it('should copy providers data from old page to new page', () => {
        const result = copyProvidersData(newPage, oldPage);
        expect(result).toEqual({
            pageLayout: {
                components: [],
            },
            pageTemplate: {
                components: [
                    {
                        children: [],
                        id: 'comp1',
                        providersData: {
                            data: 'oldData1',
                        },
                        providersPropsDependencies: [],
                    },
                    {
                        children: [
                            {
                                children: [],
                                id: 'child1',
                                providersData: {
                                    data: 'oldDataChild1',
                                },
                            },
                        ],
                        id: 'comp2',
                        providersData: {
                            data: 'oldData2',
                        },
                        providersPropsDependencies: [],
                    },
                ],
            },
        });
    });

    it('should not modify the original new page data', () => {
        const originalNewPageData = JSON.parse(JSON.stringify(newPage));
        copyProvidersData(newPage, oldPage);

        expect(newPage).toEqual(originalNewPageData);
    });
});
