import getSourceIdByPortClass from '@seada.io/core/spi/get-source-id-by-port-class';
import { IPageData } from '@seada.io/core/spi/components/interface';
import getSourceAdapterCodeById from '@seada.io/core/spi/get-source-adapter-code-by-id';

/**
 * Get the source adapter code for a specific source type for the current page.
 * @param portClass
 * @param pageData
 */
const useContextUnawareSourceAdapterCodeByPortClass = (portClass: string, pageData: IPageData): string => {
    return getSourceAdapterCodeById(getSourceIdByPortClass(portClass, pageData), pageData);
};

export default useContextUnawareSourceAdapterCodeByPortClass;
