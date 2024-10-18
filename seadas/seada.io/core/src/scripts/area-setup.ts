import appEnvConfig from '@seada.io/core/service/app-env/app-env-config';
import areaSetup from '@seada.io/core/setup/area-setup';

(async () => {
    appEnvConfig();
    await areaSetup();
    console.log('Done.');
})();
