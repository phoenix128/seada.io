import { IProductData } from '@seada.io/catalog/interface/product';

const useHasVariantOptions = (product: IProductData): boolean => {
    return product.variantOptions.length > 0;
};

export default useHasVariantOptions;
