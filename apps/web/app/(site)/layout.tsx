import type { PropsWithChildren, ReactElement } from 'react';
import React from 'react';
import '@seada.io/core/styles/tailwind.css';
import GlobalContext from '@seada.io/core/contexts/GlobalContext';
import Toast from '@seada.io/core/components/Toast';

export const revalidate = 86400;
export const fetchCache = 'default-cache';
export const dynamic = 'auto';
export const dynamicParams = true;

export const metadata = {
    title: 'SEADA demo',
    description: 'SEADA demo',
};

export default function RootLayout(props: PropsWithChildren): ReactElement {
    return (
        <html lang="en">
            <head>
                <link rel="manifest" href="/manifest.json" />
                <meta name="theme-color" content="#000000" />
            </head>
            <body>
                <GlobalContext>{props.children}</GlobalContext>
                <Toast />
            </body>
        </html>
    );
}
