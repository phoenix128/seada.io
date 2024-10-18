import { IProductData } from '@seada.io/catalog/interface/product';
import useDataContext from '@seada.io/core/hooks/use-data-context';

const useProduct = (): IProductData | undefined => {
    const { product } = useDataContext();
    return product;
};

export default useProduct;
