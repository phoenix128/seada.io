import React, { useCallback, useContext, useEffect, useLayoutEffect, useState } from 'react';
import styles from '@seada.io/builder/components/HighlightBox/HighlightBox.styles';
import BuilderSiteContext from '@seada.io/builder/contexts/BuilderSiteContext';
import { useInterval, useIsClient } from 'usehooks-ts';
import { twMerge } from 'tailwind-merge';
import useScrollPosition from '@react-hook/window-scroll';
import PageDataContext from '@seada.io/core/contexts/PageDataContext';

export interface IHighlightBoxProps {}

const MARGINS = 5;

const HighlightBox: React.FC<IHighlightBoxProps> = (props) => {
    const { highlightedItem, selectedItem } = useContext(BuilderSiteContext);
    const { domRefs } = useContext(PageDataContext);
    const isBrowser = useIsClient();
    const [style, setStyle] = useState<React.CSSProperties>({
        display: 'none',
    });

    const item = highlightedItem || selectedItem;

    const scrollPosition = useScrollPosition(20);
    const updateHighlightBox = useCallback(
        (scrollTo: boolean) => {
            if (!isBrowser) return;

            if (!item) {
                setStyle({ display: 'none' });
                return;
            }

            const domElement = domRefs[item.component.id]?.current;
            if (!domElement) {
                return;
            }

            const { width, height, left, top } = domElement.getBoundingClientRect();

            setStyle({
                display: 'block',
                top: `${top - MARGINS}px`,
                left: `${left - MARGINS}px`,
                width: `${width + MARGINS * 2}px`,
                height: `${height + MARGINS * 2}px`,
            });

            if (scrollTo && (top + height < 0 || top > window.innerHeight)) {
                domElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center',
                });
            }
        },
        [isBrowser, item, domRefs]
    );

    useEffect(() => {
        updateHighlightBox(false);
    }, [scrollPosition, updateHighlightBox]);

    useLayoutEffect(() => {
        updateHighlightBox(true);
    }, [updateHighlightBox]);
    useInterval(() => {
        updateHighlightBox(false);
    }, 500);

    const isSelected = selectedItem?.component?.id === item?.component?.id;
    const selectedClass = isSelected ? styles.Selected : '';

    const highlightClass = highlightedItem ? styles.Highlight : '';

    return (
        item && (
            <div className={twMerge(styles.HighlightBox, selectedClass, highlightClass)} style={style}>
                <div className={highlightedItem ? styles.LineTop : styles.NoLine}></div>
                <div className={highlightedItem ? styles.LineBottom : styles.NoLine}></div>
                <div className={highlightedItem ? styles.LineLeft : styles.NoLine}></div>
                <div className={highlightedItem ? styles.LineRight : styles.NoLine}></div>
                <div className={styles.Title}>{item.label}</div>
            </div>
        )
    );
};

export default HighlightBox;
