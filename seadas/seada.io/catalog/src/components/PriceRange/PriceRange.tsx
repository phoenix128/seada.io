import React from 'react';
import usePriceFormat from '@seada.io/catalog/hooks/use-price-format';
import { IPrice } from '@seada.io/catalog/interface/price';
import Price from '@seada.io/catalog/components/Price';

export interface IPriceRangeProps {
    priceRange: [IPrice, IPrice];
    className?: string;
}

const PriceRange: React.FC<IPriceRangeProps> = (props) => {
    const { priceRange, className } = props;

    const formattedPriceMin = usePriceFormat(priceRange?.[0]);
    const formattedPriceMax = usePriceFormat(priceRange?.[1]);

    if (priceRange?.length !== 2 || priceRange[0].amount === priceRange[1].amount) {
        return <Price price={priceRange[0]} className={className} />;
    }

    return (
        <div className={className}>
            {formattedPriceMin} - {formattedPriceMax}
        </div>
    );
};

export default PriceRange;
