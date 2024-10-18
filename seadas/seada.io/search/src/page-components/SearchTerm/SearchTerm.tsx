import React from 'react';
import useSearchTermPort from '@seada.io/search/ports/search/hooks/use-search-term-port';
import Text from '@seada.io/basic-ui/page-components/Text';
import { ISearchTermSchema } from '@seada.io/search/page-components/SearchTerm/schema';
import { useTranslation } from 'react-i18next';
import { IPageComponentSchemaProps } from '@seada.io/core-schema/spi/components/interface';

const SearchTerm: React.FC<IPageComponentSchemaProps<ISearchTermSchema>> = (props) => {
    const searchTerm = useSearchTermPort();
    const { t } = useTranslation();

    if (!searchTerm) return null;

    return <Text {...props} hasHtml={false} text={t('search.searchTerm.label', { searchTerm })} />;
};

export default SearchTerm;
