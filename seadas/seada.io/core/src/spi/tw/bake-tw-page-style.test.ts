import { IPageData } from '@seada.io/core/spi/components/interface';
import bakeTwPageStyle from '@seada.io/core/spi/tw/bake-tw-page-style';
import getCurrentCompiledTailwind from '@seada.io/core/spi/tw/get-compiled-tailwind';

jest.mock('@seada.io/core/spi/tw/get-tw-custom-config', () => ({
    __esModule: true,
    default: jest.fn(() => ({ plugins: [] })),
}));

jest.mock('@seada.io/core/spi/cache/cache-wrapper', () => ({
    __esModule: true,
    default: jest.fn((key, worker) => worker()),
}));

jest.mock('@seada.io/core/spi/tw/get-compiled-tailwind');

jest.mock('@seada.io/core/libs/profile', () => ({
    profilerWrapperAsync: jest.fn((name, worker) => worker()),
}));

describe('bakeTwPageStyle', () => {
    it('should only add missing directives', async () => {
        const mockPageData = {
            pageLayout: {
                components: [{ providedProps: { class: 'text-xl columns-3' } }],
            },
            pageTemplate: {
                components: [],
            },
        } as unknown as IPageData;

        (getCurrentCompiledTailwind as jest.Mock).mockResolvedValueOnce('.text-xl { font-size: 1.25rem; }');

        const result = await bakeTwPageStyle(mockPageData);

        expect(result).toContain('.columns-3');
        expect(result).not.toContain('.text-xl');
    });

    it('should keep media queries', async () => {
        const mockPageData = {
            pageLayout: {
                components: [{ providedProps: { class: 'md:columns-3 columns-3' } }],
            },
            pageTemplate: {
                components: [],
            },
        } as unknown as IPageData;

        (getCurrentCompiledTailwind as jest.Mock).mockResolvedValueOnce('');

        const result = await bakeTwPageStyle(mockPageData);

        expect(result).toContain('@media');
        expect(result.match(/\.columns-3/g).length).toBe(1);
        expect(result.match(/\.md\\:columns-3/g).length).toBe(1);
    });

    it('should not mess up with existing media queries', async () => {
        const mockPageData = {
            pageLayout: {
                components: [{ providedProps: { class: 'md:columns-3 columns-3' } }],
            },
            pageTemplate: {
                components: [],
            },
        } as unknown as IPageData;

        (getCurrentCompiledTailwind as jest.Mock).mockResolvedValueOnce('.columns-3 { columns: 3 }');

        const result = await bakeTwPageStyle(mockPageData);

        expect(result).toContain('@media');
        expect(result).not.toContain('.columns-3');
        expect(result.match(/\.md\\:columns-3/g).length).toBe(1);
    });
});
