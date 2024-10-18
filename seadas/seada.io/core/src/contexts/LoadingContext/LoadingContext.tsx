'use client';

import React, { createContext, PropsWithChildren, useCallback, useRef, useState } from 'react';
import 'nprogress/nprogress.css';
import nprogress from 'nprogress';
import useSubscribe from '@seada.io/core/hooks/use-subscribe';
import isSameUrl from '@seada.io/core/libs/is-same-url';
import { IPageData } from '@seada.io/core/spi/components/interface';

export interface ILoadingContext {
    startLoading: (destinationUrl?: string) => void;
    stopLoading: () => void;
    setPageData: (pageData: IPageData) => void;
}

const LoadingContext = createContext<ILoadingContext>({} as ILoadingContext);

/**
 * This is a generic context provider for holding Loading information.
 * @param children
 * @param contexts
 * @constructor
 */
export const LoadingContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const w = typeof window !== 'undefined' ? window : null;

    const [pageData, setPageData] = useState<IPageData>();
    const timeout = useRef<NodeJS.Timeout | null>(null);
    const location = useRef<string | null>(w?.location.href);

    useSubscribe(pageData, () => {
        const newLocation = w?.location.href;

        if (!isSameUrl(location.current, newLocation)) {
            location.current = newLocation;
            nprogress.done();
        }
    });

    const startLoading = useCallback(
        (destinationUrl?: string) => {
            if (destinationUrl && isSameUrl(destinationUrl, pageData.pagePath)) {
                return;
            }

            nprogress.start();
            nprogress.configure({
                speed: 200,
            });

            if (timeout.current) {
                clearTimeout(timeout.current);
            }
            timeout.current = setTimeout(() => {
                nprogress.done();
            }, 5000);
        },
        [pageData]
    );

    const stopLoading = useCallback(() => {
        nprogress.done();
        if (timeout.current) {
            clearTimeout(timeout.current);
        }
    }, []);

    return (
        <LoadingContext.Provider value={{ startLoading, stopLoading, setPageData }}>{children}</LoadingContext.Provider>
    );
};

export default LoadingContext;
