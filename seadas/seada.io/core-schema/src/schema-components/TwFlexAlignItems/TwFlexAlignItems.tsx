import React, { useCallback } from 'react';
import { ISchemaComponentProps } from '@seada.io/core-schema/spi/components/interface';
import RadioChips from '@seada.io/core-schema/components/RadioChips';
import { IRadioChipsOption } from '@seada.io/core-schema/components/RadioChips/RadioChips';
import { useTranslation } from 'react-i18next';
import {
    CgAlignBottom,
    CgAlignCenter,
    CgAlignLeft,
    CgAlignMiddle,
    CgAlignRight,
    CgAlignTop,
    CgArrowAlignH,
    CgArrowAlignV,
    CgFormatStrike,
} from 'react-icons/cg';
import useCurrentValueForTwBreakpointInSchemaComponent from '@seada.io/core-schema/hooks/tw/use-current-value-for-tw-breakpoint-in-schema-component';
import { ITwFlexAlignItemsSchemaType } from '@seada.io/core-schema/schema-components/TwFlexAlignItems/schema';

export interface ITwFlexAlignOptions {
    directionProp: string;
    extended?: boolean;
    forceDirection?: string;
}

export interface ITwFlexAlignItemsProps
    extends ISchemaComponentProps<ITwFlexAlignItemsSchemaType, ITwFlexAlignOptions> {}

const TwFlexAlignItems: React.FC<ITwFlexAlignItemsProps> = ({ data, onChange, allProps, fieldSchema }) => {
    const { t } = useTranslation();
    const { options: { directionProp, extended = true, forceDirection } = {} } = fieldSchema;

    const propsDirection = useCurrentValueForTwBreakpointInSchemaComponent(allProps?.[directionProp]);
    const direction = forceDirection || propsDirection;
    const isCol = direction === 'col' || direction === 'col-reverse';

    const handleChange = useCallback(
        (value: string) => {
            onChange && onChange(value);
        },
        [onChange]
    );

    const selectOptions: IRadioChipsOption[] = [
        {
            label: t('schema.flexAlign.start'),
            value: 'start',
            component: isCol ? <CgAlignLeft size={24} /> : <CgAlignTop size={24} />,
        },
        {
            label: t('schema.flexAlign.end'),
            value: 'end',
            component: isCol ? <CgAlignRight size={24} /> : <CgAlignBottom size={24} />,
        },
        {
            label: t('schema.flexAlign.center'),
            value: 'center',
            component: isCol ? <CgAlignCenter size={24} /> : <CgAlignMiddle size={24} />,
        },
    ];

    if (extended) {
        selectOptions.push({
            label: t('schema.flexAlign.baseline'),
            value: 'baseline',
            component: <CgFormatStrike size={24} />,
        });
        selectOptions.push({
            label: t('schema.flexAlign.stretch'),
            value: 'stretch',
            component: isCol ? <CgArrowAlignH size={24} /> : <CgArrowAlignV size={24} />,
        });
    }

    return <RadioChips showLabels={true} options={selectOptions} onChange={handleChange} value={data} />;
};

export default TwFlexAlignItems;
