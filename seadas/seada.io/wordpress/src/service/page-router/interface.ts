import {
    ICorePageRouterAreaDefinition,
    IPageRouterRequest,
    IPageRouterResponse,
} from '@seada.io/core/spi/page-router/interface';
import { Page, Post } from '@seada.io/wordpress/gql/schema/graphql';

export type IRouteType = Page | Post;

export interface IResourceRouter {
    (
        request: IPageRouterRequest,
        areaDefinition: ICorePageRouterAreaDefinition,
        item: IRouteType
    ): Promise<IPageRouterResponse | null>;
}

export interface IResourceRouterCollection {
    [key: string]: IResourceRouter;
}
