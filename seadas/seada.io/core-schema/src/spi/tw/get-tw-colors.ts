import tailwindTheme from '@seada.io/core/spi/tw/tailwind-theme.generated';
import { RecursiveKeyValuePair, ResolvableTo } from 'tailwindcss/types/config';

const getTwColors = (): ResolvableTo<RecursiveKeyValuePair> => tailwindTheme.colors ?? {};

export default getTwColors;
