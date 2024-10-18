import { getSourceConfigValueOrThrow } from '@seada.io/core/libs/get-source-config-value';

export const sourceUnawareManagementApi = async (
    storeHash: string,
    accessToken: string,
    clientId: string,
    method: string,
    path: string,
    searchParams: Record<string, string> = {},
    body: Record<string | number, any> = {}
) => {
    const apiBaseUrl =
        path.startsWith('/v2/') || path.startsWith('/v3/')
            ? `https://api.bigcommerce.com/stores/${storeHash}`
            : `https://api.bigcommerce.com/stores/${storeHash}/v3`;

    const fetchConfig: RequestInit = {
        method,
        cache: 'force-cache',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'X-Auth-Token': accessToken,
            'X-Auth-Client': clientId,
        },
    };

    if (method === 'POST' || method === 'PUT') {
        fetchConfig.body = JSON.stringify(body);
    }

    const url = new URL(path, 'https://a');
    for (const key in searchParams) {
        url.searchParams.set(key, searchParams[key]);
    }

    const fullUrl = `${apiBaseUrl}${url.pathname}${url.search}`;
    const response = await fetch(fullUrl, fetchConfig);
    return response.json();
};

/**
 * Execute a request to the BigCommerce management API.
 * @param sourceId
 * @param method
 * @param path
 * @param searchParams
 * @param body
 */
const managementApi = async (
    sourceId: string,
    method: string,
    path: string,
    searchParams: Record<string, string> = {},
    body: Record<string | number, any> = {}
): Promise<any> => {
    const storeHash = getSourceConfigValueOrThrow(sourceId, 'storeHash');
    const accessToken = getSourceConfigValueOrThrow(sourceId, 'accessToken');
    const clientId = getSourceConfigValueOrThrow(sourceId, 'clientId');

    return sourceUnawareManagementApi(storeHash, accessToken, clientId, method, path, searchParams, body);
};

export default managementApi;
