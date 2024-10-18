import getOpenAi from '@seada.io/builder-copilot/service/assistant/get-open-ai';

let assistant = null;

/**
 * Get assistant
 */
const getAssistant = async (assistantId: string) => {
    if (!assistant) {
        const openai = getOpenAi();
        assistant = openai.beta.assistants.retrieve(assistantId);
    }

    return assistant;
};

export default getAssistant;
