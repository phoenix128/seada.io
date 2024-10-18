import React from 'react';
import { IOrderTableRendererProps } from '@seada.io/customer/components/OrderTableRenderers/interface';

const TextRenderer: React.FC<IOrderTableRendererProps> = ({ value }) => {
    return <>{value}</>;
};

export default TextRenderer;
