import React, { ChangeEvent, useCallback, useMemo } from 'react';
import { IProductStandardOption } from '@seada.io/catalog/interface/product-options';
import SeadaSelect from '@seada.io/foundation-ui/components/SeadaSelect';
import { SelectItem } from '@nextui-org/react';

export interface IOptionsRectangleProps {
    option: IProductStandardOption;
    onChange?: (value: string) => void;
    value: string;
    allowedValues: string[];
}

const OptionsDropdown: React.FC<IOptionsRectangleProps> = (props) => {
    const {
        onChange,
        value,
        allowedValues,
        option: { values },
    } = props;

    const handleChange = useCallback(
        (evt: ChangeEvent<HTMLSelectElement>) => {
            onChange && onChange(evt.target.value);
        },
        [onChange]
    );

    const disabledKeys = useMemo(
        () => values.filter((v) => !allowedValues?.includes(v.value)).map((v) => v.id),
        [allowedValues, values]
    );

    return (
        <SeadaSelect
            labelPlacement={'outside'}
            aria-label={props.option.label}
            onChange={handleChange}
            selectedKeys={[value]}
            disabledKeys={disabledKeys}
        >
            {values.map((v) => {
                return (
                    <SelectItem key={v.id} value={v.value} aria-label={v.label}>
                        {v.label}
                    </SelectItem>
                );
            })}
        </SeadaSelect>
    );
};

export default OptionsDropdown;
