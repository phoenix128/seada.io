import { IPageComponentDefinition } from '@seada.io/core/spi/seada-pages/interface';
import {
    EPageComponentManipulationType,
    IPageComponentManipulationAction,
} from '@seada.io/core/spi/seada-pages/manipulation/components/interface';
import remove from '@seada.io/core/spi/seada-pages/manipulation/components/remove';
import addBefore from '@seada.io/core/spi/seada-pages/manipulation/components/add-before';
import addAfter from '@seada.io/core/spi/seada-pages/manipulation/components/add-after';
import moveBefore from '@seada.io/core/spi/seada-pages/manipulation/components/move-before';
import moveAfter from '@seada.io/core/spi/seada-pages/manipulation/components/move-after';
import insert from '@seada.io/core/spi/seada-pages/manipulation/components/insert';
import update from '@seada.io/core/spi/seada-pages/manipulation/components/update';

const manipulateComponents = (
    components: IPageComponentDefinition[],
    action: IPageComponentManipulationAction
): IPageComponentDefinition[] => {
    switch (action.action) {
        case EPageComponentManipulationType.ADD_BEFORE:
            return addBefore(components, action);
        case EPageComponentManipulationType.ADD_AFTER:
            return addAfter(components, action);
        case EPageComponentManipulationType.MOVE_BEFORE:
            return moveBefore(components, action);
        case EPageComponentManipulationType.MOVE_AFTER:
            return moveAfter(components, action);
        case EPageComponentManipulationType.INSERT:
            return insert(components, action);
        case EPageComponentManipulationType.UPDATE:
            return update(components, action);
        case EPageComponentManipulationType.REMOVE:
            return remove(components, action);
        default:
            throw new Error(`Action ${action.action} not supported`);
    }
};

export default manipulateComponents;
