'use client';

import React, { CSSProperties, useCallback, useLayoutEffect, useRef, useState } from 'react';
import styles from '@seada.io/basic-ui/components/SimpleNav/SimpleNav.styles';
import { Navbar, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuItem, NavbarMenuToggle } from '@nextui-org/react';
import SimpleNavLink from '@seada.io/basic-ui/components/SimpleNav/SimpleNavLink';
import { useWindowSize } from 'usehooks-ts';
import useScrollPosition from '@react-hook/window-scroll';
import useTwBoxGeometryClasses from '@seada.io/basic-ui/hooks/tw/use-tw-box-geometry-classes';
import useTwBoxBackgroundClasses from '@seada.io/basic-ui/hooks/tw/use-tw-box-background-classes';
import useTwBoxBorderClasses from '@seada.io/basic-ui/hooks/tw/use-tw-box-border-classes';
import { ISimpleNavSchema } from '@seada.io/basic-ui/components/SimpleNav/schema';
import { twMerge } from 'tailwind-merge';
import useTwResponsiveValue from '@seada.io/core/hooks/tw/use-tw-responsive-value';
import { CgClose, CgMenu } from 'react-icons/cg';
import { ISimpleNavNode } from '@seada.io/basic-ui/interface/simple-nav';
import { IPageComponentSchemaProps } from '@seada.io/core-schema/spi/components/interface';

const SimpleNav: React.FC<IPageComponentSchemaProps<ISimpleNavSchema> & { nodes: ISimpleNavNode[] }> = (props) => {
    const { nodes, justify: inJustify, domRef } = props;
    const portalRef = useRef<HTMLDivElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);
    const setReload = useState(false)[1];
    const [menuOpen, setMenuOpen] = useState(false);
    const simpleNavLinkProps = {
        fontSize: props.fontSize,
        fontWeight: props.fontWeight,
        letterSpacing: props.letterSpacing,
        textColor: props.textColor,
        fontStyle: props.fontStyle,
    };

    const mobileMode = useTwResponsiveValue<boolean>(props.mobileMenu);

    const geometryClasses = useTwBoxGeometryClasses(props);
    const boxBackgroundClasses = useTwBoxBackgroundClasses(props);
    const boxBordersClasses = useTwBoxBorderClasses(props);

    const justify = useTwResponsiveValue(inJustify);

    const [menuStyle, setMenuStyle] = useState<CSSProperties>(undefined);
    const { height: windowHeight } = useWindowSize();
    const scroll = useScrollPosition(10);

    // // TODO: This is a workaround for the next-ui library, check if it is fixed in the future
    // This is a hack to force the portal to re-render and acquire the reference to the container
    useLayoutEffect(() => {
        setReload(true);
    }, [setReload]);

    // TODO: This is a workaround for the next-ui library, check if it is fixed in the future
    // There is a lack in the next-ui library that does not allow the menu to be in an arbitrary y-position
    // This workaround renders the menu in a portal and compute the position using a ghost div as reference
    useLayoutEffect(() => {
        if (portalRef.current) {
            const menuRect = menuRef.current?.getBoundingClientRect();
            const menuTop = menuRect.y + menuRect.height;

            setMenuStyle({
                height: windowHeight - menuTop + 'px',
                top: menuTop + scroll + 'px',
            });
        }
    }, [windowHeight, menuOpen, scroll]);

    // Manually handle the menu toggle to avoid close on re-render
    const handleMenuToggle = useCallback((isSelected: boolean) => {
        setMenuOpen(isSelected);
    }, []);

    return (
        <>
            <Navbar
                classNames={{
                    menu: styles.NavMenu,
                    wrapper: twMerge(justify, geometryClasses, boxBackgroundClasses, boxBordersClasses),
                }}
                maxWidth={'full'}
                ref={domRef}
                isBordered={false}
                position={'sticky'}
                isMenuOpen={menuOpen}
                shouldHideOnScroll={false}
            >
                {mobileMode && (
                    <div className={styles.NavbarMenuToggle}>
                        <NavbarMenuToggle
                            onChange={handleMenuToggle}
                            icon={(isOpen) => (isOpen ? <CgClose size={22} /> : <CgMenu size={22} />)}
                        />
                    </div>
                )}

                {!mobileMode && (
                    <div className={twMerge(styles.NavbarContent)}>
                        <NavbarContent>
                            {nodes?.map((node) => {
                                return (
                                    <NavbarItem key={node.url} className={styles.NavNode}>
                                        <SimpleNavLink node={node} {...simpleNavLinkProps} />
                                    </NavbarItem>
                                );
                            })}
                        </NavbarContent>
                    </div>
                )}

                <div className={styles.NavbarMenu}>
                    <NavbarMenu portalContainer={portalRef.current}>
                        {nodes?.map((node) => {
                            return (
                                <NavbarMenuItem key={node.url} className={styles.NavNode}>
                                    <SimpleNavLink node={node} {...simpleNavLinkProps} />
                                </NavbarMenuItem>
                            );
                        })}
                    </NavbarMenu>
                </div>
                <div ref={menuRef} className={'h-full'}></div>
            </Navbar>
            <div
                className={twMerge(menuOpen ? 'flex' : 'hidden', styles.NavbarMenuPortal)}
                style={menuStyle}
                ref={portalRef}
            ></div>
        </>
    );
};

export default SimpleNav;
