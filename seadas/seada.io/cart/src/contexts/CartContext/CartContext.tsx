'use client';

import React, { createContext, PropsWithChildren, useRef, useState } from 'react';
import { ICartData } from '@seada.io/cart/interface/cart';

export enum ECartStatus {
    LOADING = 'loading',
    READY = 'ready',
}

export interface ICartContext {
    carts: Record<string, ICartData>;
    setCarts: React.Dispatch<React.SetStateAction<Record<string, ICartData>>>;

    cartStatuses: React.MutableRefObject<Record<string, ECartStatus>>;
}

interface ICartContextProviderProps {}

const CartContext = createContext<ICartContext>({} as ICartContext);

export const CartContextProvider = ({ children }: PropsWithChildren<ICartContextProviderProps>) => {
    const [carts, setCarts] = useState<Record<string, ICartData>>({});
    const cartStatuses = useRef<Record<string, ECartStatus>>({});

    return <CartContext.Provider value={{ carts, setCarts, cartStatuses }}>{children}</CartContext.Provider>;
};

export default CartContext;
