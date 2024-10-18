'use client';

import React, { ReactElement } from 'react';
import { PageDataContextProvider } from '@seada.io/core/contexts/PageDataContext/PageDataContext';
import { IPageData } from '@seada.io/core/spi/components/interface';
import TemplateRender from '@seada.io/core/components/TemplateRender';
import '@seada.io/core/components/ComposablePage/Global.css';
import { Config as TailwindConfig } from 'tailwindcss';

interface IComposablePageProps {
    pageData: IPageData;
    tailwindConfig: TailwindConfig;
}

const ComposablePage: React.FC<IComposablePageProps> = ({ pageData, tailwindConfig }): ReactElement => {
    return (
        <PageDataContextProvider pageData={pageData} tailwindConfig={tailwindConfig}>
            <TemplateRender />
        </PageDataContextProvider>
    );
};

export default ComposablePage;
