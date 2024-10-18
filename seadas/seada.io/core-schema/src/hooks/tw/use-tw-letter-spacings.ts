import { useMemo } from 'react';
import getTwLetterSpacings from '@seada.io/core-schema/spi/tw/get-tw-letter-spacings';
import { KeyValuePair, ResolvableTo } from 'tailwindcss/types/config';

const useTwLetterSpacings = (): ResolvableTo<KeyValuePair> => useMemo(getTwLetterSpacings, []);

export default useTwLetterSpacings;
