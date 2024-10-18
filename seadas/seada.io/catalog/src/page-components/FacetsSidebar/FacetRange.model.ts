import { IFacetSwatchesProps } from '@seada.io/catalog/page-components/FacetsSidebar/FacetRange';
import { useCallback, useEffect, useMemo, useState } from 'react';

const useFacetRangeModel = (props: IFacetSwatchesProps) => {
    const { facet, onChange } = props;

    const [loading, setLoading] = useState(false);
    const [min, setMin] = useState<number>(facet.selectedRange?.min);
    const [max, setMax] = useState<number>(facet.selectedRange?.max);

    const handleApply = useCallback(() => {
        setLoading(true);

        onChange?.({
            ...facet,
            selectedRange: {
                min: min,
                max: max,
            },
        });
    }, [facet, max, min, onChange]);

    const handleChangeMin = useCallback((value: string) => {
        const parsedValue = parseFloat(value);
        setMin(isNaN(parsedValue) ? undefined : parsedValue);
    }, []);

    const handleChangeMax = useCallback((value: string) => {
        const parsedValue = parseFloat(value);
        setMax(isNaN(parsedValue) ? undefined : parsedValue);
    }, []);

    useEffect(() => {
        setLoading(false);
    }, [facet.selectedRange?.min, facet.selectedRange?.max]);

    return useMemo(
        () => ({
            data: {
                loading,
                min,
                max,
            },
            handlers: {
                handleApply,
                handleChangeMin,
                handleChangeMax,
            },
        }),
        [handleApply, handleChangeMax, handleChangeMin, loading, max, min]
    );
};

export default useFacetRangeModel;
