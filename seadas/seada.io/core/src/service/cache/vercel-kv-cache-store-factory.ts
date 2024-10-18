import vercelKvStore, { VercelKvStore } from '@seada.io/core/service/cache/stores/vercel-kv-store';

const vercelKvCacheStoreFactory = (): VercelKvStore => {
    return vercelKvStore();
};

export default vercelKvCacheStoreFactory;
