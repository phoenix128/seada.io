import { useCallback, useRef, useState } from 'react';

export interface IAsyncActionCall<TFn extends (...args: any) => Promise<any> = (...args: any) => Promise<any>> {
    loading: boolean;
    data: Awaited<ReturnType<TFn>> | undefined;
    error: Error | undefined;
    action: (...args: Parameters<TFn>) => void;
}

const useAsyncAction = <TFn extends (...args: any) => Promise<any> = (...args: any) => Promise<any>>(
    asyncAction: TFn,
    onSuccess?: (result: Awaited<ReturnType<TFn>> | undefined) => void,
    onError?: (error: Error) => void
): IAsyncActionCall<TFn> => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<Awaited<ReturnType<TFn>> | undefined>(undefined);
    const [error, setError] = useState<Error | undefined>(undefined);
    const versionRef = useRef(0);

    const asyncActionRef = useRef(asyncAction);
    const onErrorRef = useRef(onError);
    const onSuccessRef = useRef(onSuccess);

    asyncActionRef.current = asyncAction;
    onErrorRef.current = onError;
    onSuccessRef.current = onSuccess;

    const action = useCallback((...args: Parameters<TFn>) => {
        const currentVersion = ++versionRef.current;
        setLoading(true);
        asyncActionRef.current
            .apply(null, args)
            .then((result: Awaited<ReturnType<TFn>>) => {
                if (versionRef.current === currentVersion) {
                    onSuccessRef.current?.(result);
                    setData(result);
                    setError(undefined);
                }
            })
            .catch((error: Error) => {
                if (versionRef.current === currentVersion) {
                    onErrorRef.current?.(error);
                    setData(undefined);
                    setError(error);
                    console.error(error);
                }
            })
            .finally(() => {
                if (versionRef.current === currentVersion) {
                    setLoading(false);
                }
            });
    }, []);

    return { loading, data, error, action };
};

export default useAsyncAction;
