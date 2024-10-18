import React, { ChangeEvent, useCallback } from 'react';
import { ISchemaComponentProps } from '@seada.io/core-schema/spi/components/interface';
import { Switch as NextUiSwitch } from '@nextui-org/react';
import { ISwitchSchemaType } from '@seada.io/core-schema/schema-components/Switch/schema';

export interface ISwitchOptions {}

export interface ISwitchProps extends ISchemaComponentProps<ISwitchSchemaType, ISwitchOptions> {}

const Switch: React.FC<ISwitchProps> = ({ data, onChange, allProps, fieldSchema }) => {
    const handleChange = useCallback(
        (evt: ChangeEvent<HTMLInputElement>) => {
            onChange && onChange(evt.target.checked);
        },
        [onChange]
    );

    return (
        <>
            <NextUiSwitch onChange={handleChange} isSelected={!!data} />
        </>
    );
};

export default Switch;
