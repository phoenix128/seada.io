import tailwindTheme from '@seada.io/core/spi/tw/tailwind-theme.generated';
import { KeyValuePair, ResolvableTo } from 'tailwindcss/types/config';

/**
 * Get Tailwind Border Widths
 */
const getTwBorderWidths = (): ResolvableTo<KeyValuePair> => tailwindTheme.borderWidth ?? {};

export default getTwBorderWidths;
