import React from 'react';
import usePriceFormat from '@seada.io/catalog/hooks/use-price-format';
import { IPrice } from '@seada.io/catalog/interface/price';

export interface IPriceProps {
    price: IPrice;
    className?: string;
}

const Price: React.FC<IPriceProps> = (props) => {
    const { price, className } = props;
    const formattedPrice = usePriceFormat(price);

    if (!formattedPrice) return <></>;

    return <div className={className}>{formattedPrice}</div>;
};

export default Price;
