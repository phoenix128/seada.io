import { IFacetOptions, IFacetOptionValue } from '@seada.io/catalog/interface/facet';
import React from 'react';
import styles from '@seada.io/catalog/page-components/FacetsSidebar/FacetOptionValue.styles';
import useFacetOptionValueModule from '@seada.io/catalog/page-components/FacetsSidebar/FacetOptionValue.model';
import { useTranslation } from 'react-i18next';
import SeadaSpinner from '@seada.io/foundation-ui/components/SeadaSpinner';
import SeadaCheckbox from '@seada.io/foundation-ui/components/SeadaCheckbox';
import SeadaChip from '@seada.io/foundation-ui/components/SeadaChip';

export interface IFacetOptionValueProps {
    disabled?: boolean;
    facet: IFacetOptions;
    value: IFacetOptionValue;
    onChange?: (optionValue: IFacetOptionValue) => void;
}

const FacetOptionValue: React.FC<IFacetOptionValueProps> = (props) => {
    const {
        value,
        facet: { multiple },
    } = props;

    const {
        data: { loading },
        handlers: { handleChange },
    } = useFacetOptionValueModule(props);
    const { t } = useTranslation();

    const label = <div className={styles.FacetOptionValue}>{t(value.label)}</div>;

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

export default FacetOptionValue;
