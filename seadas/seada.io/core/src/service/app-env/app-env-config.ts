import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import assertDevEnv from '@seada.io/core/service/assert-dev-env';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
assertDevEnv();

/**
 * Load the app environment configuration
 * BEWARE: This function is supposed to be only used in setup scripts. It may not correctly work in production.
 */
const appEnvConfig = () => {
    console.log(
        'Loading app environment configuration from ' +
            path.join(__dirname, '..', '..', '..', '..', '..', 'apps', 'web')
    );
    dotenv.config({ path: path.join(__dirname, '..', '..', '..', '..', '..', '..', 'apps', 'web', '.env') });
};

export default appEnvConfig;
