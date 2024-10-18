import appEnvConfig from '@seada.io/core/service/app-env/app-env-config';
import sourceSetup from '@seada.io/core/setup/source-setup';

(async () => {
    appEnvConfig();
    await sourceSetup();
    console.log('Done.');
})();
