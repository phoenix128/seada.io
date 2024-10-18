import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import usePageLoading from '@seada.io/core/hooks/use-page-loading';
import { NavigateOptions } from 'next/dist/shared/lib/app-router-context.shared-runtime';

const useGoToUrl = () => {
    const router = useRouter();
    const pageLoading = usePageLoading();

    return useCallback(
        (url: string, options?: NavigateOptions) => {
            pageLoading();
            router.push(url, options);
        },
        [pageLoading, router]
    );
};

export default useGoToUrl;
