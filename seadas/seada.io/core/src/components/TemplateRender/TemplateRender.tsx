import React, { useMemo } from 'react';
import { basicFont } from '@seada.io/core/theme/fonts';
import ComponentRenderer from '@seada.io/core/components/ComponentRenderer/ComponentRenderer';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import templateRendererStyles from '@seada.io/core/components/TemplateRender/TemplateRender.styles';
import usePageData from '@seada.io/core/hooks/use-page-data';
import getI18n from '@seada.io/core/service/get-i18n';
import { IPageComponentDefinition } from '@seada.io/core/spi/seada-pages/interface';
import { twMerge } from 'tailwind-merge';
import NestableDataContextProvider, {
    INestableDataContextProps,
} from '@seada.io/core/components/NestableDataContext/NestableDataContext';

export interface ITemplateRenderProps {}

i18n.use(initReactI18next)
    .init({
        resources: getI18n(),
        lng: 'en',
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false,
        },
    })
    .then();

const TemplateRender: React.FC<ITemplateRenderProps> = () => {
    const pageData = usePageData();
    const { components } = pageData.pageLayout;

    const styles = templateRendererStyles();

    const dataContext = useMemo<INestableDataContextProps>(
        () => ({
            providersData: {
                ...pageData.variables,
                root: pageData.variables,
                qs: pageData.searchParams,
            },
        }),
        [pageData.variables, pageData.searchParams]
    );

    return (
        <NestableDataContextProvider {...dataContext}>
            <div className={twMerge(basicFont.className, styles.base())}>
                {components?.map((component: IPageComponentDefinition) => (
                    <ComponentRenderer key={component.id} component={component} />
                ))}
            </div>
        </NestableDataContextProvider>
    );
};

export default TemplateRender;
