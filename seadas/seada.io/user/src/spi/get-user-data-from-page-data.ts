import { IPageData } from '@seada.io/core/spi/components/interface';
import getUserTokenCookieName from '@seada.io/user/spi/get-user-token-cookie';
import decodeUserToken from '@seada.io/user/spi/decode-user-token';
import { IUserData } from '@seada.io/user/interface/user';

/**
 * Get user data from page data
 * @param pageData
 */
const getUserDataFromPageData = (pageData: IPageData): IUserData => {
    const cookieName = getUserTokenCookieName(pageData);
    const userToken = pageData.cookies?.[cookieName];

    return decodeUserToken(userToken);
};

export default getUserDataFromPageData;
