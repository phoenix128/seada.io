'use server';

import managementApi from '@seada.io/bigcommerce/spi/rest/management-api';
import decodeUserToken from '@seada.io/user/spi/decode-user-token';
import { getSourceConfigValueOrThrow } from '@seada.io/core/libs/get-source-config-value';
import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';
import { IBigCommerceQueryContext } from '@seada.io/bigcommerce/spi/bigcommerce-query-context';

const getCheckoutUrl = async (context: IBigCommerceQueryContext, cartId: string): Promise<string> => {
    if (!cartId) {
        return null;
    }

    const { sourceId, userToken } = context;

    const userData = decodeUserToken(userToken);
    const res = await managementApi(sourceId, 'POST', `/carts/${cartId}/redirect_urls`);
    const cartRedirectUrl = res.data['checkout_url'];

    if (!userData?.userId) {
        return cartRedirectUrl;
    }

    const storeUrl = getSourceConfigValueOrThrow(sourceId, 'storeUrl').replace(/\/$/, '');
    const storeHash = getSourceConfigValueOrThrow(sourceId, 'storeHash');
    const clientId = getSourceConfigValueOrThrow(sourceId, 'clientId');
    const clientSecret = getSourceConfigValueOrThrow(sourceId, 'clientSecret');
    const dateCreated = Math.round(new Date().getTime() / 1000) - 5; // 5 seconds in the past to avoid clock skew

    const payload = {
        iss: clientId,
        iat: dateCreated,
        jti: uuidv4(),
        operation: 'customer_login',
        store_hash: storeHash,
        redirect_to: cartRedirectUrl,
        customer_id: userData?.userId,
    };

    const token = jwt.sign(payload, clientSecret, { algorithm: 'HS256' });
    return `${storeUrl}/login/token/${token}`;
};

export default getCheckoutUrl;
