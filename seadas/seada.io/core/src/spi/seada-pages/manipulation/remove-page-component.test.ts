import removePageComponent from '@seada.io/core/spi/seada-pages/manipulation/remove-page-component';
import { IPageData } from '@seada.io/core/spi/components/interface';

describe('removePageComponent', () => {
    it('should remove a template component', () => {
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

        const newPage = removePageComponent(mockPage, 'component-2');
        expect(newPage.pageTemplate.components).toHaveLength(2);
        expect(newPage.pageTemplate.components[0].id).toBe('component-1');
        expect(newPage.pageTemplate.components[1].id).toBe('component-3');
    });

    it('should remove a template child component', () => {
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
                            {
                                id: 'component-1-2',
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

        const newPage = removePageComponent(mockPage, 'component-1-1');
        expect(newPage.pageTemplate.components[0].children).toHaveLength(1);
        expect(newPage.pageTemplate.components[0].children[0].id).toBe('component-1-2');
    });

    it('should remove a layout component', () => {
        const mockPage = {
            pageLayout: {
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
            pageTemplate: {
                components: [],
            },
        } as IPageData;

        const newPage = removePageComponent(mockPage, 'component-2');
        expect(newPage.pageLayout.components).toHaveLength(2);
        expect(newPage.pageLayout.components[0].id).toBe('component-1');
        expect(newPage.pageLayout.components[1].id).toBe('component-3');
    });
});
