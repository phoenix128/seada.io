import { ISchemaComponentProps } from '@seada.io/core-schema/spi/components/interface';
import React, { ChangeEvent, useCallback } from 'react';
import { Chip, Select, SelectItem } from '@nextui-org/react';
import { twMerge } from 'tailwind-merge';
import useTwFontWeights from '@seada.io/core-schema/hooks/tw/use-tw-font-weights';
import useSchemaValueTranslation from '@seada.io/core-schema/hooks/use-schema-value-translation';
import { ITwFontWeightSchemaType } from '@seada.io/core-schema/schema-components/TwFontWeight/schema';

export interface TwFontWeightProps extends ISchemaComponentProps<ITwFontWeightSchemaType> {
    className?: string;
}

const TwFontWeight: React.FC<TwFontWeightProps> = ({ onChange, className, fieldSchema, data: inData, disabled }) => {
    const options = useTwFontWeights();

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
            aria-label={t('fontWeight', val.toString())}
            startContent={
                <Chip size={'sm'}>
                    <span style={{ fontWeight: options[val] }}>aA</span>
                </Chip>
            }
        >
            {t('fontWeight', val.toString())}
        </SelectItem>
    ));

    return (
        <Select
            variant={'faded'}
            startContent={
                <Chip size={'sm'}>
                    <span style={{ fontWeight: options[data] }}>aA</span>
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

export default TwFontWeight;
