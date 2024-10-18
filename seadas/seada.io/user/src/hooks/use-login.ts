import { useCallback, useEffect } from 'react';
import usePageData from '@seada.io/core/hooks/use-page-data';
import useUserData from '@seada.io/user/hooks/use-user-data';
import useLoginAdapter, { IUseLoginAdapter } from '@seada.io/user/ports/user/hooks/use-login-port';

const useLogin = (): ReturnType<IUseLoginAdapter> => {
    const pageData = usePageData();
    const { setUserToken } = useUserData();

    const { action, data, loading, error } = useLoginAdapter();

    const login = useCallback(
        (username: string, password: string) => {
            action(username, password);
        },
        [action]
    );

    useEffect(() => {
        setUserToken(data || '');
    }, [data, pageData, setUserToken]);

    return { action: login, loading, data, error };
};

export default useLogin;
