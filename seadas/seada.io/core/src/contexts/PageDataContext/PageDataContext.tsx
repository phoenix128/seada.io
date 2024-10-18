'use client';

import React, { createContext, PropsWithChildren, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { IPageData } from '@seada.io/core/spi/components/interface';
import { ICorePageRouterAreaDefinition } from '@seada.io/core/spi/page-router/interface';
import useProvidePageComponentsData from '@seada.io/core/hooks/use-provide-page-components-data';
import findComponentsToBeProvided from '@seada.io/core/libs/find-components-to-be-provided';
import { Config as TailwindConfig } from 'tailwindcss';
import loadPageLayout from '@seada.io/core/server-actions/load-page-layout';
import loadPageTemplate from '@seada.io/core/server-actions/load-page-template';
import applyPageComponentPropsMiddlewares from '@seada.io/core/service/components/apply-page-component-props-middlewares';
import useAsyncAction from '@seada.io/core/hooks/use-async-action';
import useSubscribe from '@seada.io/core/hooks/use-subscribe';
import copyProvidersData from '@seada.io/core/service/data-providers/copy-providers-data';
import 'nprogress/nprogress.css';
import LoadingContext from '@seada.io/core/contexts/LoadingContext/LoadingContext';

export interface IPageDataContext {
    pageData: IPageData;
    isLoading: boolean;
    tailwindConfig: TailwindConfig;
    setPageData: React.Dispatch<React.SetStateAction<IPageData>>;
    areaDefinition: ICorePageRouterAreaDefinition;
    domRefs?: Record<string, React.MutableRefObject<any>>;
}

interface IPageContextProviderProps {
    pageData: IPageData;
    tailwindConfig: TailwindConfig;
}

const PageDataContext = createContext<IPageDataContext>({} as IPageDataContext);

export const PageDataContextProvider = ({
    tailwindConfig,
    pageData: inPageData,
    children,
}: PropsWithChildren<IPageContextProviderProps>) => {
    const [currentPageData, setCurrentPageData] = useState<IPageData>(inPageData);
    const [provisionedPageData, setProvisionedPageData] = useState<IPageData>(inPageData);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { setPageData: setLoadingPageData } = useContext(LoadingContext);

    const domRefs: Record<string, React.MutableRefObject<any>> = {};

    // Load data providers action
    const loadDataProviders = useProvidePageComponentsData((pageData) => {
        setProvisionedPageData(pageData);
        setCurrentPageData(pageData);
    });

    // Reload data providers when the current page data changes
    const changePageTemplate = useCallback(
        (pageData: IPageData) => {
            const newPageData = copyProvidersData(applyPageComponentPropsMiddlewares(pageData), currentPageData);
            loadDataProviders.action(newPageData, findComponentsToBeProvided(currentPageData, newPageData));
        },
        [currentPageData, loadDataProviders]
    );

    // Load a new page layout
    const loadPageLayoutAsync = useAsyncAction(loadPageLayout, (pageLayout) => {
        console.log('Loading new page layout');
        changePageTemplate({ ...currentPageData, pageLayout });
    });

    // Load a new page template
    const loadPageTemplateAsync = useAsyncAction(loadPageTemplate, (pageTemplate) => {
        console.log('Loading new page template');
        changePageTemplate({ ...currentPageData, pageTemplate });
    });

    const areaDefinition = useMemo<ICorePageRouterAreaDefinition>(() => {
        return {
            areaCode: currentPageData.areaCode,
            sourceIds: currentPageData.sourceIds,
            sourceAdaptersByIds: currentPageData.sourceAdaptersByIds,
            areaPath: currentPageData.areaPath,
            cookies: currentPageData.cookies,
            pagePath: currentPageData.pagePath,
            locale: currentPageData.locale,
            allLocales: currentPageData.allLocales,
            relativePath: currentPageData.relativePath,
            searchParams: currentPageData.searchParams,
        };
    }, [currentPageData]);

    useEffect(() => {
        setIsLoading(loadPageLayoutAsync.loading || loadPageTemplateAsync.loading || loadDataProviders.loading);
    }, [loadPageLayoutAsync.loading, loadPageTemplateAsync.loading, loadDataProviders.loading]);

    // Update the current page data when the prop changes, so we can keep a local copy for runtime modification
    useSubscribe(inPageData, (newPageData) => {
        setCurrentPageData(newPageData);
    });

    // Reload data providers when the current page data changes
    useSubscribe(currentPageData, (newPageData, prevPageData) => {
        const modifiedComponentIds = findComponentsToBeProvided(prevPageData, newPageData);
        if (modifiedComponentIds.length > 0 && !loadDataProviders.loading) {
            loadDataProviders.action(newPageData, modifiedComponentIds);
        } else {
            setProvisionedPageData(newPageData);
        }
    });

    // Reload data providers when the pageLayout changes
    useSubscribe(currentPageData.pageLayout.templateName, (newTemplateName) => {
        loadPageLayoutAsync.action(currentPageData.areaCode, newTemplateName);
    });

    // Reload data providers when the pageTemplate changes
    useSubscribe(currentPageData.pageTemplate.pageVariant, (newTemplateName) => {
        loadPageTemplateAsync.action(currentPageData.areaCode, currentPageData.pageType, newTemplateName);
    });

    useEffect(() => {
        setLoadingPageData(currentPageData);
    }, [currentPageData, setLoadingPageData]);

    return (
        <PageDataContext.Provider
            value={{
                pageData: provisionedPageData,
                setPageData: setCurrentPageData,
                areaDefinition,
                isLoading,
                tailwindConfig,
                domRefs,
            }}
        >
            {children}
        </PageDataContext.Provider>
    );
};

export default PageDataContext;
