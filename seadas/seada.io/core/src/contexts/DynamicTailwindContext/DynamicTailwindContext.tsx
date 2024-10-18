'use client';

import React, { createContext, PropsWithChildren, useCallback, useState } from 'react';
import { Config as TailwindConfig } from 'tailwindcss';
import Script from 'next/script';

export interface IDynamicTailwindContext {
    setDynamicTailwind: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IDynamicTailwindContextProviderProps {
    tailwindConfig: TailwindConfig;
    bakedTailwind: string;
}

const DynamicTailwindContext = createContext<IDynamicTailwindContext>({} as IDynamicTailwindContext);

export const DynamicTailwindContextProvider: React.FC<PropsWithChildren<IDynamicTailwindContextProviderProps>> = ({
    bakedTailwind,
    tailwindConfig,
    children,
}) => {
    const [dynamicTailwind, setDynamicTailwind] = useState<boolean>(false);

    const handleDynamicTailwindLoad = useCallback(() => {
        (window as any).tailwind.config = {
            ...tailwindConfig,
            corePlugins: {
                ...tailwindConfig.corePlugins,
                // preflight: true,
            },
        };
    }, [tailwindConfig]);

    return (
        <DynamicTailwindContext.Provider value={{ setDynamicTailwind }}>
            {!dynamicTailwind && bakedTailwind && (
                <style type={'text/css'} dangerouslySetInnerHTML={{ __html: bakedTailwind }} />
            )}
            {dynamicTailwind && (
                <Script src={'https://cdn.tailwindcss.com'} onLoad={handleDynamicTailwindLoad}></Script>
            )}
            {children}
        </DynamicTailwindContext.Provider>
    );
};

export default DynamicTailwindContext;
