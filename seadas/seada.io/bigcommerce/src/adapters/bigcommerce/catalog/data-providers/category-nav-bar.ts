import { IDataProvider, IPageData } from '@seada.io/core/spi/components/interface';
import { QUERY_CATEGORY_TREE_DEEP } from '@seada.io/bigcommerce/gql/queries/query-category-tree';
import graphqlBigcommerceQuery from '@seada.io/bigcommerce/spi/graphql/graphql-bigcommerce-query';
import { IPageComponentDefinition } from '@seada.io/core/spi/seada-pages/interface';
import { ISimpleNavNode } from '@seada.io/basic-ui/interface/simple-nav';
import { IINavBarDataProviderResult } from '@seada.io/catalog/ports/catalog/data-providers/category-nav-bar';
import { CategoryTreeItem } from '@seada.io/bigcommerce/gql/schema/graphql';
import getBigcommerceQueryContext from '@seada.io/bigcommerce/spi/get-bigcommerce-query-context';
import catalogPortClass from '@seada.io/catalog/spi/catalog-port-class';
import getSourceIdByPortClass from '@seada.io/core/spi/get-source-id-by-port-class';

/**
 * Converts bigcommerce category tree to simple nav node
 * @param nodes
 */
const transformNavBarToNode = (nodes: CategoryTreeItem[] | undefined): ISimpleNavNode[] => {
    return nodes?.map((node) => {
        const { children, ...rest } = node;
        return {
            id: '' + rest.entityId,
            name: rest.name,
            url: rest.path,
            children: children ? transformNavBarToNode(children) : undefined,
        };
    });
};

export interface ICategoryNavBarDataProviderInputProps {}

/**
 * Fetch category tree
 * @param component
 * @param pageData
 */
const categoryNavBar: IDataProvider<IINavBarDataProviderResult> = (
    component: IPageComponentDefinition<ICategoryNavBarDataProviderInputProps>,
    pageData: IPageData
) => ({
    operationId: 'bigcommerce-category-nav-bar',
    loader: async () => {
        const sourceId = getSourceIdByPortClass(catalogPortClass, pageData);
        const queryContext = getBigcommerceQueryContext(sourceId, pageData);

        const res = await graphqlBigcommerceQuery(queryContext, {
            query: QUERY_CATEGORY_TREE_DEEP,
        });
        const nodesTree = transformNavBarToNode(res.data.site.categoryTree);

        return {
            navBar: {
                nodesTree,
            },
        };
    },
});

export default categoryNavBar;
