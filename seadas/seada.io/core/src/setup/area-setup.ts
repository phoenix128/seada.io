import getEnvPath, { clearCache } from '@seada.io/core/libs/get-env-path';
import inquirer from 'inquirer';
import getPortClasses from '@seada.io/core/service/get-port-classes';
import getSourceIds from '@seada.io/core/spi/get-source-ids';
import toUpperSnakeCase from '@seada.io/core/libs/to-upper-snake-case';
import dumpConfig from '@seada.io/core/setup/dump-config';

const validateNewAreaCode = (value: string) => {
    if (!value) {
        return 'Please enter an area code.';
    }

    if (getEnvPath(`area.${value}`)) {
        return 'Area code already exists.';
    }

    if (!value.match(/^[a-z0-9_-]+$/)) {
        return 'Area code must contain only lowercase letters, numbers, hyphens, and underscores.';
    }

    if (value[0] === '_') {
        return 'Area code cannot start with an underscore.';
    }

    return true;
};

const editArea = async (areaCode: string) => {
    let res = {};

    console.log('Editing area:', areaCode);
    while (true) {
        const areaLocale = getEnvPath<string>(`area.${areaCode}.locale`) || 'not set';
        const areaBasePath = getEnvPath<string>(`area.${areaCode}.basePath`) || 'not set';

        const areaQuestions: any[] = [
            {
                type: 'list',
                name: 'areaOp',
                message: 'What would you like to do?',
                choices: [
                    { name: 'Edit sources', value: 'editSources' },
                    { name: `Change locale (${areaLocale})`, value: 'changeLocale' },
                    { name: `Change base path (${areaBasePath})`, value: 'basePath' },
                    { name: 'Done', value: '_done' },
                ],
            },
        ];

        const areaRes = await inquirer.prompt(areaQuestions);
        if (areaRes['areaOp'] === '_done') {
            break;
        } else if (areaRes['areaOp'] === 'editSources') {
            res = {
                ...res,
                ...(await editAreaSources(areaCode)),
            };
        } else if (areaRes['areaOp'] === 'changeLocale') {
            const localeQuestions: any[] = [
                {
                    type: 'input',
                    name: 'locale',
                    message: 'Enter the new locale:',
                    default: areaLocale,
                },
            ];

            const localeRes = await inquirer.prompt(localeQuestions);
            res[`AREA__${toUpperSnakeCase(areaCode)}__LOCALE`] = localeRes['locale'];
            process.env[`AREA__${toUpperSnakeCase(areaCode)}__LOCALE`] = localeRes['locale'];
        } else if (areaRes['areaOp'] === 'basePath') {
            const basePathQuestions: any[] = [
                {
                    type: 'input',
                    name: 'basePath',
                    message: 'Enter the new base path:',
                    default: areaBasePath,
                },
            ];

            const basePathRes = await inquirer.prompt(basePathQuestions);
            res[`AREA__${toUpperSnakeCase(areaCode)}__BASE_PATH`] = basePathRes['basePath'];
            process.env[`AREA__${toUpperSnakeCase(areaCode)}__BASE_PATH`] = basePathRes['basePath'];
        }

        clearCache();
    }

    return res;
};

const editAreaSources = async (areaCode: string) => {
    const res = {};

    while (true) {
        const portClasses = getPortClasses();

        const portClassesOptions: any[] = portClasses.map((portClass) => {
            const sourceId = getEnvPath<string>(`area.${areaCode}.sources.${portClass}`) || 'not set';
            const adapter = getEnvPath<string>(`source.${sourceId}.adapter`);
            return {
                name: `${portClass.toUpperCase().padEnd(12)}: ${sourceId.padEnd(16)} (${adapter})`,
                value: portClass,
            };
        }, {});
        portClassesOptions.push({ name: 'Done', value: '_done' });

        const portClassesQuestions: any[] = [
            {
                type: 'list',
                name: 'portClass',
                message: 'Assign sources to contexts:',
                choices: portClassesOptions,
            },
        ];

        const portClassesRes = await inquirer.prompt(portClassesQuestions);
        if (portClassesRes['portClass'] === '_done') {
            break;
        }

        const sourceIds = getSourceIds().reduce((acc, sourceId) => {
            const adapter = getEnvPath(`source.${sourceId}.adapter`);

            acc.push({ name: `${sourceId.padEnd(16)} (${adapter})`, value: sourceId });
            return acc;
        }, []);
        sourceIds.push({ name: 'Unassign', value: '_' });

        const sourceIdQuestions: any[] = [
            {
                type: 'list',
                name: 'sourceId',
                message: `Select a source for context ${portClassesRes['portClass'].toUpperCase()}:`,
                choices: sourceIds,
                default: getEnvPath(`area.${areaCode}.sources.${portClassesRes['portClass']}`) || '_',
            },
        ];

        const sourceIdRes = await inquirer.prompt(sourceIdQuestions);
        const upperSourceAreaCode = toUpperSnakeCase(areaCode);
        const upperSourcePortClass = toUpperSnakeCase(portClassesRes['portClass']);

        if (sourceIdRes['sourceId'] === '_') {
            res[`AREA__${upperSourceAreaCode}__SOURCES__${upperSourcePortClass}`] = '';
            process.env[`AREA__${upperSourceAreaCode}__SOURCES__${upperSourcePortClass}`] = '';
        } else {
            res[`AREA__${upperSourceAreaCode}__SOURCES__${upperSourcePortClass}`] = sourceIdRes['sourceId'];
            process.env[`AREA__${upperSourceAreaCode}__SOURCES__${upperSourcePortClass}`] = sourceIdRes['sourceId'];
        }
        clearCache();
    }

    return res;
};

const areaSetup = async () => {
    let res = {};

    while (true) {
        const areaCodes = Object.keys(getEnvPath('area'));
        const areaCodesOptions = areaCodes.reduce((acc, areaCode) => {
            acc.push({ name: `Edit area: ${areaCode}`, value: areaCode });
            return acc;
        }, []);
        areaCodesOptions.push({ name: 'Create new area', value: '_new' });
        areaCodesOptions.push({ name: 'Done', value: '_done' });

        const mainOpQuestions: any[] = [
            {
                type: 'list',
                name: 'areaCode',
                message: 'Select an area code or create a new one:',
                choices: areaCodesOptions,
            },
        ];

        const mainOpRes = await inquirer.prompt(mainOpQuestions);

        if (mainOpRes['areaCode'] === '_done') {
            break;
        } else if (mainOpRes['areaCode'] === '_new') {
            console.log('Creating new area...');
            const newSourceQuestions: any[] = [
                {
                    type: 'input',
                    name: 'areaCode',
                    message: 'What is the new area code?',
                    validate: validateNewAreaCode,
                },
            ];

            const newSourceRes = await inquirer.prompt(newSourceQuestions);
            res = {
                ...res,
                ...(await editArea(newSourceRes['areaCode'])),
            };
        } else {
            res = {
                ...res,
                ...(await editArea(mainOpRes['areaCode'])),
            };
        }
    }

    await dumpConfig(res);
};

export default areaSetup;
