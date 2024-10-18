import getSourceIdByPortClass from '@seada.io/core/spi/get-source-id-by-port-class';
import { IPageData } from '@seada.io/core/spi/components/interface';

/**
 * Get the source ID for a specific source type for the current page.
 * @param portClass
 * @param pageData
 */
const useContextUnawareSourceIdByPortClass = (portClass: string, pageData: IPageData): string => {
    return getSourceIdByPortClass(portClass, pageData);
};

export default useContextUnawareSourceIdByPortClass;
