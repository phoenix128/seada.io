import removeComponentsDynamicData from '@seada.io/core/spi/seada-pages/manipulation/remove-components-dynamic-data';

describe('removeComponentsDynamicData', () => {
    it('should remove providersData from all components and children components', () => {
        const components = [
            {
                id: 'component1',
                label: 'Component 1',
                type: 'type1',
                props: {},
                providersData: { data: 'to be removed' },
                children: [
                    {
                        id: 'childComponent1',
                        label: 'Child Component 1',
                        type: 'type2',
                        props: {},
                        providersData: { data: 'to be removed' },
                    },
                ],
            },
        ];

        // Expected output data
        const expectedComponents = [
            {
                id: 'component1',
                label: 'Component 1',
                type: 'type1',
                props: {},
                children: [
                    {
                        id: 'childComponent1',
                        label: 'Child Component 1',

                        type: 'type2',
                        props: {},
                    },
                ],
            },
        ];

        const result = removeComponentsDynamicData(components);
        expect(result).toEqual(expectedComponents);
    });

    it('should not modify the input components', () => {
        const components = [
            {
                id: 'component1',
                label: 'Component 1',
                type: 'type1',
                props: {},
                providersData: { data: 'to be removed' },

                children: [
                    {
                        id: 'childComponent1',
                        label: 'Child Component 1',
                        type: 'type2',
                        props: {},
                        providersData: { data: 'to be removed' },
                    },
                ],
            },
        ];

        const inputComponents = JSON.parse(JSON.stringify(components));
        removeComponentsDynamicData(components);
        expect(components).toEqual(inputComponents);
    });
});
