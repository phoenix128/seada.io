import React, { ChangeEvent, useCallback } from 'react';
import { ISchemaComponentProps } from '@seada.io/core-schema/spi/components/interface';
import { Select, SelectItem } from '@nextui-org/react';
import useTwAspectRatios from '@seada.io/core-schema/hooks/tw/use-tw-aspect-ratios';
import styles from '@seada.io/core-schema/schema-components/TwAspectRatio/TwAspectRatio.module.css';
import useSchemaValueTranslation from '@seada.io/core-schema/hooks/use-schema-value-translation';
import { ITwAspectRatioSchemaType } from '@seada.io/core-schema/schema-components/TwAspectRatio/schema';

export type TwAspectRatioProps = ISchemaComponentProps<ITwAspectRatioSchemaType>;

const getRatioDetails = (ratio: string): string => (ratio ? ratio.replace(' / ', ':') : null);

const TwAspectRatio: React.FC<TwAspectRatioProps> = ({ onChange, fieldSchema, data: inData, disabled }) => {
    const { t } = useSchemaValueTranslation();
    const ratios = useTwAspectRatios();
    const data = inData || 'auto';

    const handleChange = useCallback(
        (evt: ChangeEvent<HTMLSelectElement>) => {
            onChange?.(evt.target.value || 'auto');
        },
        [onChange]
    );

    const selectItems = Object.entries(ratios).map(([label, ratio]) => {
        return (
            <SelectItem
                key={label}
                value={label}
                endContent={<div className={styles.Ratio}>{getRatioDetails(ratio)}</div>}
                aria-label={t('aspectRatio', label)}
            >
                {t('aspectRatio', label)}
            </SelectItem>
        );
    });

    const ratioDetails = getRatioDetails(ratios[data]);

    return (
        <Select
            endContent={data !== 'auto' && <div className={styles.Ratio}>{ratioDetails}</div>}
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
export default TwAspectRatio;
