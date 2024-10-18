import { useMemo } from 'react';
import getTwFontSizes from '@seada.io/core-schema/spi/tw/get-tw-font-sizes';
import { KeyValuePair, ResolvableTo } from 'tailwindcss/types/config';

const useTwFontSizes = (): ResolvableTo<
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
> => useMemo(getTwFontSizes, []);

export default useTwFontSizes;
