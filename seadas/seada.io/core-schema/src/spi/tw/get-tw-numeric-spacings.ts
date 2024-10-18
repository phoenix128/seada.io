import tailwindTheme from '@seada.io/core/spi/tw/tailwind-theme.generated';
import { KeyValuePair, ResolvableTo } from 'tailwindcss/types/config';

/**
 * Get Tailwind spaces
 */
const getTwNumericSpacings = (): ResolvableTo<KeyValuePair> => {
    return tailwindTheme.spacing ?? {};
};

export default getTwNumericSpacings;
