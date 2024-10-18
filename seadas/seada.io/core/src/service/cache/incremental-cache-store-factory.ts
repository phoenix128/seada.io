import incrementalCacheStore, {
    IncrementalCacheStore,
} from '@seada.io/core/service/cache/stores/incremental-cache-store';

const incrementalCacheStoreFactory = (): IncrementalCacheStore => {
    return incrementalCacheStore();
};

export default incrementalCacheStoreFactory;
