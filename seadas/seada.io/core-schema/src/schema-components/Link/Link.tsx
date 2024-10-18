import React, { ChangeEvent, useCallback } from 'react';
import { ISchemaComponentProps } from '@seada.io/core-schema/spi/components/interface';
import { Input } from '@nextui-org/react';
import { twMerge } from 'tailwind-merge';
import { ILinkSchemaType } from '@seada.io/core-schema/schema-components/Link/schema';

export interface ISimpleTextOptions {
    options: string[];
}

export interface TwOptionsProps extends ISchemaComponentProps<ILinkSchemaType, ISimpleTextOptions> {
    className?: string;
}

const Link: React.FC<TwOptionsProps> = ({ onChange, className, fieldSchema, data: inData, disabled }) => {
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

export default Link;
