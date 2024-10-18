import { Resource } from 'i18next/typescript/options';
import { ITranslationResourceProvider } from '@seada.io/core/interface';

const getI18n: ITranslationResourceProvider = (): Resource => {
    return {
        en: {
            translation: {
                schema: {
                    general: {
                        groupTitle: 'General',
                    },
                },
            },
        },
    };
};

export default getI18n;
