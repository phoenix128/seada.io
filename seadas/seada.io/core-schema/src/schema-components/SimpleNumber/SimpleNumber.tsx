import React, { ChangeEvent, useCallback } from 'react';
import { ISchemaComponentProps } from '@seada.io/core-schema/spi/components/interface';
import { Input } from '@nextui-org/react';
import { twMerge } from 'tailwind-merge';
import { ISimpleNumberSchemaType } from '@seada.io/core-schema/schema-components/SimpleNumber/schema';

export interface ISimpleNumberOptions {
    options: string[];
}

export interface SimpleNumberProps extends ISchemaComponentProps<ISimpleNumberSchemaType, ISimpleNumberOptions> {
    className?: string;
}

const SimpleNumber: React.FC<SimpleNumberProps> = ({ onChange, className, fieldSchema, data: inData, disabled }) => {
    const data = inData ?? fieldSchema.defaultValue;

    const handleChange = useCallback(
        (evt: ChangeEvent<HTMLInputElement>) => {
            const v = parseInt(evt.target.value, 10);

            if (isNaN(v)) {
                return;
            }
            onChange?.(parseInt(evt.target.value, 10));
        },
        [onChange]
    );

    return (
        <Input
            variant={'faded'}
            labelPlacement={'outside'}
            aria-label={fieldSchema.label}
            className={twMerge(className)}
            size={'sm'}
            value={'' + data}
            onChange={handleChange}
            type={'number'}
            fullWidth={true}
        />
    );
};

export default SimpleNumber;
