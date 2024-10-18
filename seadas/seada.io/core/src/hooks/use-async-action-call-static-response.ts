import { useMemo } from 'react';
import { IAsyncActionCall } from '@seada.io/core/hooks/use-async-action';

/**
 * This is a utility class for proxy hooks adapters using async actions
 * @param data
 */
const useAsyncActionCallStaticResponse = <TData = any>(data?: TData) => {
    const serializedData = JSON.stringify(data);

    return useMemo<() => IAsyncActionCall>(
        () => () => ({
            action: async (...args: any) => {},
            loading: false,
            data,
            error: null,
        }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [serializedData]
    );
};

export default useAsyncActionCallStaticResponse;
