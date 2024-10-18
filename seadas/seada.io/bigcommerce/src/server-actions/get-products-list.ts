'use server';

import { IProductData } from '@seada.io/catalog/interface/product';
import { IBigCommerceQueryContext } from '@seada.io/bigcommerce/spi/bigcommerce-query-context';
import getProductsListByKeys from '@seada.io/bigcommerce/service/catalog/get-products-list-by-keys';

const getProductsList = async (context: IBigCommerceQueryContext, productKeys: string[]): Promise<IProductData[]> =>
    getProductsListByKeys(context, productKeys);

export default getProductsList;
