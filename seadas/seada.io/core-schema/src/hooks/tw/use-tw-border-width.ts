import { useMemo } from 'react';
import getTwBorderWidths from '@seada.io/core-schema/spi/tw/get-tw-border-widths';
import { KeyValuePair, ResolvableTo } from 'tailwindcss/types/config';

const useTwBorderWidth = () => useMemo<ResolvableTo<KeyValuePair>>(getTwBorderWidths, []);
export default useTwBorderWidth;
