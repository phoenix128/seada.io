import addPageComponent from './add-page-component';
import { IPageComponentDefinition } from '@seada.io/core/spi/seada-pages/interface';
import { IPageData } from '@seada.io/core/spi/components/interface';

describe('addPageComponent', () => {
    it('should add a new root component', () => {
        const mockComponent = {
            id: 'component-4',
            type: 'some-component',
        } as IPageComponentDefinition;

        const mockPage = {
            pageLayout: {
                components: [],
            },
            pageTemplate: {
                components: [
                    {
                        id: 'component-1',
                    },
                    {
                        id: 'component-2',
                    },
                    {
                        id: 'component-3',
                    },
                ],
            },
        } as IPageData;

        const newPage = addPageComponent(mockPage, mockComponent, '@page');
        expect(newPage.pageTemplate.components).toHaveLength(4);
        expect(newPage.pageTemplate.components[3].type).toEqual('some-component');
        expect(newPage.pageTemplate.components[3].id).toBe('component-4');
    });

    it('should add a new child component', () => {
        const mockComponent = {
            id: 'component-1-2',
            type: 'some-component',
        } as IPageComponentDefinition;

        const mockPage = {
            pageLayout: {
                components: [],
            },
            pageTemplate: {
                components: [
                    {
                        id: 'component-1',
                        children: [
                            {
                                id: 'component-1-1',
                            },
                        ],
                    },
                    {
                        id: 'component-2',
                    },
                    {
                        id: 'component-3',
                    },
                ],
            },
        } as IPageData;

        const newPage = addPageComponent(mockPage, mockComponent, 'component-1');
        expect(newPage.pageTemplate.components[0].children).toHaveLength(2);
        expect(newPage.pageTemplate.components[0].children[1].type).toEqual('some-component');
        expect(newPage.pageTemplate.components[0].children[1].id).toBe('component-1-2');
    });
});
