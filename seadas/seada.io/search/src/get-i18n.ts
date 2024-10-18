import { ITranslationResourceProvider } from '@seada.io/core/interface';
import { Resource } from 'i18next/typescript/options';

const getI18n: ITranslationResourceProvider = (): Resource => {
    return {
        en: {
            translation: {
                search: {
                    searchBar: {
                        placeholder: 'Search...',
                    },
                    searchTerm: {
                        label: 'Search results for: "{{searchTerm}}"',
                    },
                },
                schema: {
                    search: {
                        groupTitle: 'Search',
                        searchBar: {
                            componentTitle: 'Search Bar',
                            componentDescription: 'Search bar',
                            search: {
                                groupTitle: 'Search',
                                maxResults: 'Max Results',
                                minChars: 'Min Chars',
                            },
                        },
                        searchTerm: {
                            componentTitle: 'Search Term',
                            componentDescription: 'Search term',
                        },
                    },
                },
            },
        },
    };
};

export default getI18n;
