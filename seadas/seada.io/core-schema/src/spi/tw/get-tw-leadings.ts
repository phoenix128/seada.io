import tailwindTheme from '@seada.io/core/spi/tw/tailwind-theme.generated';
import { KeyValuePair, ResolvableTo } from 'tailwindcss/types/config';

const getTwLeadings = (): ResolvableTo<KeyValuePair> => {
    return tailwindTheme.lineHeight ?? {};
};

export default getTwLeadings;
