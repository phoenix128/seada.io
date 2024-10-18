import { act, renderHook } from '@testing-library/react';
import useVariableInputItemModel from '@seada.io/core-schema/components/VariableInput/VariableInputItem.model';

describe('useVariableInputItemModel', () => {
    const fieldSchema = { defaultValue: 'default' };
    const onChange = jest.fn();

    it('should initialize with default value from fieldSchema', () => {
        const { result } = renderHook(() => useVariableInputItemModel({ fieldSchema, onChange, data: undefined }));

        expect(result.current.data.data).toBe('default');
    });

    it('should initialize with data if provided', () => {
        const data = 'initial';
        const { result } = renderHook(() => useVariableInputItemModel({ fieldSchema, data, onChange }));

        expect(result.current.data.data).toBe(data);
    });

    it('should call onChange with new data when handleChange is called', () => {
        const { result } = renderHook(() => useVariableInputItemModel({ fieldSchema, onChange, data: undefined }));

        act(() => {
            result.current.handlers.handleChange('new value');
        });

        expect(onChange).toHaveBeenCalledWith('new value');
    });
});
