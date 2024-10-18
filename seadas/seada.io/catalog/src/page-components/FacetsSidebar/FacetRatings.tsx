import React from 'react';
import useFacetOptionsModel from '@seada.io/catalog/page-components/FacetsSidebar/FacetOptions.model';
import styles from '@seada.io/catalog/page-components/FacetsSidebar/FacetOptions.styles';
import { IFacetOptionsProps } from '@seada.io/catalog/page-components/FacetsSidebar/FacetOptions';
import FacetRatingsValue from '@seada.io/catalog/page-components/FacetsSidebar/FacetRatingsValue';

const FacetRatings: React.FC<IFacetOptionsProps> = (props) => {
    const { facet, disabled } = props;
    const {
        handlers: { handleOptionValueChange },
    } = useFacetOptionsModel(props);

    return (
        <div className={styles.FacetOptions}>
            {facet.values.map((value, idx) => (
                <FacetRatingsValue
                    facet={facet}
                    disabled={disabled}
                    key={idx}
                    value={value}
                    onChange={handleOptionValueChange}
                />
            ))}
        </div>
    );
};

export default FacetRatings;
