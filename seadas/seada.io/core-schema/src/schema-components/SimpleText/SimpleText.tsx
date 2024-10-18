import React, { ChangeEvent, useCallback } from 'react';
import { ISchemaComponentProps } from '@seada.io/core-schema/spi/components/interface';
import { Input } from '@nextui-org/react';
import { twMerge } from 'tailwind-merge';
import { ISimpleTextSchemaType } from '@seada.io/core-schema/schema-components/SimpleText/schema';

export interface ISimpleTextOptions {
    options: string[];
}

export interface TwOptionsProps extends ISchemaComponentProps<ISimpleTextSchemaType, ISimpleTextOptions> {
    className?: string;
}

const SimpleText: React.FC<TwOptionsProps> = ({ onChange, className, fieldSchema, data: inData, placeholder }) => {
    const data = inData ?? fieldSchema.defaultValue;

    const handleChange = useCallback(
        (evt: ChangeEvent<HTMLInputElement>) => {
            onChange?.(evt.target.value);
        },
        [onChange]
    );

    return (
        <Input
            variant={'faded'}
            placeholder={placeholder}
            labelPlacement={'outside'}
            aria-label={fieldSchema.label}
            className={twMerge(className)}
            size={'sm'}
            value={data}
            onChange={handleChange}
            fullWidth={true}
        />
    );
};

export default SimpleText;
