import getAssistant from '@seada.io/builder-copilot/service/assistant/get-assistant';
import getAssistantConfig from '@seada.io/builder-copilot/service/assistant/get-assistant-config';
import getOpenAi from '@seada.io/builder-copilot/service/assistant/get-open-ai';

/**
 * Update an existing assistant
 */
const updateAssistant = async (assistantId: string) => {
    const assistantConfig = await getAssistantConfig();
    const assistant = await getAssistant(assistantId);

    const openai = getOpenAi();
    await openai.beta.assistants.update(assistantId, assistantConfig);

    return assistant;
};

export default updateAssistant;
