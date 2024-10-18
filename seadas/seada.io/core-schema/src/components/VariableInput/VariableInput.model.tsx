import { IVariableInputProps } from '@seada.io/core-schema/components/VariableInput/VariableInput';
import { useCallback, useEffect, useState } from 'react';

const useVariableInputModel = (props: IVariableInputProps) => {
    const { onChange, fieldSchema, data: inData } = props;
    const [data, setData] = useState<string>(inData ?? fieldSchema.defaultValue);

    useEffect(() => {
        setData(inData ?? fieldSchema.defaultValue);
    }, [fieldSchema.defaultValue, inData]);

    const handleChange = useCallback((value: string) => {
        setData(value);
    }, []);

    const handleApply = useCallback(() => {
        onChange?.(data);
    }, [data, onChange]);

    return {
        data: {
            data,
        },
        handlers: {
            handleChange,
            handleApply,
        },
    };
};

export default useVariableInputModel;
