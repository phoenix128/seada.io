import { ITranslationResourceProvider } from '@seada.io/core/interface';
import { Resource } from 'i18next/typescript/options';

const getI18n: ITranslationResourceProvider = (): Resource => {
    return {
        en: {
            translation: {
                builder: {
                    copilot: 'Seada.io Copilot',
                    placeholder: 'Ask me anything',
                },
            },
        },
    };
};

export default getI18n;
