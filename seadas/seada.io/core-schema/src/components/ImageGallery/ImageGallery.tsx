import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useState } from 'react';
import styles from '@seada.io/core-schema/components/ImageGallery/ImageGallery.module.css';
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Divider,
    Image,
    Input,
    ScrollShadow,
    Spinner,
} from '@nextui-org/react';
import { useTranslation } from 'react-i18next';
import Dropzone from 'react-dropzone';
import useUploadImagePort from '@seada.io/core-schema/ports/schema/hooks/use-upload-image-port';
import useListImagesUrlsPort from '@seada.io/core-schema/ports/schema/hooks/use-list-images-urls-port';
import { CgSearch, CgSoftwareUpload } from 'react-icons/cg';
import { IPageComponentDefinition } from '@seada.io/core/spi/seada-pages/interface';
import useSubscribe from '@seada.io/core/hooks/use-subscribe';

export interface IImageGalleryProps {
    onSelectImage?: (url: string) => void;
    component: IPageComponentDefinition;
}

export interface IImageGalleryRef {
    open: () => void;
    close: () => void;
}

const ImageGallery = forwardRef<IImageGalleryRef, IImageGalleryProps>(({ onSelectImage, component }, ref) => {
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const { action: upload, loading: uploading } = useUploadImagePort();
    const { loading: loadingList, data: images, action: loadList } = useListImagesUrlsPort();
    const [searchText, setSearchText] = useState<string>('');

    const handleDrop = useCallback(
        (files: File[]) => {
            if (!uploading) upload(files);
        },
        [upload, uploading]
    );

    const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value);
    }, []);

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

    const handleClose = useCallback(() => {
        setIsOpen(false);
    }, []);

    useEffect(() => {
        loadList();
    }, [loadList]);

    useSubscribe(uploading, (status) => {
        if (!status) loadList();
    });

    if (!isOpen) return null;

    return (
        <div className={styles.ImageGalleryScreen}>
            <Card className={styles.ImageGallery}>
                <CardHeader className={styles.Header}>
                    <div className={styles.Title}>{t('schema.gallery.title')}</div>
                    <Button size={'sm'} color={'primary'} className={styles.CloseButton} onClick={handleClose}>
                        {t('schema.gallery.close')}
                    </Button>
                </CardHeader>
                <Divider />
                <CardBody>
                    <div className={styles.DropZone}>
                        {uploading && (
                            <div className={styles.Loading}>
                                <Spinner size={'lg'} />
                                <div className={styles.LoadingMessage}>{t('schema.gallery.uploading')}</div>
                            </div>
                        )}
                        {!uploading && (
                            <Dropzone onDrop={handleDrop}>
                                {({ getRootProps, getInputProps }) => (
                                    <div {...getRootProps()}>
                                        <input {...getInputProps()} />
                                        <div className={styles.DropZoneInner}>
                                            <CgSoftwareUpload className={styles.UploadImage} />
                                            <div className={styles.UploadMessage}>{t('schema.gallery.upload')}</div>
                                        </div>
                                    </div>
                                )}
                            </Dropzone>
                        )}
                    </div>
                    <Input
                        variant={'faded'}
                        size={'sm'}
                        className={styles.Search}
                        placeholder={t('schema.gallery.search')}
                        startContent={<CgSearch size={28} />}
                        onChange={handleSearch}
                        value={searchText}
                    ></Input>
                    <ScrollShadow className={styles.ImagesGridCard}>
                        {loadingList && (
                            <div className={styles.Loading}>
                                <Spinner size={'lg'} />
                                <div className={styles.LoadingMessage}>{t('schema.gallery.loading')}</div>
                            </div>
                        )}

                        {!loadingList && (
                            <div className={styles.ImagesGrid}>
                                {images
                                    .filter((t) => t.name.includes(searchText))
                                    .map((image, index) => {
                                        const handleSelectImage = () => {
                                            onSelectImage?.(image.url);
                                            setTimeout(() => setIsOpen(false), 100);
                                        };

                                        return (
                                            <div
                                                key={image.url}
                                                className={styles.ImageContainer}
                                                onClick={handleSelectImage}
                                            >
                                                <Card>
                                                    <Image
                                                        className={styles.Image}
                                                        alt={image.name}
                                                        src={image.url}
                                                        width={'100%'}
                                                        height={'100%'}
                                                        isBlurred={true}
                                                        isZoomed={true}
                                                    />
                                                    <CardFooter>
                                                        <ScrollShadow hideScrollBar={true} className={styles.ImageName}>
                                                            {image.name}
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
});
ImageGallery.displayName = 'ImageGallery';

export default ImageGallery;
