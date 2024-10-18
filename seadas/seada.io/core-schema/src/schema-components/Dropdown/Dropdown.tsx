import React, { ChangeEvent, useCallback } from 'react';
import { ISchemaComponentProps } from '@seada.io/core-schema/spi/components/interface';
import { Select, SelectItem } from '@nextui-org/react';
import { twMerge } from 'tailwind-merge';
import { IDropdownSchemaType } from '@seada.io/core-schema/schema-components/Dropdown/schema';

export interface IOptionsOptions {
    options: string[];
}

export interface TwOptionsProps extends ISchemaComponentProps<IDropdownSchemaType, IOptionsOptions> {
    className?: string;
}

const Dropdown: React.FC<TwOptionsProps> = ({ onChange, className, fieldSchema, data: inData, disabled }) => {
    const data = inData ?? fieldSchema.defaultValue;

    const handleChange = useCallback(
        (evt: ChangeEvent<HTMLSelectElement>) => {
            onChange?.(evt.target.value.toString());
        },
        [onChange]
    );

    const selectItems = fieldSchema.options.options.map((val) => (
        <SelectItem key={val} value={val.toString()} aria-label={val.toString()}>
            {val.toString()}
        </SelectItem>
    ));

    return (
        <Select
            variant={'faded'}
            labelPlacement={'outside'}
            aria-label={fieldSchema.label}
            className={twMerge(className)}
            size={'sm'}
            onChange={handleChange}
            selectedKeys={[data]}
            fullWidth={true}
        >
            {selectItems}
        </Select>
    );
};

export default Dropdown;
