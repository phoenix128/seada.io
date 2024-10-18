import React from 'react';
import Text from '@seada.io/basic-ui/page-components/Text';
import { ITextSchema } from '@seada.io/basic-ui/page-components/Text/schema';
import { IPageContentSchema } from '@seada.io/content/page-components/PageContent/schema';
import { IPageDataProviderResult } from '@seada.io/content/ports/content/data-providers/page';
import usePage from '@seada.io/content/hooks/use-page';
import {
    IPageComponentSchemaProps,
    IPageComponentSchemaPropsWithDataProvider,
} from '@seada.io/core-schema/spi/components/interface';

const PageContent: React.FC<IPageComponentSchemaPropsWithDataProvider<IPageContentSchema, IPageDataProviderResult>> = (
    props
) => {
    const page = usePage();

    const textProps: IPageComponentSchemaProps<ITextSchema> = {
        ...props,
        hasHtml: true,
        text: page?.content,
    };

    return <Text {...textProps} />;
};

export default PageContent;
