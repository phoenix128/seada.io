/**
 * Capitalize first letter of a string
 * @param string
 */
const capitalizeFirstLetter = (string: string): string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

export default capitalizeFirstLetter;
