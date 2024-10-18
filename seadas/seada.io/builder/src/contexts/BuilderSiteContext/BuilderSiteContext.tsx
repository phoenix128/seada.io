import React, { createContext, PropsWithChildren, useContext, useEffect, useRef } from 'react';
import { INodeTreeData } from '@seada.io/builder/components/interface';
import useUpdatePageData from '@seada.io/builder/hooks/use-update-page-data';
import useMessageToSiteListener from '@seada.io/builder/hooks/use-message-to-site-listener';
import {
    EMessagesToBuilder,
    EMessagesToSite,
    IMessageHighlightComponent,
    IMessageReload,
    IMessageSelectComponent,
    IMessageUpdatePageData,
    sendMessageToBuilder,
} from '@seada.io/builder/libs/messages';
import PageDataContext from '@seada.io/core/contexts/PageDataContext';
import HighlightBox from '@seada.io/builder/components/HighlightBox';
import { useWindowSize } from 'usehooks-ts';
import useTwBreakpointByWidth from '@seada.io/core/hooks/tw/use-tw-breakpoint-by-width';
import DynamicTailwindContext from '@seada.io/core/contexts/DynamicTailwindContext';
import useSubscribe from '@seada.io/core/hooks/use-subscribe';

export interface IBuilderSiteContext {
    highlightedItem: INodeTreeData | null;
    selectedItem: INodeTreeData | null;
}

interface IBuilderSiteContextProviderProps {}

const BuilderSiteContext = createContext<IBuilderSiteContext>({} as IBuilderSiteContext);

export const BuilderSiteContextProvider = ({ children }: PropsWithChildren<IBuilderSiteContextProviderProps>) => {
    const [highlightedItem, setHighlightedItem] = React.useState<INodeTreeData>(null);
    const [selectedItem, setSelectedItem] = React.useState<INodeTreeData>(null);

    const { setDynamicTailwind } = useContext(DynamicTailwindContext);
    const { pageData, isLoading } = useContext(PageDataContext);
    const windowSize = useWindowSize();
    const currentBreakpoint = useTwBreakpointByWidth(windowSize.width);
    const updatePageData = useUpdatePageData();
    const breakpointChangeTimeout = useRef<any>(null);
    const windowsSizeChangeTimeout = useRef<any>(null);
    const reloadPageTemplateTimeout = useRef<any>(null);

    useMessageToSiteListener<IMessageReload>(EMessagesToSite.MESSAGE_RELOAD, () => {
        window.location.reload();
    });

    useMessageToSiteListener<IMessageUpdatePageData>(EMessagesToSite.UPDATE_PAGE_DATA, (payload) => {
        setDynamicTailwind(true);
        updatePageData(payload.pageData);
    });

    useMessageToSiteListener<IMessageHighlightComponent>(EMessagesToSite.MESSAGE_HIGHLIGHT_COMPONENT, (payload) => {
        setHighlightedItem(payload.selectedItem);
    });

    useMessageToSiteListener<IMessageSelectComponent>(EMessagesToSite.MESSAGE_SELECT_COMPONENT, (payload) => {
        setSelectedItem(payload.selectedItem);
    });

    useEffect(() => {
        if (reloadPageTemplateTimeout.current) {
            clearTimeout(reloadPageTemplateTimeout.current);
        }

        reloadPageTemplateTimeout.current = setTimeout(() => {
            sendMessageToBuilder({
                type: EMessagesToBuilder.RELOAD_PAGE_DATA,
                payload: { pageData },
            });

            reloadPageTemplateTimeout.current = null;
        }, 500);
    }, [pageData]);

    useEffect(() => {
        if (windowsSizeChangeTimeout.current) {
            clearTimeout(windowsSizeChangeTimeout.current);
        }

        windowsSizeChangeTimeout.current = setTimeout(() => {
            sendMessageToBuilder({
                type: EMessagesToBuilder.WINDOW_SIZE_CHANGE,
                payload: {
                    width: windowSize.width,
                    height: windowSize.height,
                },
            });
            windowsSizeChangeTimeout.current = null;
        }, 500);
    }, [windowSize.width, windowSize.height]);

    useEffect(() => {
        if (breakpointChangeTimeout.current) {
            clearTimeout(breakpointChangeTimeout.current);
        }

        breakpointChangeTimeout.current = setTimeout(() => {
            sendMessageToBuilder({
                type: EMessagesToBuilder.BREAKPOINT_CHANGE,
                payload: {
                    breakpoint: currentBreakpoint,
                },
            });
            breakpointChangeTimeout.current = null;
        }, 500);
    }, [currentBreakpoint]);

    useEffect(() => {
        sendMessageToBuilder({
            type: EMessagesToBuilder.URL_CHANGE,
            payload: {
                path: pageData.pagePath,
                query: pageData.searchParams,
            },
        });
    }, [pageData?.pagePath, pageData?.searchParams]);

    useSubscribe(isLoading, (status) => {
        sendMessageToBuilder({
            type: EMessagesToBuilder.IS_LOADING,
            payload: {
                status,
            },
        });
    });

    return (
        <BuilderSiteContext.Provider
            value={{
                highlightedItem,
                selectedItem,
            }}
        >
            {children}
            <HighlightBox />
        </BuilderSiteContext.Provider>
    );
};

export default BuilderSiteContext;
