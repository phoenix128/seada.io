import findComponentsByType from '@seada.io/core/spi/seada-pages/manipulation/find-components-by-type';
import { IPageData } from '@seada.io/core/spi/components/interface';

describe('findComponentsByType', () => {
    it('should find components by type from both page layout and page template', () => {
        const pageMock = {
            pageLayout: {
                components: [
                    {
                        id: '1',
                        type: 'header',
                        children: [
                            { id: '2', type: 'logo' },
                            { id: '3', type: 'navigation', children: [{ id: '4', type: 'menuItem' }] },
                        ],
                    },
                ],
            },
            pageTemplate: {
                components: [
                    {
                        id: '5',
                        type: 'footer',
                        children: [
                            { id: '6', type: 'copyRight' },
                            { id: '7', type: 'links', children: [{ id: '8', type: 'menuItem' }] },
                        ],
                    },
                ],
            },
        } as IPageData;

        const componentType = 'menuItem';
        const expected = [
            { id: '4', type: 'menuItem' },
            { id: '8', type: 'menuItem' },
        ];

        const result = findComponentsByType(pageMock, componentType);

        expect(result).toEqual(expect.arrayContaining(expected));
        expect(result.length).toBe(2);
    });

    it('should return empty array if no components found', () => {
        const pageMock = {
            pageLayout: {
                components: [
                    {
                        id: '1',
                        type: 'header',
                        children: [
                            { id: '2', type: 'logo' },
                            { id: '3', type: 'navigation', children: [{ id: '4', type: 'menuItem' }] },
                        ],
                    },
                ],
            },
            pageTemplate: {
                components: [
                    {
                        id: '5',
                        type: 'footer',
                        children: [
                            { id: '6', type: 'copyRight' },
                            { id: '7', type: 'links', children: [{ id: '8', type: 'menuItem' }] },
                        ],
                    },
                ],
            },
        } as IPageData;

        const componentType = 'button';
        const expected = [];

        const result = findComponentsByType(pageMock, componentType);

        expect(result).toEqual(expected);
        expect(result.length).toBe(0);
    });
});
