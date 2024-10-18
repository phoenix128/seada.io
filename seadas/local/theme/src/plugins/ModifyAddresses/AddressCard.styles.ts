import { IPlugin } from '@seada.io/core/interface';
import addressCardStylesSource from '@seada.io.source/customer/page-components/ModifyAddresses/AddressCard.styles';
import { tv } from 'tailwind-variants';

const addressCardStyles: IPlugin<typeof addressCardStylesSource, 100> = (callback) => {
    return tv({
        extend: callback,
        slots: {
            base: [],
        },
    });
};

export default addressCardStyles;
