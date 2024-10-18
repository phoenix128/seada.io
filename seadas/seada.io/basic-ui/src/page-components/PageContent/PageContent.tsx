import React from 'react';
import usePageData from '@seada.io/core/hooks/use-page-data';
import ComponentRenderer from '@seada.io/core/components/ComponentRenderer';
import { IPageComponentDefinition } from '@seada.io/core/spi/seada-pages/interface';
import Box from '@seada.io/basic-ui/page-components/Box';
import { IPageContentSchema } from '@seada.io/basic-ui/page-components/PageContent/schema';
import { IPageComponentSchemaProps } from '@seada.io/core-schema/spi/components/interface';

const PageContent: React.FC<IPageComponentSchemaProps<IPageContentSchema>> = (props) => {
    const { pageTemplate } = usePageData();

    return (
        <Box {...props}>
            {pageTemplate.components?.map((childComponent) => (
                <ComponentRenderer key={childComponent.id} component={childComponent as IPageComponentDefinition} />
            ))}
        </Box>
    );
};

export default PageContent;
