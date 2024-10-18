import getComponentsList from '@seada.io/builder-copilot/service/get-components-list';
import getEnvPath from '@seada.io/core/libs/get-env-path';
import getOpenAi from '@seada.io/builder-copilot/service/assistant/get-open-ai';
import getComponentTypeSchemas from '@seada.io/core-schema/spi/components/get-component-type-schemas';
import getComponentSchemas from '@seada.io/builder-copilot/service/get-component-schemas';

const getFileLikeFromString = (filename: string, content: string) => {
    const blob = new Blob([content], { type: 'application/json' });
    return new File([blob], filename, { type: 'application/json' });
};

/**
 * Update assistant files
 */
const updateAssistantFiles = async () => {
    const filesNamespace = getEnvPath<string>('openaiFilesNamespace', 'seada.io');
    if (!filesNamespace) {
        throw new Error('No OPENAI_FILES_NAMESPACE is defined in .env.local file.');
    }

    const openai = getOpenAi();
    const result = await openai.files.list({ purpose: 'assistants' });

    const componentsList = await getComponentsList();

    const componentsFilename = `index.json`;
    const componentSchemaFiles = componentsList.map((component) => component.type);
    const propertyTypes = getComponentTypeSchemas();

    const allFiles = {
        [componentsFilename]: getFileLikeFromString(componentsFilename, JSON.stringify(componentsList)),
        ...componentSchemaFiles.reduce((acc, file) => {
            const filename = `component/${file}.json`;
            acc[filename] = getFileLikeFromString(filename, JSON.stringify(getComponentSchemas(file)));
            return acc;
        }, {}),
        ...Object.entries(propertyTypes).reduce((acc, [key, value]) => {
            const filename = `prop/${key}.json`;
            acc[filename] = getFileLikeFromString(filename, JSON.stringify(value));
            return acc;
        }, {}),
    };

    const files = result.data.filter((file) => allFiles.hasOwnProperty(file.filename));

    const deleteFilesPromises = files.map((file) => openai.files.del(file.id));
    await Promise.all(deleteFilesPromises);

    const allFilesUploadPromises = Object.entries(allFiles)
        .filter(([filename, file]) => filename === 'index.json')
        .map(([filename, file]) =>
            openai.files.create({
                file,
                purpose: 'assistants',
            })
        );

    const filesCollection = await Promise.all(allFilesUploadPromises);
    return filesCollection.reduce((acc, file) => {
        acc[file.filename] = file.id;
        return acc;
    }, {});
};

export default updateAssistantFiles;
