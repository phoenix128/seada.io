import React from 'react';
import { IPageDataProviderResult } from '@seada.io/content/ports/content/data-providers/page';
import { IPageImageSchema } from '@seada.io/content/page-components/PageImage/schema';
import SeadaImage from '@seada.io/basic-ui/page-components/Image';
import { IImageSchema } from '@seada.io/basic-ui/page-components/Image/schema';
import usePage from '@seada.io/content/hooks/use-page';
import {
    IPageComponentSchemaProps,
    IPageComponentSchemaPropsWithDataProvider,
} from '@seada.io/core-schema/spi/components/interface';

const PageImage: React.FC<IPageComponentSchemaPropsWithDataProvider<IPageImageSchema, IPageDataProviderResult>> = (
    props
) => {
    const page = usePage();
    const { mainImage } = page || {};

    if (!mainImage) return null;

    const imageProps: IPageComponentSchemaProps<IImageSchema> = {
        ...(props as IPageComponentSchemaProps<IImageSchema>),
        title: page.title,
        imageUrl: mainImage,
    };

    return <SeadaImage {...imageProps} />;
};

export default PageImage;
