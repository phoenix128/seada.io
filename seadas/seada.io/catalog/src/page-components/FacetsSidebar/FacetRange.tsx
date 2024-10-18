import React from 'react';
import { EFacetRangeMode, IFacetRange } from '@seada.io/catalog/interface/facet';
import { IFacetProps } from '@seada.io/catalog/page-components/FacetsSidebar/interface';
import styles from '@seada.io/catalog/page-components/FacetsSidebar/FacetRange.styles';
import { useTranslation } from 'react-i18next';
import useFacetRangeModel from '@seada.io/catalog/page-components/FacetsSidebar/FacetRange.model';
import SeadaButton from '@seada.io/foundation-ui/components/SeadaButton';
import SeadaInput from '@seada.io/foundation-ui/components/SeadaInput';
import SeadaSpinner from '@seada.io/foundation-ui/components/SeadaSpinner';

export interface IFacetSwatchesProps extends IFacetProps {
    facet: IFacetRange;
}

const FacetRange: React.FC<IFacetSwatchesProps> = (props) => {
    const {
        data: { loading, min, max },
        handlers: { handleChangeMin, handleChangeMax, handleApply },
    } = useFacetRangeModel(props);
    const { facet } = props;
    const { t } = useTranslation();

    if (facet.mode === EFacetRangeMode.Input) {
        return (
            <div className={styles.FacetRange}>
                <SeadaInput
                    disabled={loading}
                    size={'sm'}
                    onChange={(evt) => handleChangeMin(evt.target.value)}
                    defaultValue={min?.toString()}
                    placeholder={t('commerce.facets.range.min')}
                />
                <SeadaInput
                    disabled={loading}
                    size={'sm'}
                    onChange={(evt) => handleChangeMax(evt.target.value)}
                    defaultValue={max?.toString()}
                    placeholder={t('commerce.facets.range.max')}
                    labelPlacement={'outside-left'}
                />
                <SeadaButton color={'primary'} size={'sm'} onClick={handleApply}>
                    {loading ? <SeadaSpinner color={'white'} size={'sm'} /> : t('commerce.facets.range.apply')}
                </SeadaButton>
            </div>
        );
    }

    return null;
};

export default FacetRange;
