import { ISchemaComponentProps } from '@seada.io/core-schema/spi/components/interface';
import React, { ChangeEvent, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Chip, Select, SelectItem } from '@nextui-org/react';
import { twMerge } from 'tailwind-merge';
import { ITwFontStyleSchemaType } from '@seada.io/core-schema/schema-components/TwFontStyle/schema';

export interface TwFontStyleProps extends ISchemaComponentProps<ITwFontStyleSchemaType> {
    className?: string;
}

const TwFontStyle: React.FC<TwFontStyleProps> = ({ onChange, className, fieldSchema, data: inData, disabled }) => {
    const options = ['italic', 'not-italic'];

    const { t } = useTranslation();
    const data = inData ?? fieldSchema.defaultValue;

    const handleChange = useCallback(
        (evt: ChangeEvent<HTMLSelectElement>) => {
            onChange?.(evt.target.value);
        },
        [onChange]
    );

    const selectItems = options.map((val) => (
        <SelectItem
            key={val}
            value={val}
            aria-label={t('schema.fontStyle.' + val.toString())}
            startContent={
                <Chip size={'sm'}>
                    <span className={val}>aA</span>
                </Chip>
            }
        >
            {t('schema.fontStyle.' + val.toString())}
        </SelectItem>
    ));

    return (
        <Select
            variant={'faded'}
            startContent={
                <Chip size={'sm'}>
                    <span className={data}>aA</span>
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

export default TwFontStyle;
