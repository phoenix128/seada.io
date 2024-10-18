import React from 'react';
import styles from '@seada.io/builder/components/ComponentsTree/CollapseHandle.module.css';
import { CollapseComponentProps } from '@seada.io/sortable-tree/types';
import { CgChevronDown, CgChevronUp } from 'react-icons/cg';

const CollapseHandle: React.FC<CollapseComponentProps> = ({ collapsed, onClick }) => {
    return (
        <button className={styles.CollapseHandle} onClick={onClick}>
            {collapsed && <CgChevronUp />}
            {!collapsed && <CgChevronDown />}
        </button>
    );
};

export default CollapseHandle;
