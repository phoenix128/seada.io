import { INodeTreeData } from '@seada.io/builder/components/interface';
import { IPageData } from '@seada.io/core/spi/components/interface';

export enum EMessagesToBuilder {
    RELOAD_PAGE_DATA,
    BREAKPOINT_CHANGE,
    WINDOW_SIZE_CHANGE,
    URL_CHANGE,
    IS_LOADING,
}

export enum EMessagesToSite {
    UPDATE_PAGE_DATA,
    MESSAGE_RELOAD,
    MESSAGE_SELECT_COMPONENT,
    MESSAGE_HIGHLIGHT_COMPONENT,
}

// Messages from builder to site
export interface IMessageUpdatePageData {
    type: EMessagesToSite.UPDATE_PAGE_DATA;
    payload: {
        pageData: IPageData;
    };
}

export interface IMessageSelectComponent {
    type: EMessagesToSite.MESSAGE_SELECT_COMPONENT;
    payload: {
        selectedItem: INodeTreeData;
    };
}

export interface IMessageHighlightComponent {
    type: EMessagesToSite.MESSAGE_HIGHLIGHT_COMPONENT;
    payload: {
        selectedItem: INodeTreeData;
    };
}

export interface IMessageReload {
    type: EMessagesToSite.MESSAGE_RELOAD;
    payload: {};
}

export type IMessageToSite =
    | IMessageUpdatePageData
    | IMessageReload
    | IMessageSelectComponent
    | IMessageHighlightComponent;

// Messages from site to builder

export interface IMessageReloadPageTemplate {
    type: EMessagesToBuilder.RELOAD_PAGE_DATA;
    payload: {
        pageData: IPageData;
    };
}

export interface IMessageBreakpointChange {
    type: EMessagesToBuilder.BREAKPOINT_CHANGE;
    payload: {
        breakpoint: string;
    };
}

export interface IMessageWindowSizeChange {
    type: EMessagesToBuilder.WINDOW_SIZE_CHANGE;
    payload: {
        width: number;
        height: number;
    };
}

export interface IMessageURLChange {
    type: EMessagesToBuilder.URL_CHANGE;
    payload: {
        path: string;
        query: Record<string, string>;
    };
}

export interface IMessageLoadingStatus {
    type: EMessagesToBuilder.IS_LOADING;
    payload: {
        status: boolean;
    };
}

export type IMessageToBuilder =
    | IMessageReloadPageTemplate
    | IMessageBreakpointChange
    | IMessageWindowSizeChange
    | IMessageURLChange
    | IMessageLoadingStatus;

/**
 * Send message to builder
 * @param message
 */
export const sendMessageToBuilder = <TData = any>(message: IMessageToBuilder) => {
    if (!window?.parent || window?.parent === window) {
        return;
    }

    window?.parent?.postMessage(message, '*');
};

/**
 * Send message to site
 * @param previewFrame
 * @param message
 */
export const sendMessageToSite = (previewFrame: HTMLIFrameElement, message: IMessageToSite) => {
    if (!previewFrame || !previewFrame.contentWindow) {
        console.error('Preview frame is not defined');
        return;
    }
    previewFrame.contentWindow.postMessage(message, '*');
};
