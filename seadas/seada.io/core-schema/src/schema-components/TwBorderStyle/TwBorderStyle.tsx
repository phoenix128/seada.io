import React, { ChangeEvent, useCallback } from 'react';
import { ISchemaComponentProps } from '@seada.io/core-schema/spi/components/interface';
import { Select, SelectItem } from '@nextui-org/react';
import useSchemaValueTranslation from '@seada.io/core-schema/hooks/use-schema-value-translation';
import { ITwBorderStyleSchemaType } from '@seada.io/core-schema/schema-components/TwBorderStyle/schema';

export type TwBorderStyleProps = ISchemaComponentProps<ITwBorderStyleSchemaType>;

const TwBorderStyle: React.FC<TwBorderStyleProps> = ({ onChange, fieldSchema, data: inData, disabled }) => {
    const { t } = useSchemaValueTranslation();
    const borderStyles = ['none', 'solid', 'dashed', 'dotted', 'double'];
    const data = inData || 'none';

    const handleChange = useCallback(
        (evt: ChangeEvent<HTMLSelectElement>) => {
            onChange?.(evt.target.value || 'none');
        },
        [onChange]
    );

    const selectItems = borderStyles.map((v) => (
        <SelectItem
            key={v}
            value={v}
            startContent={<div className={`aspect-square w-5 border bg-gray-800 border-white border-${v}`}></div>}
            aria-label={t('borderStyle', v)}
        >
            {t('borderStyle', v)}
        </SelectItem>
    ));

    return (
        <Select
            isDisabled={disabled}
            startContent={<div className={`aspect-square w-5 border bg-gray-800 border-white border-${data}`}></div>}
            variant={'faded'}
            labelPlacement={'outside'}
            aria-label={fieldSchema.label}
            size={'sm'}
            onChange={handleChange}
            selectedKeys={[data]}
        >
            {selectItems}
        </Select>
    );
};

export default TwBorderStyle;
