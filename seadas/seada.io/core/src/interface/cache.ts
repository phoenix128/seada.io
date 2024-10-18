import { Store } from 'cache-manager';

export interface ICacheStoreFactory {
    (): Store;
}
