import { NormalizedCacheObject } from '@apollo/client';
import deepmerge from 'deepmerge';

const cacheMerge = (currentCache: NormalizedCacheObject, newCache: NormalizedCacheObject) => {
    return deepmerge(currentCache, newCache, {
        arrayMerge: (destinationArray: any, sourceArray: any) => {
            return sourceArray;
        },
    });
};

export default cacheMerge;
