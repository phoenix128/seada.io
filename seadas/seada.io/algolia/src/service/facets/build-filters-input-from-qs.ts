import { SearchOptions } from '@algolia/client-search';
import getFiltersFromQs from '@seada.io/algolia/service/facets/get-filters-from-qs';

const buildFiltersInputFromQs = (qs: Record<string, string | string[]>): SearchOptions['filters'] => {
    const filters = getFiltersFromQs(qs);
    if (!Object.keys(filters).length) {
        return undefined;
    }

    const conditions = Object.entries(filters).map(([attribute, values]) => {
        return values.map((value) => `${attribute}:${value}`).join(' OR ');
    });

    return '(' + conditions.join(') AND (') + ')';
};

export default buildFiltersInputFromQs;
