import React, { useCallback } from 'react';
import { ISchemaComponentProps } from '@seada.io/core-schema/spi/components/interface';
import { IMobileModeSchemaType } from '@seada.io/core-schema/schema-components/MobileMode/schema';
import RadioChips from '@seada.io/core-schema/components/RadioChips';
import { IRadioChipsOption } from '@seada.io/core-schema/components/RadioChips/RadioChips';
import { CgScreen, CgSmartphone } from 'react-icons/cg';
import useSchemaValueTranslation from '@seada.io/core-schema/hooks/use-schema-value-translation';

export interface IMobileModeOptions {}

export interface IMobileModeProps extends ISchemaComponentProps<IMobileModeSchemaType, IMobileModeOptions> {}

const MobileMode: React.FC<IMobileModeProps> = ({ data, onChange, allProps, fieldSchema }) => {
    const { t } = useSchemaValueTranslation();
    const handleChange = useCallback(
        (value: string) => {
            onChange && onChange(value === 'true');
        },
        [onChange]
    );

    const selectOptions: IRadioChipsOption[] = [
        {
            label: t('mobileMode', 'off'),
            value: 'false',
            component: <CgScreen size={24} className={'py-0.5'} />,
        },
        {
            label: t('mobileMode', 'on'),
            value: 'true',
            component: <CgSmartphone size={24} className={'py-0.5'} />,
        },
    ];

    return (
        <RadioChips showLabels={true} options={selectOptions} onChange={handleChange} value={data ? 'true' : 'false'} />
    );
};

export default MobileMode;
