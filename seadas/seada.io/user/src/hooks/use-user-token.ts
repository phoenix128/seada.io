import { useCookies } from 'react-cookie';
import getUserTokenCookieName from '@seada.io/user/spi/get-user-token-cookie';
import usePageData from '@seada.io/core/hooks/use-page-data';

const useUserToken = (): string | undefined => {
    const pageData = usePageData();
    const [cookies, _] = useCookies();
    const userTokenCookieName = getUserTokenCookieName(pageData);
    return cookies?.[userTokenCookieName];
};

export default useUserToken;
