import React from 'react';
import NextImage from 'next/image';
import { IImageSchema } from '@seada.io/basic-ui/page-components/Image/schema';
import imageStyles from '@seada.io/basic-ui/page-components/Image/Image.styles';
import useTwBoxGeometryClasses from '@seada.io/basic-ui/hooks/tw/use-tw-box-geometry-classes';
import useTwBoxBorderClasses from '@seada.io/basic-ui/hooks/tw/use-tw-box-border-classes';
import { twMerge } from 'tailwind-merge';
import { IPageComponentSchemaProps } from '@seada.io/core-schema/spi/components/interface';

const Image: React.FC<IPageComponentSchemaProps<IImageSchema>> = (props) => {
    const { imageUrl, title, sourceWidth = 600, sourceHeight = 600 } = props;

    const geometryClasses = useTwBoxGeometryClasses(props);
    const boxBorderClasses = useTwBoxBorderClasses(props);

    return (
        <NextImage
            ref={props.domRef}
            className={twMerge(imageStyles.Image, geometryClasses, boxBorderClasses)}
            src={imageUrl}
            alt={title}
            width={sourceWidth}
            height={sourceHeight}
        />
    );
};

export default Image;
