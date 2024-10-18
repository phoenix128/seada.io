import addBefore from '@seada.io/core/spi/seada-pages/manipulation/components/add-before';
import { IPageComponentDefinition } from '@seada.io/core/spi/seada-pages/interface';
import {
    EPageComponentManipulationType,
    IPageComponentManipulationAction,
} from '@seada.io/core/spi/seada-pages/manipulation/components/interface';

describe('addBefore', () => {
    it('should add a component before the specified reference component at the root level', () => {
        const components: IPageComponentDefinition[] = [
            { id: '1', label: 'Component 1', type: 'type1', props: {} },
            { id: '2', label: 'Component 2', type: 'type2', props: {} },
        ];

        const action: IPageComponentManipulationAction = {
            action: EPageComponentManipulationType.ADD_BEFORE,
            componentId: '',
            refComponentId: '2',
            component: { id: '3', label: 'Component 3', type: 'type3', props: {} },
        };

        const result = addBefore(components, action);

        expect(result).toEqual([
            { id: '1', label: 'Component 1', type: 'type1', props: {} },
            { id: '3', label: 'Component 3', type: 'type3', props: {} },
            { id: '2', label: 'Component 2', type: 'type2', props: {} },
        ]);
    });

    it('should add a component before the specified reference component in nested components', () => {
        const components: IPageComponentDefinition[] = [
            {
                id: '1',
                label: 'Component 1',
                type: 'type1',
                props: {},
                children: [
                    { id: '2', label: 'Component 2', type: 'type2', props: {} },
                    { id: '4', label: 'Component 4', type: 'type4', props: {} },
                ],
            },
        ];

        const action: IPageComponentManipulationAction = {
            action: EPageComponentManipulationType.ADD_BEFORE,
            componentId: '',
            refComponentId: '4',
            component: { id: '3', label: 'Component 3', type: 'type3', props: {} },
        };

        const result = addBefore(components, action);

        expect(result).toEqual([
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
        ]);
    });

    it('should add a component at the beginning if refComponentId is not found', () => {
        const components: IPageComponentDefinition[] = [
            { id: '1', label: 'Component 1', type: 'type1', props: {} },
            { id: '2', label: 'Component 2', type: 'type2', props: {} },
        ];

        const action: IPageComponentManipulationAction = {
            action: EPageComponentManipulationType.ADD_BEFORE,
            componentId: '',
            refComponentId: '3',
            component: { id: '3', label: 'Component 3', type: 'type3', props: {} },
        };

        const result = addBefore(components, action);

        expect(result).toEqual([
            { id: '3', label: 'Component 3', type: 'type3', props: {} },
            { id: '1', label: 'Component 1', type: 'type1', props: {} },
            { id: '2', label: 'Component 2', type: 'type2', props: {} },
        ]);
    });

    it('should add a component at the beginning if no refComponentId is provided', () => {
        const components: IPageComponentDefinition[] = [
            { id: '1', label: 'Component 1', type: 'type1', props: {} },
            { id: '2', label: 'Component 2', type: 'type2', props: {} },
        ];

        const action: IPageComponentManipulationAction = {
            action: EPageComponentManipulationType.ADD_BEFORE,
            componentId: '',
            refComponentId: undefined,
            component: { id: '3', label: 'Component 3', type: 'type3', props: {} },
        };

        const result = addBefore(components, action);

        expect(result).toEqual([
            { id: '3', label: 'Component 3', type: 'type3', props: {} },
            { id: '1', label: 'Component 1', type: 'type1', props: {} },
            { id: '2', label: 'Component 2', type: 'type2', props: {} },
        ]);
    });
});
