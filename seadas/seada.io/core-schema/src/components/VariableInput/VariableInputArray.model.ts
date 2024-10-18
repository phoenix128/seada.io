import { IVariableInputArrayProps } from '@seada.io/core-schema/components/VariableInput/VariableInputArray';
import { useCallback, useEffect, useState } from 'react';

const useVariableInputArrayModel = (props: IVariableInputArrayProps) => {
    const { onChange, fieldSchema, data: inData } = props;
    const [data, setData] = useState<string[]>(inData ?? fieldSchema.defaultValue);

    useEffect(() => {
        setData(inData ?? fieldSchema.defaultValue);
    }, [fieldSchema.defaultValue, inData]);

    const { maxItems } = props;

    const handleIdxChange = useCallback(
        (value: string, index: number) => {
            if (maxItems === 1 && value === '') {
                setData([]);
                return;
            }

            const newData = [...data];
            newData[index] = value;
            setData(newData);
        },
        [data, maxItems]
    );

    const handleIdxRemove = useCallback(
        (index: number) => {
            const newData = [...data];
            newData.splice(index, 1);
            setData(newData);
        },
        [data]
    );

    const handleAddNew = useCallback(() => {
        setData((prevData) => [...(prevData || []), '']);
    }, []);

    const handleApply = useCallback(() => {
        onChange?.(data);
    }, [data, onChange]);

    return {
        data: {
            data,
        },
        handlers: {
            handleIdxChange,
            handleIdxRemove,
            handleAddNew,
            handleApply,
        },
    };
};

export default useVariableInputArrayModel;
