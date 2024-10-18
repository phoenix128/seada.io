import React from 'react';
import { IOrderTableRendererProps } from '@seada.io/customer/components/OrderTableRenderers/interface';
import Price from '@seada.io/catalog/components/Price';

const CurrencyRender: React.FC<IOrderTableRendererProps> = ({ value, order }) => {
    return <Price price={{ currency: order.currency, amount: value }} />;
};

export default CurrencyRender;
