import tailwindTheme from '@seada.io/core/spi/tw/tailwind-theme.generated';
import { KeyValuePair, ResolvableTo } from 'tailwindcss/types/config';

/**
 * Get Tailwind Aspect Ratio
 */
const getTwAspectRatios = (): ResolvableTo<KeyValuePair> => tailwindTheme.aspectRatio ?? {};

export default getTwAspectRatios;
