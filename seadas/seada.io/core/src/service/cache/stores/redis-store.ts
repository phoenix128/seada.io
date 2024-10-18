import { Milliseconds, Store } from 'cache-manager';
import Redis from 'ioredis';
import getEnvPath from '@seada.io/core/libs/get-env-path';

export interface RedisStore extends Store {}

const redisStore = (): RedisStore => {
    const redis = new Redis(getEnvPath('cache.redisUrl', 'redis://localhost:6379'));

    return {
        set: async <T>(key: string, data: T, ttl?: Milliseconds): Promise<void> => {
            await redis.set(key, JSON.stringify(data));
            if (ttl) {
                await redis.expire(key, Math.round(ttl / 1000));
            }
        },
        get: async <T>(key: string): Promise<T> => {
            const res = await redis.get(key);
            if (res === null || res === undefined) {
                return null;
            }

            try {
                return JSON.parse(res);
            } catch (e) {
                return null;
            }
        },
        del: async (key: string): Promise<void> => {
            await redis.del(key);
        },

        reset: async (): Promise<void> => {
            await redis.flushdb();
        },
        keys: async (pattern?: string): Promise<string[]> => {
            return redis.keys(pattern);
        },

        ttl: async (key: string): Promise<number> => {
            return redis.ttl(key);
        },

        mdel: async (...arguments_: string[]): Promise<void> => {
            await redis.del(...arguments_);
        },
        mget: async (...arguments_: string[]): Promise<unknown[]> => {
            return redis.mget(...arguments_);
        },
        mset: async <T>(arguments_: Array<[string, unknown]>, ttl?: Milliseconds): Promise<void> => {
            if (ttl === undefined) {
                const hashed = arguments_.reduce((acc, [key, value]) => {
                    acc[key] = value;
                    return acc;
                }, {});
                await redis.mset(hashed);
            } else {
                const multi = redis.multi();
                arguments_.forEach(([key, value]) => {
                    multi.set(key, JSON.stringify(value));
                    multi.expire(key, ttl / 1000);
                });
                await multi.exec();
            }
        },
    };
};

export default redisStore;
