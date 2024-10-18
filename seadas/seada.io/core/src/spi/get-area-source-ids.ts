import getEnvPath from '@seada.io/core/libs/get-env-path';

const getAreaSourceIds = (areaCode: string) => {
    return getEnvPath<Record<string, string>>(`area.${areaCode}.sources`, {});
};

export default getAreaSourceIds;
