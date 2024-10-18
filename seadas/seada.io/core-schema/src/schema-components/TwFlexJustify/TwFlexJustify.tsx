import React, { useCallback } from 'react';
import { ISchemaComponentProps } from '@seada.io/core-schema/spi/components/interface';
import RadioChips from '@seada.io/core-schema/components/RadioChips';
import { IRadioChipsOption } from '@seada.io/core-schema/components/RadioChips/RadioChips';
import {
    CgAlignBottom,
    CgAlignCenter,
    CgAlignLeft,
    CgAlignMiddle,
    CgAlignRight,
    CgAlignTop,
    CgArrowAlignH,
    CgArrowAlignV,
    CgDistributeHorizontal,
    CgDistributeVertical,
} from 'react-icons/cg';
import useCurrentValueForTwBreakpointInSchemaComponent from '@seada.io/core-schema/hooks/tw/use-current-value-for-tw-breakpoint-in-schema-component';
import useSchemaValueTranslation from '@seada.io/core-schema/hooks/use-schema-value-translation';
import { ITwFlexJustifySchemaType } from '@seada.io/core-schema/schema-components/TwFlexJustify/schema';

export interface ITwFlexAlignOptions {
    directionProp: string;
    extended?: boolean;
    forceDirection?: string;
}

export interface ITwFlexAlignProps extends ISchemaComponentProps<ITwFlexJustifySchemaType, ITwFlexAlignOptions> {}

const TwFlexJustify: React.FC<ITwFlexAlignProps> = ({ data, onChange, allProps, fieldSchema }) => {
    const { t } = useSchemaValueTranslation();
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
            label: t('flexJustify', 'start'),
            value: 'start',
            component: !isCol ? <CgAlignLeft size={24} /> : <CgAlignTop size={24} />,
        },
        {
            label: t('flexJustify', 'end'),
            value: 'end',
            component: !isCol ? <CgAlignRight size={24} /> : <CgAlignBottom size={24} />,
        },
        {
            label: t('flexJustify', 'center'),
            value: 'center',
            component: !isCol ? <CgAlignCenter size={24} /> : <CgAlignMiddle size={24} />,
        },
    ];

    if (extended) {
        selectOptions.push({
            label: t('flexJustify', 'between'),
            value: 'between',
            component: !isCol ? <CgDistributeHorizontal size={24} /> : <CgDistributeVertical size={24} />,
        });
        selectOptions.push({
            label: t('flexJustify', 'around'),
            value: 'around',
            component: !isCol ? <CgDistributeHorizontal size={24} /> : <CgDistributeVertical size={24} />,
        });
        selectOptions.push({
            label: t('flexJustify', 'evenly'),
            value: 'evenly',
            component: !isCol ? <CgDistributeHorizontal size={24} /> : <CgDistributeVertical size={24} />,
        });
        selectOptions.push({
            label: t('flexJustify', 'stretch'),
            value: 'stretch',
            component: !isCol ? <CgArrowAlignH size={24} /> : <CgArrowAlignV size={24} />,
        });
    }

    return <RadioChips showLabels={true} options={selectOptions} onChange={handleChange} value={data} />;
};

export default TwFlexJustify;
