import usePageData from '@seada.io/core/hooks/use-page-data';
import useContextUnawareSourceIdByPortClass from '@seada.io/core/hooks/use-context-unaware-source-id-by-port-class';

/**
 * Get the source ID for a specific source type for the current page.
 * @param portClass
 */
const useSourceIdByPortClass = (portClass: string): string => {
    const pageData = usePageData();
    return useContextUnawareSourceIdByPortClass(portClass, pageData);
};

export default useSourceIdByPortClass;
