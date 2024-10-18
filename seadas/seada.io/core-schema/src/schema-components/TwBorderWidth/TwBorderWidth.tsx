import { ISchemaComponentProps } from '@seada.io/core-schema/spi/components/interface';
import React from 'react';
import TwDimensionsWrapper from '@seada.io/core-schema/components/TwDimensionsWrapper';
import { EDisplayMode } from '@seada.io/core-schema/components/TwDimensionsWrapper/TwDimensionsWrapper';
import { CgLock, CgLockUnlock, CgMaximizeAlt } from 'react-icons/cg';
import styles from '@seada.io/core-schema/schema-components/TwBorderWidth/TwBorderWidth.module.css';
import TwSingleBorderWidth from '@seada.io/core-schema/schema-components/TwBorderWidth/TwSingleBorderWidth';
import { ITwBorderWidthSchemaType } from '@seada.io/core-schema/schema-components/TwBorderWidth/schema';

const TwBorderWidth: React.FC<ISchemaComponentProps<ITwBorderWidthSchemaType>> = (props) => (
    <TwDimensionsWrapper
        {...props}
        display={EDisplayMode.INLINE}
        defaultValue={'0'}
        locks={[
            {
                icons: [CgLock],
                keys: [[0, 1, 2, 3]],
                classNames: [styles.CardinalAll],
            },
            {
                icons: [CgLock, CgMaximizeAlt],
                keys: [
                    [0, 2],
                    [1, 3],
                ],
                classNames: [styles.CardinalVertical, styles.CardinalHorizontal],
            },
            {
                icons: [CgLockUnlock],
                keys: [[0], [1], [2], [3]],
                classNames: [styles.CardinalNorth, styles.CardinalEast, styles.CardinalSouth, styles.CardinalWest],
            },
        ]}
        SchemaComponents={[
            {
                label: 'Top',
                component: TwSingleBorderWidth,
            },
            {
                label: 'Right',
                component: TwSingleBorderWidth,
            },
            {
                label: 'Bottom',
                component: TwSingleBorderWidth,
            },
            {
                label: 'Left',
                component: TwSingleBorderWidth,
            },
        ]}
    />
);

export default TwBorderWidth;
