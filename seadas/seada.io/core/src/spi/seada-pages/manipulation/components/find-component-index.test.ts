import { IPageComponentDefinition } from '@seada.io/core/spi/seada-pages/interface';
import findComponentIndex from '@seada.io/core/spi/seada-pages/manipulation/components/find-component-index';

describe('findComponentIndex', () => {
    it('should find the component data at the root level', () => {
        const components: IPageComponentDefinition[] = [
            { id: '1', label: 'Component 1', type: 'type1', props: {} },
            { id: '2', label: 'Component 2', type: 'type2', props: {} },
        ];

        const result = findComponentIndex(components, '2');

        expect(result).toEqual({ index: 1, parent: null });
    });

    it('should find the component data in nested components', () => {
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

        const result = findComponentIndex(components, '3');

        expect(result).toEqual({
            index: 1,
            parent: {
                id: '1',
                label: 'Component 1',
                type: 'type1',
                props: {},
                children: [
                    { id: '2', label: 'Component 2', type: 'type2', props: {} },
                    { id: '3', label: 'Component 3', type: 'type3', props: {} },
                ],
            },
        });
    });

    it('should return null if the component data is not found', () => {
        const components: IPageComponentDefinition[] = [
            { id: '1', label: 'Component 1', type: 'type1', props: {} },
            { id: '2', label: 'Component 2', type: 'type2', props: {} },
        ];

        const result = findComponentIndex(components, '3');

        expect(result).toBeNull();
    });

    it('should find the component data in deeply nested components', () => {
        const components: IPageComponentDefinition[] = [
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
        ];

        const result = findComponentIndex(components, '3');

        expect(result).toEqual({
            index: 0,
            parent: {
                id: '2',
                label: 'Component 2',
                type: 'type2',
                props: {},
                children: [{ id: '3', label: 'Component 3', type: 'type3', props: {} }],
            },
        });
    });
});
