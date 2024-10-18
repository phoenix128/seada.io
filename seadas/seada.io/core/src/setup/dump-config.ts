import inquirer from 'inquirer';
import editAppEnvConfig from '@seada.io/core/service/app-env/edit-app-env-config';

const dumpConfig = async (envConfig: any) => {
    console.log('');
    console.log('Environment config:');
    Object.entries(envConfig).forEach(([key, value]) => {
        console.log(`${key}=${value}`);
    });
    console.log();

    const dumpConfig = await inquirer.prompt([
        {
            type: 'confirm',
            name: 'dump',
            message: 'Should I update your .env file with these settings?',
            default: false,
        } as any,
    ]);

    if (dumpConfig['dump']) {
        editAppEnvConfig(envConfig);
        console.log('Environment config updated.');
    }
};

export default dumpConfig;
