import path from 'node:path';
import { fileURLToPath } from 'node:url';
import getModules from './get-modules.js';
import clearGeneratedPaths from './clear-generated-paths.js';

const __dirname = fileURLToPath(new URL('..', import.meta.url));
const absoluteModulesPath = path.join(__dirname, '../seadas');

const cleanBakery = async () => {
    const modules = getModules(absoluteModulesPath);

    await clearGeneratedPaths(modules);
};

export default cleanBakery;
