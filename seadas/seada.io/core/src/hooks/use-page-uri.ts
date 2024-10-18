import usePageData from '@seada.io/core/hooks/use-page-data';

/**
 * Returns the current page URI.
 */
const usePageUri = (): string => {
    const pageData = usePageData();
    const url = new URL(pageData.pagePath || '', 'http://a');

    return url.pathname + url.search;
};

export default usePageUri;
