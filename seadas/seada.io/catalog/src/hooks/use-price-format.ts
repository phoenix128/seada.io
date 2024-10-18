import usePageData from '@seada.io/core/hooks/use-page-data';
import { useMemo } from 'react';
import { IPrice } from '@seada.io/catalog/interface/price';

const usePriceFormat = (price: IPrice) => {
    const { locale } = usePageData();
    const { amount, currency } = price ?? {};

    return useMemo(() => {
        if (amount === undefined) {
            return null;
        }

        const normalizedLocale = locale.replace('_', '-');
        return new Intl.NumberFormat(
            normalizedLocale,
            currency
                ? {
                      style: 'currency',
                      currency,
                  }
                : {
                      style: 'decimal',
                  }
        ).format(amount);
    }, [amount, currency, locale]);
};

export default usePriceFormat;
