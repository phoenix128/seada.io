import React, { useCallback } from 'react';
import { ISchemaComponentProps } from '@seada.io/core-schema/spi/components/interface';
import RadioChips from '@seada.io/core-schema/components/RadioChips';
import { IRadioChipsOption } from '@seada.io/core-schema/components/RadioChips/RadioChips';
import { CgAlignCenter, CgAlignLeft, CgAlignRight } from 'react-icons/cg';
import useSchemaValueTranslation from '@seada.io/core-schema/hooks/use-schema-value-translation';
import { ITwTextAlignSchemaType, ITwTextAlignValues } from '@seada.io/core-schema/schema-components/TwTextAlign/schema';

export interface ITwTextAlignProps extends ISchemaComponentProps<ITwTextAlignSchemaType> {}

const TwTextAlign: React.FC<ITwTextAlignProps> = ({ data, onChange, fieldSchema }) => {
    const { t } = useSchemaValueTranslation();

    const handleChange = useCallback(
        (value: string) => {
            onChange && onChange(value as ITwTextAlignValues);
        },
        [onChange]
    );

    const options: IRadioChipsOption[] = [
        {
            label: t('textAlign', 'left'),
            value: 'left',
            component: <CgAlignLeft size={24} />,
        },
        {
            label: t('textAlign', 'center'),
            value: 'center',
            component: <CgAlignCenter size={24} />,
        },
        {
            label: t('textAlign', 'right'),
            value: 'right',
            component: <CgAlignRight size={24} />,
        },
    ];

    return <RadioChips showLabels={true} options={options} onChange={handleChange} value={data} />;
};

export default TwTextAlign;
