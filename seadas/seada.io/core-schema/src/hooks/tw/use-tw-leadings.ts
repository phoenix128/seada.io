import { useMemo } from 'react';
import getTwLeadings from '@seada.io/core-schema/spi/tw/get-tw-leadings';
import { KeyValuePair, ResolvableTo } from 'tailwindcss/types/config';

const useTwLeadings = (): ResolvableTo<KeyValuePair> => useMemo(getTwLeadings, []);

export default useTwLeadings;
