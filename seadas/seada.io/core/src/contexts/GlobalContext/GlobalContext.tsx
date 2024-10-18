'use client';

import React, { PropsWithChildren, useEffect } from 'react';
import { SessionContextProvider } from '@seada.io/core/contexts/SessionContext/SessionContext';
import ModulesContextProvider from '@seada.io/core/contexts/ModulesContext';
import { LazyComponentsContextProvider } from '@seada.io/core/contexts/LazyComponentsContext/LazyComponentsContext';
import { NextUIProvider } from '@nextui-org/react';
import { LoadingContextProvider } from '@seada.io/core/contexts/LoadingContext/LoadingContext';

const GlobalContext: React.FC<PropsWithChildren> = ({ children }) => {
    useEffect(() => {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker
                .register('/service-worker.js')
                .then((registration) => console.log('scope is: ', registration.scope));
        }
    }, []);

    return (
        <NextUIProvider>
            <LazyComponentsContextProvider>
                <SessionContextProvider>
                    <LoadingContextProvider>
                        <ModulesContextProvider>{children}</ModulesContextProvider>
                    </LoadingContextProvider>
                </SessionContextProvider>
            </LazyComponentsContextProvider>
        </NextUIProvider>
    );
};

export default GlobalContext;
