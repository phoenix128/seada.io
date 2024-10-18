import {
    BrandSearchFilter,
    CategorySearchFilter,
    OtherSearchFilter,
    PriceSearchFilter,
    ProductAttributeSearchFilter,
    RatingSearchFilter,
    SearchProductFilter,
} from '@seada.io/bigcommerce/gql/schema/graphql';
import {
    EFacetRangeMode,
    EFacetType,
    IFacet,
    IFacetOptions,
    IFacetRange,
    IFacetRatings,
} from '@seada.io/catalog/interface/facet';

const getTypeAttributeSearchFilter = (filter: ProductAttributeSearchFilter): IFacetOptions => {
    return {
        multiple: true,
        code: filter.filterName,
        label: filter.name,
        type: EFacetType.Options,
        values: filter.attributes.edges.map(({ node }) => ({
            code: node.value,
            label: node.value,
            count: node.productCount,
            checked: node.isSelected,
        })),
    };
};

const getTypeBrandSearchFilter = (filter: BrandSearchFilter): IFacetOptions => {
    return {
        multiple: true,
        code: 'brand',
        label: filter.name,
        type: EFacetType.Options,
        values: filter.brands.edges.map(({ node }) => ({
            code: node.entityId.toString(),
            label: node.name,
            count: node.productCount,
            checked: node.isSelected,
        })),
    };
};

const getTypeCategorySearchFilter = (filter: CategorySearchFilter): IFacetOptions => {
    return {
        multiple: true,
        code: 'category',
        label: filter.name,
        type: EFacetType.Options,
        values: filter.categories.edges.map(({ node }) => ({
            code: node.entityId.toString(),
            label: node.name,
            count: node.productCount,
            checked: node.isSelected,
        })),
    };
};

const getTypeOtherSearchFilter = (filter: OtherSearchFilter): IFacetOptions => {
    const values = [];

    if (filter.freeShipping) {
        values.push({
            code: 'has_free_shipping',
            label: 'bigcommerce.facets.freeShipping',
            count: filter.freeShipping.productCount,
            checked: filter.freeShipping.isSelected,
        });
    }

    if (filter.isFeatured) {
        values.push({
            code: 'featured',
            label: 'bigcommerce.facets.isFeatured',
            count: filter.isFeatured.productCount,
            checked: filter.isFeatured.isSelected,
        });
    }

    if (filter.isInStock) {
        values.push({
            code: 'in_stock',
            label: 'bigcommerce.facets.isInStock',
            count: filter.isInStock.productCount,
            checked: filter.isInStock.isSelected,
        });
    }

    return {
        multiple: true,
        code: 'other',
        label: filter.name,
        type: EFacetType.Options,
        values,
    };
};

const getTypePriceSearchFilter = (filter: PriceSearchFilter): IFacetRange => {
    return {
        mode: EFacetRangeMode.Input,
        code: 'price',
        label: filter.name,
        type: EFacetType.Range,
        allowedRange: {
            min: -1,
            max: -1,
        },
        selectedRange: {
            min: filter.selected?.minPrice,
            max: filter.selected?.maxPrice,
        },
    };
};

const getTypeRatingSearchFilter = (filter: RatingSearchFilter): IFacetRatings => {
    return {
        multiple: false,
        code: 'rating',
        label: filter.name,
        type: EFacetType.Ratings,
        values: filter.ratings.edges.map(({ node }) => ({
            code: node.value,
            label: node.value,
            count: node.productCount,
            checked: node.isSelected,
        })),
    };
};

const convertBigcommerceFacet = (filter: SearchProductFilter): IFacet => {
    const typedFilter = filter as SearchProductFilter & { __typename: string };

    switch (typedFilter.__typename) {
        case 'ProductAttributeSearchFilter':
            return getTypeAttributeSearchFilter(filter as ProductAttributeSearchFilter);
        case 'BrandSearchFilter':
            return getTypeBrandSearchFilter(filter as BrandSearchFilter);
        case 'CategorySearchFilter':
            return getTypeCategorySearchFilter(filter as CategorySearchFilter);
        case 'OtherSearchFilter':
            return getTypeOtherSearchFilter(filter as OtherSearchFilter);
        case 'PriceSearchFilter':
            return getTypePriceSearchFilter(filter as PriceSearchFilter);
        case 'RatingSearchFilter':
            return getTypeRatingSearchFilter(filter as RatingSearchFilter);
    }

    throw new Error(`Unsupported filter type: ${typedFilter.__typename}`);
};

export default convertBigcommerceFacet;
