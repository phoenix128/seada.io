import { useEffect, useRef } from 'react';

/**
 * Subscribes to a value and calls a callback when it changes
 * @param value
 * @param callback
 * @param debounceMs
 */
const useSubscribe = <TData = any>(
    value: TData,
    callback: (newValue: TData, prevValue: TData) => void,
    debounceMs: number = 0
) => {
    const callbackRef = useRef(callback);
    const prevValue = useRef<TData>(value);
    const debounceTimeout = useRef<any>();

    callbackRef.current = callback;

    useEffect(() => {
        if (value === prevValue.current) return;

        if (debounceTimeout.current) {
            clearTimeout(debounceTimeout.current);
            debounceTimeout.current = undefined;
        }

        if (debounceMs === 0) {
            callbackRef.current(value, prevValue.current);
            prevValue.current = value;
            return;
        }

        debounceTimeout.current = setTimeout(() => {
            callbackRef.current(value, prevValue.current);
            prevValue.current = value;
        }, debounceMs);
    }, [value, callback, debounceMs]);
};

export default useSubscribe;
