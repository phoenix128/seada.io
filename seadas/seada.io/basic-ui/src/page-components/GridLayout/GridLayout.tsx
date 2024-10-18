import React, { PropsWithChildren } from 'react';
import styles from '@seada.io/basic-ui/page-components/GridLayout/GridLayout.styles';
import Box from '@seada.io/basic-ui/page-components/Box/Box';
import { IGridLayoutSchema } from '@seada.io/basic-ui/page-components/GridLayout/schema';
import { twMerge } from 'tailwind-merge';
import { IPageComponentSchemaProps } from '@seada.io/core-schema/spi/components/interface';

const GridLayout: React.FC<PropsWithChildren<IPageComponentSchemaProps<IGridLayoutSchema>>> = (props) => {
    const { className, children, columns, gap, innerBordersX, innerBordersY } = props;

    const fwClassName = twMerge(
        styles.GridLayout,
        innerBordersX && styles.InnerBordersX,
        innerBordersY && styles.InnerBordersY,
        gap,
        columns,
        className
    );

    return (
        <Box {...props} className={fwClassName}>
            {children}
        </Box>
    );
};

export default GridLayout;
