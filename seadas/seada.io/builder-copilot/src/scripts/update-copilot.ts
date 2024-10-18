import * as dotenv from 'dotenv';
import getEnvPath from '@seada.io/core/libs/get-env-path';
import updateAssistant from '@seada.io/builder-copilot/service/assistant/update-assistant';

dotenv.config();
dotenv.config({ path: '.env.local' });

const openAiAssistantId = getEnvPath<string>('openaiAssistantId');

if (!openAiAssistantId) {
    console.log(`No assistant id is defined in .env.local file. Please run copilot-build and update .env.local.`);
    process.exit(0);
}

await updateAssistant(openAiAssistantId);
console.log('Assistant updated');
