import { IProductData } from '@seada.io/catalog/interface/product';
import { Product } from '@seada.io/bigcommerce/gql/schema/graphql';
import convertBigcommerceProductVariantsOptions from '@seada.io/bigcommerce/service/converters/from-bigcommerce/convert-bigcommerce-product-variants-options';
import convertBigcommerceProductVariantsMatrix from '@seada.io/bigcommerce/service/converters/from-bigcommerce/convert-bigcommerce-product-variants-matrix';
import convertBigcommercePrice from '@seada.io/bigcommerce/service/converters/from-bigcommerce/convert-bigcommerce-price';

const convertBigcommerceProduct = (product: Product): IProductData => {
    if (!product || !product.entityId) {
        return null;
    }

    return {
        id: product.entityId.toString(),
        key: product.sku,
        sku: product.sku,
        name: product.name,
        minPrice: convertBigcommercePrice(product.prices.priceRange.min),
        maxPrice: convertBigcommercePrice(product.prices.priceRange.max),
        price: convertBigcommercePrice(product.prices.price),
        referencePrice:
            product.prices.price.value !== product.prices.basePrice?.value &&
            product.prices.basePrice?.value > 0 &&
            convertBigcommercePrice(product.prices.basePrice),
        shortDescription: product.plainTextDescription,
        description: product.description,
        mainImage: {
            url: product.defaultImage.url,
            title: product.defaultImage.altText,
        },
        imagesGallery: product.images.edges.map((edge) => ({
            url: edge.node.url,
            title: edge.node.altText,
        })),
        url: product.path,
        hasVariants: product.variants.edges.length > 1,
        variantOptions: convertBigcommerceProductVariantsOptions(product),
        variantsMatrix: convertBigcommerceProductVariantsMatrix(product),
    };
};

export default convertBigcommerceProduct;
