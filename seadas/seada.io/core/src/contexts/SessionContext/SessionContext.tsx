'use client';

import React, { createContext, PropsWithChildren, useCallback, useState } from 'react';

export interface ISessionContext {
    sessionValue: Record<string, any>;
    setSessionValue: (key: string, value: any) => void;
}

const SessionContext = createContext<ISessionContext>({} as ISessionContext);

/**
 * This is a generic context provider for holding session information.
 * @param children
 * @param contexts
 * @constructor
 */
export const SessionContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [data, setData] = useState<Record<string, any>>({});

    const setValue = useCallback((key: string, value: any) => {
        setData((prevData) => ({ ...prevData, [key]: value }));
    }, []);

    return (
        <SessionContext.Provider value={{ sessionValue: data, setSessionValue: setValue }}>
            {children}
        </SessionContext.Provider>
    );
};

export default SessionContext;
