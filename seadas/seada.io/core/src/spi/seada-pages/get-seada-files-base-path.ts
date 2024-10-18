import getEnvPath from '@seada.io/core/libs/get-env-path';

const getSeadaFilesBasePath = (areaCode: string): string => {
    return getEnvPath<string>(`area.${areaCode}.seadaFiles`, 'default');
};

export default getSeadaFilesBasePath;
