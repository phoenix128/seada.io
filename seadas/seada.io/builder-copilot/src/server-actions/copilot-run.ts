'use server';

import { IPageComponentDefinition } from '@seada.io/core/spi/seada-pages/interface';
import copilotEditOrig from '@seada.io/builder-copilot/spi/copilot-edit';

const copilotEdit = async (
    components: IPageComponentDefinition[],
    request: string
): Promise<{ message: string; components: IPageComponentDefinition[] }> => copilotEditOrig(components, request);

export default copilotEdit;
