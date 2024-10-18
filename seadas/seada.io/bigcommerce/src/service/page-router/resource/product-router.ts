import {
    ICorePageRouterAreaDefinition,
    IPageRouterRequest,
    IPageRouterResponse,
} from '@seada.io/core/spi/page-router/interface';
import getPageTemplate from '@seada.io/core/spi/seada-pages/get-page-template';
import { QUERY_PRODUCT_DETAILS } from '@seada.io/bigcommerce/gql/queries/query-product';
import { IResourceRouter } from '@seada.io/bigcommerce/service/page-router/interface';
import { profilerWrapperAsync } from '@seada.io/core/libs/profile';
import writeSourceGraphqlCache from '@seada.io/bigcommerce/service/graphql/write-source-graphql-cache';
import { Product } from '@seada.io/bigcommerce/gql/schema/graphql';
import convertBigcommerceProduct from '@seada.io/bigcommerce/service/converters/from-bigcommerce/convert-bigcommerce-product';

const productRouter: IResourceRouter = async (
    request: IPageRouterRequest,
    areaDefinition: ICorePageRouterAreaDefinition,
    product: Product
): Promise<IPageRouterResponse | null> =>
    profilerWrapperAsync('bigcommerce:product-router', async () => {
        await writeSourceGraphqlCache(
            areaDefinition,
            {
                query: QUERY_PRODUCT_DETAILS,
                variables: {
                    entityId: product.entityId,
                },
            },
            {
                data: {
                    site: {
                        product,
                    },
                },
            }
        );

        console.log('product', product);

        return {
            pageType: 'product',
            pageTemplate: await getPageTemplate(areaDefinition.areaCode, 'product', 'default', request),
            variables: {
                title: product.name,
                product: convertBigcommerceProduct(product),
            },
        };
    });

export default productRouter;
