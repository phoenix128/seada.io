import getEnvPath from '@seada.io/core/libs/get-env-path';

const invalidateSiteCacheKeys = async (keys: string[]) => {
    const builderTarget = getEnvPath<string>('builderTarget', '').replace(/\/$/, '');
    const res = await fetch(`${builderTarget}/control/invalidate`, {
        headers: { 'X-Seada-Control-Auth': getEnvPath('controlSharedSecret') },
        method: 'POST',
        body: JSON.stringify({ keys }),
    });

    console.log(`Sending invalidation for: ${keys.join(', ')}`);

    if (res.status !== 200) {
        throw new Error(`Failed to invalidate cache keys: ${res.statusText}`);
    }
};

export default invalidateSiteCacheKeys;
