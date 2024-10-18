import useTwBoxBackgroundClasses from '@seada.io/basic-ui/hooks/tw/use-tw-box-background-classes';
import useTwBoxBorderClasses from '@seada.io/basic-ui/hooks/tw/use-tw-box-border-classes';
import useTwBoxGeometryClasses from '@seada.io/basic-ui/hooks/tw/use-tw-box-geometry-classes';
import styles from '@seada.io/basic-ui/page-components/Box/Box.styles';
import { IBoxSchema } from '@seada.io/basic-ui/page-components/Box/schema';
import React, { PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';
import { IPageComponentSchemaProps } from '@seada.io/core-schema/spi/components/interface';
import useTwProcessVisibilityClasses from '@seada.io/basic-ui/hooks/tw/use-tw-box-visibility';

export interface IBoxProps extends IPageComponentSchemaProps<IBoxSchema> {
    onClick?: () => void;
}

const Box: React.FC<PropsWithChildren<IBoxProps>> = (props) => {
    const { children, className } = props;

    const geometryClasses = useTwBoxGeometryClasses(props);
    const boxBackgroundClasses = useTwBoxBackgroundClasses(props);
    const boxBorderClasses = useTwBoxBorderClasses(props);

    const twClasses = twMerge(styles.Box, geometryClasses, boxBackgroundClasses, boxBorderClasses, className);
    const processedClasses = useTwProcessVisibilityClasses(props, twClasses);

    return (
        <div onClick={props.onClick} className={processedClasses} ref={props.domRef}>
            {children}
        </div>
    );
};

export default Box;
