import { Milliseconds, Store } from 'cache-manager';
import { staticGenerationAsyncStorage } from 'next/dist/client/components/static-generation-async-storage.external';
import md5 from 'md5';

export interface IncrementalCacheStore extends Store {}

const incrementalCacheStore = (): IncrementalCacheStore => {
    const store = staticGenerationAsyncStorage.getStore();
    const incrementalCache: import('next/dist/server/lib/incremental-cache').IncrementalCache | undefined =
        store?.incrementalCache || (globalThis as any).__incrementalCache;

    const getCacheKey = (key: string) => `seada-${md5(key)}`;

    const set = async <T>(key: string, data: T, ttl?: Milliseconds): Promise<void> => {
        const revalidate = ttl ? ttl / 1000 : undefined;
        const fetchIdx = (store ? store.nextFetchId : 0) ?? 1;

        const cacheKey = getCacheKey(key);
        await incrementalCache.set(
            cacheKey,
            {
                kind: 'FETCH',
                data: {
                    headers: {},
                    body: JSON.stringify(data),
                    status: 200,
                    url: '',
                },
                revalidate,
            },
            {
                revalidate,
                fetchCache: true,
                tags: [key],
                fetchIdx,
                fetchUrl: '',
            }
        );
    };

    const get = async <T>(key: string): Promise<T> => {
        const cacheKey = getCacheKey(key);

        const fetchIdx = (store ? store.nextFetchId : 0) ?? 1;
        try {
            const cacheEntry = await incrementalCache.get(cacheKey, {
                kindHint: 'fetch',
                revalidate: false,
                tags: [key],
                softTags: [],
                fetchIdx,
            });
            const body = (cacheEntry?.value as any).data.body;
            return body && !cacheEntry.isStale ? JSON.parse(body) : undefined;
        } catch (e) {
            return undefined;
        }
    };

    const del = async (key: string): Promise<void> => {
        await incrementalCache.revalidateTag(getCacheKey(key));
    };

    return {
        set,
        get,
        del,

        reset: async (): Promise<void> => {
            throw new Error('reset is not supported');
        },
        keys: async (pattern?: string): Promise<string[]> => {
            throw new Error('keys is not supported');
        },

        ttl: async (key: string): Promise<number> => {
            throw new Error('ttl is not supported');
        },

        mdel: async (...arguments_: string[]): Promise<void> => {
            arguments_.forEach((key) => del(key));
        },
        mget: async (...arguments_: string[]): Promise<unknown[]> => {
            return Promise.all(arguments_.map((key) => get(key)));
        },
        mset: async <T>(arguments_: Array<[string, unknown]>, ttl?: Milliseconds): Promise<void> => {
            arguments_.forEach(([key, value]) => set(key, value, ttl));
        },
    };
};

export default incrementalCacheStore;
