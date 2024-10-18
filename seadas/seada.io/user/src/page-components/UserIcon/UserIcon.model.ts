import { IUserIconSchema } from '@seada.io/user/page-components/UserIcon/schema';
import useUserData from '@seada.io/user/hooks/use-user-data';
import useGoToUrl from '@seada.io/core/hooks/use-go-to-url';
import useGetLoginUrlPort from '@seada.io/user/ports/user/hooks/use-get-login-url-port';
import useGetPersonalAreaUrlPort from '@seada.io/user/ports/user/hooks/use-get-personal-area-url-port';
import { useCallback, useMemo } from 'react';
import { IPageComponentSchemaProps } from '@seada.io/core-schema/spi/components/interface';

const useUserIconModel = (props: IPageComponentSchemaProps<IUserIconSchema>) => {
    const { userData } = useUserData();
    const gotoUrl = useGoToUrl();

    const getLoginUrl = useGetLoginUrlPort();
    const getPersonalAreaUrl = useGetPersonalAreaUrlPort();

    const handleClick = useCallback(() => {
        if (userData?.userId) {
            gotoUrl(getPersonalAreaUrl());
        } else {
            gotoUrl(getLoginUrl());
        }
    }, [getLoginUrl, getPersonalAreaUrl, gotoUrl, userData?.userId]);

    return useMemo(
        () => ({
            data: {
                userData,
            },
            handlers: {
                handleClick,
            },
        }),
        [handleClick, userData]
    );
};

export default useUserIconModel;
