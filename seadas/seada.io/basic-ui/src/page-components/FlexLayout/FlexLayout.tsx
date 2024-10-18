import React, { PropsWithChildren } from 'react';
import Box from '@seada.io/basic-ui/page-components/Box/Box';
import { IFlexLayoutSchema } from '@seada.io/basic-ui/page-components/FlexLayout/schema';
import styles from '@seada.io/basic-ui/page-components/FlexLayout/FlexLayout.styles';
import { twMerge } from 'tailwind-merge';
import { IPageComponentSchemaProps } from '@seada.io/core-schema/spi/components/interface';

const FlexLayout: React.FC<PropsWithChildren<IPageComponentSchemaProps<IFlexLayoutSchema>>> = (props) => {
    const { children, flexDirection, flexAlign = 'start', flexJustify, gap, className } = props;

    return (
        <Box {...props} className={twMerge(gap, flexDirection, flexAlign, flexJustify, className, styles.FlexLayout)}>
            {children}
        </Box>
    );
};

export default FlexLayout;
