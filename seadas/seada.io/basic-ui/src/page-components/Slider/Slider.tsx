'use client';

import React, { Children, PropsWithChildren, useMemo } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Box from '@seada.io/basic-ui/page-components/Box';
import { ISliderSchema } from '@seada.io/basic-ui/page-components/Slider/schema';
import useTwResponsiveValue from '@seada.io/core/hooks/tw/use-tw-responsive-value';
import { IPageComponentSchemaProps } from '@seada.io/core-schema/spi/components/interface';

const Slider: React.FC<PropsWithChildren<IPageComponentSchemaProps<ISliderSchema>>> = (props) => {
    const {
        children,
        slidesPerView: responsiveSlidesPerView,
        autoplay,
        spaceBetween: responsiveSpaceBetween,
        navigation,
        pagination,
        centeredSlides,
    } = props;

    const modules = useMemo(() => {
        const result = [];
        if (navigation) {
            result.push(Navigation);
        }
        if (pagination) {
            result.push(Pagination);
        }
        if (autoplay) {
            result.push(Autoplay);
        }

        return result;
    }, [autoplay, navigation, pagination]);

    const autoplayOptions = autoplay
        ? {
              delay: props.autoplayDelay,
              pauseOnMouseEnter: props.pauseOnMouseEnter,
          }
        : {};

    const slidesPerView = useTwResponsiveValue<number>(responsiveSlidesPerView);
    const spaceBetween = useTwResponsiveValue<number>(responsiveSpaceBetween);

    return (
        <Box {...props}>
            <Swiper
                ref={props.domRef}
                navigation={!!navigation}
                pagination={!!pagination}
                modules={modules}
                spaceBetween={spaceBetween}
                slidesPerView={slidesPerView}
                autoplay={autoplayOptions}
                centeredSlides={centeredSlides}
            >
                {Children.map(children, (child, idx) => {
                    return <SwiperSlide key={idx}>{child}</SwiperSlide>;
                })}
            </Swiper>
        </Box>
    );
};

export default Slider;
