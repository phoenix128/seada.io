import { IStorageAdapter, IStorageAdapterConstructor } from '@seada.io/builder/service/interface';
import getEnvPath from '@seada.io/core/libs/get-env-path';

const adaptersInstances: Record<string, IStorageAdapter> = {};

/**
 * Get the adapter code by file type
 * @param storageType
 */
const getStorageAdapterCode = (storageType: string): string => {
    const storageTypeCode = storageType.toLowerCase();
    return getEnvPath<string>(`storage.${storageTypeCode}.adapter`, 'filesystem');
};

/**
 * Get the adapter by code
 * @param storageType
 * @param adapters
 */
const getStorageAdapter = (
    storageType: string,
    adapters?: Record<string, IStorageAdapterConstructor>
): IStorageAdapter => {
    if (!adaptersInstances[storageType]) {
        const adapterCode = getStorageAdapterCode(storageType);

        if (!adapters) {
            throw new Error('No adapters provided');
        }

        if (!adapters[adapterCode]) {
            throw new Error(`No adapter found for code ${adapterCode}`);
        }

        adaptersInstances[storageType] = adapters[adapterCode](storageType);
    }

    return adaptersInstances[storageType];
};

export default getStorageAdapter;
