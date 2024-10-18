import managementApi from '@seada.io/bigcommerce/spi/rest/management-api';
import { IBigCommerceQueryContext } from '@seada.io/bigcommerce/spi/bigcommerce-query-context';

/**
 * Get product IDs by SKUs
 * @param context
 * @param skus
 */
const getIdsBySkus = async (context: IBigCommerceQueryContext, skus: string[]): Promise<Record<string, number>> => {
    // Filter out empty SKUs and with invalid characters
    skus = skus.filter((sku) => sku && !sku.includes(','));

    const res = await managementApi(context.sourceId, 'GET', '/v3/catalog/products', {
        include_fields: 'sku',
        'sku:in': skus.join(','),
    });

    return res.data.reduce((acc: Record<string, number>, product: { id: number; sku: string }) => {
        acc[product.sku] = product.id;
        return acc;
    }, {});
};

export default getIdsBySkus;
