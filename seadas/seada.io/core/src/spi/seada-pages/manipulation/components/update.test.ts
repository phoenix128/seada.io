import { IPageComponentDefinition } from '@seada.io/core/spi/seada-pages/interface';
import {
    EPageComponentManipulationType,
    IPageComponentManipulationAction,
} from '@seada.io/core/spi/seada-pages/manipulation/components/interface';
import update from '@seada.io/core/spi/seada-pages/manipulation/components/update';

describe('update', () => {
    it('should update a component at the root level', () => {
        const components: IPageComponentDefinition[] = [
            { id: '1', label: 'Component 1', type: 'type1', props: {} },
            { id: '2', label: 'Component 2', type: 'type2', props: {} },
        ];

        const updatedComponent: IPageComponentDefinition = {
            id: '1',
            label: 'Component 1',
            type: 'type1',
            props: { newProp: 'newValue' },
        };

        const action: IPageComponentManipulationAction = {
            action: EPageComponentManipulationType.UPDATE,
            componentId: '1',
            component: updatedComponent,
        };

        const result = update(components, action);

        expect(result).toEqual([
            { id: '1', label: 'Component 1', type: 'type1', props: { newProp: 'newValue' } },
            { id: '2', label: 'Component 2', type: 'type2', props: {} },
        ]);
    });

    it('should update a nested component', () => {
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

        const updatedComponent: IPageComponentDefinition = {
            id: '2',
            label: 'Component 2',
            type: 'type2',
            props: { newProp: 'newValue' },
        };

        const action: IPageComponentManipulationAction = {
            action: EPageComponentManipulationType.UPDATE,
            componentId: '2',
            component: updatedComponent,
        };

        const result = update(components, action);

        expect(result).toEqual([
            {
                id: '1',
                label: 'Component 1',
                type: 'type1',
                props: {},
                children: [
                    { id: '2', label: 'Component 2', type: 'type2', props: { newProp: 'newValue' } },
                    { id: '3', label: 'Component 3', type: 'type3', props: {} },
                ],
            },
        ]);
    });

    it('should not update a component if componentId is not found', () => {
        const components: IPageComponentDefinition[] = [
            { id: '1', label: 'Component 1', type: 'type1', props: {} },
            { id: '2', label: 'Component 2', type: 'type2', props: {} },
        ];

        const updatedComponent: IPageComponentDefinition = {
            id: '3',
            label: 'Updated Component 3',
            type: 'type3',
            props: { newProp: 'newValue' },
        };

        const action: IPageComponentManipulationAction = {
            action: EPageComponentManipulationType.UPDATE,
            componentId: '3', // Non-existent ID
            component: updatedComponent,
        };

        const result = update(components, action);

        expect(result).toEqual([
            { id: '1', label: 'Component 1', type: 'type1', props: {} },
            { id: '2', label: 'Component 2', type: 'type2', props: {} },
        ]);
    });
});
