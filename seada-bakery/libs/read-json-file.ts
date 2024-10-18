import fs from 'node:fs';

const readJsonFile = (filePath: string): any => {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContent);
};

export default readJsonFile;
