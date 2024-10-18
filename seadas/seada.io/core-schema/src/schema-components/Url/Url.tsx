import React, { ChangeEvent, useCallback } from 'react';
import { ISchemaComponentProps } from '@seada.io/core-schema/spi/components/interface';
import { Input } from '@nextui-org/react';
import { IUrlSchemaType } from '@seada.io/core-schema/schema-components/Url/schema';

export interface ITwUrlProps extends ISchemaComponentProps<IUrlSchemaType> {}

const Url: React.FC<ITwUrlProps> = ({ data, onChange, fieldSchema }) => {
    const handleChange = useCallback(
        (evt: ChangeEvent<HTMLInputElement>) => {
            onChange && onChange(evt.target.value);
        },
        [onChange]
    );

    return (
        <div>
            <Input
                variant={'faded'}
                size={'sm'}
                aria-label={fieldSchema.label}
                labelPlacement={'outside'}
                type="text"
                value={data}
                onChange={handleChange}
            />
        </div>
    );
};

export default Url;
