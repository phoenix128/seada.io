import * as dotenv from 'dotenv';
import getEnvPath from '@seada.io/core/libs/get-env-path';
import createNewAssistant from '@seada.io/builder-copilot/service/assistant/create-new-assistant';

dotenv.config();
dotenv.config({ path: '.env.local' });

const openAiAssistantId = getEnvPath<string>('openaiAssistantId');

if (openAiAssistantId) {
    console.log(
        `An assistant with ID ${openAiAssistantId} was configured. Run copilot-update to update the assistant or remove the OPENAI_ASSISTANT_ID env key to generate a new one.`
    );
    process.exit(0);
}

const assistant = await createNewAssistant();
console.log('New assistant created, please update your .env.local file with the new assistant id:\n');
console.log(`OPENAI_ASSISTANT_ID=${assistant.id}\n`);
