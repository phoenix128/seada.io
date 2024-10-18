import { INodeTreeData } from '@seada.io/builder/components/interface';
import { useMemo } from 'react';
import { IPageComponentSchema } from '@seada.io/core-schema/spi/components/interface';
import getPageComponentSchema from '@seada.io/core-schema/spi/components/get-page-component-schema';

const useComponentSchema = (component: INodeTreeData): IPageComponentSchema =>
    useMemo(() => {
        return component?.component?.type ? getPageComponentSchema(component.component.type) : undefined;
    }, [component?.component?.type]);

export default useComponentSchema;
