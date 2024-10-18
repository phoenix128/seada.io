import { AssistantTool } from 'openai/resources/beta/assistants';
import getEnvPath from '@seada.io/core/libs/get-env-path';
import getCopilotInstructions from '@seada.io/builder-copilot/service/get-copilot-instructions';
import editPage from '@seada.io/builder-copilot/service/assistant/tools/edit-page';
import getComponentProperties from '@seada.io/builder-copilot/service/assistant/tools/get-component-properties';
import getComponentsList from '@seada.io/builder-copilot/service/assistant/tools/get-components-list';

/**
 * Get OpenAI assistant config
 */
const getAssistantConfig = async () => {
    const openAiModel = getEnvPath<string>('openaiModel', 'gpt-4o');
    const assistantName = getEnvPath<string>('openaiAssistantName', 'Seada.io Copilot');
    const instructions = getCopilotInstructions().join('\n');

    return {
        name: assistantName,
        model: openAiModel,
        instructions,
        tools: [editPage(), getComponentProperties(), getComponentsList()] as Array<AssistantTool>,
        temperature: 0.05,
    };
};

export default getAssistantConfig;
