import { FunctionTool } from 'openai/resources/beta/assistants';

const getComponentsList = (): FunctionTool => {
    return {
        type: 'function',
        function: {
            name: 'get_components_list',
            description: 'Return the list of available components.',
        },
    };
};

export default getComponentsList;
