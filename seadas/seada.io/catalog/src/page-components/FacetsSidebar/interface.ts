import { IFacet } from '@seada.io/catalog/interface/facet';

export interface IFacetProps<TFacetType = IFacet> {
    disabled: boolean;
    facet: TFacetType;
    onChange?: (data: TFacetType) => void;
}
