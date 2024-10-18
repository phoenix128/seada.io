import deepmerge from 'deepmerge';

export default function(tailwindConfig, moduleConfig) {
    const sourcePath = moduleConfig.sourcePath.replaceAll('\\', '/');

    return deepmerge(tailwindConfig, {
        content: [
            `../../${sourcePath}/page-components/Box/Box.module.css`,
        ],
    });
}
