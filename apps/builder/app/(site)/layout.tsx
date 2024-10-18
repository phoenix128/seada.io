import type { PropsWithChildren, ReactElement } from 'react';
import React from 'react';
import '@seada.io/core/styles/tailwind.css';
import { basicFont } from '@seada.io/app-builder/app/fonts';

export const revalidate = 60;
export const fetchCache = 'default-cache';
export const dynamic = 'force-static';

export const metadata = {
    title: 'SEADA Studio',
    description: 'SEADA Studio',
};

export default function RootLayout(props: PropsWithChildren): ReactElement {
    return (
        <html lang="en" className="dark">
            <body className={basicFont.className}>{props.children}</body>
        </html>
    );
}
