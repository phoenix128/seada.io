import React, { useCallback } from 'react';
import { ISchemaComponentProps } from '@seada.io/core-schema/spi/components/interface';
import RadioChips from '@seada.io/core-schema/components/RadioChips';
import { IRadioChipsOption } from '@seada.io/core-schema/components/RadioChips/RadioChips';
import { useTranslation } from 'react-i18next';
import { CgAlignBottom, CgAlignMiddle, CgAlignTop } from 'react-icons/cg';
import {
    ITwAlignItemsVerticalSchemaType,
    ITwAlignItemsVerticalValue,
} from '@seada.io/core-schema/schema-components/TwAlignItemsVertical/schema';

export interface ITwTextAlignProps extends ISchemaComponentProps<ITwAlignItemsVerticalSchemaType> {}

const TwAlignItemsVertical: React.FC<ITwTextAlignProps> = ({ data, onChange, fieldSchema }) => {
    const { t } = useTranslation();

    const handleChange = useCallback(
        (value: string) => {
            onChange && onChange(value as ITwAlignItemsVerticalValue);
        },
        [onChange]
    );

    const options: IRadioChipsOption[] = [
        {
            label: t('schema.alignItems.vertical.start'),
            value: 'start',
            component: <CgAlignTop size={24} />,
        },
        {
            label: t('schema.alignItems.vertical.center'),
            value: 'center',
            component: <CgAlignMiddle size={24} />,
        },
        {
            label: t('schema.alignItems.vertical.end'),
            value: 'end',
            component: <CgAlignBottom size={24} />,
        },
    ];

    return <RadioChips showLabels={true} options={options} onChange={handleChange} value={data as string} />;
};

export default TwAlignItemsVertical;
