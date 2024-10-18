import React, { useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import styles from '@seada.io/builder/components/ComponentsTree/AddNewButton.module.css';
import { createPortal } from 'react-dom';
import AddNewWindow, { IAddNewWindowRef } from '@seada.io/builder/components/AddNewWindow/AddNewWindow';
import { CgAdd } from 'react-icons/cg';

export interface IAddNewProps {
    id: string;
    depth: number;
    parent: IAddNewProps;
    isLast: boolean;
    childCount: number;
    onSelect?: (componentName: string, parent: string) => void;
}

const AddNewButton: React.FC<IAddNewProps> = (props) => {
    const { t } = useTranslation();
    const addNewWindowRef = useRef<IAddNewWindowRef>(null);

    const handleClick = useCallback(() => {
        addNewWindowRef.current.open();
    }, []);

    const handleSelect = useCallback(
        (componentName: string) => {
            props.onSelect && props.onSelect(componentName, props.parent?.id);
        },
        [props]
    );

    return (
        <>
            <div className={styles.AddNewButton} style={{ marginLeft: props.depth * 20 + 'px' }} onClick={handleClick}>
                <CgAdd className={styles.AddIcon} />
                <div>{t('builder.tree.add-new')}</div>
            </div>
            {createPortal(<AddNewWindow ref={addNewWindowRef} onSelect={handleSelect} />, document.body)}
        </>
    );
};

export default AddNewButton;
