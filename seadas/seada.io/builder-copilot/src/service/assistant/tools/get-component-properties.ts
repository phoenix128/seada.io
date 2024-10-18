import { FunctionTool } from 'openai/resources/beta/assistants';

const getComponentProperties = (): FunctionTool => {
    return {
        type: 'function',
        function: {
            name: 'get_component_properties',
            description:
                'Retrieve a list of allowed component properties, values and validation schema for a specific component.',
            parameters: {
                type: 'object',
                properties: {
                    componentType: {
                        type: 'string',
                        description: 'The component type to retrieve the properties.',
                    },
                    componentId: {
                        type: 'string',
                        description: 'The component id to retrieve the properties. Leave empty for new components.',
                    },
                },
                required: ['componentType'],
            },
        },
    };
};

export default getComponentProperties;
