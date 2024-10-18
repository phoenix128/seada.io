import { IAsyncActionCall } from '@seada.io/core/hooks/use-async-action';
import { useEffect, useRef, useState } from 'react';
import useToast from '@seada.io/core/hooks/use-toast';
import { useTranslation } from 'react-i18next';

const useAsyncActionResult = <TFn extends (...args: any) => Promise<any> = (...args: any) => Promise<any>>(
    result: IAsyncActionCall<TFn>,
    onSuccess?: ((data: Awaited<ReturnType<TFn>>) => void) | string,
    onError?: ((error: Error) => void) | string
) => {
    const { error, loading, data } = result;
    const toast = useToast();
    const { t } = useTranslation();

    const [lastData, setLastData] = useState(data);
    const [lastError, setLastError] = useState(error);

    const onSuccessRef = useRef(onSuccess);
    const onErrorRef = useRef(onError);

    onSuccessRef.current = onSuccess;
    onErrorRef.current = onError;

    useEffect(() => {
        if (!onErrorRef.current || !error || error === lastError || loading) return;

        if (typeof onErrorRef.current === 'string') {
            toast(t(onErrorRef.current, { error: error.message }), { type: 'error' });
        } else if (typeof onErrorRef.current === 'function') {
            onErrorRef.current?.(error);
        }

        console.error(error);

        setLastError(error);
    }, [error, lastError, loading, t, toast]);

    useEffect(() => {
        if (!onSuccessRef.current || data === undefined || data === lastData || loading) return;

        if (typeof onSuccessRef.current === 'string') {
            toast(t(onSuccessRef.current), { type: 'success' });
        } else if (typeof onSuccessRef.current === 'function') {
            onSuccessRef.current?.(data);
        }

        setLastData(data);
    }, [data, lastData, loading, t, toast]);
};

export default useAsyncActionResult;
