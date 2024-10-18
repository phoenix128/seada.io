import getConfig from 'next/config';

let projectRoot: string | null = null;

/**
 * Get the project root path
 */
const getProjectRoot = (): string => {
    if (projectRoot === null) {
        const { serverRuntimeConfig } = getConfig();
        projectRoot = (serverRuntimeConfig as { PROJECT_ROOT: string }).PROJECT_ROOT;
    }

    return projectRoot;
};

export default getProjectRoot;
