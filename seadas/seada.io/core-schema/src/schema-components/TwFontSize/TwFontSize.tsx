import { ISchemaComponentProps } from '@seada.io/core-schema/spi/components/interface';
import React, { ChangeEvent, useCallback } from 'react';
import { Select, SelectItem } from '@nextui-org/react';
import { twMerge } from 'tailwind-merge';
import useTwFontSizes from '@seada.io/core-schema/hooks/tw/use-tw-font-sizes';
import useSchemaValueTranslation from '@seada.io/core-schema/hooks/use-schema-value-translation';
import { ITwFontSizeSchemaType } from '@seada.io/core-schema/schema-components/TwFontSize/schema';

export interface TwFontStyleProps extends ISchemaComponentProps<ITwFontSizeSchemaType> {
    className?: string;
}

const TwFontSize: React.FC<TwFontStyleProps> = ({ onChange, className, fieldSchema, data: inData, disabled }) => {
    const fontSizes = useTwFontSizes();

    const { t } = useSchemaValueTranslation();

    const data = inData ?? fieldSchema.defaultValue;
    const handleChange = useCallback(
        (evt: ChangeEvent<HTMLSelectElement>) => {
            onChange?.(evt.target.value);
        },
        [onChange]
    );

    const selectItems = Object.keys(fontSizes).map((val) => (
        <SelectItem key={val} value={val} aria-label={t('fontSize', val)}>
            {t('fontSize', val)}
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

export default TwFontSize;
