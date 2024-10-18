import { useCallback, useEffect } from 'react';

const useCustomEventListener = <TEventData = any>(
    eventName: string,
    handler: (payload: TEventData) => void,
    options?: boolean | AddEventListenerOptions
) => {
    const handlerCallback = useCallback(
        (evt: Event) => {
            handler((evt as any).detail as TEventData);
        },
        [handler]
    );

    useEffect(() => {
        window.addEventListener(eventName, handlerCallback, options);

        return () => {
            window.removeEventListener(eventName, handlerCallback, options);
        };
    }, [eventName, handler, handlerCallback, options]);
};

export default useCustomEventListener;
