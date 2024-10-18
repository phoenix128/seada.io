import { IUserData } from '@seada.io/user/interface/user';
import useUserData from '@seada.io/user/hooks/use-user-data';
import useUpdatePersonalDataAdapter, {
    IUseUpdatePersonalDataAdapter,
} from '@seada.io/user/ports/user/hooks/use-update-personal-data-port';
import { useCallback, useEffect } from 'react';

const useUpdatePersonalData = (): ReturnType<IUseUpdatePersonalDataAdapter> => {
    const { setUserToken } = useUserData();

    const { action, data, loading, error } = useUpdatePersonalDataAdapter();

    const update = useCallback(
        (userData: Partial<IUserData>) => {
            action(userData);
        },
        [action]
    );

    useEffect(() => {
        if (!data) return;
        setUserToken(data || '');
    }, [data, setUserToken]);

    return { action: update, loading, data, error };
};

export default useUpdatePersonalData;
