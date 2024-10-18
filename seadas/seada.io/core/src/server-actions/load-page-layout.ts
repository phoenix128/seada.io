'use server';

import { ESeadaObjectType, IPageLayoutDefinition } from '@seada.io/core/spi/seada-pages/interface';
import getSeadaFile from '@seada.io/core/spi/seada-pages/get-seada-file';

const loadPageLayout = async (areaCode: string, fileName: string): Promise<IPageLayoutDefinition> => {
    const res = await getSeadaFile<IPageLayoutDefinition>(areaCode, ESeadaObjectType.LAYOUTS, fileName);

    res.areaCode = areaCode;
    res.templateName = fileName;

    return res;
};

export default loadPageLayout;
