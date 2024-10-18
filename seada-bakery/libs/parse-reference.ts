import { IParsedReference } from './interface.js';

/**
 * Parse reference
 * @param reference
 */
const parseReference = (reference: string): IParsedReference => {
    const m = reference.match(/^(?<moduleName>[@\w\-_/.]+)(:(?<export>[\w\-_/.]+))?$/);
    if (!m) {
        throw new Error(`Invalid injectable reference syntax: ${reference}`);
    }
    return {
        exportName: m.groups?.export || 'default',
        moduleName: m.groups?.moduleName,
    };
};

export default parseReference;
