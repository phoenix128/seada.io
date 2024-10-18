import React, { forwardRef, useCallback, useContext, useEffect, useRef } from 'react';
import { TreeItemComponentProps } from '@seada.io/sortable-tree/types';
import { SimpleTreeItemWrapper } from '@seada.io/sortable-tree/ui/simple/SimpleTreeItemWrapper';
import { INodeTreeData } from '@seada.io/builder/components/interface';
import styles from '@seada.io/builder/components/ComponentsTree/ComponentNode.module.css';
import { twMerge } from 'tailwind-merge';
import BuilderContext from '@seada.io/builder/contexts/BuilderContext';
import CollapseHandle from '@seada.io/builder/components/ComponentsTree/CollapseHandle';
import { useTranslation } from 'react-i18next';
import removePageComponent from '@seada.io/core/spi/seada-pages/manipulation/remove-page-component';
import { CgTrash } from 'react-icons/cg';

const ComponentNode = forwardRef<HTMLDivElement, TreeItemComponentProps<INodeTreeData>>((props, ref) => {
    const { selectedItem, setSelectedItem, highlightedItem, setHighlightedItem } = useContext(BuilderContext);
    const selected = selectedItem?.id === props.item.id;
    const { pageData, setPageData, setPageToBeSaved } = useContext(BuilderContext);
    const { t } = useTranslation();
    const hoverTimeout = useRef(null);
    const handleMouseDown = useCallback(() => {
        setSelectedItem(props.item.id === selectedItem?.id ? null : props.item);
    }, [props.item, selectedItem?.id, setSelectedItem]);

    const highlightedItemRef = useRef(highlightedItem);
    const selectedItemRef = useRef(selectedItem);

    useEffect(() => {
        highlightedItemRef.current = highlightedItem;
        selectedItemRef.current = selectedItem;
    }, [highlightedItem, selectedItem]);

    const handleRemove = useCallback(() => {
        setPageData(removePageComponent(pageData, props.item.id));
        setPageToBeSaved(true);
        setHighlightedItem(selectedItem);
    }, [pageData, props.item.id, selectedItem, setHighlightedItem, setPageData, setPageToBeSaved]);

    const handleMouseEnter = useCallback(() => {
        if (hoverTimeout.current) {
            clearTimeout(hoverTimeout.current);
        }

        hoverTimeout.current = setTimeout(() => {
            setHighlightedItem(props.item);
            hoverTimeout.current = null;
        }, 500);
    }, [props.item, setHighlightedItem]);

    const handleMouseLeave = useCallback(() => {
        if (hoverTimeout.current) {
            clearTimeout(hoverTimeout.current);
        }

        hoverTimeout.current = setTimeout(() => {
            if (highlightedItemRef.current?.id !== props.item.id) return;
            setHighlightedItem(null);
            hoverTimeout.current = null;
        }, 500);
    }, [props.item.id, setHighlightedItem]);

    return (
        <>
            <SimpleTreeItemWrapper
                {...props}
                ref={ref}
                onMouseDown={handleMouseDown}
                className={twMerge(styles.ComponentNode, selected && styles.Selected)}
                contentClassName={styles.ComponentNodeContent}
                ghostClassName={styles.Ghost}
                cloneClassName={styles.Clone}
                hideCollapseButton={true}
                HandleComponent={props.item.icon}
                handleClassName={styles.Handle}
                CollapseComponent={CollapseHandle}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <div className={styles.Label}>{props.item.label}</div>
                <div className={styles.TrashWrapper}>
                    <CgTrash
                        onClick={handleRemove}
                        className={styles.TrashIcon}
                        title={t('builder.tree.remove-item')}
                    />
                </div>
            </SimpleTreeItemWrapper>
        </>
    );
});
ComponentNode.displayName = 'ComponentNode';

export default ComponentNode;
