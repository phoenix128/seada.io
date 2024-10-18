import { IPageComponentDefinition } from '@seada.io/core/spi/seada-pages/interface';
import getComponentsTree from '@seada.io/builder-copilot/service/get-components-tree';

describe('getComponentsTree', () => {
    it('should return the tree structure without properties for a flat component list', () => {
        const components: IPageComponentDefinition[] = [
            { id: '1', label: 'Component 1', type: 'type1', props: {} },
            { id: '2', label: 'Component 2', type: 'type2', props: {} },
        ];

        const result = getComponentsTree(components);

        expect(result).toEqual([
            { id: '1', label: 'Component 1', type: 'type1' },
            { id: '2', label: 'Component 2', type: 'type2' },
        ]);
    });

    it('should return the tree structure without properties for nested components', () => {
        const components: IPageComponentDefinition[] = [
            {
                id: '1',
                label: 'Component 1',
                type: 'type1',
                props: {},
                children: [
                    { id: '2', label: 'Component 2', type: 'type2', props: {} },
                    {
                        id: '3',
                        label: 'Component 3',
                        type: 'type3',
                        props: {},
                        children: [{ id: '4', label: 'Component 4', type: 'type4', props: {} }],
                    },
                ],
            },
        ];

        const result = getComponentsTree(components);

        expect(result).toEqual([
            {
                id: '1',
                label: 'Component 1',
                type: 'type1',
                children: [
                    { id: '2', label: 'Component 2', type: 'type2' },
                    {
                        id: '3',
                        label: 'Component 3',
                        type: 'type3',
                        children: [{ id: '4', label: 'Component 4', type: 'type4' }],
                    },
                ],
            },
        ]);
    });

    it('should return an empty array for an empty input', () => {
        const components: IPageComponentDefinition[] = [];

        const result = getComponentsTree(components);

        expect(result).toEqual([]);
    });

    it('should handle components with no children correctly', () => {
        const components: IPageComponentDefinition[] = [
            { id: '1', label: 'Component 1', type: 'type1', props: {} },
            {
                id: '2',
                label: 'Component 2',
                type: 'type2',
                props: {},
                children: [{ id: '3', label: 'Component 3', type: 'type3', props: {} }],
            },
        ];

        const result = getComponentsTree(components);

        expect(result).toEqual([
            { id: '1', label: 'Component 1', type: 'type1' },
            {
                id: '2',
                label: 'Component 2',
                type: 'type2',
                children: [{ id: '3', label: 'Component 3', type: 'type3' }],
            },
        ]);
    });
});
