import tailwindTheme from '@seada.io/core/spi/tw/tailwind-theme.generated';
import { KeyValuePair, ResolvableTo } from 'tailwindcss/types/config';

/**
 * Get Tailwind Border Widths
 */
const getTwBorderRadii = (): ResolvableTo<KeyValuePair> => tailwindTheme.borderRadius ?? {};

export default getTwBorderRadii;
