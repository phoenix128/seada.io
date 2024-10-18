import React, { useCallback, useEffect, useState } from 'react';
import { IFacetOptionValueProps } from '@seada.io/catalog/page-components/FacetsSidebar/FacetOptionValue';

const useFacetOptionValueModel = (props: IFacetOptionValueProps) => {
    const { value, onChange, facet } = props;
    const [loading, setLoading] = useState(false);

    const handleChange = useCallback(
        (evt: React.ChangeEvent<HTMLInputElement>) => {
            setLoading(true);

            onChange?.({
                ...value,
                checked: evt.target.checked,
            });
        },
        [onChange, value]
    );

    useEffect(() => {
        setLoading(false);
    }, [value]);

    return {
        data: {
            loading,
        },
        handlers: {
            handleChange,
        },
    };
};

export default useFacetOptionValueModel;
