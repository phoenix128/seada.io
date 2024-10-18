import useSeadaSearchParams from '@seada.io/core/hooks/use-seada-search-params';
import { useCallback } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import useGoToUrl from '@seada.io/core/hooks/use-go-to-url';

export interface IModifyQsOptions {
    phpArrays?: boolean; // Use PHP array syntax
    pushRouter?: boolean; // Automatically push to router
    scroll?: boolean; // Scroll page after pushing to router
    loading?: boolean; // Show loading indicator
}

const useModifySearchParams = (options: IModifyQsOptions = {}) => {
    const { phpArrays = false, pushRouter = true, scroll = true, loading = true } = options;

    const searchParams = useSeadaSearchParams();
    const router = useRouter();
    const pathName = usePathname();
    const gotoUrl = useGoToUrl();

    return useCallback(
        (updateParams: Record<string, string | string[] | undefined>) => {
            const usp = new URLSearchParams();
            Object.entries(searchParams).forEach(([key, value]) => {
                if (Array.isArray(value)) {
                    value.forEach((v) => usp.append(key, v));
                } else if (value !== undefined) {
                    usp.set(key, value);
                }
            });

            Object.entries(updateParams).forEach(([key, value]) => {
                const sourceKey = phpArrays && key.endsWith('[]') ? key.slice(0, -2) : key;

                usp.delete(sourceKey);
                if (phpArrays) {
                    usp.delete(`${sourceKey}[]`);
                }

                if (Array.isArray(value)) {
                    const nonEmptyValues = value.filter((v) => v !== undefined);

                    if (nonEmptyValues.length > 1) {
                        if (phpArrays) {
                            nonEmptyValues.forEach((v) => usp.append(`${sourceKey}[]`, v.toString()));
                        } else {
                            nonEmptyValues.forEach((v) => usp.append(sourceKey, v.toString()));
                        }
                    } else if (nonEmptyValues.length > 0) {
                        usp.append(sourceKey, nonEmptyValues[0].toString());
                    }
                } else {
                    if (value !== undefined) {
                        usp.set(sourceKey, value.toString());
                    }
                }
            });

            const query = usp.toString();
            if (pushRouter) {
                gotoUrl(`${pathName}?${query}`, { scroll });
            }

            return query;
        },
        [gotoUrl, pathName, phpArrays, pushRouter, scroll, searchParams]
    );
};

export default useModifySearchParams;
