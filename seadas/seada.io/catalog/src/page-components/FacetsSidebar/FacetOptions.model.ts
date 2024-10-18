import { useCallback } from 'react';
import { IFacetOptionValue } from '@seada.io/catalog/interface/facet';
import { IFacetOptionsProps } from '@seada.io/catalog/page-components/FacetsSidebar/FacetOptions';

const useFacetOptionsModel = (props: IFacetOptionsProps) => {
    const { facet, onChange } = props;

    const handleOptionValueChange = useCallback(
        (newOptionValue: IFacetOptionValue) => {
            const newFacet = {
                ...facet,
                values: facet.multiple
                    ? facet.values.map((value) => {
                          return value.code === newOptionValue.code ? newOptionValue : value;
                      })
                    : [newOptionValue],
            };

            onChange?.(newFacet);
        },
        [facet, onChange]
    );

    return {
        data: {},
        handlers: {
            handleOptionValueChange,
        },
    };
};

export default useFacetOptionsModel;
