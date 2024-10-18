import {
    ICorePageRouterAreaDefinition,
    ICorePageRouterResponse,
    IPageRouterResponse,
} from '@seada.io/core/spi/page-router/interface';
import { IPageComponentDefinition } from '@seada.io/core/spi/seada-pages/interface';
import React from 'react';
import { IPageComponentProps } from '@seada.io/core/interface';

export interface IPageComponent {
    componentId: string;
    componentType?: string;
}

export interface IDataProviderConfig<TData = any> {
    operationId: string;
    propsDependencies?: string[];
    loader: () => Promise<TData>;
}

export interface IDataProvider<TData = any> {
    (component: IPageComponentDefinition, pageData: IPageData, variables: IVariables): IDataProviderConfig<TData>;
}

export interface IDataProvidersCollection {
    [key: string]: IDataProvider | IDataProvider[];
}

export interface ISourcesProvidersCollection {
    [key: string]: IDataProvidersCollection;
}

export interface IVariables extends Record<string, any> {}

export type IPageData = ICorePageRouterResponse & ICorePageRouterAreaDefinition & IPageRouterResponse;

export interface IServerActionsCollection {
    [key: string]: (...args: any[]) => Promise<any>;
}

export interface ISourcesServerActionsCollection {
    [key: string]: IServerActionsCollection;
}

export interface IPageComponentPropsMiddleware<TProps extends Record<string, any> = Record<string, any>> {
    (component: IPageComponentDefinition, props: TProps, pageData: IPageData): TProps;
}

export interface IPageComponentsCollection {
    [key: string]: React.FC<IPageComponentProps>;
}
