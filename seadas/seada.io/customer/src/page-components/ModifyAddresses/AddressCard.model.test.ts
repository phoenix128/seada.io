import { act, renderHook } from '@testing-library/react';
import useSaveCustomerAddressPort from '@seada.io/customer/ports/customer/hooks/use-save-customer-address-port';
import useDeleteCustomerAddressPort from '@seada.io/customer/ports/customer/hooks/use-delete-customer-address-port';
import useAsyncActionResult from '@seada.io/core/hooks/use-async-action-result';
import useAddressCardModel from '@seada.io/customer/page-components/ModifyAddresses/AddressCard.model';
import { IAddressCardProps } from '@seada.io/customer/page-components/ModifyAddresses/AddressCard';
import { ICustomerAddress } from '@seada.io/customer/interface/customer-address';

jest.mock('@seada.io/customer/ports/customer/hooks/use-save-customer-address-port');
jest.mock('@seada.io/customer/ports/customer/hooks/use-delete-customer-address-port');
jest.mock('@seada.io/core/hooks/use-async-action-result');

describe('useAddressCardModel', () => {
    const mockAddress = { id: 'address-id', street: '123 Test St' };
    const mockSaveCustomerAddressAction = {
        action: jest.fn(),
        loading: false,
        data: null,
    };
    const mockDeleteCustomerAddressAction = {
        action: jest.fn(),
    };

    beforeEach(() => {
        jest.clearAllMocks();
        (useSaveCustomerAddressPort as jest.Mock).mockReturnValue(mockSaveCustomerAddressAction);
        (useDeleteCustomerAddressPort as jest.Mock).mockReturnValue(mockDeleteCustomerAddressAction);
        (useAsyncActionResult as jest.Mock).mockImplementation(() => {});
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should initialize with correct data', () => {
        const props = {
            address: mockAddress,
            onAddressCreated: jest.fn(),
            onAddressUpdated: jest.fn(),
            onAddressDeleted: jest.fn(),
        } as unknown as IAddressCardProps;
        const { result } = renderHook(() => useAddressCardModel(props));

        expect(result.current.data.address).toBe(mockAddress);
        expect(result.current.data.isNewAddress).toBe(false);
        expect(result.current.data.loading).toBe(false);
    });

    it('should open edit modal on handleOnEdit', () => {
        const props = {
            address: mockAddress,
            onAddressCreated: jest.fn(),
            onAddressUpdated: jest.fn(),
            onAddressDeleted: jest.fn(),
        } as unknown as IAddressCardProps;
        const { result } = renderHook(() => useAddressCardModel(props));
        const editModalRef = { current: { open: jest.fn(), close: jest.fn() } };
        result.current.refs.editModalRef.current = editModalRef.current;

        act(() => {
            result.current.handlers.handleOnEdit();
        });

        expect(editModalRef.current.open).toHaveBeenCalled();
    });

    it('should open delete modal on handleOnDelete', () => {
        const props = {
            address: mockAddress,
            onAddressCreated: jest.fn(),
            onAddressUpdated: jest.fn(),
            onAddressDeleted: jest.fn(),
        } as unknown as IAddressCardProps;
        const { result } = renderHook(() => useAddressCardModel(props));
        const deleteModalRef = { current: { open: jest.fn(), close: jest.fn() } };
        result.current.refs.deleteModalRef.current = deleteModalRef.current;

        act(() => {
            result.current.handlers.handleOnDelete();
        });

        expect(deleteModalRef.current.open).toHaveBeenCalled();
    });

    it('should handle delete confirmed correctly', () => {
        const onAddressDeleted = jest.fn();
        const props = {
            address: mockAddress,
            onAddressCreated: jest.fn(),
            onAddressUpdated: jest.fn(),
            onAddressDeleted,
        } as unknown as IAddressCardProps;
        const { result } = renderHook(() => useAddressCardModel(props));

        act(() => {
            result.current.handlers.handleDeleteConfirmed();
        });

        expect(mockDeleteCustomerAddressAction.action).toHaveBeenCalledWith(mockAddress.id);
        expect(onAddressDeleted).toHaveBeenCalled();
    });

    it('should handle address change correctly', () => {
        const onAddressCreated = jest.fn();
        const onAddressUpdated = jest.fn();
        const props = {
            address: mockAddress,
            onAddressCreated,
            onAddressUpdated,
            onAddressDeleted: jest.fn(),
        } as unknown as IAddressCardProps;
        const { result } = renderHook(() => useAddressCardModel(props));
        const newAddress = { id: '', streetAddress1: '456 New St' } as ICustomerAddress;
        const editModalRef = { current: { open: jest.fn(), close: jest.fn() } };
        result.current.refs.editModalRef.current = editModalRef.current;

        act(() => {
            result.current.handlers.handleAddressChange(newAddress);
        });

        expect(mockSaveCustomerAddressAction.action).toHaveBeenCalledWith(newAddress);
        expect(editModalRef.current.close).toHaveBeenCalled();
        expect(onAddressCreated).toHaveBeenCalled();
        expect(onAddressUpdated).not.toHaveBeenCalled();

        const existingAddress = { id: 'existing-id', streetAddress1: '789 Existing St' } as ICustomerAddress;
        act(() => {
            result.current.handlers.handleAddressChange(existingAddress);
        });

        expect(mockSaveCustomerAddressAction.action).toHaveBeenCalledWith(existingAddress);
        expect(editModalRef.current.close).toHaveBeenCalled();
        expect(onAddressUpdated).toHaveBeenCalledWith(existingAddress);
    });
});
