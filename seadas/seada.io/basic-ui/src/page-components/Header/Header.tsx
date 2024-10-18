import { IHeaderSchema } from '@seada.io/basic-ui/page-components/Header/schema';
import Text from '@seada.io/basic-ui/page-components/Text';
import React from 'react';
import { ITextSchema } from '@seada.io/basic-ui/page-components/Text/schema';
import usePageData from '@seada.io/core/hooks/use-page-data';
import { IPageComponentSchemaProps } from '@seada.io/core-schema/spi/components/interface';

const Header: React.FC<IPageComponentSchemaProps<IHeaderSchema>> = (props) => {
    const { variables } = usePageData();

    const textProps: IPageComponentSchemaProps<ITextSchema> = {
        ...props,
        hasHtml: false,
        text: variables.title,
    };

    return <Text {...textProps} />;
};

export default Header;
