import React, { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/react';
import EditAddressForm from '@seada.io/customer/page-components/ModifyAddresses/EditAddressForm';
import { ICustomerAddress } from '@seada.io/customer/interface/customer-address';
import { useTranslation } from 'react-i18next';
import useMapCustomerAddressForm from '@seada.io/customer/hooks/use-map-customer-address-form';
import SeadaModal from '@seada.io/foundation-ui/components/SeadaModal';
import SeadaButton from '@seada.io/foundation-ui/components/SeadaButton';

export interface IEditAddressCardProps {
    address: ICustomerAddress;
    onAddressChange?: (address: ICustomerAddress) => void;
}

export interface IEditAddressCardRef {
    open: () => void;
    close: () => void;
}

const EditAddressModal = forwardRef<IEditAddressCardRef, IEditAddressCardProps>(
    ({ address, onAddressChange }, editActionsRef) => {
        const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
        const { t } = useTranslation();
        const formRef = useRef<HTMLFormElement>();
        const mapAddress = useMapCustomerAddressForm(formRef, address);

        useImperativeHandle(
            editActionsRef,
            () => {
                return {
                    open: onOpen,
                    close: onClose,
                };
            },
            [onClose, onOpen]
        );

        const handleFormSubmit = useCallback(() => {
            if (!formRef.current) return;
            const newAddress = mapAddress();
            onAddressChange?.(newAddress);
        }, [mapAddress, onAddressChange]);

        return (
            <SeadaModal
                placement={'center'}
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                isDismissable={false}
                isKeyboardDismissDisabled={true}
            >
                <ModalContent>
                    <ModalHeader className="flex flex-col gap-1">{t('customer.address.editForm.title')}</ModalHeader>
                    <ModalBody>
                        <EditAddressForm address={address} ref={formRef} onSubmit={handleFormSubmit} />
                    </ModalBody>
                    <ModalFooter>
                        <SeadaButton color="danger" variant="light" onClick={onClose}>
                            {t('customer.address.editForm.close')}
                        </SeadaButton>
                        <SeadaButton color="primary" onClick={handleFormSubmit}>
                            {t('customer.address.editForm.save')}
                        </SeadaButton>
                    </ModalFooter>
                </ModalContent>
            </SeadaModal>
        );
    }
);

EditAddressModal.displayName = 'EditAddressModal';

export default EditAddressModal;
