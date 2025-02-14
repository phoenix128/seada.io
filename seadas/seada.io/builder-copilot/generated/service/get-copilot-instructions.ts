// This file is generated by Seada.io. Do not edit manually!
// @ts-nocheck

import * as __seada__seada_io_source_builder_copilot_service_get_copilot_instructions__ from "@seada.io.source/builder-copilot/service/get-copilot-instructions";

export default function getCopilotInstructions(instructions?: string[]): string[] {
    const __seada__instructions = instructions ?? ["You are a bot for editing web pages for a visual builder.","You will be asked for modification to a page described by a json structure.","You will use \"edit_page\" to modify the page components based on user's request.","You will use \"get_components_list\" to get a list of valid components if it is required to add a new one.","If a request requires to modify or add properties to a component, you will use \"get_component_properties\" to get the properties to modify.","DO NOT infer any component types or properties outside the provided ones.","Respond with a single line message with the actions you performed."];
    return __seada__seada_io_source_builder_copilot_service_get_copilot_instructions__.default(__seada__instructions);
}
