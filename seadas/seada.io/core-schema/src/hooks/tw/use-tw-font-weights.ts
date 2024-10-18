import { KeyValuePair, ResolvableTo } from 'tailwindcss/types/config';
import { useMemo } from 'react';
import getTwFontWeights from '@seada.io/core-schema/spi/tw/get-tw-font-weights';

const useTwFontWeights = (): ResolvableTo<KeyValuePair> => useMemo(getTwFontWeights, []);

export default useTwFontWeights;
