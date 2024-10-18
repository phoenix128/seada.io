import getFlatComponentsList from '@seada.io/core/spi/seada-pages/manipulation/get-flat-components-list';
import { IPageData } from '@seada.io/core/spi/components/interface';

describe('getFlatComponentsList', () => {
    it('should return a flat list of all components in the page data', () => {
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

        const expected = [
            { id: '1', type: 'header' },
            { id: '2', type: 'logo' },
            { id: '3', type: 'navigation' },
            { id: '4', type: 'menuItem' },
            { id: '5', type: 'footer' },
            { id: '6', type: 'copyRight' },
            { id: '7', type: 'links' },
            { id: '8', type: 'menuItem' },
        ];

        const result = getFlatComponentsList(pageMock);

        expect(result).toEqual(expect.arrayContaining(expected));
        expect(result.length).toBe(8);
    });
});
