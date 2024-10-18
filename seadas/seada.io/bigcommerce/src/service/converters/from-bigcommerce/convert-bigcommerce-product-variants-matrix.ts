import { Product } from '@seada.io/bigcommerce/gql/schema/graphql';
import { IProductVariantsMatrix } from '@seada.io/catalog/interface/product-options';
import convertBigcommercePrice from '@seada.io/bigcommerce/service/converters/from-bigcommerce/convert-bigcommerce-price';

const convertBigcommerceProductVariantsMatrix = (product: Product): IProductVariantsMatrix => {
    const variants = product.variants.edges;

    if (!variants?.length) {
        return {};
    }

    const stockVariantLevel = product.inventory?.hasVariantInventory;

    return variants.reduce<IProductVariantsMatrix>((acc, variant) => {
        const variantId = variant.node.entityId.toString();
        const options = variant.node.options?.edges;
        if (
            !options?.length ||
            !variant.node.isPurchasable ||
            (stockVariantLevel && !variant.node.inventory.isInStock)
        ) {
            return acc;
        }

        acc[variant.node.sku] = {
            id: variantId,
            key: variant.node.sku,
            sku: variant.node.sku,
            price: convertBigcommercePrice(variant.node.prices?.price),
            referencePrice:
                variant.node.prices?.price.value !== variant.node.prices?.basePrice?.value &&
                convertBigcommercePrice(variant.node.prices?.basePrice),
            options: options.reduce((acc, option) => {
                const optionId = option.node.entityId.toString();
                acc[optionId] = option.node.values.edges[0].node.entityId.toString();
                return acc;
            }, {}),
        };

        return acc;
    }, {});
};

export default convertBigcommerceProductVariantsMatrix;
