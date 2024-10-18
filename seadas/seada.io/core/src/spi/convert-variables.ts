import { IPageComponentProps } from '@seada.io/core/interface';

/**
 * Convert variables middleware
 * @param props
 * @param values
 */
const convertVariables = (props: Record<string, any>, values: Record<string, any>): Record<string, any> => {
    const regex = /\$\{(.*?)}/g;

    const getValueFromPath = (path: string): any => {
        const keys = path.split('.');
        let result = values;
        for (const key of keys) {
            result = result?.[key];
            if (result === undefined) return '';
        }
        return result;
    };

    const replaceVariables = (value: string): any => {
        return value.replace(regex, (_, variablePath) => {
            const result = getValueFromPath(variablePath);
            return result !== '' ? result : '';
        });
    };

    const processValue = (value: any): any => {
        if (typeof value === 'string') {
            return replaceVariables(value);
        } else if (Array.isArray(value)) {
            return value.map(processValue);
        } else if (value && typeof value === 'object') {
            const newObj: any = {};
            for (const key in value) {
                newObj[key] = processValue(value[key]);
            }
            return newObj;
        }
        return value;
    };

    const newProps: IPageComponentProps = {} as IPageComponentProps;
    for (const key in props) {
        newProps[key] = processValue(props[key]);
    }

    return newProps;
};

export default convertVariables;
