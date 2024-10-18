import React, { ChangeEvent, useCallback } from 'react';
import { IResponsiveSchemaComponentProps, ISchemaType } from '@seada.io/core-schema/spi/components/interface';
import { useTranslation } from 'react-i18next';
import { Select, SelectItem } from '@nextui-org/react';
import { twMerge } from 'tailwind-merge';
import styles from '@seada.io/core-schema/components/TwNumericSize/TwNumericSize.module.css';
import useTwNumericSpacings from '@seada.io/core-schema/hooks/tw/use-tw-numeric-spacings';

export type ITwNumericValueOptions = {
    showEndContent?: boolean;
};

export type ITwNumericValueProps = IResponsiveSchemaComponentProps<
    ISchemaType<number | string, string>,
    ITwNumericValueOptions
> & {
    className?: string;
};

const TwNumericSize: React.FC<ITwNumericValueProps> = ({
    onChange,
    className,
    fieldSchema,
    data: inData,
    disabled,
}) => {
    const data = inData || 0;

    const numbers = useTwNumericSpacings();
    const { t } = useTranslation();
    const { showEndContent = true } = fieldSchema.options || {};

    const handleChange = useCallback(
        (evt: ChangeEvent<HTMLSelectElement>) => {
            if (evt.target.value === 'auto') {
                onChange?.('auto');
                return;
            }
            onChange?.(evt.target.value);
        },
        [onChange]
    );

    const selectItems = Object.keys(numbers).map((number) => {
        const k = `schema.numericSize.${number.toString()}`;
        const translation = t(k) === k ? number.toString() : t(k);

        return (
            <SelectItem
                title={translation}
                key={number}
                value={number.toString()}
                endContent={showEndContent && <div className={styles.Pixels}>{numbers[number]}</div>}
                aria-label={number.toString()}
            >
                {translation}
            </SelectItem>
        );
    });

    selectItems.unshift(
        <SelectItem key={'auto'} value="auto">
            {t('schema.auto')}
        </SelectItem>
    );

    return (
        <Select
            isDisabled={disabled}
            endContent={showEndContent && <div className={styles.Pixels}>{numbers[data]}</div>}
            labelPlacement={'outside'}
            variant={'faded'}
            aria-label={fieldSchema.label}
            className={twMerge(className)}
            size={'sm'}
            onChange={handleChange}
            selectedKeys={[data?.toString()]}
            fullWidth={true}
        >
            {selectItems}
        </Select>
    );
};

export default TwNumericSize;
