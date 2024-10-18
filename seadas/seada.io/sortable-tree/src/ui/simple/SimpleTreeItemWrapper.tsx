import { twMerge } from 'tailwind-merge';
import React, { forwardRef } from 'react';
import type { TreeItemComponentProps, TreeItemComponentType } from '@seada.io/sortable-tree/types';
import '@seada.io/sortable-tree/ui/simple/SimpleTreeItemWrapper.css';

export const SimpleTreeItemWrapper: TreeItemComponentType<{}, HTMLDivElement> =
    // eslint-disable-next-line react/display-name
    forwardRef<HTMLDivElement, React.PropsWithChildren<TreeItemComponentProps<{}>>>((props, ref) => {
        const {
            clone,
            depth,
            disableSelection,
            disableInteraction,
            disableSorting,
            ghost,
            handleProps,
            indentationWidth,
            indicator,
            collapsed,
            onCollapse,
            onRemove,
            item,
            wrapperRef,
            style,
            hideCollapseButton,
            childCount,
            manualDrag,
            showDragHandle,
            disableCollapseOnItemClick,
            onMouseDown,
            onMouseEnter,
            onMouseLeave,
            isLast,
            parent,
            className,
            contentClassName,
            ghostClassName,
            cloneClassName,
            handleClassName,
            HandleComponent,
            CollapseComponent,
            ...rest
        } = props;

        return (
            <li
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                onMouseDown={onMouseDown}
                ref={wrapperRef}
                {...rest}
                className={twMerge(
                    'dnd-sortable-tree_simple_wrapper',
                    clone && 'dnd-sortable-tree_simple_clone',
                    clone && cloneClassName,
                    ghost && 'dnd-sortable-tree_simple_ghost',
                    ghost && ghostClassName,
                    disableSelection && 'dnd-sortable-tree_simple_disable-selection',
                    disableInteraction && 'dnd-sortable-tree_simple_disable-interaction',
                    className
                )}
                style={{
                    ...style,
                    paddingLeft: clone ? indentationWidth : indentationWidth * depth,
                }}
            >
                <div
                    className={twMerge('dnd-sortable-tree_simple_tree-item', contentClassName)}
                    ref={ref}
                    {...(manualDrag ? undefined : handleProps)}
                    onClick={disableCollapseOnItemClick ? undefined : onCollapse}
                >
                    {!disableSorting && showDragHandle !== false && HandleComponent && (
                        <HandleComponent className={handleClassName} {...handleProps} />
                    )}

                    {!manualDrag && !hideCollapseButton && !!onCollapse && CollapseComponent && !!childCount && (
                        <CollapseComponent
                            collapsed={!!collapsed}
                            onClick={(e: any) => {
                                if (!disableCollapseOnItemClick) {
                                    return;
                                }
                                e.preventDefault();
                                onCollapse?.();
                            }}
                        />
                    )}
                    {props.children}
                </div>
            </li>
        );
    });
