import fs from 'node:fs';
import yaml from 'js-yaml';

const readYmlFile = (filePath: string): any => {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    return yaml.load(fileContent);
};

export default readYmlFile;
