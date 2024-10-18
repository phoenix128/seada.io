import React, { ComponentType } from 'react';
import Box from '@seada.io/basic-ui/page-components/Box/Box';
import { EFacetType, IFacet } from '@seada.io/catalog/interface/facet';
import { IProductsListDataProviderResult } from '@seada.io/catalog/ports/catalog/data-providers/products-list';
import styles from '@seada.io/catalog/page-components/FacetsSidebar/FacetsSidebar.styles';
import { IFacetsSidebarSchema } from '@seada.io/catalog/page-components/FacetsSidebar/schema';
import { useTranslation } from 'react-i18next';
import { IFacetProps } from '@seada.io/catalog/page-components/FacetsSidebar/interface';
import FacetOptions from '@seada.io/catalog/page-components/FacetsSidebar/FacetOptions';
import FacetSwatches from '@seada.io/catalog/page-components/FacetsSidebar/FacetSwatches';
import FacetRange from '@seada.io/catalog/page-components/FacetsSidebar/FacetRange';
import FacetRatings from '@seada.io/catalog/page-components/FacetsSidebar/FacetRatings';
import useFacetsSidebarModel from '@seada.io/catalog/page-components/FacetsSidebar/FacetsSidebar.model';
import { IPageComponentSchemaPropsWithDataProvider } from '@seada.io/core-schema/spi/components/interface';
import SeadaCard from '@seada.io/foundation-ui/components/SeadaCard';
import SeadaAccordion from '@seada.io/foundation-ui/components/SeadaAccordion';
import { AccordionItem } from '@nextui-org/react';

const FacetsSidebarDesktop: React.FC<
    IPageComponentSchemaPropsWithDataProvider<IFacetsSidebarSchema, IProductsListDataProviderResult>
> = (props) => {
    const { t } = useTranslation();
    const {
        data: { loading, facets, mobileMode },
        handlers: { handleChange },
    } = useFacetsSidebarModel(props);

    const FacetComponentByType: Record<EFacetType, ComponentType<IFacetProps>> = {
        [EFacetType.Options]: FacetOptions,
        [EFacetType.Swatches]: FacetSwatches,
        [EFacetType.Range]: FacetRange,
        [EFacetType.Ratings]: FacetRatings,
    };

    return (
        <Box {...props}>
            <SeadaCard>
                <SeadaAccordion selectionMode={'multiple'}>
                    {facets.map((facet: IFacet) => {
                        const FacetComponent = FacetComponentByType[facet.type];
                        if (!FacetComponent) {
                            return null;
                        }

                        return (
                            <AccordionItem
                                textValue={t(facet.label)}
                                key={facet.code}
                                title={<div className={styles.AccordionTitle}>{t(facet.label)}</div>}
                            >
                                <div className={styles.AccordionItem}>
                                    <FacetComponent disabled={loading} facet={facet} onChange={handleChange} />
                                </div>
                            </AccordionItem>
                        );
                    })}
                </SeadaAccordion>
            </SeadaCard>
        </Box>
    );
};

export default FacetsSidebarDesktop;
