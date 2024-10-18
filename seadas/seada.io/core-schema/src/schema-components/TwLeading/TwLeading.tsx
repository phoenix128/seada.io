import { ISchemaComponentProps } from '@seada.io/core-schema/spi/components/interface';
import React, { ChangeEvent, useCallback } from 'react';
import { Select, SelectItem } from '@nextui-org/react';
import { twMerge } from 'tailwind-merge';
import useTwLeadings from '@seada.io/core-schema/hooks/tw/use-tw-leadings';
import useSchemaValueTranslation from '@seada.io/core-schema/hooks/use-schema-value-translation';
import { ITwLeadingSchemaType } from '@seada.io/core-schema/schema-components/TwLeading/schema';

export interface TwFontStyleProps extends ISchemaComponentProps<ITwLeadingSchemaType> {
    className?: string;
}

const TwLeading: React.FC<TwFontStyleProps> = ({ onChange, className, fieldSchema, data: inData, disabled }) => {
    const options = useTwLeadings();

    const { t } = useSchemaValueTranslation();

    const data = inData ?? fieldSchema.defaultValue;
    const handleChange = useCallback(
        (evt: ChangeEvent<HTMLSelectElement>) => {
            onChange?.(evt.target.value);
        },
        [onChange]
    );

    const selectItems = Object.keys(options).map((val) => (
        <SelectItem key={val} value={val} aria-label={t('leading', val)}>
            {t('leading', val)}
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

export default TwLeading;
