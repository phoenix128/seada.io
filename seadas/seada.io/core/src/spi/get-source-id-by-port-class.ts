import { ICorePageRouterAreaDefinition } from '@seada.io/core/spi/page-router/interface';

/**
 * Get the source type for a given source ID.
 * @param portClass
 * @param pageData
 */
const getSourceIdByPortClass = (portClass: string, pageData: ICorePageRouterAreaDefinition): string => {
    const sourceIds = pageData?.sourceIds;
    const res = sourceIds?.[portClass];

    if (!res) {
        throw new Error(`Source ID not found for source type "${portClass}".`);
    }

    return res;
};

export default getSourceIdByPortClass;
