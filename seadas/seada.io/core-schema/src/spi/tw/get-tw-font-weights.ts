import tailwindTheme from '@seada.io/core/spi/tw/tailwind-theme.generated';
import { KeyValuePair, ResolvableTo } from 'tailwindcss/types/config';

const getTwFontWeights = (): ResolvableTo<KeyValuePair> => {
    return tailwindTheme.fontWeight ?? {};
};

export default getTwFontWeights;
