import { useMemo } from 'react';
import getTwColors from '@seada.io/core-schema/spi/tw/get-tw-colors';
import { RecursiveKeyValuePair, ResolvableTo } from 'tailwindcss/types/config';

const useTwColors = (): ResolvableTo<RecursiveKeyValuePair> => useMemo(getTwColors, []);

export default useTwColors;
