import OpenAI from 'openai';

let openAi = null;

/**
 * Get OpenAI instance
 */
const getOpenAi = (): OpenAI => {
    if (!openAi) {
        openAi = new OpenAI();
    }

    return openAi;
};

export default getOpenAi;
