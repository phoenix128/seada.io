import { sourceUnawareManagementApi } from '@seada.io/bigcommerce/spi/rest/management-api';

export const issueStorefrontToken = async (
    storeHash: string,
    accessToken: string,
    clientId: string,
    channelId: string
): Promise<string> => {
    const res = await sourceUnawareManagementApi(
        storeHash,
        accessToken,
        clientId,
        'POST',
        '/storefront/api-token',
        {},
        {
            expires_at: 2147483647,
            channel_id: parseInt(channelId, 10),
            allowed_cors_origins: ['http://localhost:3000'],
        }
    );

    if (res.errors) {
        throw new Error(res.title);
    }

    return res.data.token;
};

export const issueImpersonationToken = async (
    storeHash: string,
    accessToken: string,
    clientId: string,
    channelId: string
): Promise<string> => {
    const res = await sourceUnawareManagementApi(
        storeHash,
        accessToken,
        clientId,
        'POST',
        '/storefront/api-token-customer-impersonation',
        {},
        {
            expires_at: 2147483647,
            channel_id: parseInt(channelId, 10),
        }
    );

    return res.data.token;
};
