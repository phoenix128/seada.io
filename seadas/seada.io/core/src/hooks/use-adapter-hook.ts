import { useEffect, useMemo, useRef } from 'react';
import getAdapterHook from '@seada.io/core/service/get-adapter-hook';
import usePageData from '@seada.io/core/hooks/use-page-data';

interface IUseAdapterProxyHookFn<THook extends (...args: any[]) => any = (...args: any[]) => any> {
    (...args: any[]): ReturnType<THook>;
}

export type IUseAdapterProxyHook<THook extends (...args: any[]) => any = (...args: any[]) => any> =
    | IUseAdapterProxyHookFn<THook>
    | undefined;

/**
 * Before you blame me for conditionally calling a hook, please read this :)
 * Adapter code, hookType and sourcesHooks are all constant values, so no dynamic ordering of hooks is possible.
 * This means that the hook will always be called in the same order, so it's safe to call it.
 *
 * This was the most convenient way to use adapter hooks
 *
 * @param sourceAdapterCode
 * @param portClass
 * @param hookCode
 * @param fallbackHook
 * @param args
 */
export const useContextUnawareAdapterHook = <THook extends (...args: any[]) => any = (...args: any[]) => any>(
    sourceAdapterCode: string,
    portClass: string,
    hookCode: string,
    fallbackHook: THook,
    ...args: Parameters<THook>
): ReturnType<THook> | undefined => {
    const fqHookCode = `${portClass}/${hookCode}`;

    // Enforce parameters immutability
    const initialSourceCode = useRef(sourceAdapterCode);
    const initialHookType = useRef(fqHookCode);
    useEffect(() => {
        if (sourceAdapterCode !== initialSourceCode.current || fqHookCode !== initialHookType.current) {
            throw new Error(`useAdapterProxyHook cannot be called conditionally!`);
        }
    }, [sourceAdapterCode, fqHookCode]);

    const hook = useMemo(() => {
        const hook = getAdapterHook(sourceAdapterCode, portClass, hookCode);
        if (hook) return hook;
        return fallbackHook;
    }, [sourceAdapterCode, portClass, hookCode, fallbackHook]);

    return hook.apply(null, args);
};

/**
 * Context unaware version of useAdapterHook to use outside the PageDataContext
 * @param portClass
 * @param hookCode
 * @param fallbackHook
 * @param args
 */
const useAdapterHook = <THook extends (...args: any[]) => any = (...args: any[]) => any>(
    portClass: string,
    hookCode: string,
    fallbackHook: THook,
    ...args: Parameters<THook>
): ReturnType<THook> | undefined => {
    const { sourceIds, sourceAdaptersByIds } = usePageData();
    const sourceAdapterCode = sourceAdaptersByIds?.[sourceIds[portClass]];

    return useContextUnawareAdapterHook(sourceAdapterCode, portClass, hookCode, fallbackHook, ...args);
};

export default useAdapterHook;
