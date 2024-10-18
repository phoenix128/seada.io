import React, { useCallback, useMemo } from 'react';
import { Slider, SliderStepMark } from '@nextui-org/react';
import { ISchemaComponentProps } from '@seada.io/core-schema/spi/components/interface';
import { ITwGridColumnsSchemaType } from '@seada.io/core-schema/schema-components/TwGridColumns/schema';

export interface TwColumnsProps extends ISchemaComponentProps<ITwGridColumnsSchemaType> {}

const TwGridColumns: React.FC<TwColumnsProps> = ({ onChange, data: inData, fieldSchema, disabled }) => {
    const data = Math.max(1, inData);

    const handleChange = useCallback(
        (value: number) => {
            onChange?.(value);
        },
        [onChange]
    );
    const marks = useMemo<SliderStepMark[]>(() => {
        const marks = [];
        for (let i = 1; i <= 12; i++) {
            marks.push({
                label: i.toString(),
                value: i,
            });
        }
        return marks;
    }, []);

    return (
        <Slider
            aria-label={fieldSchema.label}
            showTooltip={true}
            showOutline={true}
            value={data}
            marks={marks}
            showSteps={true}
            radius={'full'}
            size={'sm'}
            minValue={1}
            maxValue={12}
            onChange={handleChange}
        />
    );
};

export default TwGridColumns;
