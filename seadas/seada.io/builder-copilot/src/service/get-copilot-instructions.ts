/**
 * Get Copilot instructions
 * @param instructions
 */
const getCopilotInstructions = (instructions?: string[]): string[] => {
    if (!instructions) {
        throw new Error('Instructions are required');
    }

    return instructions;
};

export default getCopilotInstructions;
