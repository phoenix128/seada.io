import React from 'react';
import { ISchemaComponentProps } from '@seada.io/core-schema/spi/components/interface';
import { useTranslation } from 'react-i18next';
import TwDimensionsWrapper from '@seada.io/core-schema/components/TwDimensionsWrapper';
import TwSize from '@seada.io/core-schema/components/TwSize';
import { ETwSizeMode } from '@seada.io/core-schema/components/TwSize/TwSize';
import { ITwSizeDimensionsSchemaType } from '@seada.io/core-schema/schema-components/TwSizeDimensions/schema';

const TwSizeDimensions: React.FC<ISchemaComponentProps<ITwSizeDimensionsSchemaType>> = (props) => {
    const { t } = useTranslation();

    return (
        <TwDimensionsWrapper
            {...props}
            locks={[
                {
                    keys: [[0, 1]],
                },
                {
                    keys: [[0], [1]],
                },
            ]}
            SchemaComponents={[
                {
                    label: t('schema.size.width'),
                    component: TwSize,
                    options: {
                        defaultMode: ETwSizeMode.RELATIVE,
                    },
                },
                {
                    label: t('schema.size.height'),
                    component: TwSize,
                    options: {
                        defaultMode: ETwSizeMode.NUMERIC,
                    },
                },
            ]}
        />
    );
};

export default TwSizeDimensions;
