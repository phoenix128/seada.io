import { IProductsPickerProps } from '@seada.io/catalog/schema-components/ProductsPicker/ProductsPicker';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { IImageGalleryRef } from '@seada.io/core-schema/components/ImageGallery/ImageGallery';
import useProductsList from '@seada.io/catalog/hooks/builder/use-products-list';

const useProductsPickerModel = (props: IProductsPickerProps) => {
    const { onChange, fieldSchema, data: inData, pageData } = props;

    const data = inData ?? fieldSchema.defaultValue;

    const productsPickerRef = useRef<IImageGalleryRef>();
    const { products, loading } = useProductsList(pageData, data as string[]);
    const maxItems = fieldSchema.options?.maxItems || Infinity;
    const isArray = fieldSchema.options?.isArray || maxItems > 1;

    useEffect(() => {
        if (!isArray && maxItems > 0) {
            console.warn(
                `ProductsPicker: 'maxItems' set to ${maxItems}, but 'isArray' is false. Assuming isArray=true.`
            );
        }
    }, [isArray, maxItems]);

    const handleSelectProducts = useCallback(
        (productKeys: string[]) => {
            onChange?.(productKeys);
        },
        [onChange]
    );

    const handleClick = useCallback(() => {
        productsPickerRef.current.open();
    }, []);

    const selectedProducts = useMemo(() => (isArray ? data : [data?.toString()]), [data, isArray]);

    return {
        data: {
            isArray,
            data,
            products,
            loading,
            maxItems,
            selectedProducts,
        },
        handlers: {
            handleSelectProducts,
            handleClick,
        },
        refs: {
            productsPickerRef,
        },
    };
};

export default useProductsPickerModel;
