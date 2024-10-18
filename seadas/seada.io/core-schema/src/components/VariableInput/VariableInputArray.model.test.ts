import { act, renderHook } from '@testing-library/react';
import { IVariableInputArrayProps } from '@seada.io/core-schema/components/VariableInput/VariableInputArray';
import useVariableInputArrayModel from '@seada.io/core-schema/components/VariableInput/VariableInputArray.model';
import { ISchemaField, ISchemaType } from '@seada.io/core-schema/spi/components/interface';

describe('useVariableInputArrayModel', () => {
    const fieldSchema = { defaultValue: ['default1', 'default2'] } as ISchemaField<ISchemaType<string[]>>;
    const onChange = jest.fn();

    it('should initialize with default value from fieldSchema', () => {
        const { result } = renderHook(() => useVariableInputArrayModel({ fieldSchema, onChange, data: undefined }));

        expect(result.current.data.data).toEqual(['default1', 'default2']);
    });

    it('should initialize with data if provided', () => {
        const data = ['initial1', 'initial2'];
        const { result } = renderHook(() => useVariableInputArrayModel({ fieldSchema, data, onChange }));

        expect(result.current.data.data).toEqual(data);
    });

    it('should update data when handleIdxChange is called', () => {
        const { result } = renderHook(() => useVariableInputArrayModel({ fieldSchema, onChange, data: undefined }));

        act(() => {
            result.current.handlers.handleIdxChange('new value', 1);
        });

        expect(result.current.data.data).toEqual(['default1', 'new value']);
    });

    it('should remove item when handleIdxRemove is called', () => {
        const { result } = renderHook(() => useVariableInputArrayModel({ fieldSchema, onChange, data: undefined }));

        act(() => {
            result.current.handlers.handleIdxRemove(0);
        });

        expect(result.current.data.data).toEqual(['default2']);
    });

    it('should add new item when handleAddNew is called', () => {
        const { result } = renderHook(() => useVariableInputArrayModel({ fieldSchema, onChange, data: undefined }));

        act(() => {
            result.current.handlers.handleAddNew();
        });

        expect(result.current.data.data).toEqual(['default1', 'default2', '']);
    });

    it('should call onChange with the current data when handleApply is called', () => {
        const { result } = renderHook(() => useVariableInputArrayModel({ fieldSchema, onChange, data: undefined }));

        act(() => {
            result.current.handlers.handleApply();
        });

        expect(onChange).toHaveBeenCalledWith(['default1', 'default2']);
    });

    it('should update data when data changes', () => {
        const { result, rerender } = renderHook(
            (props: IVariableInputArrayProps) => useVariableInputArrayModel(props),
            { initialProps: { fieldSchema, onChange, data: ['initial1'] } }
        );

        expect(result.current.data.data).toEqual(['initial1']);

        rerender({ fieldSchema, onChange, data: ['new data'] });

        expect(result.current.data.data).toEqual(['new data']);
    });

    it('should reset data to fieldSchema.defaultValue when data is undefined', () => {
        const { result, rerender } = renderHook(
            (props: IVariableInputArrayProps) => useVariableInputArrayModel(props),
            { initialProps: { fieldSchema, onChange, data: ['initial1'] } }
        );

        expect(result.current.data.data).toEqual(['initial1']);

        rerender({ fieldSchema, onChange, data: undefined });

        expect(result.current.data.data).toEqual(['default1', 'default2']);
    });
});
