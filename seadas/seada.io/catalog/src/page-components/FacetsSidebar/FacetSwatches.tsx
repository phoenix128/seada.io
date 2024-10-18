import React from 'react';
import { IFacetOptions } from '@seada.io/catalog/interface/facet';
import styles from '@seada.io/catalog/page-components/FacetsSidebar/Facet.styles';
import { IFacetProps } from '@seada.io/catalog/page-components/FacetsSidebar/interface';

export interface IFacetSwatchesProps extends IFacetProps {
    facet: IFacetOptions;
}

const FacetSwatches: React.FC<IFacetSwatchesProps> = (props) => {
    const { facet } = props;

    return (
        <div className={styles.Facet}>
            <div className={styles.FacetTitle}>{facet.label}</div>
        </div>
    );
};

export default FacetSwatches;
