import { IPageComponentDefinition } from '@seada.io/core/spi/seada-pages/interface';
import {
    EPageComponentManipulationType,
    IPageComponentManipulationAction,
} from '@seada.io/core/spi/seada-pages/manipulation/components/interface';
import insert from '@seada.io/core/spi/seada-pages/manipulation/components/insert';

describe('insert', () => {
    it('should insert a component as a child of the specified reference component at the root level', () => {
        const components: IPageComponentDefinition[] = [
            { id: '1', label: 'Component 1', type: 'type1', props: {}, children: [] },
            { id: '2', label: 'Component 2', type: 'type2', props: {}, children: [] },
        ];

        const action: IPageComponentManipulationAction = {
            action: EPageComponentManipulationType.INSERT,
            componentId: '',
            refComponentId: '1',
            component: { id: '3', label: 'Component 3', type: 'type3', props: {} },
        };

        const result = insert(components, action);

        expect(result).toEqual([
            {
                id: '1',
                label: 'Component 1',
                type: 'type1',
                props: {},
                children: [{ id: '3', label: 'Component 3', type: 'type3', props: {} }],
            },
            { id: '2', label: 'Component 2', type: 'type2', props: {}, children: [] },
        ]);
    });

    it('should insert a component as a child of the specified reference component in nested components', () => {
        const components: IPageComponentDefinition[] = [
            {
                id: '1',
                label: 'Component 1',
                type: 'type1',
                props: {},
                children: [{ id: '2', label: 'Component 2', type: 'type2', props: {}, children: [] }],
            },
        ];

        const action: IPageComponentManipulationAction = {
            action: EPageComponentManipulationType.INSERT,
            componentId: '',
            refComponentId: '2',
            component: { id: '3', label: 'Component 3', type: 'type3', props: {} },
        };

        const result = insert(components, action);

        expect(result).toEqual([
            {
                id: '1',
                label: 'Component 1',
                type: 'type1',
                props: {},
                children: [
                    {
                        id: '2',
                        label: 'Component 2',
                        type: 'type2',
                        props: {},
                        children: [{ id: '3', label: 'Component 3', type: 'type3', props: {} }],
                    },
                ],
            },
        ]);
    });

    it('should not insert a component if refComponentId is not found', () => {
        const components: IPageComponentDefinition[] = [
            { id: '1', label: 'Component 1', type: 'type1', props: {}, children: [] },
            { id: '2', label: 'Component 2', type: 'type2', props: {}, children: [] },
        ];

        const action: IPageComponentManipulationAction = {
            action: EPageComponentManipulationType.INSERT,
            componentId: '',
            refComponentId: '3', // Non-existent ID
            component: { id: '3', label: 'Component 3', type: 'type3', props: {} },
        };

        const result = insert(components, action);

        expect(result).toEqual([
            { id: '1', label: 'Component 1', type: 'type1', props: {}, children: [] },
            { id: '2', label: 'Component 2', type: 'type2', props: {}, children: [] },
        ]);
    });

    it('should insert a component even if the reference component has no children array', () => {
        const components: IPageComponentDefinition[] = [
            { id: '1', label: 'Component 1', type: 'type1', props: {} },
            { id: '2', label: 'Component 2', type: 'type2', props: {} },
        ];

        const action: IPageComponentManipulationAction = {
            action: EPageComponentManipulationType.INSERT,
            componentId: '',
            refComponentId: '1',
            component: { id: '3', label: 'Component 3', type: 'type3', props: {} },
        };

        const result = insert(components, action);

        expect(result).toEqual([
            {
                id: '1',
                label: 'Component 1',
                type: 'type1',
                props: {},
                children: [{ id: '3', label: 'Component 3', type: 'type3', props: {} }],
            },
            { id: '2', label: 'Component 2', type: 'type2', props: {} },
        ]);
    });
});
