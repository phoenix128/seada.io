import React from 'react';
import { Input } from '@nextui-org/react';
import { twMerge } from 'tailwind-merge';
import useVariableInputItemModel from '@seada.io/core-schema/components/VariableInput/VariableInputItem.model';

export interface IVariableInputProps<TData = string> {
    manualApply?: boolean;
    onChange?: (value: TData) => void;
    className?: string;
    fieldSchema: any;
    data: string;
}

const VariableInputItem: React.FC<IVariableInputProps> = (props) => {
    const {
        data: { data },
        handlers: { handleChange },
    } = useVariableInputItemModel(props);
    const { className, fieldSchema, manualApply } = props;

    return (
        <Input
            variant={'faded'}
            labelPlacement={'outside'}
            aria-label={fieldSchema.label}
            className={twMerge(className)}
            size={'sm'}
            value={data}
            onChange={(e) => handleChange(e.target.value)}
            fullWidth={true}
        />
    );
};

export default VariableInputItem;
