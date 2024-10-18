/**
 * Localizes the props object based on the current locale.
 * @param props
 * @param locale
 * @param allLocales
 */
const localizeProps = (props: Record<string, any>, locale: string, allLocales: string[]): Record<string, any> => {
    return Object.entries(props).reduce<Record<string, any>>((acc, [key, value]) => {
        if (typeof value === 'object' && value !== null) {
            acc[key] =
                value?.[locale] ??
                value?.[allLocales.find((l) => value[l] !== undefined)] ??
                (Object.keys(value).length > 0 ? value : undefined);
        } else {
            acc[key] = value;
        }
        return acc;
    }, {});
};

export default localizeProps;
