import { IPageComponentSchema } from '@seada.io/core-schema/spi/components/interface';
import { CgSquare } from 'react-icons/cg';
import getPageComponentsSchemaCollection from '@seada.io/core-schema/spi/components/get-page-components-schema-collection';

/**
 * Get React component schema by type code
 * @param type
 */
const getPageComponentSchema = (type: string): IPageComponentSchema => {
    const schemas = getPageComponentsSchemaCollection();

    if (schemas.hasOwnProperty(type)) {
        return schemas[type];
    }

    return {
        title: type,
        description: '',
        maxChildren: 0,
        fields: {},
        group: '',
        icon: CgSquare,
    };
};

export default getPageComponentSchema;
