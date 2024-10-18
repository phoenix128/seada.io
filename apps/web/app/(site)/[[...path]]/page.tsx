import ComposablePage from '@seada.io/core/components/ComposablePage/ComposablePage';
import { DynamicTailwindContextProvider } from '@seada.io/core/contexts/DynamicTailwindContext/DynamicTailwindContext';
import bakeTwPageStyle from '@seada.io/core/spi/tw/bake-tw-page-style';
import getTwCustomConfig from '@seada.io/core/spi/tw/get-tw-custom-config';
import { INextRequest, IPageRouterRequest } from '@seada.io/core/spi/page-router/interface';
import router from '@seada.io/core/spi/page-router/router';
import { Metadata, ResolvingMetadata } from 'next';
import { cookies } from 'next/headers';
import { ReactElement } from 'react';

type Props = {
    params: { id: string };
    searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params, searchParams }: Props, parent: ResolvingMetadata): Promise<Metadata> {
    return {
        title: 'This is the page title',
        openGraph: {},
    };
}

async function SeadaRouter(request: INextRequest): Promise<ReactElement> {
    if (request.params.path?.[0] === '_next') {
        return null;
    }

    const hashCookies: Record<string, string> = {};

    for (const cookie of cookies().getAll()) {
        hashCookies[cookie.name] = cookie.value;
    }

    const routerRequest: IPageRouterRequest = {
        cookies: hashCookies,
        path: request.params.path || [],
        searchParams: request.searchParams || {},
    };

    const response = await router(routerRequest);
    const compiledTailwind = await bakeTwPageStyle(response);
    const tailwindConfig = getTwCustomConfig();

    return (
        <DynamicTailwindContextProvider bakedTailwind={compiledTailwind} tailwindConfig={tailwindConfig}>
            <ComposablePage pageData={response} tailwindConfig={tailwindConfig} />
        </DynamicTailwindContextProvider>
    );
}

export default SeadaRouter;
