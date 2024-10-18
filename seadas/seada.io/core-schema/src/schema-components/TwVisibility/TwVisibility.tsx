import React, { ChangeEvent, useCallback } from 'react';
import { ISchemaComponentProps } from '@seada.io/core-schema/spi/components/interface';
import { Select, SelectItem } from '@nextui-org/react';
import useSchemaValueTranslation from '@seada.io/core-schema/hooks/use-schema-value-translation';
import {
    ITwVisibilitySchemaType,
    ITwVisibilityValues,
} from '@seada.io/core-schema/schema-components/TwVisibility/schema';
import { IconType } from 'react-icons';
import { CgEye, CgEyeAlt, CgGhostCharacter } from 'react-icons/cg';

export type TwVisibilityProps = ISchemaComponentProps<ITwVisibilitySchemaType>;

const TwVisibility: React.FC<TwVisibilityProps> = ({ onChange, fieldSchema, data, disabled }) => {
    const { t } = useSchemaValueTranslation();
    const visibilityValues: Record<ITwVisibilityValues, IconType> = {
        visible: CgEyeAlt,
        hidden: CgEye,
        invisible: CgGhostCharacter,
    };

    const handleChange = useCallback(
        (evt: ChangeEvent<HTMLSelectElement>) => {
            onChange?.(evt.target.value as ITwVisibilityValues);
        },
        [onChange]
    );

    const selectItems = Object.entries(visibilityValues).map(([value, Icon]) => {
        return (
            <SelectItem
                startContent={<Icon className={'w-4 h-4 text-gray-500'} />}
                key={value}
                value={value}
                aria-label={t('visibility', value)}
            >
                {t('visibility', value)}
            </SelectItem>
        );
    });

    const Icon = visibilityValues[data] || null;

    return (
        <Select
            startContent={Icon && <Icon className={'w-4 h-4 text-gray-500'} />}
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
export default TwVisibility;
