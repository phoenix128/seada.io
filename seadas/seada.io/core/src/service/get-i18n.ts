import { Resource } from 'i18next/typescript/options';
import { ITranslationResourceProvider } from '@seada.io/core/interface';
import _ from 'lodash';

/**
 * Get translations (to be injected)
 * @param resourceProviders
 */
const getI18n = (resourceProviders?: ITranslationResourceProvider[]): Resource => {
    // TODO: Some cache here?
    return (
        resourceProviders?.reduce<Resource>((acc, provider) => {
            return _.merge(acc, provider());
        }, {}) || {}
    );
};

export default getI18n;
