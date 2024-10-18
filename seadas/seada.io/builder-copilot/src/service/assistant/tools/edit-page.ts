import { FunctionTool } from 'openai/resources/beta/assistants';
import { EPageComponentManipulationType } from '@seada.io/core/spi/seada-pages/manipulation/components/interface';

const editPage = (): FunctionTool => {
    return {
        type: 'function',
        function: {
            name: 'edit_page',
            description:
                'Return a list of actions to be taken to modify the component list accordingly to the request action.' +
                'In case of component type modification, the previous component will be deleted and a new one will be added.',
            parameters: {
                type: 'object',
                properties: {
                    action: {
                        type: 'string',
                        enum: Object.values(EPageComponentManipulationType),
                        description:
                            'What kind of action to take for this specific component.\n' +
                            '- "update": action should be only used it user explicitly requests to change some component properties.\n' +
                            '- "insert": action should be used to add a new component inside another.\n' +
                            '- "add_after": action can be called without any reference to add it to the bottom of the list.\n' +
                            'When manipulating properties, it is mandatory to call get "get_component_properties" function and pass the "componentProps".\' +',
                    },
                    componentId: {
                        type: 'string',
                        description: 'The component id to be used for the action',
                    },
                    refComponentId: {
                        type: 'string',
                        description: 'The component id to be used as reference for the action (before or after).',
                    },
                    label: {
                        type: 'string',
                        description:
                            'The new label to be used for the component. Use only for "insert" or "add" type actions.',
                    },
                    componentType: {
                        type: 'string',
                        description:
                            'The component type to be added. Use only for "add_before" and "add_after" actions. Use the component types you can find in "index.json" file. Do not infer any other type.',
                    },
                    componentProps: {
                        type: 'object',
                        description:
                            'The new properties to be used for the component. Mandatory for "update", optional for "insert" or "add" action and only if the user explicitly requested to set some value.' +
                            'use the get_component_properties tool to retrieve the allowed properties for the component type.',
                    },
                },
                required: ['action', 'componentId', 'refComponentId'],
            },
        },
    };
};

export default editPage;
