import { IUseGetPersonalAreaUrlAdapter } from '@seada.io/user/ports/user/hooks/use-get-personal-area-url-port';
import useAreaPath from '@seada.io/core/hooks/use-area-path';
import { useMemo } from 'react';

const useGetPersonalAreaUrl: IUseGetPersonalAreaUrlAdapter = () => {
    const path = useAreaPath('/account.php');
    return useMemo(() => () => path, [path]);
};

export default useGetPersonalAreaUrl;
