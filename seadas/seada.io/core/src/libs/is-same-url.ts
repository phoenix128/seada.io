/**
 * Check if two urls are the same
 * @param url1
 * @param url2
 */
const isSameUrl = (url1: string, url2: string) => {
    url1 = url1.replace(/\/+$/, '');
    url2 = url2.replace(/\/+$/, '');

    if (url1.match('^(https?:)?//') || url2.match('^(https?:)?//')) {
        return url1 === url2;
    }

    const url1o = new URL(url1, 'http://a');
    const url2o = new URL(url2, 'http://a');

    url1o.pathname = url1o.pathname.replace(/\/$/, '');
    url2o.pathname = url2o.pathname.replace(/\/$/, '');

    return url1o.hostname === url2o.hostname && url1o.pathname === url2o.pathname && url1o.search === url2o.search;
};

export default isSameUrl;
