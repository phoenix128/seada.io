import React from 'react';
import { IOrderTableRendererProps } from '@seada.io/customer/components/OrderTableRenderers/interface';
import { useTranslation } from 'react-i18next';

const DateRenderer: React.FC<IOrderTableRendererProps> = ({ value }) => {
    const { t } = useTranslation();

    return <>{t('customer.order.dateFormat', { date: new Date(value) })}</>;
};

export default DateRenderer;
