import { useMemo } from 'react';
import getProductCardActions from '@seada.io/catalog/spi/get-product-card-actions';

const useProductCardActions = () => {
    return useMemo(() => getProductCardActions(), []);
};

export default useProductCardActions;
