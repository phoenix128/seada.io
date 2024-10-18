import { useCallback, useLayoutEffect, useRef } from 'react';

const useCustomEventCallback = <TEventData = any>(eventName: string) => {
    const ref = useRef<(payload: TEventData) => void>(() => {
        throw new Error('Cannot call the event callback while rendering.');
    });

    const cb = useCallback(
        (payload: TEventData) => {
            window.dispatchEvent(new CustomEvent(eventName, { detail: payload }));
        },
        [eventName]
    );

    useLayoutEffect(() => {
        ref.current = cb;
    }, [cb]);

    return useCallback(
        (payload: TEventData) => {
            ref.current(payload);
        },
        [ref]
    );
};

export default useCustomEventCallback;
