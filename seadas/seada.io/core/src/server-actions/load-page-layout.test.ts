import { ESeadaObjectType, IPageLayoutDefinition } from '@seada.io/core/spi/seada-pages/interface';
import loadPageLayout from '@seada.io/core/server-actions/load-page-layout';
import getSeadaFile from '@seada.io/core/spi/seada-pages/get-seada-file';

jest.mock('@seada.io/core/spi/seada-pages/get-seada-file');

describe('loadPageLayout', () => {
    const areaCode = 'testArea';
    const fileName = 'testFile';

    it('should load page layout with correct areaCode and templateName', async () => {
        const mockLayoutDefinition: IPageLayoutDefinition = {} as IPageLayoutDefinition;

        (getSeadaFile as jest.Mock).mockResolvedValue(mockLayoutDefinition);

        const result = await loadPageLayout(areaCode, fileName);

        expect(getSeadaFile).toHaveBeenCalledWith(areaCode, ESeadaObjectType.LAYOUTS, fileName);
        expect(result).toEqual({
            ...mockLayoutDefinition,
            areaCode: areaCode,
            templateName: fileName,
        });
    });

    it('should handle fetchSeadaFile rejection', async () => {
        const errorMessage = 'Error fetching file';
        (getSeadaFile as jest.Mock).mockRejectedValue(new Error(errorMessage));

        await expect(loadPageLayout(areaCode, fileName)).rejects.toThrow(errorMessage);
    });
});
