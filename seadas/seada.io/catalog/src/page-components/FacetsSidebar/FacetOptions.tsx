import React from 'react';
import { IFacetOptions } from '@seada.io/catalog/interface/facet';
import FacetOptionValue from '@seada.io/catalog/page-components/FacetsSidebar/FacetOptionValue';
import { IFacetProps } from '@seada.io/catalog/page-components/FacetsSidebar/interface';
import styles from '@seada.io/catalog/page-components/FacetsSidebar/FacetOptions.styles';
import useFacetOptionsModel from '@seada.io/catalog/page-components/FacetsSidebar/FacetOptions.model';

export interface IFacetOptionsProps extends IFacetProps {
    facet: IFacetOptions;
    onChange?: (facet: IFacetOptions) => void;
}

const FacetOptions: React.FC<IFacetOptionsProps> = (props) => {
    const { facet, disabled } = props;
    const {
        handlers: { handleOptionValueChange },
    } = useFacetOptionsModel(props);

    return (
        <div className={styles.FacetOptions}>
            {facet.values.map((value, idx) => (
                <FacetOptionValue
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

export default FacetOptions;
