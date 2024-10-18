'use server';

import savePageSpi from '@seada.io/builder/spi/seada-files/save-page';
import { IPageData } from '@seada.io/core/spi/components/interface';

const savePage = async (pagePath: string, page: IPageData): Promise<void> => {
    return savePageSpi(pagePath, page);
};

export default savePage;
