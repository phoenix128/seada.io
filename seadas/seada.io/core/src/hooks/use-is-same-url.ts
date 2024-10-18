import { useMemo } from 'react';
import isSameUrl from '@seada.io/core/libs/is-same-url';

/**
 * Checks if two urls are the same.
 *
 * @param urlA
 * @param urlB
 */
const useIsSameUrl = (urlA: string, urlB: string): boolean => useMemo(() => isSameUrl(urlA, urlB), [urlA, urlB]);

export default useIsSameUrl;
