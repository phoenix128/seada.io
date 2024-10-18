import { IAddressCardProps } from '@seada.io/customer/page-components/ModifyAddresses/AddressCard';
import useSaveCustomerAddressPort from '@seada.io/customer/ports/customer/hooks/use-save-customer-address-port';
import useDeleteCustomerAddressPort from '@seada.io/customer/ports/customer/hooks/use-delete-customer-address-port';
import { useCallback, useMemo, useRef } from 'react';
import { IEditAddressCardRef } from '@seada.io/customer/page-components/ModifyAddresses/EditAddressModal';
import { IConfirmModalRef } from '@seada.io/basic-ui/components/ConfirmModal/ConfirmModal';
import { ICustomerAddress } from '@seada.io/customer/interface/customer-address';
import useAsyncActionResult from '@seada.io/core/hooks/use-async-action-result';

const useAddressCardModel = (props: IAddressCardProps) => {
    const { address: addressIn, onAddressCreated, onAddressUpdated, onAddressDeleted } = props;

    const saveCustomerAddressAction = useSaveCustomerAddressPort();
    const deleteCustomerAddressAction = useDeleteCustomerAddressPort();

    const { action: saveAddress, loading, data } = saveCustomerAddressAction;
    const { action: deleteAddress } = deleteCustomerAddressAction;

    const editModalRef = useRef<IEditAddressCardRef>();
    const deleteModalRef = useRef<IConfirmModalRef>();

    const handleOnEdit = useCallback(() => {
        editModalRef.current?.open();
    }, []);

    const handleOnDelete = useCallback(() => {
        deleteModalRef.current?.open();
    }, []);

    const handleDeleteConfirmed = useCallback(() => {
        deleteAddress(addressIn.id);
        onAddressDeleted?.();
    }, [addressIn?.id, deleteAddress, onAddressDeleted]);

    const handleAddressChange = useCallback(
        (address: ICustomerAddress) => {
            saveAddress(address);
            editModalRef.current?.close();

            if (!address.id) {
                onAddressCreated?.();
                return;
            }

            onAddressUpdated?.(address);
        },
        [onAddressUpdated, onAddressCreated, saveAddress]
    );

    const address = useMemo(() => data || addressIn, [addressIn, data]);
    const isNewAddress = !addressIn?.id;

    useAsyncActionResult(saveCustomerAddressAction, 'customer.address.saveSuccess', 'customer.address.saveFailed');
    useAsyncActionResult(
        deleteCustomerAddressAction,
        'customer.address.deleteSuccess',
        'customer.address.deleteFailed'
    );

    return {
        data: {
            address,
            isNewAddress,
            loading,
        },
        handlers: {
            handleOnEdit,
            handleOnDelete,
            handleDeleteConfirmed,
            handleAddressChange,
        },
        refs: {
            editModalRef,
            deleteModalRef,
        },
    };
};

export default useAddressCardModel;
