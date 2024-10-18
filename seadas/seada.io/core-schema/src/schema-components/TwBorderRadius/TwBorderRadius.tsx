import React from 'react';
import { ISchemaComponentProps } from '@seada.io/core-schema/spi/components/interface';
import TwDimensionsWrapper from '@seada.io/core-schema/components/TwDimensionsWrapper';
import { EDisplayMode } from '@seada.io/core-schema/components/TwDimensionsWrapper/TwDimensionsWrapper';
import styles from '@seada.io/core-schema/schema-components/TwBorderRadius/TwBorderRadius.module.css';
import { CgArrowsHAlt, CgArrowsVAlt, CgLock, CgLockUnlock } from 'react-icons/cg';
import TwSingleBorderRadius, {
    TwBorderRadiusProps,
} from '@seada.io/core-schema/schema-components/TwBorderRadius/TwSingleBorderRadius';
import { ITwBorderRadiusSchemaType } from '@seada.io/core-schema/schema-components/TwBorderRadius/schema';

export type ITwBordersProps = {
    className?: string;
};

const TwBorders: React.FC<ITwBordersProps> = ({ className }) => {
    return (
        <div className={className}>
            <div className={styles.BorderTopLeft}></div>
            <div className={styles.BorderTopRight}></div>
            <div className={styles.BorderBottomRight}></div>
            <div className={styles.BorderBottomLeft}></div>
        </div>
    );
};

const TwBorderValue: React.FC<ISchemaComponentProps<ITwBorderRadiusSchemaType>> = (props) => {
    props.fieldSchema.options.showEndContent = false;
    return (
        <div className={styles.Cardinal}>
            <TwSingleBorderRadius {...(props as TwBorderRadiusProps)} />
            <TwBorders className={props.className} />
        </div>
    );
};

const TwBorderRadius: React.FC<ISchemaComponentProps<ITwBorderRadiusSchemaType>> = (props) => (
    <TwDimensionsWrapper
        {...props}
        display={EDisplayMode.INLINE}
        locks={[
            {
                icons: [CgLock],
                keys: [[0, 1, 2, 3]],
                classNames: [styles.CardinalAll],
            },
            {
                icons: [CgLock, CgArrowsVAlt],
                keys: [
                    [0, 1],
                    [2, 3],
                ],
                classNames: [styles.CardinalTop, styles.CardinalBottom],
            },
            {
                icons: [CgLock, CgArrowsHAlt],
                keys: [
                    [0, 3],
                    [1, 2],
                ],
                classNames: [styles.CardinalLeft, styles.CardinalRight],
            },
            {
                icons: [CgLockUnlock],
                keys: [[0], [1], [2], [3]],
                classNames: [
                    styles.CardinalTopLeft,
                    styles.CardinalTopRight,
                    styles.CardinalBottomRight,
                    styles.CardinalBottomLeft,
                ],
            },
        ]}
        SchemaComponents={[
            {
                label: 'Top Left',
                component: TwBorderValue,
            },
            {
                label: 'Top Right',
                component: TwBorderValue,
            },
            {
                label: 'Bottom Right',
                component: TwBorderValue,
            },
            {
                label: 'Bottom Left',
                component: TwBorderValue,
            },
        ]}
    />
);

export default TwBorderRadius;
