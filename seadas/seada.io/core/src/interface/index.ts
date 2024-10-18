import React, { ReactElement } from 'react';
import { Resource } from 'i18next/typescript/options';
import { IPageComponent } from '@seada.io/core/spi/components/interface';

export interface IPluginReactFC<TSourceComponent extends React.FC<unknown>, TPluginPriority = 100> {
    (
        props: (TSourceComponent extends React.FC<infer P> ? P : never) & {
            SourceElement: TSourceComponent;
        }
    ): ReactElement;
}

export interface IPlugin<TSourceFn extends (...args: any[]) => any, TPluginPriority = 100> {
    (callback: TSourceFn, ...args: Parameters<TSourceFn>): ReturnType<TSourceFn> | TSourceFn | any;
}

export type IPageComponentProps<TProps extends Record<string, any> = Record<string, any>> = IPageComponent &
    TProps & {
        domRef: React.RefObject<any>;
        style?: React.CSSProperties;
        className?: string;
    };

export type IPageComponentPropsWithDataProvider<
    TProps extends Record<string, any> = Record<string, any>,
    TProvidersData extends Record<string, any> = Record<string, any>
> = IPageComponentProps<TProps> & {
    providersData?: TProvidersData;
};

export interface ITranslationResourceProvider {
    (): Resource;
}
