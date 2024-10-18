import { act, renderHook } from '@testing-library/react';
import useVariableInputModel from '@seada.io/core-schema/components/VariableInput/VariableInput.model';
import { ISchemaField, ISchemaType } from '@seada.io/core-schema/spi/components/interface';

describe('useVariableInputModel', () => {
    const fieldSchema = { defaultValue: 'default' } as ISchemaField<ISchemaType<string>>;
    const onChange = jest.fn();

    it('should initialize with default value from fieldSchema', () => {
        const { result } = renderHook(() => useVariableInputModel({ fieldSchema, onChange, data: undefined }));

        expect(result.current.data.data).toBe('default');
    });

    it('should initialize with data if provided', () => {
        const data = 'initial';
        const { result } = renderHook(() => useVariableInputModel({ fieldSchema, data, onChange }));

        expect(result.current.data.data).toBe('initial');
    });

    it('should update data when handleChange is called', () => {
        const { result } = renderHook(() => useVariableInputModel({ fieldSchema, onChange, data: undefined }));

        act(() => {
            result.current.handlers.handleChange('new value');
        });

        expect(result.current.data.data).toBe('new value');
    });

    it('should call onChange with the current data when handleApply is called', () => {
        const { result } = renderHook(() => useVariableInputModel({ fieldSchema, onChange, data: undefined }));

        act(() => {
            result.current.handlers.handleChange('new value');
        });

        act(() => {
            result.current.handlers.handleApply();
        });

        expect(onChange).toHaveBeenCalledWith('new value');
    });

    it('should update data when data changes', () => {
        const { result, rerender } = renderHook((props: any) => useVariableInputModel(props), {
            initialProps: { fieldSchema, onChange, data: 'initial' },
        });

        expect(result.current.data.data).toBe('initial');

        rerender({ fieldSchema, onChange, data: 'new data' });

        expect(result.current.data.data).toBe('new data');
    });

    it('should reset data to fieldSchema.defaultValue when data is undefined', () => {
        const { result, rerender } = renderHook((props: any) => useVariableInputModel(props), {
            initialProps: { fieldSchema, onChange, data: 'initial' },
        });

        expect(result.current.data.data).toBe('initial');

        rerender({ fieldSchema, onChange, data: undefined });

        expect(result.current.data.data).toBe('default');
    });
});
