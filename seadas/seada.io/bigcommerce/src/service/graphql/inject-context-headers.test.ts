import injectContextHeaders, { IContextWithHeaders } from './inject-context-headers';
import { getSourceConfigValueOrThrow } from '@seada.io/core/libs/get-source-config-value';
import { IBigCommerceQueryContext } from '@seada.io/bigcommerce/spi/bigcommerce-query-context';
import decodeUserToken from '@seada.io/user/spi/decode-user-token';

jest.mock('@seada.io/user/spi/decode-user-token');
jest.mock('@seada.io/core/libs/get-source-config-value');

describe('injectContextHeaders', () => {
    const bigcommerceContext: IBigCommerceQueryContext = {
        sourceId: 'sourceId',
        userToken: 'userToken',
    };

    const context: IContextWithHeaders = {};

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should inject context headers without userId', () => {
        const customerToken = 'customerToken';
        const expectedHeaders = {
            Authorization: `Bearer ${customerToken}`,
        };

        (getSourceConfigValueOrThrow as jest.Mock).mockReturnValueOnce(customerToken);

        const result = injectContextHeaders(bigcommerceContext, context);

        expect(result.headers).toEqual(expectedHeaders);
        expect(getSourceConfigValueOrThrow).toHaveBeenCalledWith('sourceId', 'customerImpersonationToken');
    });

    it('should inject context headers with userId', () => {
        const customerToken = 'customerToken';
        const userId = 123;
        const expectedHeaders = {
            'X-Bc-Customer-Id': `${userId}`,
            Authorization: `Bearer ${customerToken}`,
        };

        (getSourceConfigValueOrThrow as jest.Mock).mockReturnValueOnce(customerToken);
        (decodeUserToken as jest.Mock).mockReturnValueOnce({ userId: userId.toString() });

        const result = injectContextHeaders(bigcommerceContext, { ...context, userId });

        expect(result.headers).toEqual(expectedHeaders);
        expect(getSourceConfigValueOrThrow).toHaveBeenCalledWith('sourceId', 'customerImpersonationToken');
        expect(decodeUserToken).not.toHaveBeenCalled();
    });
});
