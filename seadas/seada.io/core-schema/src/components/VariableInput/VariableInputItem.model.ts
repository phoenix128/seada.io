import { IVariableInputProps } from '@seada.io/core-schema/components/VariableInput/VariableInputItem';
import { useCallback } from 'react';

const useVariableInputItemModel = <TData = string>(props: IVariableInputProps<TData>) => {
    const { onChange, fieldSchema, data: inData } = props;

    const data = inData ?? fieldSchema.defaultValue;

    const handleChange = useCallback(
        (newData: TData) => {
            onChange?.(newData);
        },
        [onChange]
    );

    return {
        data: {
            data,
        },
        handlers: {
            handleChange,
        },
    };
};

export default useVariableInputItemModel;
