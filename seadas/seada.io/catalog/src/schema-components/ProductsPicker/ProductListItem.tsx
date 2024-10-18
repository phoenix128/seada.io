import styles from '@seada.io/catalog/schema-components/ProductsPicker/ProductsPicker.styles';
import { Image } from '@nextui-org/react';
import React from 'react';
import { IProductData } from '@seada.io/catalog/interface/product';

export interface IProductListItemProps {
    product: IProductData;
}

const ProductListItem: React.FC<IProductListItemProps> = ({ product }) => {
    return (
        <div className={styles.Product}>
            <div className={styles.Image}>
                <Image
                    radius={'sm'}
                    className={styles.Image}
                    alt={product.name}
                    src={product.mainImage.url}
                    width={200}
                    height={200}
                    isBlurred={true}
                    isZoomed={true}
                />
            </div>
            <div className={styles.ProductName}>{product.name}</div>
        </div>
    );
};

export default ProductListItem;
