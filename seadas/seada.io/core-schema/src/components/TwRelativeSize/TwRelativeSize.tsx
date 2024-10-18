import React, { useCallback, useMemo } from 'react';
import { Slider } from '@nextui-org/react';
import { IResponsiveSchemaComponentProps, ISchemaType } from '@seada.io/core-schema/spi/components/interface';
import getRelativeSizeMarks from '@seada.io/core-schema/service/tw/size/get-relative-size-marks';
import getIdxFromTwRelativeSize from '@seada.io/core-schema/service/tw/size/get-idx-from-tw-relative-size';
import getTwRelativeSizeFromIdx from '@seada.io/core-schema/service/tw/size/get-tw-relative-size-from-idx';

export interface TwSizeRelativeProps extends IResponsiveSchemaComponentProps<ISchemaType<string>> {}

const TwRelativeSize: React.FC<TwSizeRelativeProps> = ({ onChange, data: inData, fieldSchema, disabled }) => {
    const data = inData || 'auto';
    const marks = useMemo(getRelativeSizeMarks, []);
    const currentValue = useMemo(() => getIdxFromTwRelativeSize(data?.toString()), [data]);

    const handleChange = useCallback(
        (value: number) => {
            onChange?.(getTwRelativeSizeFromIdx(value));
        },
        [onChange]
    );

    return (
        <Slider
            aria-label={fieldSchema.label}
            value={currentValue}
            marks={marks}
            showSteps={true}
            showOutline={false}
            radius={'full'}
            size={'sm'}
            minValue={0}
            maxValue={marks.length - 1}
            onChange={handleChange}
        />
    );
};

export default TwRelativeSize;
