import convertVariables from '@seada.io/core/spi/convert-variables';

describe('convertVariables', () => {
    const props = {
        prop1: 'value1',
        prop2: '${meta.product.name}',
        prop3: '${meta.product.price}',
        prop4: '${meta.product.other.description}',
        prop5: '${meta.product.other.deeplyNested.value}',
        prop6: '',
        prop7: 'Price: ${meta.product.price}, Name: ${meta.product.name}',
        prop8: '${meta.product.nonExistent}',
        prop9: 'Static text with no variables',
    };

    const values = {
        meta: {
            product: {
                name: 'product1',
                price: 100,
                other: {
                    description: 'Lorem Ipsum...',
                    deeplyNested: {
                        value: 'Nested Value',
                    },
                },
            },
        },
    };

    it('should convert variables', () => {
        const res = convertVariables(props, values);

        expect(res.prop1).toEqual('value1');
        expect(res.prop2).toEqual('product1');
        expect(res.prop3).toEqual('100');
        expect(res.prop4).toEqual('Lorem Ipsum...');
        expect(res.prop5).toEqual('Nested Value');
        expect(res.prop6).toEqual('');
        expect(res.prop7).toEqual('Price: 100, Name: product1');
        expect(res.prop8).toEqual('');
        expect(res.prop9).toEqual('Static text with no variables');
    });

    it('should handle missing values gracefully', () => {
        const res = convertVariables(props, {});

        expect(res.prop1).toEqual('value1');
        expect(res.prop2).toEqual('');
        expect(res.prop3).toEqual('');
        expect(res.prop4).toEqual('');
        expect(res.prop5).toEqual('');
        expect(res.prop6).toEqual('');
        expect(res.prop7).toEqual('Price: , Name: ');
        expect(res.prop8).toEqual('');
        expect(res.prop9).toEqual('Static text with no variables');
    });

    it('should handle null and undefined props', () => {
        const nullProps = {
            prop1: null,
            prop2: undefined,
            prop3: '${meta.product.name}',
        };

        const res = convertVariables(nullProps, values);

        expect(res.prop1).toBeNull();
        expect(res.prop2).toBeUndefined();
        expect(res.prop3).toEqual('product1');
    });

    it('should handle nested structures in props', () => {
        const nestedProps = {
            prop1: {
                subProp1: '${meta.product.name}',
                subProp2: 'staticValue',
            },
            prop2: ['${meta.product.price}', 'staticValue'],
            prop3: '${meta.product.other.deeplyNested.value}',
        };

        const res = convertVariables(nestedProps, values);

        expect(res.prop1.subProp1).toEqual('product1');
        expect(res.prop1.subProp2).toEqual('staticValue');
        expect(res.prop2[0]).toEqual('100');
        expect(res.prop2[1]).toEqual('staticValue');
        expect(res.prop3).toEqual('Nested Value');
    });
});
