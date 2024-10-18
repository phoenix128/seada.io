import redisStore, { RedisStore } from '@seada.io/core/service/cache/stores/redis-store';

const redisCacheStoreFactory = (): RedisStore => {
    return redisStore();
};

export default redisCacheStoreFactory;
