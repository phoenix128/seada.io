import { useCallback, useMemo } from 'react';
import { IUserData } from '@seada.io/user/interface/user';
import { readWithoutVerify } from '@seada.io/core/spi/jwt';
import useUserToken from '@seada.io/user/hooks/use-user-token';
import { useCookies } from 'react-cookie';
import getUserTokenCookieName from '@seada.io/user/spi/get-user-token-cookie';
import usePageData from '@seada.io/core/hooks/use-page-data';

const SESSION_DURATION = 1000 * 60 * 60 * 24 * 30;

export interface IUseUserDataResult {
    userData: IUserData | null;
    setUserToken: (token: string) => void;
}

const useUserData = (): IUseUserDataResult => {
    const pageData = usePageData();
    const userToken = useUserToken();
    const [cookies, setCookie] = useCookies();

    const userTokenCookieName = getUserTokenCookieName(pageData);
    const userData = useMemo(() => {
        return userToken ? readWithoutVerify<IUserData>(userToken) : null;
    }, [userToken]);

    const setUserToken = useCallback(
        (token: string) => {
            setCookie(userTokenCookieName, token, {
                expires: new Date(Date.now() + SESSION_DURATION),
                httpOnly: false,
            });
        },
        [setCookie, userTokenCookieName]
    );

    return { userData, setUserToken };
};

export default useUserData;
