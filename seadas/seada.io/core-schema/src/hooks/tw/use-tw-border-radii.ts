import { useMemo } from 'react';
import getTwBorderRadii from '@seada.io/core-schema/spi/tw/get-tw-border-radii';
import { KeyValuePair, ResolvableTo } from 'tailwindcss/types/config';

const useTwBorderRadii = (): ResolvableTo<KeyValuePair> => useMemo(getTwBorderRadii, []);
export default useTwBorderRadii;
