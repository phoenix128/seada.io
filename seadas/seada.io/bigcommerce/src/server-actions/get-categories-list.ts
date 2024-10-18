'use server';

import { IBigCommerceQueryContext } from '@seada.io/bigcommerce/spi/bigcommerce-query-context';
import managementApi from '@seada.io/bigcommerce/spi/rest/management-api';
import { ICategoryData } from '@seada.io/catalog/interface/category';

const getCategoriesList = async (context: IBigCommerceQueryContext): Promise<ICategoryData[]> => {
    const { sourceId } = context;

    try {
        const res = await managementApi(sourceId, 'GET', '/v3/catalog/trees/categories', {
            include_fields: 'name,url',
        });

        return res.data.map(
            (e: any) =>
                ({
                    id: e.category_id,
                    name: e.name,
                    path: e.url.path,
                } as ICategoryData)
        );
    } catch (e) {
        console.error(e);
        return [];
    }
};

export default getCategoriesList;
