const capitalize = (s: string): string => s.charAt(0).toUpperCase() + s.slice(1);

/**
 * Camelize a string
 * @param s
 */
const camelize = (s: string | string[]): string => {
    if (typeof s === 'string') {
        return s.replace(/-./g, (x) => x[1].toUpperCase());
    }

    return camelize(s.map((t, i) => (i === 0 ? t : capitalize(t))).join(''));
};

export default camelize;
