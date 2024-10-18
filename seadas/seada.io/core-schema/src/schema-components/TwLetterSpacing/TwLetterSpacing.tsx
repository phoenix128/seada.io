import { ISchemaComponentProps } from '@seada.io/core-schema/spi/components/interface';
import React, { ChangeEvent, useCallback } from 'react';
import { Chip, Select, SelectItem } from '@nextui-org/react';
import { twMerge } from 'tailwind-merge';
import useTwLetterSpacings from '@seada.io/core-schema/hooks/tw/use-tw-letter-spacings';
import useSchemaValueTranslation from '@seada.io/core-schema/hooks/use-schema-value-translation';
import { ITwLetterSpacingSchemaType } from '@seada.io/core-schema/schema-components/TwLetterSpacing/schema';

export interface TwFontStyleProps extends ISchemaComponentProps<ITwLetterSpacingSchemaType> {
    className?: string;
}

const TwLetterSpacing: React.FC<TwFontStyleProps> = ({ onChange, className, fieldSchema, data: inData, disabled }) => {
    const options = useTwLetterSpacings();

    const { t } = useSchemaValueTranslation();

    const data = inData ?? fieldSchema.defaultValue;
    const handleChange = useCallback(
        (evt: ChangeEvent<HTMLSelectElement>) => {
            onChange?.(evt.target.value);
        },
        [onChange]
    );

    const selectItems = Object.keys(options).map((val) => (
        <SelectItem
            key={val}
            value={val}
            aria-label={t('letterSpacing', val)}
            startContent={
                <Chip size={'sm'}>
                    <span style={{ letterSpacing: options[val] }}>aA</span>
                </Chip>
            }
        >
            {t('letterSpacing', val)}
        </SelectItem>
    ));

    return (
        <Select
            variant={'faded'}
            startContent={
                <Chip size={'sm'}>
                    <span style={{ letterSpacing: options[data] }}>aA</span>
                </Chip>
            }
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

export default TwLetterSpacing;
