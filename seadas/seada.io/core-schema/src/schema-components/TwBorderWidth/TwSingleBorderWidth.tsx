import React, { ChangeEvent, useCallback } from 'react';
import useTwBorderWidth from '@seada.io/core-schema/hooks/tw/use-tw-border-width';
import { Select, SelectItem } from '@nextui-org/react';
import { ISchemaComponentProps } from '@seada.io/core-schema/spi/components/interface';
import useSchemaValueTranslation from '@seada.io/core-schema/hooks/use-schema-value-translation';
import { ITwBorderWidthSchemaType } from '@seada.io/core-schema/schema-components/TwBorderWidth/schema';

export interface TwBorderWidthProps extends ISchemaComponentProps<ITwBorderWidthSchemaType> {
    data: string;
    className?: string;
}

const TwSingleBorderWidth: React.FC<TwBorderWidthProps> = ({
    onChange,
    fieldSchema,
    data: inData,
    className,
    disabled,
}) => {
    const borderWidths = useTwBorderWidth();
    const data = inData || 0;
    const { t } = useSchemaValueTranslation();

    const handleChange = useCallback(
        (evt: ChangeEvent<HTMLSelectElement>) => {
            onChange?.(evt.target.value);
        },
        [onChange]
    );

    const selectItems = Object.keys(borderWidths).map((v) => (
        <SelectItem key={v} value={v} aria-label={v}>
            {t('borderWidth', v)}
        </SelectItem>
    ));

    return (
        <Select
            isDisabled={disabled}
            className={className}
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

export default TwSingleBorderWidth;
