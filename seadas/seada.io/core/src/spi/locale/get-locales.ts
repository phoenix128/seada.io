import getEnvPath from '@seada.io/core/libs/get-env-path';
import _ from 'lodash';

let locales = null;

/**
 * Get all available locales
 */
const getLocales = () => {
    if (locales === null) {
        const areasList = Object.keys(getEnvPath('area'));
        locales = _.uniq(areasList.map((area) => getEnvPath(`area.${area}.locale`)));
    }

    return locales;
};

export default getLocales;
