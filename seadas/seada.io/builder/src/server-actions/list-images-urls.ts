'use server';

import listImagesUrlSpi from '@seada.io/builder/spi/images/list-images-urls';
import { IImage } from '@seada.io/core-schema/ports/schema/hooks/use-list-images-urls-port';

const listImagesUrl = async (): Promise<IImage[]> => {
    return listImagesUrlSpi();
};

export default listImagesUrl;
