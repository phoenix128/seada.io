import React, { createContext, PropsWithChildren, useCallback, useEffect, useState } from 'react';
import { INodeTreeData } from '@seada.io/builder/components/interface';
import {
    EMessagesToBuilder,
    EMessagesToSite,
    IMessageBreakpointChange,
    IMessageLoadingStatus,
    IMessageReloadPageTemplate,
    IMessageURLChange,
    IMessageWindowSizeChange,
    sendMessageToSite,
} from '@seada.io/builder/libs/messages';
import useMessageToBuilderListener from '@seada.io/builder/hooks/use-message-to-builder-listener';
import { IPageData } from '@seada.io/core/spi/components/interface';
import { useLocalStorage } from 'usehooks-ts';

export interface IBuilderContext {
    previewFrameRef: React.MutableRefObject<HTMLIFrameElement>;
    builderTarget: string;
    pageData: IPageData;
    reloadPreview: () => void;
    setPageData: React.Dispatch<React.SetStateAction<IPageData>>;
    selectedItem: INodeTreeData;
    setSelectedItem: React.Dispatch<React.SetStateAction<INodeTreeData>>;
    highlightedItem: INodeTreeData;
    setHighlightedItem: React.Dispatch<React.SetStateAction<INodeTreeData>>;
    currentTwBreakpoint: string;
    pageSize: { width: number; height: number };
    setCurrentTwBreakpoint: React.Dispatch<React.SetStateAction<string>>;
    pagePath: string;
    pageToBeSaved: boolean;
    setPageToBeSaved: React.Dispatch<React.SetStateAction<boolean>>;
    advancedMode: boolean;
    setAdvancedMode: React.Dispatch<React.SetStateAction<boolean>>;
    pageIsLoading: boolean;
}

interface IBuilderContextProviderProps {
    previewFrameRef: React.MutableRefObject<HTMLIFrameElement>;
    builderTarget: string;
}

const BuilderContext = createContext<IBuilderContext>({} as IBuilderContext);

export const BuilderContextProvider = ({
    previewFrameRef,
    builderTarget,
    children,
}: PropsWithChildren<IBuilderContextProviderProps>) => {
    const [pageData, setPageData] = useState<IPageData>(null);
    const [selectedItem, setSelectedItem] = useState<INodeTreeData>(null);
    const [highlightedItem, setHighlightedItem] = useState<INodeTreeData>(null);
    const [currentTwBreakpoint, setCurrentTwBreakpoint] = useState<string>(null);
    const [pagePath, setPagePath] = useState<string>(null);
    const [pageToBeSaved, setPageToBeSaved] = useState<boolean>(false);
    const [pageSize, setPageSize] = useState<{ width: number; height: number }>(null);
    const [advancedMode, setAdvancedMode] = useLocalStorage<boolean>('advanced-props-editor-mode', false);
    const [pageIsLoading, setPageIsLoading] = useState<boolean>(false);

    /**
     * Clean the node item data to be safely sent to the site
     * @param nodeItem
     */
    const cleanNodeItemData = (nodeItem: INodeTreeData) => {
        if (!nodeItem) return nodeItem;

        const safeNodeItem = { ...nodeItem };
        delete safeNodeItem.icon;
        delete safeNodeItem.children;
        delete safeNodeItem.parent;
        return safeNodeItem;
    };

    let reloadPreview: () => void;
    reloadPreview = useCallback(() => {
        sendMessageToSite(previewFrameRef.current, {
            type: EMessagesToSite.MESSAGE_RELOAD,
            payload: {},
        });
    }, [previewFrameRef]);

    useMessageToBuilderListener<IMessageReloadPageTemplate>(EMessagesToBuilder.RELOAD_PAGE_DATA, (payload) => {
        setPageData(payload.pageData);
    });

    useMessageToBuilderListener<IMessageBreakpointChange>(EMessagesToBuilder.BREAKPOINT_CHANGE, (payload) => {
        setCurrentTwBreakpoint(payload.breakpoint);
    });

    useMessageToBuilderListener<IMessageURLChange>(EMessagesToBuilder.URL_CHANGE, ({ path }) => {
        if (path === pagePath) return;
        setPagePath(path);
        setPageToBeSaved(false);
    });

    useMessageToBuilderListener<IMessageLoadingStatus>(EMessagesToBuilder.IS_LOADING, ({ status }) => {
        setPageIsLoading(status);
    });

    useMessageToBuilderListener<IMessageWindowSizeChange>(EMessagesToBuilder.WINDOW_SIZE_CHANGE, setPageSize);

    useEffect(() => {
        if (!pageData) return;

        sendMessageToSite(previewFrameRef.current, {
            type: EMessagesToSite.UPDATE_PAGE_DATA,
            payload: { pageData },
        });
    }, [pageData, previewFrameRef]);

    useEffect(() => {
        sendMessageToSite(previewFrameRef.current, {
            type: EMessagesToSite.MESSAGE_SELECT_COMPONENT,
            payload: { selectedItem: cleanNodeItemData(selectedItem) },
        });
        setHighlightedItem(selectedItem);
    }, [selectedItem, previewFrameRef]);

    useEffect(() => {
        sendMessageToSite(previewFrameRef.current, {
            type: EMessagesToSite.MESSAGE_HIGHLIGHT_COMPONENT,
            payload: { selectedItem: cleanNodeItemData(highlightedItem) },
        });
    }, [highlightedItem, previewFrameRef]);

    return (
        <BuilderContext.Provider
            value={{
                previewFrameRef,
                reloadPreview,
                builderTarget,
                pageData,
                setPageData,
                selectedItem,
                setSelectedItem,
                highlightedItem,
                setHighlightedItem,
                currentTwBreakpoint,
                setCurrentTwBreakpoint,
                pagePath,
                pageToBeSaved,
                setPageToBeSaved,
                pageSize,
                advancedMode,
                setAdvancedMode,
                pageIsLoading,
            }}
        >
            {children}
        </BuilderContext.Provider>
    );
};

export default BuilderContext;
