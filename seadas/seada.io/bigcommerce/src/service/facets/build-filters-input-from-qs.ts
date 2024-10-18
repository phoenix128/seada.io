import { SearchProductsFiltersInput } from '@seada.io/bigcommerce/gql/schema/graphql';

/**
 * Build filters input from query string
 * @param qs
 * @param allowedProductAttributesFilters
 */
const buildFiltersInputFromQs = (
    qs: Record<string, string | string[]>,
    allowedProductAttributesFilters: string[]
): SearchProductsFiltersInput => {
    const filtersInput: SearchProductsFiltersInput = {};

    for (const [attribute, value] of Object.entries(qs)) {
        const normalizedValue = Array.isArray(value) ? value : [value];
        const normalizedAttribute = attribute.replace('[]', '');

        if (normalizedAttribute === 'brand') {
            filtersInput.brandEntityIds = normalizedValue.map((v) => parseInt(v, 10));
        } else if (normalizedAttribute === 'category') {
            filtersInput.categoryEntityIds = normalizedValue.map((v) => parseInt(v, 10));
        } else if (normalizedAttribute === 'has_free_shipping') {
            filtersInput.isFreeShipping = true;
        } else if (normalizedAttribute === 'featured') {
            filtersInput.isFeatured = true;
        } else if (normalizedAttribute === 'in_stock') {
            filtersInput.hideOutOfStock = true;
        } else if (normalizedAttribute === 'rating') {
            filtersInput.rating = {
                maxRating: 5,
                minRating: parseInt(value as string, 10),
            };
        } else if (normalizedAttribute === 'min_price') {
            filtersInput.price = {
                ...filtersInput.price,
                minPrice: parseFloat(value as string),
            };
        } else if (normalizedAttribute === 'max_price') {
            filtersInput.price = {
                ...filtersInput.price,
                maxPrice: parseFloat(value as string),
            };
        } else if (allowedProductAttributesFilters.includes(normalizedAttribute)) {
            if (!filtersInput.productAttributes) {
                filtersInput.productAttributes = [];
            }

            filtersInput.productAttributes.push({
                attribute: normalizedAttribute,
                values: normalizedValue,
            });
        }
    }

    return filtersInput;
};

export default buildFiltersInputFromQs;
