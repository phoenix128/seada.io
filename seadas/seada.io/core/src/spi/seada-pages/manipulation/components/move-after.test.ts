import { IPageComponentDefinition } from '@seada.io/core/spi/seada-pages/interface';
import {
    EPageComponentManipulationType,
    IPageComponentManipulationAction,
} from '@seada.io/core/spi/seada-pages/manipulation/components/interface';
import moveAfter from '@seada.io/core/spi/seada-pages/manipulation/components/move-after';

describe('moveAfter', () => {
    it('should move a component after the specified reference component at the root level', () => {
        const components: IPageComponentDefinition[] = [
            { id: '0', label: 'Component 0', type: 'type0', props: {} },
            { id: '1', label: 'Component 1', type: 'type1', props: {} },
            { id: '2', label: 'Component 2', type: 'type2', props: {} },
            { id: '3', label: 'Component 3', type: 'type3', props: {} },
            { id: '4', label: 'Component 4', type: 'type4', props: {} },
        ];

        const action: IPageComponentManipulationAction = {
            action: EPageComponentManipulationType.MOVE_AFTER,
            componentId: '1',
            refComponentId: '3',
        };

        const result = moveAfter(components, action);

        expect(result).toEqual([
            { id: '0', label: 'Component 0', type: 'type0', props: {} },
            { id: '2', label: 'Component 2', type: 'type2', props: {} },
            { id: '3', label: 'Component 3', type: 'type3', props: {} },
            { id: '1', label: 'Component 1', type: 'type1', props: {} },
            { id: '4', label: 'Component 4', type: 'type4', props: {} },
        ]);
    });

    it('should move a component after the specified reference component in nested components', () => {
        const components: IPageComponentDefinition[] = [
            {
                id: '1',
                label: 'Component 1',
                type: 'type1',
                props: {},
                children: [
                    { id: '2', label: 'Component 2', type: 'type2', props: {} },
                    { id: '3', label: 'Component 3', type: 'type3', props: {} },
                    { id: '4', label: 'Component 4', type: 'type4', props: {} },
                ],
            },
        ];

        const action: IPageComponentManipulationAction = {
            action: EPageComponentManipulationType.MOVE_AFTER,
            componentId: '2',
            refComponentId: '3',
        };

        const result = moveAfter(components, action);

        expect(result).toEqual([
            {
                id: '1',
                label: 'Component 1',
                type: 'type1',
                props: {},
                children: [
                    { id: '3', label: 'Component 3', type: 'type3', props: {} },
                    { id: '2', label: 'Component 2', type: 'type2', props: {} },
                    { id: '4', label: 'Component 4', type: 'type4', props: {} },
                ],
            },
        ]);
    });

    it('should not move a component if refComponentId is not found', () => {
        const components: IPageComponentDefinition[] = [
            { id: '1', label: 'Component 1', type: 'type1', props: {} },
            { id: '2', label: 'Component 2', type: 'type2', props: {} },
            { id: '3', label: 'Component 3', type: 'type3', props: {} },
        ];

        const action: IPageComponentManipulationAction = {
            action: EPageComponentManipulationType.MOVE_AFTER,
            componentId: '3',
            refComponentId: '4', // Non-existent ID
        };

        const result = moveAfter(components, action);

        expect(result).toEqual([
            { id: '1', label: 'Component 1', type: 'type1', props: {} },
            { id: '2', label: 'Component 2', type: 'type2', props: {} },
            { id: '3', label: 'Component 3', type: 'type3', props: {} },
        ]);
    });

    it('should not move a component if componentId is not found', () => {
        const components: IPageComponentDefinition[] = [
            { id: '1', label: 'Component 1', type: 'type1', props: {} },
            { id: '2', label: 'Component 2', type: 'type2', props: {} },
            { id: '3', label: 'Component 3', type: 'type3', props: {} },
        ];

        const action: IPageComponentManipulationAction = {
            action: EPageComponentManipulationType.MOVE_AFTER,
            componentId: '4', // Non-existent ID
            refComponentId: '2',
        };

        const result = moveAfter(components, action);

        expect(result).toEqual([
            { id: '1', label: 'Component 1', type: 'type1', props: {} },
            { id: '2', label: 'Component 2', type: 'type2', props: {} },
            { id: '3', label: 'Component 3', type: 'type3', props: {} },
        ]);
    });
});
