/**
 * Get a list of components to exclude from copilot
 * @param excludedComponents
 */
const getExcludedComponents = (excludedComponents?: string[]): string[] => {
    return excludedComponents || [];
};

export default getExcludedComponents;
