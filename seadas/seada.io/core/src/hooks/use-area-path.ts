import usePageData from '@seada.io/core/hooks/use-page-data';

/**
 * Map path to a path prefixed by area path
 * @param path
 */
const useAreaPath = (path: string) => {
    const pageData = usePageData();
    return pageData.areaPath + path?.replace(/^\//, '');
};

export default useAreaPath;
