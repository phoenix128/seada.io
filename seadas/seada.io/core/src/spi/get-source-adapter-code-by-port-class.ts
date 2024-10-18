import { IPageData } from '@seada.io/core/spi/components/interface';

/**
 * Get the source adapter code for a given port class.
 * @param portClass
 * @param pageData
 */
const getSourceAdapterCodeByPortClass = (portClass: string, pageData: IPageData): string => {
    const sourceId = pageData.sourceIds?.[portClass];
    const sourceAdapterCode = pageData.sourceAdaptersByIds?.[sourceId];

    if (!sourceAdapterCode) {
        throw new Error(`Source adapter code not found for port class "${portClass}".`);
    }

    return sourceAdapterCode;
};

export default getSourceAdapterCodeByPortClass;
