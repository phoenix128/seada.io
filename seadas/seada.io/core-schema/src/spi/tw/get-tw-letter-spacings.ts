import tailwindTheme from '@seada.io/core/spi/tw/tailwind-theme.generated';
import { KeyValuePair, ResolvableTo } from 'tailwindcss/types/config';

const getTwLetterSpacings = (): ResolvableTo<KeyValuePair> => {
    return tailwindTheme.letterSpacing ?? {};
};

export default getTwLetterSpacings;
