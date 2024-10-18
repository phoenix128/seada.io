import { IPageComponentDefinition } from '@seada.io/core/spi/seada-pages/interface';
import getOpenAi from '@seada.io/builder-copilot/service/assistant/get-open-ai';
import getEnvPath from '@seada.io/core/libs/get-env-path';
import { Run, Thread } from 'openai/resources/beta/threads';
import manipulateComponents from '@seada.io/core/spi/seada-pages/manipulation/components/manipulate-components';
import { IPageComponentManipulationAction } from '@seada.io/core/spi/seada-pages/manipulation/components/interface';
import { v4 as uuidv4 } from 'uuid';
import getComponentsTree from '@seada.io/builder-copilot/service/get-components-tree';
import getComponentSchemas from '@seada.io/builder-copilot/service/get-component-schemas';
import findComponent from '@seada.io/core/spi/seada-pages/manipulation/find-component';
import { IPageData } from '@seada.io/core/spi/components/interface';
import { TextContentBlock } from 'openai/resources/beta/threads/messages';
import getComponentsList from '@seada.io/builder-copilot/service/get-components-list';

export interface ICopilotEditResponse {
    message: string;
    components: IPageComponentDefinition[];
}

const handleRunStatus = async (
    run: Run,
    thread: Thread,
    components: IPageComponentDefinition[]
): Promise<ICopilotEditResponse> => {
    const openai = getOpenAi();

    if (run.status === 'completed') {
        const messages = await openai.beta.threads.messages.list(thread.id);

        return {
            message: (messages.data[0].content[0] as TextContentBlock).text.value,
            components,
        };
    } else if (run.status === 'requires_action') {
        return await handleRequiresAction(run, thread, components);
    } else {
        console.error('Run did not complete:', run);
    }
};

const handleComponentsManipulation = async (rawArgs: any, components: IPageComponentDefinition[]) => {
    const action: IPageComponentManipulationAction = {
        action: rawArgs.action,
        componentId: rawArgs.componentId,
        refComponentId: rawArgs.refComponentId,
    };

    action.component = {
        id: uuidv4(),
        label: rawArgs.label,
        type: rawArgs.componentType,
        props: rawArgs.componentProps || {},
        providersData: undefined,
    };

    try {
        components = manipulateComponents(components, action);

        return {
            components,
            output: {
                success: true,
            },
        };
    } catch (e) {
        return {
            components,
            output: {
                success: false,
                errorMessage: e.message,
            },
        };
    }
};

const handleGetComponentProperties = async (rawArgs: any, components: IPageComponentDefinition[]) => {
    const { componentType, componentId } = rawArgs;

    // const propertyTypes = getComponentTypeSchemas();
    const allowedProps = await getComponentSchemas(componentType);
    const currentProps =
        findComponent(
            {
                pageTemplate: { components },
            } as IPageData,
            componentId
        )?.props || {};

    // const validationSchemas = Object.values(allowedProps).reduce<any>((acc, prop: any) => {
    //     const { type } = prop;
    //     return {
    //         ...acc,
    //         [type]: propertyTypes[type],
    //     };
    // }, {});

    return {
        success: true,
        allowedProps,
        currentProps,
        // validationSchemas,
    };
};

const handleGetComponentsList = async () => {
    const availableComponents = await getComponentsList();
    return {
        success: true,
        components: availableComponents,
    };
};

const handleRequiresAction = async (run: Run, thread: Thread, components: IPageComponentDefinition[]) => {
    const openai = getOpenAi();
    const toolCalls = run.required_action?.submit_tool_outputs?.tool_calls || [];
    const toolOutputs = toolCalls.map(async (tool) => {
        const rawArgs = JSON.parse(tool.function.arguments);
        const fnName = tool.function.name;

        if (fnName === 'edit_page') {
            const res = await handleComponentsManipulation(rawArgs, components);
            components = res.components;
            return {
                tool_call_id: tool.id,
                output: JSON.stringify(res.output),
            };
        }

        if (fnName === 'get_components_list') {
            const res = await handleGetComponentsList();
            return {
                tool_call_id: tool.id,
                output: JSON.stringify(res),
            };
        }

        if (fnName === 'get_component_properties') {
            const res = await handleGetComponentProperties(rawArgs, components);
            return {
                tool_call_id: tool.id,
                output: JSON.stringify(res),
            };
        }

        return {
            tool_call_id: tool.id,
            output: JSON.stringify({
                success: false,
                errorMessage: `Unknown function ${fnName}`,
            }),
        };
    }) as any[];

    const submitRun = await openai.beta.threads.runs.submitToolOutputsAndPoll(
        thread.id,
        run.id,
        {
            tool_outputs: await Promise.all(toolOutputs),
        },
        {
            pollIntervalMs: 500,
        }
    );

    const res = await handleRunStatus(submitRun, thread, components);
    return {
        message: res.message,
        components,
    };
};

const copilotEdit = async (components: IPageComponentDefinition[], request: string): Promise<ICopilotEditResponse> => {
    const openai = getOpenAi();
    const thread = await openai.beta.threads.create();
    const componentsTree = JSON.stringify(getComponentsTree(components));

    await openai.beta.threads.messages.create(thread.id, {
        role: 'user',
        content: 'The current page structure is:\n' + componentsTree,
    });

    await openai.beta.threads.messages.create(thread.id, {
        role: 'user',
        content: request,
    });

    const run = await openai.beta.threads.runs.createAndPoll(
        thread.id,
        {
            assistant_id: getEnvPath<string>('openaiAssistantId'),
        },
        {
            pollIntervalMs: 500,
        }
    );

    return await handleRunStatus(run, thread, components);
};

export default copilotEdit;
