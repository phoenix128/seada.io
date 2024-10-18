import getSourceSetups from '@seada.io/core/service/source-setup/get-source-setups';
import inquirer from 'inquirer';
import getSourceIds from '@seada.io/core/spi/get-source-ids';
import getEnvPath from '@seada.io/core/libs/get-env-path';
import dumpConfig from '@seada.io/core/setup/dump-config';

const validateNewSourceId = (value: string) => {
    if (!value) {
        return 'Please enter a source id.';
    }

    if (getSourceIds().includes(value)) {
        return 'Source id already exists.';
    }

    if (!value.match(/^[a-z0-9_-]+$/)) {
        return 'Source id must contain only lowercase letters, numbers, hyphens, and underscores.';
    }

    if (value[0] === '_') {
        return 'Source id cannot start with an underscore.';
    }

    return true;
};

const askForRetry = async (): Promise<boolean> => {
    const retryQuestion: any[] = [
        {
            type: 'confirm',
            name: 'retry',
            message: 'Do you want to retry?',
        },
    ];

    const res = await inquirer.prompt(retryQuestion);
    return res['retry'];
};

const runSourceSetup = async (sourceId: string, adapterCode: string) => {
    const sourceSetups = getSourceSetups();
    const sourceSetup = sourceSetups[adapterCode];
    if (!sourceSetup) {
        throw new Error(`Source setup not found for adapter code "${adapterCode}".`);
    }

    while (true) {
        try {
            const envConfig = await sourceSetup(sourceId);
            await dumpConfig(envConfig);
            break;
        } catch (e) {
            console.error('Error:', e.message);
            if (!(await askForRetry())) {
                break;
            }
        }
    }
};

const sourceSetup = async () => {
    const sourceSetups = getSourceSetups();
    const sourceIds = getSourceIds().reduce((acc, sourceId) => {
        const adapter = getEnvPath(`source.${sourceId}.adapter`);

        acc.push({ name: `Edit source: ${sourceId.padEnd(16)} (${adapter})`, value: sourceId });
        return acc;
    }, []);
    sourceIds.push({ name: 'Create new source', value: '_new' });

    const mainOpQuestions: any[] = [
        {
            type: 'list',
            name: 'sourceId',
            message: 'Select a source to edit or create a new one:',
            choices: sourceIds,
        },
    ];

    const mainOpRes = await inquirer.prompt(mainOpQuestions);

    if (mainOpRes['sourceId'] === '_new') {
        console.log('Creating new source...');
        const newSourceQuestions: any[] = [
            {
                type: 'input',
                name: 'sourceId',
                message: 'What is the new source id?',
                validate: validateNewSourceId,
            },
            {
                type: 'list',
                name: 'adapterCode',
                message: 'Select the adapter code for the new source:',
                choices: Object.keys(sourceSetups),
            },
        ];

        const newSourceRes = await inquirer.prompt(newSourceQuestions);
        await runSourceSetup(newSourceRes['sourceId'], newSourceRes['adapterCode']);
    } else {
        const adapterCode = getEnvPath<string>(`source.${mainOpRes['sourceId']}.adapter`);
        await runSourceSetup(mainOpRes['sourceId'], adapterCode);
    }
};

export default sourceSetup;
