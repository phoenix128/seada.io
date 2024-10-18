import getProvidersData from '@seada.io/core/server-actions/get-providers-data';
import { IPageData } from '@seada.io/core/spi/components/interface';
import useAsyncAction, { IAsyncActionCall } from '@seada.io/core/hooks/use-async-action';
import hydratePageComponents from '@seada.io/core/service/data-providers/hydrate-page-components';

export type IUseLoadDataProviders = IAsyncActionCall<
    (pageData: IPageData, componentIds: string[]) => Promise<IPageData>
>;

const useProvidePageComponentsData = (
    onSuccess?: (pageData: IPageData | undefined) => void,
    onError?: (error: Error) => void
): IUseLoadDataProviders => {
    return useAsyncAction(
        async (pageData: IPageData, componentIds: string[]) => {
            if (componentIds.length > 0) {
                console.log('Provisioning components with new data providers');
                const newPageData: IPageData = JSON.parse(JSON.stringify(pageData));
                const providedData = await getProvidersData(newPageData, componentIds);

                if (Object.keys(providedData).length > 0) {
                    console.log('Components provided');
                    return hydratePageComponents(pageData, providedData);
                }
            }

            return pageData;
        },
        onSuccess,
        onError
    );
};

export default useProvidePageComponentsData;
