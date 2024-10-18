import { IPageComponentDefinition } from '@seada.io/core/spi/seada-pages/interface';

export enum EPageComponentManipulationType {
    ADD_BEFORE = 'add_before',
    ADD_AFTER = 'add_after',
    MOVE_BEFORE = 'move_before',
    MOVE_AFTER = 'move_after',
    UPDATE = 'update',
    REMOVE = 'remove',
    INSERT = 'insert',
}

export interface IPageComponentManipulationAction {
    action: EPageComponentManipulationType;
    componentId: string; // Il componente su cui operare
    refComponentId?: string; // Il componente di riferimento per le operazioni after/before
    component?: IPageComponentDefinition;
}
