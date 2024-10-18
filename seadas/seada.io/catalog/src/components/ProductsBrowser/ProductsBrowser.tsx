import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from '@seada.io/catalog/components/ProductsBrowser/ProductsBrowser.styles';
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Checkbox,
    Chip,
    Divider,
    Image,
    ScrollShadow,
    Spinner,
} from '@nextui-org/react';
import { CgSearch } from 'react-icons/cg';
import { IPageData } from '@seada.io/core/spi/components/interface';
import { IPageComponentDefinition } from '@seada.io/core/spi/seada-pages/interface';
import useProductsSearch from '@seada.io/catalog/hooks/builder/use-products-search';
import { twMerge } from 'tailwind-merge';
import SeadaInput from '@seada.io/foundation-ui/components/SeadaInput';

export interface IProductsBrowserProps {
    onSelectProducts?: (productsIds: string[]) => void;
    selectedProducts?: string[];
    pageData: IPageData;
    component: IPageComponentDefinition;
    maxItems: number;
}

export interface IProductsBrowserRef {
    open: () => void;
    close: () => void;
}

const ProductsBrowser = forwardRef<IProductsBrowserRef, IProductsBrowserProps>(
    ({ onSelectProducts, pageData, component, selectedProducts, maxItems }, ref) => {
        const { t } = useTranslation();
        const [isOpen, setIsOpen] = useState<boolean>(false);
        const [searchText, setSearchText] = useState<string>('');

        const { products, loading } = useProductsSearch(pageData, searchText);
        const [currentSelection, setCurrentSelection] = useState<string[]>(selectedProducts || []);

        useImperativeHandle(
            ref,
            () => {
                return {
                    open: () => setIsOpen(true),
                    close: () => setIsOpen(false),
                };
            },
            []
        );

        const handleOk = useCallback(() => {
            onSelectProducts?.(currentSelection);
            setIsOpen(false);
        }, [currentSelection, onSelectProducts]);

        const handleSelectProduct = useCallback(
            (productId: string) => {
                if (maxItems === 1) {
                    setCurrentSelection([productId]);
                    return;
                }

                if (currentSelection.length >= maxItems) return;

                setCurrentSelection([...currentSelection, productId]);
            },
            [currentSelection, maxItems]
        );

        const handleDeselectProduct = useCallback(
            (productId: string) => {
                setCurrentSelection(currentSelection.filter((t) => t !== productId));
            },
            [currentSelection]
        );

        const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
            setSearchText(e.target.value);
        }, []);

        const handleClose = useCallback(() => {
            setIsOpen(false);
        }, []);

        useEffect(() => {
            if (isOpen) {
                setCurrentSelection(selectedProducts || []);
            }
        }, [isOpen, selectedProducts]);

        if (!isOpen) return null;

        return (
            <div className={styles.ProductsBrowserScreen}>
                <Card className={styles.ProductsBrowser}>
                    <CardHeader className={styles.Header}>
                        <div className={styles.Title}>{t('schema.commerce.productsBrowser.title')}</div>
                        <div className={styles.TitleButtons}>
                            <Button size={'sm'} color={'primary'} className={styles.CloseButton} onClick={handleClose}>
                                {t('schema.commerce.productsBrowser.close')}
                            </Button>
                            <Button size={'sm'} color={'danger'} className={styles.OkButton} onClick={handleOk}>
                                {t('schema.commerce.productsBrowser.ok')}
                            </Button>
                        </div>
                    </CardHeader>
                    <Divider />
                    <CardBody>
                        <SeadaInput
                            size={'sm'}
                            className={styles.Search}
                            placeholder={t('schema.commerce.productsBrowser.search')}
                            startContent={<CgSearch size={28} />}
                            onChange={handleSearch}
                            value={searchText}
                        />
                        <ScrollShadow className={styles.ProductsGridCard}>
                            {loading && (
                                <div className={styles.Loading}>
                                    <Spinner size={'lg'} />
                                    <div className={styles.LoadingMessage}>
                                        {t('schema.commerce.productsBrowser.loading')}
                                    </div>
                                </div>
                            )}

                            {!loading && (
                                <div className={styles.ProductsGrid}>
                                    {products.map((product) => {
                                        const isSelected = currentSelection.includes(product.key);
                                        const productPosition = currentSelection.indexOf(product.key) + 1;

                                        const handleValueChange = (selected: boolean) => {
                                            if (selected) {
                                                handleSelectProduct?.(product.key);
                                            } else {
                                                handleDeselectProduct?.(product.key);
                                            }
                                        };

                                        const handleValueToggle = () => {
                                            handleValueChange(!isSelected);
                                        };

                                        return (
                                            <div
                                                key={product.key}
                                                className={styles.ProductContainer}
                                                onClick={handleValueToggle}
                                            >
                                                <Card>
                                                    {isSelected && (
                                                        <Chip size={'sm'} color={'primary'} className={styles.CheckBox}>
                                                            <Checkbox
                                                                size={'sm'}
                                                                isSelected={isSelected}
                                                                onValueChange={handleValueChange}
                                                            >
                                                                {maxItems === 1 ? '' : productPosition}
                                                            </Checkbox>
                                                        </Chip>
                                                    )}
                                                    {!isSelected && (
                                                        <Checkbox
                                                            className={twMerge(styles.CheckBox, styles.NotSelected)}
                                                            size={'sm'}
                                                            isSelected={isSelected}
                                                            onValueChange={handleValueChange}
                                                        />
                                                    )}
                                                    <Image
                                                        className={styles.Image}
                                                        alt={product.name}
                                                        src={product.mainImage.url}
                                                        width={'100%'}
                                                        height={'100%'}
                                                        isBlurred={true}
                                                        isZoomed={true}
                                                    />
                                                    <CardFooter>
                                                        <ScrollShadow
                                                            hideScrollBar={true}
                                                            className={styles.ProductName}
                                                        >
                                                            {product.name}
                                                        </ScrollShadow>
                                                    </CardFooter>
                                                </Card>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </ScrollShadow>
                    </CardBody>
                </Card>
            </div>
        );
    }
);

ProductsBrowser.displayName = 'ProductsBrowser';

export default ProductsBrowser;
