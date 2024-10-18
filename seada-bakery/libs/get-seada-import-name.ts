/**
 * Build a safe import name
 * @param moduleName
 */
const getSeadaImportName = (moduleName: string): string => {
    const sanitizedModuleName = moduleName
        .toLowerCase()
        .replaceAll(/@/g, '')
        .replaceAll(/[\W\s-]+/g, '_');

    return `__seada__${sanitizedModuleName}__`;
};

export default getSeadaImportName;
