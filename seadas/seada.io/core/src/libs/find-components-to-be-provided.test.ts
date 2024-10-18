import findComponentsToBeProvided from '@seada.io/core/libs/find-components-to-be-provided';
import { IPageData } from '@seada.io/core/spi/components/interface';

describe('findComponentsToBeProvided', () => {
    it('should return an empty array if there are no components', () => {
        const pagePrev = {
            pageTemplate: {
                components: [],
            },
            pageLayout: {
                components: [],
            },
        } as IPageData;

        const pageNew = {
            pageTemplate: {
                components: [],
            },
            pageLayout: {
                components: [],
            },
        } as IPageData;

        const result = findComponentsToBeProvided(pagePrev, pageNew);
        expect(result).toEqual([]);
    });

    it('should find new component ids added to the new page', () => {
        const pagePrev = {
            pageTemplate: {
                components: [
                    {
                        id: '1',
                        type: 'Component',
                        providersData: {},
                    },
                ],
            },
            pageLayout: {
                components: [],
            },
        } as IPageData;
        const pageNew = {
            pageTemplate: {
                components: [
                    {
                        id: '1',
                        type: 'Component',
                        providersData: {},
                    },
                    {
                        id: '2',
                        type: 'Component',
                        providersData: {},
                    },
                ],
            },
            pageLayout: {
                components: [],
            },
        } as IPageData;

        const result = findComponentsToBeProvided(pagePrev, pageNew);
        expect(result).toEqual(['2']);
    });

    it('should not return ids for components that are present in both versions', () => {
        const pagePrev = {
            pageTemplate: {
                components: [
                    {
                        id: '1',
                        type: 'component',
                        props: { prop1: 'value' } as Record<string, any>,
                        providersData: {},
                        providersPropsDependencies: ['prop1'],
                    },
                ],
            },
            pageLayout: {
                components: [
                    {
                        id: '2',
                        type: 'component',
                        props: { prop1: 'value' } as Record<string, any>,
                        providersData: {},
                        providersPropsDependencies: ['prop1'],
                    },
                ],
            },
        } as IPageData;

        const pageNew = {
            pageTemplate: {
                components: [
                    {
                        id: '1',
                        type: 'component',
                        providersData: {},
                        props: { prop1: 'value' } as Record<string, any>,
                        providersPropsDependencies: ['prop1'],
                    },
                ],
            },
            pageLayout: {
                components: [
                    {
                        id: '2',
                        type: 'component',
                        props: { prop1: 'value' } as Record<string, any>,
                        providersData: {},
                        providersPropsDependencies: ['prop1'],
                    },
                ],
            },
        } as IPageData;

        const result = findComponentsToBeProvided(pagePrev, pageNew);
        expect(result).toEqual([]);
    });

    it('should find new component ids added to the layout', () => {
        const pagePrev = {
            pageTemplate: {
                components: [],
            },
            pageLayout: {
                components: [
                    {
                        id: '1',
                        type: 'component',
                        providersData: {},
                    },
                ],
            },
        } as IPageData;
        const pageNew = {
            pageTemplate: {
                components: [],
            },
            pageLayout: {
                components: [
                    {
                        id: '1',
                        type: 'component',
                        providersData: {},
                    },
                    {
                        id: '3',
                        type: 'component',
                        providersData: {},
                    },
                ],
            },
        } as IPageData;

        const result = findComponentsToBeProvided(pagePrev, pageNew);
        expect(result).toEqual(['3']);
    });

    it('should ignore removed components', () => {
        const pagePrev = {
            pageTemplate: {
                components: [],
            },
            pageLayout: {
                components: [
                    {
                        id: '1',
                        type: 'component',
                        providersData: {},
                        props: { prop1: 'value' } as Record<string, any>,
                        providersPropsDependencies: ['prop1'],
                    },
                    {
                        id: '2',
                        type: 'component',
                        providersData: {},
                        props: { prop1: 'value' } as Record<string, any>,
                        providersPropsDependencies: ['prop1'],
                    },
                ],
            },
        } as IPageData;
        const pageNew = {
            pageTemplate: {
                components: [],
            },
            pageLayout: {
                components: [
                    {
                        id: '1',
                        type: 'component',
                        providersData: {},
                        props: { prop1: 'value' } as Record<string, any>,
                        providersPropsDependencies: ['prop1'],
                    },
                ],
            },
        } as IPageData;

        const result = findComponentsToBeProvided(pagePrev, pageNew);
        expect(result).toEqual([]);
    });

    it('should find modified component props', () => {
        const pagePrev = {
            pageTemplate: {
                components: [
                    {
                        id: '1',
                        type: 'some-component',
                        props: { prop1: 'value1' } as Record<string, any>,
                        providersPropsDependencies: ['prop1'],
                        providersData: {},
                    },
                ],
            },
            pageLayout: {
                components: [],
            },
        } as IPageData;

        const pageNew = {
            pageTemplate: {
                components: [
                    {
                        id: '1',
                        type: 'some-component',
                        props: { prop1: 'value2' } as Record<string, any>,
                        providersPropsDependencies: ['prop1'],
                        providersData: {},
                    },
                ],
            },
            pageLayout: {
                components: [],
            },
        } as IPageData;

        const result = findComponentsToBeProvided(pagePrev, pageNew);
        expect(result).toEqual(['1']);
    });

    it('should ignore components with modified props that are not in providersPropsDependencies', () => {
        const pagePrev = {
            pageTemplate: {
                components: [
                    {
                        id: '1',
                        type: 'some-component',
                        props: { prop1: 'value1' } as Record<string, any>,
                        providersPropsDependencies: ['prop2'],
                        providersData: {},
                    },
                ],
            },
            pageLayout: {
                components: [],
            },
        } as IPageData;

        const pageNew = {
            pageTemplate: {
                components: [
                    {
                        id: '1',
                        type: 'some-component',
                        props: { prop1: 'value2' } as Record<string, any>,
                        providersPropsDependencies: ['prop2'],
                        providersData: {},
                    },
                ],
            },
            pageLayout: {
                components: [],
            },
        } as IPageData;

        const result = findComponentsToBeProvided(pagePrev, pageNew);
        expect(result).toEqual([]);
    });

    it('should return all components if the page template name has changed', () => {
        const pagePrev = {
            pageTemplate: {
                pageVariant: 'template1',
                components: [
                    {
                        id: '1',
                        type: 'some-component',
                        providersData: {},
                    },
                ],
            },
            pageLayout: {
                components: [],
            },
        } as IPageData;

        const pageNew = {
            pageTemplate: {
                pageVariant: 'template2',
                components: [
                    {
                        id: '1',
                        type: 'some-component',
                        providersData: {},
                    },
                ],
            },
            pageLayout: {
                components: [],
            },
        } as IPageData;

        const result = findComponentsToBeProvided(pagePrev, pageNew);
        expect(result).toEqual(['1']);
    });

    it('should return all components if the page layout name has changed', () => {
        const pagePrev = {
            pageTemplate: {
                components: [],
            },
            pageLayout: {
                templateName: 'layout1',
                components: [
                    {
                        id: '1',
                        type: 'some-component',
                        providersData: {},
                    },
                ],
            },
        } as IPageData;

        const pageNew = {
            pageTemplate: {
                components: [],
            },
            pageLayout: {
                templateName: 'layout2',
                components: [
                    {
                        id: '1',
                        type: 'some-component',
                        providersData: {},
                    },
                ],
            },
        } as IPageData;

        const result = findComponentsToBeProvided(pagePrev, pageNew);
        expect(result).toEqual(['1']);
    });

    it('should return children of modified components with type ending in DataContext', () => {
        const pagePrev = {
            pageTemplate: {
                components: [
                    {
                        id: '1',
                        type: 'DataContextComponent',
                        props: { prop1: 'value1' } as Record<string, any>,
                        providersPropsDependencies: ['prop1'],
                        providersData: {},
                        children: [
                            {
                                id: '1-1',
                                type: 'child-component',
                                props: {},
                                providersData: {},
                            },
                        ],
                    },
                ],
            },
            pageLayout: {
                components: [],
            },
        } as IPageData;

        const pageNew = {
            pageTemplate: {
                components: [
                    {
                        id: '1',
                        type: 'ComponentDataContext',
                        props: { prop1: 'value2' } as Record<string, any>,
                        providersPropsDependencies: ['prop1'],
                        providersData: {},
                        children: [
                            {
                                id: '1-1',
                                type: 'child-component',
                                props: {},
                                providersData: {},
                            },
                        ],
                    },
                ],
            },
            pageLayout: {
                components: [],
            },
        } as IPageData;

        const result = findComponentsToBeProvided(pagePrev, pageNew);
        expect(result).toEqual(['1', '1-1']);
    });

    it('should not return children of modified components with type not ending in DataContext', () => {
        const pagePrev = {
            pageTemplate: {
                components: [
                    {
                        id: '1',
                        type: 'OtherComponent',
                        props: { prop1: 'value1' } as Record<string, any>,
                        providersPropsDependencies: ['prop1'],
                        providersData: {},
                        children: [
                            {
                                id: '1-1',
                                type: 'child-component',
                                props: {},
                                providersData: {},
                            },
                        ],
                    },
                ],
            },
            pageLayout: {
                components: [],
            },
        } as IPageData;

        const pageNew = {
            pageTemplate: {
                components: [
                    {
                        id: '1',
                        type: 'OtherComponent',
                        props: { prop1: 'value2' } as Record<string, any>,
                        providersPropsDependencies: ['prop1'],
                        providersData: {},
                        children: [
                            {
                                id: '1-1',
                                type: 'child-component',
                                props: {},
                                providersData: {},
                            },
                        ],
                    },
                ],
            },
            pageLayout: {
                components: [],
            },
        } as IPageData;

        const result = findComponentsToBeProvided(pagePrev, pageNew);
        expect(result).toEqual(['1']);
    });

    it('should return ids of newly added children to DataContext components', () => {
        const pagePrev = {
            pageTemplate: {
                components: [
                    {
                        id: '1',
                        type: 'DataContextComponent',
                        props: { prop1: 'value1' } as Record<string, any>,
                        providersPropsDependencies: ['prop1'],
                        providersData: {},
                        children: [],
                    },
                ],
            },
            pageLayout: {
                components: [],
            },
        } as IPageData;

        const pageNew = {
            pageTemplate: {
                components: [
                    {
                        id: '1',
                        type: 'DataContextComponent',
                        props: { prop1: 'value1' } as Record<string, any>,
                        providersPropsDependencies: ['prop1'],
                        providersData: {},
                        children: [
                            {
                                id: '1-1',
                                type: 'child-component',
                                props: {},
                                providersData: {},
                            },
                        ],
                    },
                ],
            },
            pageLayout: {
                components: [],
            },
        } as IPageData;

        const result = findComponentsToBeProvided(pagePrev, pageNew);
        expect(result).toEqual(['1-1']);
    });
});
