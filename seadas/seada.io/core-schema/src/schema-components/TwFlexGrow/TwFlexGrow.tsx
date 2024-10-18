import useSchemaValueTranslation from '@seada.io/core-schema/hooks/use-schema-value-translation';
import RadioChips from '@seada.io/core-schema/components/RadioChips';
import { IRadioChipsOption } from '@seada.io/core-schema/components/RadioChips/RadioChips';
import { ISchemaComponentProps } from '@seada.io/core-schema/spi/components/interface';
import React, { useCallback } from 'react';
import { CgArrowAlignH, CgArrowsShrinkH } from 'react-icons/cg';
import { ITwFlexGrowSchemaType } from '@seada.io/core-schema/schema-components/TwFlexGrow/schema';

export interface ITwFlexGrowProps extends ISchemaComponentProps<ITwFlexGrowSchemaType> {}

const TwFlexGrow: React.FC<ITwFlexGrowProps> = ({ data, onChange, fieldSchema }) => {
    const { t } = useSchemaValueTranslation();

    const handleChange = useCallback(
        (value: string) => {
            onChange && onChange(value === '1');
        },
        [onChange]
    );

    const options: IRadioChipsOption[] = [
        {
            label: t('flexGrow', '1'),
            value: '1',
            component: <CgArrowAlignH size={24} />,
        },
        {
            label: t('flexGrow', '0'),
            value: '0',
            component: <CgArrowsShrinkH size={24} />,
        },
    ];

    return <RadioChips showLabels={true} options={options} onChange={handleChange} value={data ? '1' : '0'} />;
};

export default TwFlexGrow;
