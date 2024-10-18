import React, { PropsWithChildren } from 'react';
import Box from '@seada.io/basic-ui/page-components/Box/Box';
import styles from '@seada.io/basic-ui/page-components/Banner/Banner.styles';
import SeadaLink from '@seada.io/core/components/SeadaLink';
import { IBannerSchema } from '@seada.io/basic-ui/page-components/Banner/schema';
import { twMerge } from 'tailwind-merge';
import { IPageComponentSchemaProps } from '@seada.io/core-schema/spi/components/interface';

const Banner: React.FC<PropsWithChildren<IPageComponentSchemaProps<IBannerSchema>>> = (props) => {
    const {
        title,
        subtitle,
        buttonLabel,
        buttonLink,
        textAlign,
        verticalAlign,
        titleColor,
        subtitleColor,
        buttonColor,
    } = props;

    return (
        <Box className={twMerge(styles.Banner, textAlign, verticalAlign)} {...props}>
            <div className={twMerge(styles.Content)}>
                {title && <div className={twMerge(styles.Title, titleColor)}>{title}</div>}
                {subtitle && <div className={twMerge(styles.Subtitle, subtitleColor)}>{subtitle}</div>}
                {buttonLink && (
                    <SeadaLink className={twMerge(styles.Button, buttonColor)} path={buttonLink}>
                        {buttonLabel}
                    </SeadaLink>
                )}
            </div>
        </Box>
    );
};

export default Banner;
