import getEnvPath from '@seada.io/core/libs/get-env-path';

const getSourceIds = () => {
    return Object.keys(getEnvPath('source', {}));
};

export default getSourceIds;
