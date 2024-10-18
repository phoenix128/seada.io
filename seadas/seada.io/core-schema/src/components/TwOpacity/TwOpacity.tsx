import React, { useCallback } from 'react';
import { IResponsiveSchemaComponentProps, ISchemaType } from '@seada.io/core-schema/spi/components/interface';
import { Slider } from '@nextui-org/react';
import styles from '@seada.io/core-schema/components/TwOpacity/TwOpacity.module.css';

export type ITwOpacityProps = IResponsiveSchemaComponentProps<ISchemaType<number>>;

const TwOpacity: React.FC<ITwOpacityProps> = ({ data, onChange, fieldSchema }) => {
    const numericValue = data === undefined ? 100 : data;

    const handleShadeChange = useCallback(
        (value: number) => {
            onChange(value);
        },
        [onChange]
    );

    return (
        <div>
            <Slider
                aria-label={fieldSchema.label}
                value={numericValue}
                showSteps={true}
                showOutline={true}
                radius={'full'}
                size={'sm'}
                minValue={0}
                maxValue={100}
                step={5}
                onChange={handleShadeChange}
            />
            <div className={styles.Percent}>{numericValue}%</div>
        </div>
    );
};

export default TwOpacity;
