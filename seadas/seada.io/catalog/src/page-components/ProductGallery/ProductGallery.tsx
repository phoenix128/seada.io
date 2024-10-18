'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import React, { useCallback, useState } from 'react';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import styles from '@seada.io/catalog/page-components/ProductGallery/ProductGallery.styles';
import Box from '@seada.io/basic-ui/page-components/Box';
import Image from 'next/image';
import { IProductGallerySchema } from '@seada.io/catalog/page-components/ProductGallery/schema';
import { twMerge } from 'tailwind-merge';
import useProduct from '@seada.io/catalog/hooks/use-product';
import { IPageComponentSchemaProps } from '@seada.io/core-schema/spi/components/interface';

const ProductGallery: React.FC<IPageComponentSchemaProps<IProductGallerySchema>> = (props) => {
    const { slidesPerView = 4 } = props;
    const { imagesGallery } = useProduct();
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [activeSlide, setActiveSlide] = useState(0);

    const handleChange = useCallback((swiper) => {
        setActiveSlide(swiper.activeIndex);
    }, []);

    return (
        <Box {...props}>
            <Swiper
                className={styles.MainSlider}
                onSlideChange={handleChange}
                spaceBetween={10}
                navigation={true}
                centeredSlides={true}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[FreeMode, Navigation, Thumbs]}
            >
                {imagesGallery.map((image, idx) => {
                    return (
                        <SwiperSlide key={idx}>
                            <Image
                                className={styles.MainImage}
                                alt={image.title}
                                src={image.url}
                                width={800}
                                height={800}
                            />
                        </SwiperSlide>
                    );
                })}
            </Swiper>
            <Swiper
                className={styles.ThumbsSlider}
                onSwiper={setThumbsSwiper}
                spaceBetween={10}
                slidesPerView={slidesPerView}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
            >
                {imagesGallery.map((image, idx) => {
                    const thumbClasses = twMerge(styles.Thumb, activeSlide === idx && styles.ThumbActive);

                    return (
                        <SwiperSlide key={idx}>
                            <Image
                                className={thumbClasses}
                                alt={image.title}
                                src={image.url}
                                width={250}
                                height={250}
                            />
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </Box>
    );
};

export default ProductGallery;
