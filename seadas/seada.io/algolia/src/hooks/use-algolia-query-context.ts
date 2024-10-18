import { useMemo } from 'react';
import useSourceIdByPortClass from '@seada.io/core/hooks/use-source-id-by-port-class';
import { IAlgoliaQueryContext } from '@seada.io/algolia/spi/algolia-query-context';

const useAlgoliaQueryContext = (portClass: string): IAlgoliaQueryContext => {
    const sourceId = useSourceIdByPortClass(portClass);
    return useMemo(() => ({ sourceId }), [sourceId]);
};

export default useAlgoliaQueryContext;
