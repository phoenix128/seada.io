export interface IOptions {
    defaultValue?: IValueType;
    transform?: (value: string) => string;
}

export type IValueType = string | number | boolean;

/**
 * Generate tailwind properties
 * @param sourceValue
 * @param classTemplates
 * @param options
 */
const getTwClasses = (
    sourceValue: Readonly<IValueType | IValueType[]>,
    classTemplates: string | string[] | string[][],
    options?: IOptions
): string[] => {
    if (sourceValue == undefined) return [];

    // I know... this is a mess. But it works. Please don't judge me, once I was like you.
    const classPrefixes = (
        Array.isArray(classTemplates)
            ? Array.isArray(classTemplates[0])
                ? classTemplates
                : [classTemplates]
            : [[classTemplates]]
    ) as string[][];

    const values = Array.isArray(sourceValue) ? sourceValue : [sourceValue];
    const classTemplatesForValues = classPrefixes.find((cp) => cp.length >= values.length) ?? [];
    if (classTemplatesForValues.length < values.length) {
        throw new Error('Class prefixes length for given values must be greater than or equal to the value length');
    }

    return classTemplatesForValues.map<string>((ct, idx) => {
        const res = ct.replace('$', values[idx % values.length] ?? options?.defaultValue);
        if (options?.transform) return options.transform(res);
        return res;
    });
};

export default getTwClasses;
