import { IResponsiveSchemaComponentProps } from '@seada.io/core-schema/spi/components/interface';
import React from 'react';
import getSchemaComponents from '@seada.io/core-schema/spi/components/get-schema-components';

/**
 * Get schema component schema by type code
 * @param type
 */
const getSchemaComponent = (type: string): React.FC<IResponsiveSchemaComponentProps> => {
    const components = getSchemaComponents();

    if (components?.hasOwnProperty(type)) {
        return components[type];
    }

    throw new Error(`Schema component ${type} not found`);
};

export default getSchemaComponent;
