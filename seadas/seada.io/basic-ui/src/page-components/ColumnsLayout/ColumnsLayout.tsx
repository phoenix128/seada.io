import React, { PropsWithChildren } from 'react';
import Box from '@seada.io/basic-ui/page-components/Box/Box';
import { IColumnsLayoutSchema } from '@seada.io/basic-ui/page-components/ColumnsLayout/schema';
import { twMerge } from 'tailwind-merge';
import { IPageComponentSchemaProps } from '@seada.io/core-schema/spi/components/interface';

const ColumnsLayout: React.FC<PropsWithChildren<IPageComponentSchemaProps<IColumnsLayoutSchema>>> = (props) => {
    const { children, columns, gap, className } = props;

    return (
        <Box {...props} className={twMerge(gap, columns)}>
            {children}
        </Box>
    );
};

export default ColumnsLayout;
