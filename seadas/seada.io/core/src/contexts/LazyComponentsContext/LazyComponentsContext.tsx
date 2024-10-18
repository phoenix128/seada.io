'use client';

import React, { createContext, PropsWithChildren, useCallback, useState } from 'react';

export interface ILazyComponentsContext {
    lazyComponents: Record<string, any>;
    setLazyComponents: (key: string, value: any) => void;
}

const LazyComponentsContext = createContext<ILazyComponentsContext>({} as ILazyComponentsContext);

/**
 * This is a generic context provider for holding LazyComponents information.
 * @param children
 * @param contexts
 * @constructor
 */
export const LazyComponentsContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [data, setData] = useState<Record<string, any>>({});

    const setValue = useCallback((key: string, value: any) => {
        setData((prevData) => ({ ...prevData, [key]: value }));
    }, []);

    return (
        <LazyComponentsContext.Provider value={{ lazyComponents: data, setLazyComponents: setValue }}>
            {children}
        </LazyComponentsContext.Provider>
    );
};

export default LazyComponentsContext;
