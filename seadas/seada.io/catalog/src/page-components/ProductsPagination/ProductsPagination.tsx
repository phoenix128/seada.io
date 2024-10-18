'use client';

import React, { useCallback } from 'react';
import Pagination from '@seada.io/basic-ui/components/Pagination';
import useModifySearchParams from '@seada.io/core/hooks/use-modify-search-params';
import { IProductsListDataProviderResult } from '@seada.io/catalog/ports/catalog/data-providers/products-list';
import { IProductsPaginationSchema } from '@seada.io/catalog/page-components/ProductsPagination/schema';
import { IPageComponentSchemaPropsWithDataProvider } from '@seada.io/core-schema/spi/components/interface';

const ProductsPagination: React.FC<
    IPageComponentSchemaPropsWithDataProvider<IProductsPaginationSchema, IProductsListDataProviderResult>
> = (props) => {
    const currentPage = props.providersData?.productsList?.pagination.currentPage || 1;
    const totalPages = props.providersData?.productsList?.pagination.totalPages || 1;

    const modifyQs = useModifySearchParams({
        phpArrays: true,
        scroll: true,
    });

    const handlePageChange = useCallback(
        (pageNo: number) => {
            if (pageNo === 1) {
                modifyQs({ page: undefined });
                return;
            }
            modifyQs({ page: pageNo.toString() });
        },
        [modifyQs]
    );

    return <Pagination {...props} onPageChange={handlePageChange} pagesCount={totalPages} currentPage={currentPage} />;
};

export default ProductsPagination;
