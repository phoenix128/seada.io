import getAssistant from '@seada.io/builder-copilot/service/assistant/get-assistant';
import getAssistantConfig from '@seada.io/builder-copilot/service/assistant/get-assistant-config';
import getOpenAi from '@seada.io/builder-copilot/service/assistant/get-open-ai';

/**
 * Create a new assistant
 */
const createNewAssistant = async () => {
    const assistantConfig = await getAssistantConfig();

    const openai = getOpenAi();
    const oiAssistant = await openai.beta.assistants.create(assistantConfig);

    return getAssistant(oiAssistant.id);
};

export default createNewAssistant;
