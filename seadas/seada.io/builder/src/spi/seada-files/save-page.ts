import { ESeadaObjectType } from '@seada.io/core/spi/seada-pages/interface';
import getStorageAdapter from '@seada.io/builder/service/storage/get-storage-adapter';
import updateOverride from '@seada.io/builder/service/update-override';
import removeComponentsDynamicData from '@seada.io/core/spi/seada-pages/manipulation/remove-components-dynamic-data';
import { IPageData } from '@seada.io/core/spi/components/interface';
import removeEmptyChildren from '@seada.io/core/spi/seada-pages/manipulation/remove-empty-children';
import invalidateSiteCacheKeys from '@seada.io/builder/spi/control/invalidate-site-cache-keys';
import getSeadaFilesBasePath from '@seada.io/core/spi/seada-pages/get-seada-files-base-path';

const savePage = async (path: string, inPageData: IPageData): Promise<void> => {
    const pageData = JSON.parse(JSON.stringify(inPageData)) as IPageData;
    const {
        areaCode,
        pageTemplate: { pageVariant, pageType, ...template },
        pageLayout: { templateName: layoutTemplateName, ...layout },
    } = pageData;

    const basePath = getSeadaFilesBasePath(areaCode);

    delete template.areaCode;
    delete layout.areaCode;

    template.components = removeEmptyChildren(removeComponentsDynamicData(template.components));
    layout.components = removeEmptyChildren(removeComponentsDynamicData(layout.components));

    // Save the specific page
    const adapter = getStorageAdapter('objects');
    await adapter.writeObject(basePath, ESeadaObjectType.TEMPLATES, `${pageType}/${pageVariant}`, template);
    await adapter.writeObject(basePath, ESeadaObjectType.LAYOUTS, layoutTemplateName, layout);

    // Set the variant exception
    await updateOverride(areaCode, path, pageVariant);
    await invalidateSiteCacheKeys([
        `seada-file:${basePath}/${ESeadaObjectType.TEMPLATES}/${pageType}/${pageVariant}`,
        `seada-file:${basePath}/${ESeadaObjectType.LAYOUTS}/${layoutTemplateName}`,
    ]);
};

export default savePage;
