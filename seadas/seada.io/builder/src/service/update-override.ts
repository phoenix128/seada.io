import getStorageAdapter from '@seada.io/builder/service/storage/get-storage-adapter';
import {
    ESeadaObjectType,
    IOverridesMapDefinition,
    IPageOverrideDefinition,
} from '@seada.io/core/spi/seada-pages/interface';
import invalidateSiteCacheKeys from '@seada.io/builder/spi/control/invalidate-site-cache-keys';
import _ from 'lodash';
import getSeadaFilesBasePath from '@seada.io/core/spi/seada-pages/get-seada-files-base-path';

/**
 * Update the override file with the new template
 * @param areaCode
 * @param path
 * @param templateName
 */
const updateOverride = async (areaCode: string, path: string, templateName: string) => {
    const adapter = getStorageAdapter('objects');
    const basePath = getSeadaFilesBasePath(areaCode);
    const override = (await adapter.readObject<IOverridesMapDefinition>(
        basePath,
        ESeadaObjectType.OVERRIDES,
        'static'
    )) || { overrides: [] };

    if (!override?.overrides) {
        override.overrides = [];
    }

    // Update or remove the override
    const newOverrides = override.overrides.reduce<IPageOverrideDefinition[]>((acc, override) => {
        if (override.path === path) {
            if (templateName !== 'default') {
                acc.push({
                    path,
                    template: templateName,
                });
            }
        } else {
            acc.push(override);
        }
        return acc;
    }, []);

    // Add the override if it doesn't exist
    if (!newOverrides.find((o) => o.path === path) && templateName !== 'default') {
        newOverrides.push({
            path,
            template: templateName,
        });
    }

    if (!_.isEqual(override.overrides, newOverrides)) {
        await invalidateSiteCacheKeys([`seada-file:${basePath}/${ESeadaObjectType.OVERRIDES}/static`]);
        override.overrides = newOverrides;

        await adapter.writeObject(basePath, ESeadaObjectType.OVERRIDES, 'static', override);
    }
};

export default updateOverride;
