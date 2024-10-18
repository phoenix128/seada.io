import { useMemo } from 'react';
import getTwAspectRatios from '@seada.io/core-schema/spi/tw/get-tw-aspect-ratios';
import { KeyValuePair, ResolvableTo } from 'tailwindcss/types/config';

const useTwAspectRatios = (): ResolvableTo<KeyValuePair> => useMemo(getTwAspectRatios, []);

export default useTwAspectRatios;
