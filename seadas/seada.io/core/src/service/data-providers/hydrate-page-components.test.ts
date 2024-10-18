import { IPageData } from '@seada.io/core/spi/components/interface';
import { IProvidersDataCollection } from '@seada.io/core/service/data-providers/get-providers-data';
import { IPageComponentDefinition } from '@seada.io/core/spi/seada-pages/interface';
import hydratePageComponents from '@seada.io/core/service/data-providers/hydrate-page-components';

describe('hydratePageComponents', () => {
    const mockPageData: IPageData = {
        pageTemplate: {
            components: [
                { id: 'comp1', children: [] } as IPageComponentDefinition,
                { id: 'comp2', children: [{ id: 'child1', children: [] }] } as IPageComponentDefinition,
            ],
        },
        pageLayout: {
            components: [
                { id: 'layoutComp1', children: [] } as IPageComponentDefinition,
                { id: 'layoutComp2', children: [] } as IPageComponentDefinition,
            ],
        },
    } as IPageData;

    const mockProvidedData: IProvidersDataCollection = {
        comp1: { payload: { data: 'data1' }, propsDependencies: ['dep1'] },
        child1: { payload: { data: 'dataChild1' }, propsDependencies: ['depChild1'] },
        layoutComp1: { payload: { data: 'layoutData1' }, propsDependencies: ['layoutDep1'] },
    };

    it('should hydrate components with provided data', () => {
        const result = hydratePageComponents(mockPageData, mockProvidedData);

        expect(result.pageTemplate.components[0].providersData).toEqual(mockProvidedData.comp1.payload);
        expect(result.pageTemplate.components[0].providersPropsDependencies).toEqual(
            mockProvidedData.comp1.propsDependencies
        );

        expect(result.pageTemplate.components[1].children[0].providersData).toEqual(mockProvidedData.child1.payload);
        expect(result.pageTemplate.components[1].children[0].providersPropsDependencies).toEqual(
            mockProvidedData.child1.propsDependencies
        );

        expect(result.pageLayout.components[0].providersData).toEqual(mockProvidedData.layoutComp1.payload);
        expect(result.pageLayout.components[0].providersPropsDependencies).toEqual(
            mockProvidedData.layoutComp1.propsDependencies
        );
    });

    it('should set providersData to an empty object if not initialized', () => {
        const result = hydratePageComponents(mockPageData, {});

        expect(result.pageTemplate.components[0].providersData).toEqual({});
        expect(result.pageTemplate.components[0].providersPropsDependencies).toEqual([]);

        expect(result.pageTemplate.components[1].children[0].providersData).toEqual({});
        expect(result.pageTemplate.components[1].children[0].providersPropsDependencies).toEqual([]);

        expect(result.pageLayout.components[0].providersData).toEqual({});
        expect(result.pageLayout.components[0].providersPropsDependencies).toEqual([]);
    });

    it('should not modify the original page data', () => {
        const originalPageData = JSON.parse(JSON.stringify(mockPageData));
        hydratePageComponents(mockPageData, mockProvidedData);

        expect(mockPageData).toEqual(originalPageData);
    });
});
