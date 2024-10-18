import {
    ICorePageRouterAreaDefinition,
    IPageRouterRequest,
    IPageRouterResponse,
} from '@seada.io/core/spi/page-router/interface';
import { Category, CategoryTreeItem, Product } from '@seada.io/bigcommerce/gql/schema/graphql';

export type IRouteType = Category | Product | CategoryTreeItem;

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
