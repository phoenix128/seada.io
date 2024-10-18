import React, { PropsWithChildren } from 'react';
import { IPageComponentProps, IPageComponentPropsWithDataProvider } from '@seada.io/core/interface';
import MissingComponent from '@seada.io/core/components/MissingComponent';
import getPageComponents from '@seada.io/core/spi/components/get-page-components';

/**
 * Get React component by type code
 * @param type
 */
const getPageComponent = (
    type: string
): React.FC<IPageComponentPropsWithDataProvider<PropsWithChildren<IPageComponentProps>>> => {
    // | React.LazyExoticComponent<IPageComponentPropsWithDataProvider<PropsWithChildren<IPageComponentProps>>> => {
    const components = getPageComponents();

    if (components?.hasOwnProperty(type)) {
        return components[type];
    }

    return MissingComponent;
};

export default getPageComponent;
