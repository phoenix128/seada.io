import React from 'react';
import styles from '@seada.io/basic-ui/components/Pagination/Pagination.styles';
import Box from '@seada.io/basic-ui/page-components/Box/Box';
import { IPaginationSchema } from '@seada.io/basic-ui/components/Pagination/schema';
import { twMerge } from 'tailwind-merge';
import { IPageComponentSchemaProps } from '@seada.io/core-schema/spi/components/interface';
import SeadaPagination from '@seada.io/foundation-ui/components/SeadaPagination';

export interface IPaginationProps extends IPageComponentSchemaProps<IPaginationSchema> {
    onPageChange?: (page: number) => void;
    pagesCount: number;
    currentPage: number;
}

const Pagination: React.FC<IPaginationProps> = (props) => {
    const { pagesCount, currentPage, onPageChange, align, showControls } = props;

    return (
        <Box {...props}>
            <div className={twMerge(align, styles.PaginationFlex)}>
                <SeadaPagination
                    showControls={showControls}
                    onChange={onPageChange}
                    className={styles.Pagination}
                    total={pagesCount}
                    page={currentPage}
                />
            </div>
        </Box>
    );
};

export default Pagination;
