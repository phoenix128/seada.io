import { MemoryStore, memoryStore } from 'cache-manager';

const memoryCacheStoreFactory = (): MemoryStore => {
    return memoryStore();
};

export default memoryCacheStoreFactory;
