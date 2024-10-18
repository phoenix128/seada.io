import React from 'react';
import { ICustomerAddress } from '@seada.io/customer/interface/customer-address';
import EditAddressModal from '@seada.io/customer/page-components/ModifyAddresses/EditAddressModal';
import AddressCardContent from '@seada.io/customer/page-components/ModifyAddresses/AddressCardContent';
import NewAddressCard from '@seada.io/customer/page-components/ModifyAddresses/NewAddressCard';
import LoadingCard from '@seada.io/customer/page-components/ModifyAddresses/LoadingCard';
import ConfirmModal from '@seada.io/basic-ui/components/ConfirmModal/ConfirmModal';
import { useTranslation } from 'react-i18next';
import useAddressCardModel from '@seada.io/customer/page-components/ModifyAddresses/AddressCard.model';

export interface IAddressCardProps {
    address: ICustomerAddress;
    onAddressCreated?: () => void;
    onAddressUpdated?: (address: ICustomerAddress) => void;
    onAddressDeleted?: () => void;
}

const AddressCard: React.FC<IAddressCardProps> = (props) => {
    const { t } = useTranslation();
    const {
        data: { address, loading, isNewAddress },
        handlers: { handleOnDelete, handleOnEdit, handleDeleteConfirmed, handleAddressChange },
        refs: { editModalRef, deleteModalRef },
    } = useAddressCardModel(props);

    return (
        <>
            {loading && <LoadingCard />}
            {!loading && !isNewAddress && (
                <AddressCardContent address={address} onEdit={handleOnEdit} onDelete={handleOnDelete} />
            )}
            {!loading && isNewAddress && <NewAddressCard onAdd={handleOnEdit} />}
            <EditAddressModal ref={editModalRef} address={address} onAddressChange={handleAddressChange} />
            <ConfirmModal
                ref={deleteModalRef}
                confirmText={t('customer.address.deleteConfirm.confirm')}
                cancelText={t('customer.address.deleteConfirm.cancel')}
                title={t('customer.address.deleteConfirm.title')}
                onConfirm={handleDeleteConfirmed}
            >
                {t('customer.address.deleteConfirm.message')}
            </ConfirmModal>
        </>
    );
};

export default AddressCard;
