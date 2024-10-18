import React, { ChangeEvent, useCallback } from 'react';
import { ISchemaComponentProps } from '@seada.io/core-schema/spi/components/interface';
import { Select, SelectItem } from '@nextui-org/react';
import useTwBorderRadii from '@seada.io/core-schema/hooks/tw/use-tw-border-radii';
import useSchemaValueTranslation from '@seada.io/core-schema/hooks/use-schema-value-translation';
import { ITwBorderRadiusSchemaType } from '@seada.io/core-schema/schema-components/TwBorderRadius/schema';

export type TwBorderRadiusProps = ISchemaComponentProps<ITwBorderRadiusSchemaType> & {
    data: string;
    className?: string;
};

const TwSingleBorderRadius: React.FC<TwBorderRadiusProps> = ({
    onChange,
    fieldSchema,
    data: inData,
    className,
    disabled,
}) => {
    const { t } = useSchemaValueTranslation();
    const borderRadii = useTwBorderRadii();
    const data = inData || 'none';

    const handleChange = useCallback(
        (evt: ChangeEvent<HTMLSelectElement>) => {
            onChange?.(evt.target.value || 'none');
        },
        [onChange]
    );

    const selectItems = Object.keys(borderRadii).map((v) => (
        <SelectItem key={v} value={v} aria-label={v}>
            {t('borderRadius', v)}
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

export default TwSingleBorderRadius;
