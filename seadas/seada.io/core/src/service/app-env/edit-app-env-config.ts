import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'node:fs';
import * as envfile from 'envfile';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envFile = path.join(__dirname, '..', '..', '..', '..', '..', '..', 'apps', 'web', '.env');

const editAppEnvConfig = (config: Record<string, string>) => {
    const envFileContent = fs.readFileSync(envFile, 'utf8');
    const parsedEnv = envfile.parse(envFileContent);

    const newEnv = { ...parsedEnv, ...config };

    fs.writeFileSync(envFile, envfile.stringify(newEnv));
};

export default editAppEnvConfig;
