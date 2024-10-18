export enum EFacetType {
    Range = 'range',
    Options = 'options',
    Swatches = 'swatch',
    Ratings = 'ratings',
}

export enum EFacetRangeMode {
    Slider = 'slider',
    Input = 'input',
}

export interface IFacetOptionValue {
    label: string;
    code: string;
    count: number;
    checked?: boolean;
}

export interface IFacetBase {
    type: EFacetType;
    label: string;
    code: string;
}

export interface IFacetRange extends IFacetBase {
    mode: EFacetRangeMode;
    type: EFacetType.Range;
    allowedRange: {
        min: number;
        max: number;
    };
    selectedRange?: {
        min: number;
        max: number;
    };
}

export interface IFacetOptions extends IFacetBase {
    type: EFacetType.Options;
    values: IFacetOptionValue[];
    multiple: boolean;
}

export interface IFacetRatings extends IFacetBase {
    type: EFacetType.Ratings;
    values: IFacetOptionValue[];
    multiple: boolean;
}

export interface IFacetSwatches extends IFacetBase {
    type: EFacetType.Swatches;
    values: IFacetOptionValue[];
    multiple: boolean;
}

export type IFacet = IFacetRange | IFacetOptions | IFacetSwatches | IFacetRatings;

export interface IFacetsData {
    facets: IFacet[];
}
