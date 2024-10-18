import { IModulesCollection } from './interface.js';
import fs from 'node:fs';

const createVscTaskOptions = async (modules: IModulesCollection, basePath: string) => {
    const tasksFile = `${basePath}/.vscode/tasks.json`;
    const jsonTasks = JSON.parse(fs.readFileSync(tasksFile, 'utf-8'));

    jsonTasks.inputs = jsonTasks.inputs.reduce((acc, input) => {
        if (input.id === 'moduleName') {
            return [
                ...acc,
                {
                    id: 'moduleName',
                    type: 'pickString',
                    description: 'Select the seada module',
                    options: Object.keys(modules),
                },
            ];
        }

        return [...acc, input];
    }, []);

    fs.writeFileSync(tasksFile, JSON.stringify(jsonTasks, null, 4));
};

export default createVscTaskOptions;
