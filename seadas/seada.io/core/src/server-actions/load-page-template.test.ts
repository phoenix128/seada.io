import { ESeadaObjectType, IPageTemplateDefinition } from '@seada.io/core/spi/seada-pages/interface';
import loadPageTemplate from '@seada.io/core/server-actions/load-page-template';
import getSeadaFile from '@seada.io/core/spi/seada-pages/get-seada-file';

jest.mock('@seada.io/core/spi/seada-pages/get-seada-file');

describe('loadPageTemplate', () => {
    const areaCode = 'testArea';
    const pageType = 'testPageType';
    const fileName = 'testFile';

    it('should load page template with correct areaCode, pageType, and templateName', async () => {
        const mockTemplateDefinition: IPageTemplateDefinition = {} as IPageTemplateDefinition;

        (getSeadaFile as jest.Mock).mockResolvedValue(mockTemplateDefinition);

        const result = await loadPageTemplate(areaCode, pageType, fileName);

        expect(getSeadaFile).toHaveBeenCalledWith(areaCode, ESeadaObjectType.TEMPLATES, `${pageType}/${fileName}`);
        expect(result).toEqual({
            ...mockTemplateDefinition,
            areaCode: areaCode,
            pageType: pageType,
            pageVariant: fileName,
        });
    });

    it('should handle fetchSeadaFile rejection', async () => {
        const errorMessage = 'Error fetching file';
        (getSeadaFile as jest.Mock).mockRejectedValue(new Error(errorMessage));

        await expect(loadPageTemplate(areaCode, pageType, fileName)).rejects.toThrow(errorMessage);
    });
});
