import { stripHtml } from 'string-strip-html';
import { IPrice } from '@seada.io/catalog/interface/price';
import { ICatalogSearchResultTransformer } from '@seada.io/catalog-search/spi/catalog-search-result-transformer';
import { SearchResponse } from '@algolia/client-search';
import { IProductsListData } from '@seada.io/catalog/interface/product';
import { EFacetRangeMode, EFacetType, IFacet } from '@seada.io/catalog/interface/facet';
import { IPageData } from '@seada.io/core/spi/components/interface';
import getFiltersFromQs from '@seada.io/algolia/service/facets/get-filters-from-qs';

const getFacets = (pageData: IPageData, result: SearchResponse): IFacet[] => {
    const { searchParams } = pageData;
    const categories = Object.keys(result?.facets['categories.lvl0'] || {});
    const optionNames = Object.keys(result?.facets.option_names || {});
    const priceRange = result?.facets_stats?.default_price;
    const res: IFacet[] = [];

    const filters = getFiltersFromQs(searchParams);

    // TODO: Check result.renderingContent.facetOrdering.facets & result.renderingContent.facetOrdering.values for the order of facets
    if (categories.length > 0)
        res.push({
            type: EFacetType.Options,
            code: 'refinement.categories.lvl0',
            label: 'bigcommerce.searchResult.categories',
            multiple: false,
            values: categories.map((category) => ({
                label: category,
                value: category,
                code: category,
                count: result.facets['categories.lvl0'][category] as number,
                checked: filters['categories.lvl0']?.includes(category),
            })),
        });

    if (priceRange) {
        res.push({
            type: EFacetType.Range,
            code: 'refinement.price',
            label: 'bigcommerce.searchResult.price',
            mode: EFacetRangeMode.Input,
            allowedRange: { min: priceRange.min, max: priceRange.max },
        });
    }

    if (optionNames.length > 0) {
        for (const optionName of optionNames) {
            const code = `options.${optionName}`;
            if (!result.facets[code]) continue;

            const values = Object.keys(result.facets[code]);

            res.push({
                type: EFacetType.Options,
                code: `refinement.${code}`,
                label: optionName,
                multiple: true,
                values: values.map((value) => ({
                    label: value,
                    value,
                    code: value,
                    count: result.facets[code][value] as number,
                    checked: filters[code]?.includes(value),
                })),
            });
        }
    }

    return res;
};

const searchResultTransformer: ICatalogSearchResultTransformer<SearchResponse> = (
    pageData,
    result
): IProductsListData => {
    const convertPrice = (price: Record<string, number>): IPrice => {
        const currency = Object.keys(price)[0];

        return {
            amount: price[currency],
            currency,
        };
    };

    const products = result.hits.map((hit: any) => {
        const salesPriceIn = convertPrice(hit.sales_prices);
        const priceIn = convertPrice(hit.prices);

        const referencePrice = salesPriceIn.amount === 0 ? undefined : priceIn;
        const price = salesPriceIn.amount === 0 ? priceIn : salesPriceIn;

        return {
            id: hit.product_id.toString(),
            key: hit.sku,
            sku: hit.sku,
            name: stripHtml(hit.name).result,
            price,
            referencePrice,
            minPrice: price,
            maxPrice: price,
            shortDescription: stripHtml(hit.description).result,
            description: stripHtml(hit.description).result,
            mainImage: {
                url: hit.image_url,
                title: stripHtml(hit.name).result,
            },
            imagesGallery: hit.product_images.map((image: any) => ({
                url: image.url_thumbnail,
                title: stripHtml(image.description).result,
            })),
            url: hit.url,
            hasVariants: hit.option_names.length > 1,
            variantOptions: [],
            variantsMatrix: {},
        };
    });

    const facets = getFacets(pageData, result);

    return {
        products,
        facets,
        pagination: {
            totalItems: result.nbHits,
            totalPages: Math.ceil(result.nbHits / result.hitsPerPage),
            currentPage: result.page,
            limit: result.hitsPerPage,
        },
    };
};

export default searchResultTransformer;
