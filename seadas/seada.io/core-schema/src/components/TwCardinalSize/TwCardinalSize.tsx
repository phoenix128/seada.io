import { IResponsiveSchemaComponentProps, ISchemaType } from '@seada.io/core-schema/spi/components/interface';
import React from 'react';
import TwDimensionsWrapper from '@seada.io/core-schema/components/TwDimensionsWrapper';
import { EDisplayMode } from '@seada.io/core-schema/components/TwDimensionsWrapper/TwDimensionsWrapper';
import { CgLock, CgLockUnlock, CgMaximizeAlt } from 'react-icons/cg';
import styles from '@seada.io/core-schema/components/TwCardinalSize/TwCardinalSize.module.css';
import TwNumericSize from '@seada.io/core-schema/components/TwNumericSize';

const TwCardinalSize: React.FC<IResponsiveSchemaComponentProps<ISchemaType<string>>> = (props) => (
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
                component: TwNumericSize,
                options: {
                    showEndContent: false,
                },
            },
            {
                label: 'Right',
                component: TwNumericSize,
                options: {
                    showEndContent: false,
                },
            },
            {
                label: 'Bottom',
                component: TwNumericSize,
                options: {
                    showEndContent: false,
                },
            },
            {
                label: 'Left',
                component: TwNumericSize,
                options: {
                    showEndContent: false,
                },
            },
        ]}
    />
);

export default TwCardinalSize;
