import React from 'react';
import { ISearchBarSchema } from '@seada.io/search/page-components/SearchBar/schema';
import { AutocompleteItem, AutocompleteSection } from '@nextui-org/react';
import { CgSearch } from 'react-icons/cg';
import { useTranslation } from 'react-i18next';
import Box from '@seada.io/basic-ui/page-components/Box';
import styles from '@seada.io/search/page-components/SearchBar/SearchBar.styles';
import useSearchBarModel from '@seada.io/search/page-components/SearchBar/SearchBar.model';
import SearchBarItem from '@seada.io/search/page-components/SearchBar/SearchBarItem';
import { IPageComponentSchemaProps } from '@seada.io/core-schema/spi/components/interface';
import SeadaAutocomplete from '@seada.io/foundation-ui/components/SeadaAutocomplete';

const SearchBar: React.FC<IPageComponentSchemaProps<ISearchBarSchema>> = (props) => {
    const { t } = useTranslation();
    const {
        data: { searchResults, loading, searchString },
        handlers: { handleSearchChange, handleGoToSearchResult, handleSelectResult },
    } = useSearchBarModel(props);

    return (
        <Box {...props}>
            <SeadaAutocomplete
                defaultFilter={() => true}
                inputValue={searchString}
                isLoading={loading}
                aria-label={t('search.searchBar.placeholder')}
                onInputChange={handleSearchChange}
                onSelectionChange={handleSelectResult}
                className={styles.SearchBar}
                selectorIcon={false}
                isClearable={false}
                menuTrigger={'input'}
                selectedKey={null}
                startContent={<CgSearch />}
                placeholder={t('search.searchBar.placeholder')}
                onKeyDown={(evt) => {
                    if (evt.key === 'Enter') {
                        handleGoToSearchResult();
                    }
                }}
            >
                {searchResults?.results.map((group, idx) => (
                    <AutocompleteSection key={idx} title={t(group.title)}>
                        {group.items.map((item) => (
                            <AutocompleteItem
                                key={item.key}
                                value={item.url}
                                textValue={item.title}
                                classNames={{ title: ['text-clip'] }}
                            >
                                <SearchBarItem item={item} key={item.id} />
                            </AutocompleteItem>
                        ))}
                    </AutocompleteSection>
                ))}
            </SeadaAutocomplete>
        </Box>
    );
};

export default SearchBar;
