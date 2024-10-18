import React, { forwardRef, PropsWithChildren, useCallback, useImperativeHandle } from 'react';
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/react';

export enum EModalType {
    DANGER = 'danger',
    DEFAULT = 'default',
}

export interface ConfirmModalProps {
    title?: string;
    confirmText: string;
    cancelText: string;
    onConfirm?: () => void;
    onCancel?: () => void;
    type?: EModalType;
}

export interface IConfirmModalRef {
    open: () => void;
    close: () => void;
}

const ConfirmModal = forwardRef<IConfirmModalRef, PropsWithChildren<ConfirmModalProps>>(
    ({ title, children, cancelText, confirmText, onCancel, onConfirm, type = EModalType.DANGER }, actionsRef) => {
        const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
        const handleCancel = useCallback(() => {
            onCancel?.();
            onClose();
        }, [onCancel, onClose]);

        const handleConfirm = useCallback(() => {
            onConfirm?.();
            onClose();
        }, [onClose, onConfirm]);

        useImperativeHandle(
            actionsRef,
            () => {
                return {
                    open: onOpen,
                    close: onClose,
                };
            },
            [onClose, onOpen]
        );

        const cancelColor = type === EModalType.DANGER ? 'primary' : 'danger';
        const confirmColor = type === EModalType.DANGER ? 'danger' : 'primary';

        return (
            <Modal
                placement={'center'}
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                isDismissable={false}
                isKeyboardDismissDisabled={true}
            >
                <ModalContent>
                    <ModalHeader>{title}</ModalHeader>
                    <ModalBody>{children}</ModalBody>
                    <ModalFooter>
                        {cancelText && (
                            <Button color={cancelColor} variant="light" onClick={handleCancel}>
                                {cancelText}
                            </Button>
                        )}
                        {confirmText && (
                            <Button color={confirmColor} onClick={handleConfirm}>
                                {confirmText}
                            </Button>
                        )}
                    </ModalFooter>
                </ModalContent>
            </Modal>
        );
    }
);

ConfirmModal.displayName = 'ConfirmModal';

export default ConfirmModal;
