import { renderHook } from '@testing-library/react';
import useAllowedVariantOptions from './use-allowed-variant-options';
import { EProductOptionDisplayMode } from '@seada.io/catalog/interface/product-options';

describe('useAllowedVariantOptions', () => {
    it('should return allowed options based on selected options and variants matrix', () => {
        const { result } = renderHook(() =>
            useAllowedVariantOptions(
                [
                    {
                        id: 'size',
                        key: 'size',
                        label: 'Size',
                        displayMode: EProductOptionDisplayMode.DROPDOWN,
                        values: [
                            { id: 's', label: 'S', isDefault: false, value: 'S' },
                            {
                                id: 'm',
                                label: 'M',
                                isDefault: false,
                                value: 'M',
                            },
                        ],
                    },
                    {
                        id: 'color',
                        key: 'color',
                        label: 'Color',
                        displayMode: EProductOptionDisplayMode.SWATCH,
                        values: [
                            {
                                id: 'red',
                                label: 'Red',
                                isDefault: false,
                                value: 'Red',
                                colors: ['#ff0000'],
                            },
                            { id: 'blue', label: 'Blue', isDefault: false, value: 'Blue', colors: ['#0000ff'] },
                        ],
                    },
                ],
                {
                    variant1: {
                        id: 'variant1',
                        key: 'variant1',
                        sku: 'variant1',
                        options: { size: 's', color: 'red' },
                        price: { amount: 10, currency: 'USD' },
                    },
                    variant2: {
                        id: 'variant2',
                        key: 'variant2',
                        sku: 'variant2',
                        options: { size: 'm', color: 'blue' },
                        price: { amount: 20, currency: 'USD' },
                    },
                },
                { size: 's' }
            )
        );

        expect(result.current).toEqual({
            size: ['s', 'm'],
            color: ['red'],
        });
    });

    it('should return allowed options based on selected options and variants matrix with more than 2 options', () => {
        const { result } = renderHook(() =>
            useAllowedVariantOptions(
                [
                    {
                        id: 'size',
                        key: 'size',
                        label: 'Size',
                        displayMode: EProductOptionDisplayMode.DROPDOWN,
                        values: [
                            { id: 's', label: 'S', isDefault: false, value: 'S' },
                            {
                                id: 'm',
                                label: 'M',
                                isDefault: false,
                                value: 'M',
                            },
                        ],
                    },
                    {
                        id: 'color',
                        key: 'color',
                        label: 'Color',
                        displayMode: EProductOptionDisplayMode.SWATCH,
                        values: [
                            {
                                id: 'red',
                                label: 'Red',
                                isDefault: false,
                                value: 'Red',
                                colors: ['#ff0000'],
                            },
                            { id: 'blue', label: 'Blue', isDefault: false, value: 'Blue', colors: ['#0000ff'] },
                        ],
                    },
                    {
                        id: 'gender',
                        key: 'gender',
                        label: 'Gender',
                        displayMode: EProductOptionDisplayMode.DROPDOWN,
                        values: [
                            {
                                id: 'male',
                                label: 'Male',
                                isDefault: false,
                                value: 'Male',
                            },
                            {
                                id: 'female',
                                label: 'Female',
                                isDefault: false,
                                value: 'Female',
                            },
                            {
                                id: 'unisex',
                                label: 'Unisex',
                                isDefault: false,
                                value: 'Unisex',
                            },
                        ],
                    },
                ],
                {
                    variant1: {
                        id: 'variant1',
                        sku: 'variant1',
                        key: 'variant1',
                        options: { size: 's', color: 'red', gender: 'male' },
                        price: { amount: 10, currency: 'USD' },
                    },
                    variant2: {
                        id: 'variant2',
                        sku: 'variant2',
                        key: 'variant2',
                        options: { size: 's', color: 'red', gender: 'female' },
                        price: { amount: 10, currency: 'USD' },
                    },
                    variant3: {
                        id: 'variant3',
                        sku: 'variant3',
                        key: 'variant3',
                        options: { size: 'm', color: 'blue', gender: 'male' },
                        price: { amount: 10, currency: 'USD' },
                    },
                },
                { size: 's', gender: 'female' }
            )
        );

        expect(result.current).toEqual({
            size: ['s'],
            color: ['red'],
            gender: ['male', 'female'],
        });
    });

    it('should handle empty inputs without throwing errors', () => {
        const { result } = renderHook(() => useAllowedVariantOptions([], {}, {}));

        expect(result.current).toEqual({});
    });

    it('should return all options when no selection is made', () => {
        const { result } = renderHook(() =>
            useAllowedVariantOptions(
                [
                    {
                        id: 'size',
                        key: 'size',
                        label: 'Size',
                        displayMode: EProductOptionDisplayMode.DROPDOWN,
                        values: [
                            { id: 's', label: 'S', isDefault: false, value: 'S' },
                            {
                                id: 'm',
                                label: 'M',
                                isDefault: false,
                                value: 'M',
                            },
                            { id: 'l', label: 'L', isDefault: false, value: 'L' },
                        ],
                    },
                    {
                        id: 'color',
                        key: 'color',
                        label: 'Color',
                        displayMode: EProductOptionDisplayMode.SWATCH,
                        values: [
                            {
                                id: 'red',
                                label: 'Red',
                                isDefault: false,
                                value: 'Red',
                                colors: ['#ff0000'],
                            },
                            {
                                id: 'blue',
                                label: 'Blue',
                                isDefault: false,
                                value: 'Blue',
                                colors: ['#0000ff'],
                            },
                            { id: 'green', label: 'Green', isDefault: false, value: 'Green', colors: ['#00ff00'] },
                        ],
                    },
                ],
                {
                    variant1: {
                        id: 'variant1',
                        sku: 'variant1',
                        key: 'variant1',
                        options: { size: 's', color: 'red' },
                        price: { amount: 10, currency: 'USD' },
                    },
                    variant2: {
                        id: 'variant2',
                        sku: 'variant2',
                        key: 'variant2',
                        options: { size: 'm', color: 'blue' },
                        price: { amount: 10, currency: 'USD' },
                    },
                    variant3: {
                        id: 'variant3',
                        sku: 'variant3',
                        key: 'variant3',
                        options: { size: 'l', color: 'green' },
                        price: { amount: 10, currency: 'USD' },
                    },
                },
                {}
            )
        );

        expect(result.current.size.sort()).toEqual(['s', 'm', 'l'].sort());
        expect(result.current.color.sort()).toEqual(['red', 'blue', 'green'].sort());
    });
});
