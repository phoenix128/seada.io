import React, { ChangeEvent, useCallback, useMemo } from 'react';
import { ISchemaComponentProps } from '@seada.io/core-schema/spi/components/interface';
import { Select, SelectItem } from '@nextui-org/react';
import useSchemaValueTranslation from '@seada.io/core-schema/hooks/use-schema-value-translation';
import {
    ITwTextDecorationSchemaType,
    ITwTextDecorationValues,
} from '@seada.io/core-schema/schema-components/TwTextDecoration/schema';

export interface ITwTextProps extends ISchemaComponentProps<ITwTextDecorationSchemaType> {}

const TwTextDecoration: React.FC<ITwTextProps> = ({ data, onChange, fieldSchema }) => {
    const { t } = useSchemaValueTranslation();
    const handleChange = useCallback(
        (evt: ChangeEvent<HTMLSelectElement>) => {
            onChange && onChange(evt.target.value as ITwTextDecorationValues);
        },
        [onChange]
    );

    const options = useMemo<ITwTextDecorationValues[]>(
        () => ['no-underline', 'underline', 'line-through', 'overline'],
        []
    );

    const selectItems = options.map((option) => (
        <SelectItem key={option} value={option} aria-label={t('textDecoration', option)}>
            {t('textDecoration', option)}
        </SelectItem>
    ));

    return (
        <Select
            variant={'faded'}
            labelPlacement={'outside'}
            aria-label={fieldSchema.label}
            size={'sm'}
            onChange={handleChange}
            selectedKeys={[data]}
            fullWidth={true}
        >
            {selectItems}
        </Select>
    );
};

export default TwTextDecoration;
