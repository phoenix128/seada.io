import React, { useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import { IResponsiveSchemaComponentProps, ISchemaType } from '@seada.io/core-schema/spi/components/interface';
import { Button, Image } from '@nextui-org/react';
import styles from '@seada.io/core-schema/components/ImagePicker/ImagePicker.module.css';
import { useTranslation } from 'react-i18next';
import ImageGallery, { IImageGalleryRef } from '@seada.io/core-schema/components/ImageGallery/ImageGallery';
import { CgTrash } from 'react-icons/cg';

export interface IImagePickerProps extends IResponsiveSchemaComponentProps<ISchemaType<string>> {}

const ImagePicker: React.FC<IImagePickerProps> = ({ data, fieldSchema, onChange, component }) => {
    const { t } = useTranslation();
    const imageGalleryRef = useRef<IImageGalleryRef>();
    const handleClick = useCallback(() => {
        imageGalleryRef.current.open();
    }, []);

    const handleSelectImage = useCallback(
        (url: string) => {
            onChange(url);
        },
        [onChange]
    );

    const handleClear = useCallback(() => {
        onChange(null);
    }, [onChange]);

    return (
        <div className={styles.ImagePicker} onClick={handleClick}>
            <Image
                className={styles.Image}
                src={data || '/placeholder.png'}
                alt={fieldSchema.label}
                width={400}
                height={400}
                isBlurred={true}
                isZoomed={true}
            />
            <div className={styles.Buttons}>
                <Button className={styles.ChangeButton} color={'primary'} variant={'shadow'} onClick={handleClick}>
                    {t('schema.image.change')}
                </Button>
                {data && (
                    <Button
                        className={styles.ClearButton}
                        color={'danger'}
                        variant={'shadow'}
                        onClick={handleClear}
                        isIconOnly={true}
                        aria-label={t('schema.image.clear')}
                    >
                        <CgTrash size={24} className={styles.ClearIcon} title={t('schema.image.clear')} />
                    </Button>
                )}
            </div>

            {createPortal(
                <ImageGallery ref={imageGalleryRef} onSelectImage={handleSelectImage} component={component} />,
                document.body
            )}
        </div>
    );
};

export default ImagePicker;
