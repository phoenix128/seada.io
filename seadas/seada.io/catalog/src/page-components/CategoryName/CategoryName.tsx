import React from 'react';
import Text from '@seada.io/basic-ui/page-components/Text';
import { ITextSchema } from '@seada.io/basic-ui/page-components/Text/schema';
import { ICategoryNameSchema } from '@seada.io/catalog/page-components/CategoryName/schema';
import { ICategoryDataProviderResult } from '@seada.io/catalog/ports/catalog/data-providers/category';
import useCategory from '@seada.io/catalog/hooks/use-category';
import {
    IPageComponentSchemaProps,
    IPageComponentSchemaPropsWithDataProvider,
} from '@seada.io/core-schema/spi/components/interface';

const CategoryName: React.FC<
    IPageComponentSchemaPropsWithDataProvider<ICategoryNameSchema, ICategoryDataProviderResult>
> = (props) => {
    const category = useCategory();

    const textProps: IPageComponentSchemaProps<ITextSchema> = {
        ...props,
        hasHtml: false,
        text: category?.name,
    };

    return <Text {...textProps} />;
};

export default CategoryName;
