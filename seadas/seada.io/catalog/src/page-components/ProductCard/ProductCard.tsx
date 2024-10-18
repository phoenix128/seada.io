import React from 'react';
import productCardStyles from '@seada.io/catalog/page-components/ProductCard/ProductCard.styles';
import Price from '@seada.io/catalog/components/Price/Price';
import SeadaLink from '@seada.io/core/components/SeadaLink';
import { IProductCardDataProviderResult } from '@seada.io/catalog/ports/catalog/data-providers/product-card';
import Image from 'next/image';
import { IProductCardSchema } from '@seada.io/catalog/page-components/ProductCard/schema';
import ProductCardActions from '@seada.io/catalog/page-components/ProductCard/ProductCardActions';
import { IPageComponentSchemaPropsWithDataProvider } from '@seada.io/core-schema/spi/components/interface';
import SeadaCard from '@seada.io/foundation-ui/components/SeadaCard';
import Box from '@seada.io/basic-ui/page-components/Box';
import PriceRange from '@seada.io/catalog/components/PriceRange';

const ProductCard: React.FC<
    IPageComponentSchemaPropsWithDataProvider<IProductCardSchema, IProductCardDataProviderResult>
> = (props) => {
    const { className } = props;

    const product = props.providersData?.product;
    if (!product) {
        return null;
    }

    const { url, name, mainImage, minPrice, maxPrice, referencePrice } = product ?? {};
    const styles = productCardStyles();

    return (
        <Box {...props} className={className}>
            <SeadaCard className={styles.base()}>
                <SeadaLink path={url}>
                    <SeadaCard className={styles.imageCard()}>
                        <Image
                            priority={true}
                            alt={mainImage.title}
                            className={styles.image()}
                            src={mainImage.url}
                            placeholder={'empty'}
                            width={400}
                            height={400}
                            loading={'eager'}
                        />
                    </SeadaCard>
                </SeadaLink>

                <div className={styles.info()}>
                    <div className={styles.name()}>
                        <SeadaLink path={url}>{name}</SeadaLink>
                    </div>
                    <div className={styles.toolbar()}>
                        <ProductCardActions product={product} />
                    </div>
                </div>
                <div className={styles.priceBox()}>
                    {referencePrice && (
                        <div className={styles.referencePrice()}>
                            <Price price={referencePrice} />
                        </div>
                    )}
                    <div className={styles.salePrice()}>
                        <PriceRange priceRange={[minPrice, maxPrice]} />
                    </div>
                </div>
            </SeadaCard>
        </Box>
    );
};

export default ProductCard;
