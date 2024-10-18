import tailwindTheme from '@seada.io/core/spi/tw/tailwind-theme.generated';
import { KeyValuePair, ResolvableTo } from 'tailwindcss/types/config';

const getTwFontSizes = (): ResolvableTo<
    KeyValuePair<
        string,
        | string
        | [fontSize: string, lineHeight: string]
        | [
              fontSize: string,
              configuration: Partial<{
                  lineHeight: string;
                  letterSpacing: string;
                  fontWeight: string | number;
              }>
          ]
    >
> => {
    return tailwindTheme.fontSize ?? {};
};

export default getTwFontSizes;
