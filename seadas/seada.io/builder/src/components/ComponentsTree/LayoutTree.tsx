import ComponentNode from '@seada.io/builder/components/ComponentsTree/ComponentNode';
import React, { useCallback, useContext } from 'react';
import BuilderContext from '@seada.io/builder/contexts/BuilderContext';
import { SortableTree } from '@seada.io/sortable-tree/SortableTree';
import useComponentsToTreeItems from '@seada.io/builder/hooks/use-components-to-tree-items';
import treeItemsToComponents from '@seada.io/builder/libs/tree-items-to-components';

interface IComponentsTreeProps {
    className?: string;
}

const LayoutTree: React.FC<IComponentsTreeProps> = ({ className }) => {
    const { pageData, setPageData, setPageToBeSaved } = useContext(BuilderContext);

    const pageLayout = pageData?.pageLayout;
    const treeItems = useComponentsToTreeItems(pageLayout?.components || []);

    const handleItemsChanged = useCallback(
        (newItems: any[]) => {
            if (JSON.stringify(newItems) === JSON.stringify(treeItems)) return;

            setPageData({
                ...pageData,
                pageLayout: {
                    ...pageLayout,
                    components: treeItemsToComponents(newItems),
                },
            });
            setPageToBeSaved(true);
        },
        [pageData, pageLayout, setPageData, setPageToBeSaved, treeItems]
    );

    if (!pageLayout) return null;

    return (
        <div className={className}>
            <SortableTree
                pageType={'@layout'}
                items={treeItems}
                TreeItemComponent={ComponentNode}
                onItemsChanged={handleItemsChanged}
            />
        </div>
    );
};

export default LayoutTree;
