import { IUseListImagesUrls } from '@seada.io/core-schema/ports/schema/hooks/use-list-images-urls-port';
import listImagesUrl from '@seada.io/builder/server-actions/list-images-urls';
import useAsyncAction from '@seada.io/core/hooks/use-async-action';

const useListImagesUrls: IUseListImagesUrls = () => {
    return useAsyncAction(listImagesUrl);
};

export default useListImagesUrls;
