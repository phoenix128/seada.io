import setCookieParser, { CookieMap } from 'set-cookie-parser';
import libCookie, { CookieSerializeOptions } from 'cookie';

export interface ICookieNamespace {
    code: string;
    sourceId: string;
}

export interface IOptions {
    addNamespace?: ICookieNamespace;
    removeNamespace?: ICookieNamespace;
    restrict?: string[];
}

/**
 * Processes the cookie name
 * @param name
 * @param options
 */
export const processCookieName = (name: string, options: IOptions = {}): string => {
    let res = name;

    if (options.removeNamespace) {
        const { code, sourceId } = options.removeNamespace;
        if (res.startsWith(`${code}:${sourceId}:`)) {
            res = res.replace(`${code}:${sourceId}:`, '');
        }
    }

    if (options.restrict && !options.restrict.includes(res)) {
        return undefined;
    }

    if (options.addNamespace) {
        const { code, sourceId } = options.addNamespace;
        if (!res.startsWith(`${code}:${sourceId}:`)) {
            res = `${code}:${sourceId}:${res}`;
        }
    }

    return res;
};

/**
 * Filters the request cookies based on the options without modifying the original object
 * Useful for early tage filtering only
 * @param cookies
 * @param options
 */
export const filterRequestCookies = (cookies: CookieMap, options: IOptions = {}): CookieMap => {
    return Object.entries(cookies).reduce((acc, [name, value]) => {
        const cookieName = processCookieName(name, options);
        if (cookieName !== undefined) {
            acc[name] = value;
        }
        return acc;
    }, {});
};

/**
 * Extracts the cookies from the response headers
 * @param headers
 * @param options
 */
export const getResponseCookies = (headers: Headers, options: IOptions = {}): CookieMap => {
    const combinedCookieHeader = headers.get('Set-Cookie');
    const splitCookieHeaders = setCookieParser.splitCookiesString(combinedCookieHeader);

    const res = setCookieParser.parse(splitCookieHeaders, {
        decodeValues: true,
        map: true,
    });

    return Object.entries(res).reduce((acc, [name, value]) => {
        const cookieName = processCookieName(name, options);
        if (cookieName !== undefined) {
            acc[cookieName] = {
                name: cookieName,
                ...value,
            };
        }
        return acc;
    }, {});
};

/**
 * Set the cookies to the response headers
 * @param headers
 * @param cookies
 * @param options
 */
export const setResponseCookies = (headers: Headers, cookies: CookieMap, options: IOptions = {}): void => {
    const existingCookies = getResponseCookies(headers);
    headers.delete('Set-Cookie');

    Object.values(cookies).forEach((cookie) => {
        const { name, value, ...cookieOptions } = cookie;

        const cookieName = processCookieName(name, options);
        delete existingCookies[cookieName];
        if (cookieName !== undefined) {
            headers.append(
                'Set-Cookie',
                libCookie.serialize(cookieName, value, cookieOptions as CookieSerializeOptions)
            );
        }
    });

    Object.values(existingCookies).forEach((cookie) => {
        const { name, value, ...cookieOptions } = cookie;

        headers.append('Set-Cookie', libCookie.serialize(name, value, cookieOptions as CookieSerializeOptions));
    });
};

/**
 * Processes the cookies from the request
 * @param cookies
 * @param options
 */
export const processRequestCookies = (
    cookies: Record<string, string> | undefined,
    options: IOptions = {}
): Record<string, string> => {
    if (!cookies) {
        return {};
    }

    return Object.entries(cookies).reduce((acc, [name, value]) => {
        const cookieName = processCookieName(name, options);
        if (cookieName !== undefined) {
            acc[cookieName] = value;
        }
        return acc;
    }, {});
};

/**
 * Serializes the cookies for the request
 * @param cookies
 * @param options
 */
export const serializeRequestCookies = (
    cookies: Record<string, string> | undefined,
    options: IOptions = {}
): string => {
    if (!cookies) {
        return undefined;
    }

    const processedCookies = processRequestCookies(cookies, options);
    return Object.entries(processedCookies)
        .reduce((acc, [name, value]) => {
            acc.push(`${name}=${encodeURIComponent(value)}`);
            return acc;
        }, [])
        .join('; ');
};
