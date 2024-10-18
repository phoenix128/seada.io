const getFiltersFromQs = (qs: Record<string, string | string[]>): Record<string, string[]> => {
    const filters: Record<string, string[]> = {};

    for (const [attribute, value] of Object.entries(qs)) {
        const normalizedValue = Array.isArray(value) ? value : [value];
        const normalizedAttribute = attribute.replace('[]', '');

        if (!normalizedAttribute.startsWith('refinement.')) {
            continue;
        }

        const baseAttributeName = normalizedAttribute.replace('refinement.', '');
        filters[baseAttributeName] = normalizedValue;
    }

    return filters;
};

export default getFiltersFromQs;
