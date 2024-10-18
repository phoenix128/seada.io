/**
 * Get an adapter hook
 * @param adapterCode
 * @param portClass
 * @param hookCode
 * @param adaptersHooks
 */
const getAdapterHook = <TData = any>(
    adapterCode: string,
    portClass: string,
    hookCode: string,
    adaptersHooks?: any
): (() => TData) | undefined => {
    const fqHookCode = `${portClass}/${hookCode}`;

    if (adaptersHooks?.[adapterCode]?.[fqHookCode]) {
        return adaptersHooks[adapterCode][fqHookCode];
    }

    console.warn(`Unsupported hook ${fqHookCode} for ${adapterCode}`);

    return undefined;
};

export default getAdapterHook;
