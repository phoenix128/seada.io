import { Milliseconds, Store } from 'cache-manager';
import { kv } from '@vercel/kv';

export interface VercelKvStore extends Store {}

const vercelKvStore = (): VercelKvStore => {
    return {
        set: async <T>(key: string, data: T, ttl?: Milliseconds): Promise<void> => {
            await kv.set(key, data, ttl ? { ex: ttl } : undefined);
        },
        get: async <T>(key: string): Promise<T> => {
            return kv.get<T>(key);
        },
        del: async (key: string): Promise<void> => {
            await kv.del(key);
        },

        reset: async (): Promise<void> => {
            await kv.flushdb();
        },
        keys: async (pattern?: string): Promise<string[]> => {
            return kv.keys(pattern);
        },

        ttl: async (key: string): Promise<number> => {
            return kv.ttl(key);
        },

        mdel: async (...arguments_: string[]): Promise<void> => {
            await kv.del(...arguments_);
        },
        mget: async (...arguments_: string[]): Promise<unknown[]> => {
            return kv.mget(...arguments_);
        },
        mset: async <T>(arguments_: Array<[string, unknown]>, ttl?: Milliseconds): Promise<void> => {
            if (ttl === undefined) {
                const hashed = arguments_.reduce((acc, [key, value]) => {
                    acc[key] = value;
                    return acc;
                }, {});
                await kv.mset(hashed);
            } else {
                const multi = kv.multi();
                arguments_.forEach(([key, value]) => {
                    multi.set(key, value, ttl ? { ex: ttl } : undefined);
                });
                await multi.exec();
            }
        },
    };
};

export default vercelKvStore;
