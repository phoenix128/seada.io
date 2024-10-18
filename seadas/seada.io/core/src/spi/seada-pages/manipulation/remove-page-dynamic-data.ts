import { IPageData } from '@seada.io/core/spi/components/interface';
import removeComponentsDynamicData from '@seada.io/core/spi/seada-pages/manipulation/remove-components-dynamic-data';

/**
 * Remove dynamic page data
 * @param page
 */
const removePageDynamicData = (page: IPageData): IPageData => {
    const newPage = JSON.parse(JSON.stringify(page)) as IPageData;
    if (!newPage) return newPage;

    newPage.pageLayout.components = removeComponentsDynamicData(newPage.pageLayout.components);
    newPage.pageTemplate.components = removeComponentsDynamicData(newPage.pageTemplate.components);

    return newPage;
};

export default removePageDynamicData;
