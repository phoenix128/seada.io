import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import styles from '@seada.io/builder/components/AddNewWindow/AddNewWindow.module.css';
import {
    Autocomplete,
    AutocompleteItem,
    Button,
    Card,
    CardBody,
    CardHeader,
    Divider,
    SelectSection,
} from '@nextui-org/react';
import { useTranslation } from 'react-i18next';
import { CgSquare } from 'react-icons/cg';
import getGroupedPageComponentsSchemas from '@seada.io/core-schema/spi/components/get-grouped-page-components-schemas';

export interface IAddNewWindowRef {
    open: () => void;
    close: () => void;
}

export interface IAddNewWindowProps {
    onSelect?: (componentName: string) => void;
}

const AddNewWindow = forwardRef<IAddNewWindowRef, IAddNewWindowProps>(({ onSelect }, ref) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const { t } = useTranslation();
    const inputRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(
        ref,
        () => {
            return {
                open: () => setIsOpen(true),
                close: () => setIsOpen(false),
            };
        },
        []
    );

    useEffect(() => {
        if (isOpen && inputRef.current) {
            setTimeout(() => inputRef.current.focus(), 200);
        }
    }, [isOpen]);

    const handleClose = () => {
        setIsOpen(false);
    };

    const handleChange = useCallback(
        (val: string) => {
            onSelect && onSelect(val);
            setTimeout(() => {
                setIsOpen(false);
            }, 100);
        },
        [onSelect]
    );

    if (!isOpen) return null;

    const groupedComponentSchemas = getGroupedPageComponentsSchemas();

    return (
        <div className={styles.AddNewWindowScreen}>
            <Card className={styles.AddNewWindow}>
                <CardHeader className={styles.Header}>
                    <div className={styles.Title}>{t('builder.addNewComponent.title')}</div>
                    <Button size={'sm'} color={'primary'} className={styles.CloseButton} onClick={handleClose}>
                        {t('schema.gallery.close')}
                    </Button>{' '}
                </CardHeader>
                <Divider />
                <CardBody>
                    <Autocomplete
                        ref={inputRef}
                        onSelectionChange={handleChange}
                        isClearable={true}
                        onClear={handleClose}
                        size={'sm'}
                        label={t('builder.addNewComponent.select')}
                    >
                        {Object.entries(groupedComponentSchemas).map(([groupName, componentSchemas]) => {
                            return (
                                <SelectSection key={groupName} showDivider title={t(groupName)}>
                                    {Object.entries(componentSchemas).map(([componentName, schema]) => {
                                        const Icon = schema.icon || CgSquare;

                                        return (
                                            <AutocompleteItem
                                                aria-label={t(schema.title || componentName)}
                                                key={componentName}
                                                value={componentName}
                                                startContent={<Icon className={styles.ComponentIcon} />}
                                                className={styles.ComponentItem}
                                            >
                                                {t(schema.title || componentName)}
                                            </AutocompleteItem>
                                        );
                                    })}
                                </SelectSection>
                            );
                        })}
                    </Autocomplete>
                </CardBody>
            </Card>
        </div>
    );
});

AddNewWindow.displayName = 'AddNewWindow';

export default AddNewWindow;
