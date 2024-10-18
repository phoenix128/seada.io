'use server';

import { ESeadaObjectType, IPageTemplateDefinition } from '@seada.io/core/spi/seada-pages/interface';
import getSeadaFile from '@seada.io/core/spi/seada-pages/get-seada-file';

const loadPageTemplate = async (
    areaCode: string,
    pageType: string,
    fileName: string
): Promise<IPageTemplateDefinition> => {
    const res = await getSeadaFile<IPageTemplateDefinition>(
        areaCode,
        ESeadaObjectType.TEMPLATES,
        `${pageType}/${fileName}`
    );

    res.areaCode = areaCode;
    res.pageType = pageType;
    res.pageVariant = fileName;

    return res;
};

export default loadPageTemplate;
