import React from 'react';
import styles from '@seada.io/catalog/page-components/FacetsSidebar/FacetOptionValue.styles';
import useFacetOptionValueModule from '@seada.io/catalog/page-components/FacetsSidebar/FacetOptionValue.model';
import { IFacetOptionValueProps } from '@seada.io/catalog/page-components/FacetsSidebar/FacetOptionValue';
import SeadaSpinner from '@seada.io/foundation-ui/components/SeadaSpinner';
import SeadaCheckbox from '@seada.io/foundation-ui/components/SeadaCheckbox';
import SeadaChip from '@seada.io/foundation-ui/components/SeadaChip';

const FacetRatingsValue: React.FC<IFacetOptionValueProps> = (props) => {
    const {
        value,
        facet: { multiple },
    } = props;

    const {
        data: { loading },
        handlers: { handleChange },
    } = useFacetOptionValueModule(props);

    const label = (
        <div className={styles.FacetRatingValue}>
            {[...Array(parseInt(value.label, 10))].map((v, idx) => {
                return <span key={idx}>&#9733;</span>;
            })}
        </div>
    );

    return (
        <div className={styles.FacetOption}>
            {loading && (
                <div className={styles.LoadingOption}>
                    <SeadaSpinner color={'primary'} size={'sm'} />
                    {label}
                </div>
            )}
            {!loading && (
                <SeadaCheckbox isSelected={value.checked} onChange={handleChange}>
                    {label}
                </SeadaCheckbox>
            )}
            <SeadaChip size={'sm'} color={'default'}>
                <div className={styles.FacetOptionCount}>{value.count}</div>
            </SeadaChip>
        </div>
    );
};

export default FacetRatingsValue;
