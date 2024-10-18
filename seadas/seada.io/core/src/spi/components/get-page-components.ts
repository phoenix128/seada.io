import { IPageComponentsCollection } from '@seada.io/core/spi/components/interface';

/**
 * Get page components collection
 * @param components
 */
const getPageComponents = (components?: IPageComponentsCollection): IPageComponentsCollection => {
    return components ?? {};
};

export default getPageComponents;
