import isProduction from '@seada.io/core/libs/is-production';

const assertDevEnv = () => {
    if (isProduction) {
        throw new Error('This module should not be imported in production environment');
    }
};

export default assertDevEnv;
