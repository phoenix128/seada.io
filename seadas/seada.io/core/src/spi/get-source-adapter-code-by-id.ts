import { ICorePageRouterAreaDefinition } from '@seada.io/core/spi/page-router/interface';

/**
 * Get the source type for a given source ID.
 * @param sourceId
 * @param pageData
 */
const getSourceAdapterCodeById = (sourceId: string, pageData: ICorePageRouterAreaDefinition): string => {
    const sourceAdaptersByIds = pageData?.sourceAdaptersByIds;
    const res = sourceAdaptersByIds?.[sourceId];

    if (!res) {
        throw new Error(`Source type not found for source ID "${sourceId}".`);
    }

    return res;
};

export default getSourceAdapterCodeById;
