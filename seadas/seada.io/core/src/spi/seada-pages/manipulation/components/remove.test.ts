import { IPageComponentDefinition } from '@seada.io/core/spi/seada-pages/interface';
import {
    EPageComponentManipulationType,
    IPageComponentManipulationAction,
} from '@seada.io/core/spi/seada-pages/manipulation/components/interface';
import remove from '@seada.io/core/spi/seada-pages/manipulation/components/remove';

describe('deleteComponent', () => {
    it('should remove a component at the root level', () => {
        const components: IPageComponentDefinition[] = [
            { id: '1', label: 'Component 1', type: 'type1', props: {} },
            { id: '2', label: 'Component 2', type: 'type2', props: {} },
        ];

        const action: IPageComponentManipulationAction = {
            action: EPageComponentManipulationType.REMOVE,
            componentId: '1',
        };

        const result = remove(components, action);

        expect(result).toEqual([{ id: '2', label: 'Component 2', type: 'type2', props: {} }]);
    });

    it('should remove a nested component', () => {
        const components: IPageComponentDefinition[] = [
            {
                id: '1',
                label: 'Component 1',
                type: 'type1',
                props: {},
                children: [
                    { id: '2', label: 'Component 2', type: 'type2', props: {} },
                    { id: '3', label: 'Component 3', type: 'type3', props: {} },
                ],
            },
        ];

        const action: IPageComponentManipulationAction = {
            action: EPageComponentManipulationType.REMOVE,
            componentId: '2',
        };

        const result = remove(components, action);

        expect(result).toEqual([
            {
                id: '1',
                label: 'Component 1',
                type: 'type1',
                props: {},
                children: [{ id: '3', label: 'Component 3', type: 'type3', props: {} }],
            },
        ]);
    });

    it('should not remove a component if componentId is not found', () => {
        const components: IPageComponentDefinition[] = [
            { id: '1', label: 'Component 1', type: 'type1', props: {} },
            { id: '2', label: 'Component 2', type: 'type2', props: {} },
        ];

        const action: IPageComponentManipulationAction = {
            action: EPageComponentManipulationType.REMOVE,
            componentId: '3',
        };

        const result = remove(components, action);

        expect(result).toEqual([
            { id: '1', label: 'Component 1', type: 'type1', props: {} },
            { id: '2', label: 'Component 2', type: 'type2', props: {} },
        ]);
    });
});
