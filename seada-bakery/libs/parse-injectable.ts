import { IInjectable, IInjectableType, IParsedInjectable } from './interface.js';
import parseReference from './parse-reference.js';

/**
 * Validate injectable value
 * @param injectable
 */
const parseInjectable = (injectable: IInjectable): IParsedInjectable => {
    switch (injectable?.type) {
        case IInjectableType.String:
            if (typeof injectable.value !== 'string') {
                throw new Error(`Invalid injectable value: ${injectable.value}`);
            }
            return injectable.value;
        case IInjectableType.Number:
            if (typeof injectable.value !== 'number') {
                throw new Error(`Invalid injectable value: ${injectable.value}`);
            }
            return injectable.value;
        case IInjectableType.Reference:
        case IInjectableType.LazyReference:
        case IInjectableType.DynamicReference:
            if (typeof injectable.value !== 'string') {
                throw new Error(`Invalid injectable value: ${injectable.value}`);
            }

            return parseReference(injectable.value);
        case IInjectableType.Array:
            if (!Array.isArray(injectable.value)) {
                throw new Error(`Invalid injectable value: ${JSON.stringify(injectable.value)}`);
            }
            return injectable.value.map(parseInjectable);
        case IInjectableType.Map:
            if (typeof injectable.value !== 'object') {
                throw new Error(`Invalid injectable value: ${JSON.stringify(injectable.value)}`);
            }
            return Object.fromEntries(
                Object.entries(injectable.value).map(([key, value]) => [key, parseInjectable(value)])
            );
        case IInjectableType.Raw:
            return injectable.value;
        default:
            throw new Error(`Invalid injectable type: ${injectable?.type}`);
    }
};

export default parseInjectable;
