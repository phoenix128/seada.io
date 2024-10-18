import React, { useCallback } from 'react';
import { ISchemaComponentProps } from '@seada.io/core-schema/spi/components/interface';
import RadioChips from '@seada.io/core-schema/components/RadioChips';
import { IRadioChipsOption } from '@seada.io/core-schema/components/RadioChips/RadioChips';
import { CgArrowDown, CgArrowLeft, CgArrowRight, CgArrowUp } from 'react-icons/cg';
import useSchemaValueTranslation from '@seada.io/core-schema/hooks/use-schema-value-translation';
import { ITwFlexDirectionSchemaType } from '@seada.io/core-schema/schema-components/TwFlexDirection/schema';

export interface ITwFlexDirectionProps extends ISchemaComponentProps<ITwFlexDirectionSchemaType> {}

const TwFlexDirection: React.FC<ITwFlexDirectionProps> = ({ data, onChange, fieldSchema }) => {
    const { t } = useSchemaValueTranslation();

    const handleChange = useCallback(
        (value: string) => {
            onChange && onChange(value);
        },
        [onChange]
    );

    const options: IRadioChipsOption[] = [
        {
            label: t('flexDirection', 'row'),
            value: 'row',
            component: <CgArrowRight size={24} />,
        },
        {
            label: t('flexDirection', 'column'),
            value: 'col',
            component: <CgArrowDown size={24} />,
        },
        {
            label: t('flexDirection', 'rowReverse'),
            value: 'row-reverse',
            component: <CgArrowLeft size={24} />,
        },
        {
            label: t('flexDirection', 'columnReverse'),
            value: 'col-reverse',
            component: <CgArrowUp size={24} />,
        },
    ];

    return <RadioChips showLabels={true} options={options} onChange={handleChange} value={data} />;
};

export default TwFlexDirection;
