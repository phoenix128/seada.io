'use server';

import { IPageData } from '@seada.io/core/spi/components/interface';
import getProvidersDataOrig, {
    IProvidersDataCollection,
} from '@seada.io/core/service/data-providers/get-providers-data';

/**
 * Server action proxy call for server-side
 * @param pageData
 * @param componentIds
 */
const getProvidersData = async (
    pageData: IPageData,
    componentIds: string[] = undefined
): Promise<IProvidersDataCollection> => {
    return getProvidersDataOrig(pageData, componentIds);
};

export default getProvidersData;
