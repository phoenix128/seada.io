import React, { ChangeEvent, forwardRef, PropsWithChildren, useCallback, useImperativeHandle, useState } from 'react';
import {
    Button,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    useDisclosure,
} from '@nextui-org/react';
import { useTranslation } from 'react-i18next';
import filterTemplateName from '@seada.io/builder/libs/filter-template-name';

export interface NewTemplateNameModalProps {
    title?: string;
    initialValue: string;
    onConfirm?: (name: string) => void;
    onCancel?: () => void;
}

export interface INewTemplateNameModalRef {
    open: () => void;
    close: () => void;
}

const NewTemplateNameModal = forwardRef<INewTemplateNameModalRef, PropsWithChildren<NewTemplateNameModalProps>>(
    ({ title, children, initialValue, onConfirm, onCancel }, actionsRef) => {
        const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
        const [name, setName] = useState(initialValue);
        const { t } = useTranslation();

        const open = useCallback(() => {
            setName(initialValue);
            onOpen();
        }, [initialValue, onOpen]);

        const handleCancel = useCallback(() => {
            onCancel?.();
            onClose();
        }, [onCancel, onClose]);

        const handleConfirm = useCallback(() => {
            onConfirm?.(name);
            onClose();
        }, [name, onClose, onConfirm]);

        const handleChange = useCallback((evt: ChangeEvent<HTMLInputElement>) => {
            setName(filterTemplateName(evt.target.value));
        }, []);

        useImperativeHandle(
            actionsRef,
            () => {
                return {
                    open,
                    close: onClose,
                };
            },
            [onClose, open]
        );

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
                    <ModalBody>
                        <Input value={name} onChange={handleChange} />
                    </ModalBody>
                    <ModalFooter>
                        <Button color={'primary'} variant="light" onClick={handleCancel}>
                            {t('builder.variantModal.cancel')}
                        </Button>
                        <Button color={'danger'} onClick={handleConfirm}>
                            {t('builder.variantModal.create')}
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        );
    }
);

NewTemplateNameModal.displayName = 'NewTemplateNameModal';

export default NewTemplateNameModal;
