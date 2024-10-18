import { IUserData } from '@seada.io/user/interface/user';
import updatePersonalData from '@seada.io/bigcommerce/server-actions/update-personal-data';
import useAsyncAction from '@seada.io/core/hooks/use-async-action';
import { IUseUpdatePersonalDataAdapter } from '@seada.io/user/ports/user/hooks/use-update-personal-data-port';
import useBigcommerceQueryContext from '@seada.io/bigcommerce/hooks/use-bigcommerce-query-context';
import { useMemo } from 'react';
import userPortClass from '@seada.io/user/spi/user-port-class';

const useUpdatePersonalData: IUseUpdatePersonalDataAdapter = () => {
    const queryContext = useBigcommerceQueryContext(userPortClass);
    const fn = useMemo(() => (userData: IUserData) => updatePersonalData(queryContext, userData), [queryContext]);

    return useAsyncAction(fn);
};

export default useUpdatePersonalData;
