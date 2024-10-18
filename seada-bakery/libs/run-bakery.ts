import path from 'node:path';
import { fileURLToPath } from 'node:url';
import getModules from './get-modules.js';
import updateTsConfigFiles from './update-tsconfig-files.js';
import generateProxyFiles from './generate-proxy-files.js';
import generateCssRewrites from './generate-css-rewrites.js';
import getObservableFiles from './get-observable-files.js';
import clearGeneratedPaths from './clear-generated-paths.js';
import createModulesJson from './create-modules-json.js';
import updateVscTaskOptions from './create-vsc-task-options.js';

const __dirname = fileURLToPath(new URL('..', import.meta.url));

const basePath = path.join(__dirname, '../');
const absoluteModulesPath = path.join(__dirname, '../seadas');
const absoluteAppsPath = path.join(__dirname, '../apps');

const runBakery = async () => {
    const modules = getModules(absoluteModulesPath);
    const apps = getModules(absoluteAppsPath);

    const tasks: Promise<string[]>[] = [];
    tasks.push(generateProxyFiles(modules));
    tasks.push(generateCssRewrites(modules));
    await updateTsConfigFiles(modules, apps);

    const generatedFiles = (await Promise.all(tasks)).reduce((acc, val) => [...acc, ...val], []);

    await clearGeneratedPaths(modules, generatedFiles);
    await createModulesJson(modules, basePath);
    await updateVscTaskOptions(modules, basePath);

    return [...getObservableFiles({ ...modules, ...apps }), ...generatedFiles];
};

export default runBakery;
