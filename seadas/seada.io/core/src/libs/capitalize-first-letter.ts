/**
 * Capitalize first letter of string.
 * @param input
 */
const capitalizeFirstLetter = (input: string): string => {
    if (input.length === 0) {
        return input;
    }

    return input.charAt(0).toUpperCase() + input.slice(1);
};

export default capitalizeFirstLetter;
