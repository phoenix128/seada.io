import { useMemo } from 'react';
import getTwNumericSpacings from '@seada.io/core-schema/spi/tw/get-tw-numeric-spacings';
import { KeyValuePair, ResolvableTo } from 'tailwindcss/types/config';

const useTwNumericSpacings = (): ResolvableTo<KeyValuePair> => useMemo(getTwNumericSpacings, []);

export default useTwNumericSpacings;
