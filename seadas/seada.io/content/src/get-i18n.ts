import { ITranslationResourceProvider } from '@seada.io/core/interface';
import { Resource } from 'i18next/typescript/options';

const getI18n: ITranslationResourceProvider = (): Resource => {
    return {
        en: {
            translation: {
                schema: {
                    content: {
                        pageContext: {
                            componentTitle: 'Page Context',
                            componentDescription: 'Page context',
                            source: {
                                groupTitle: 'Source',
                                pageKey: 'Page',
                            },
                        },
                        page: {
                            groupTitle: 'Page',
                        },
                        pageContent: {
                            componentTitle: 'Page Content',
                            componentDescription: 'text content form you CMS',
                        },
                        pageImage: {
                            componentTitle: 'Page featured Image',
                            componentDescription: 'Page featured image',
                        },
                    },
                },
            },
        },
    };
};

export default getI18n;
