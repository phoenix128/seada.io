import { getEnvPathBool } from '@seada.io/core/libs/get-env-path';

const isProfilerEnabled = getEnvPathBool('profilerEnabled', false);

export const profilerWrapperSync = <T = any>(name: string, fn: () => T): T => {
    if (!isProfilerEnabled) return fn();

    const timeStart = Date.now();
    const result = fn();
    const timeEnd = Date.now();
    const elapsedMilliseconds = timeEnd - timeStart;
    console.log(`[profile] ${name}: ${elapsedMilliseconds}ms`);

    return result;
};

export const profilerWrapperAsync = async <T = any>(name: string, fn: () => Promise<T>): Promise<T> => {
    if (!isProfilerEnabled) return fn();

    const timeStart = Date.now();
    const result = await fn();
    const timeEnd = Date.now();
    const elapsedMilliseconds = Math.round(timeEnd - timeStart);

    console.log(`[profile] ${name}: ${elapsedMilliseconds}ms`);

    return result;
};
