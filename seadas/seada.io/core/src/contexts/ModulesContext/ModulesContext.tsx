'use client';

import React, { memo, PropsWithChildren, useMemo } from 'react';
import getRootContexts from '@seada.io/core/service/get-root-contexts';

interface IContextStackProps {
    stack: React.ComponentType<any>[];
    stackPosition?: number;
}

const ContextStack: React.FC<PropsWithChildren<IContextStackProps>> = memo(
    ({ stack, stackPosition = 0, children }) => {
        const Context = stack[stackPosition];

        if (stackPosition >= stack.length) return <>{children}</>;

        return (
            <Context>
                <ContextStack stack={stack} stackPosition={stackPosition + 1}>
                    {children}
                </ContextStack>
            </Context>
        );
    },
    () => true
);

ContextStack.displayName = 'ContextStack';

/**
 * This is a generic context provider that takes a list of root-level contexts from modules.
 * @param children
 * @param contexts
 * @constructor
 */
const ModulesContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const rootContexts = useMemo(() => getRootContexts(), []);

    return <ContextStack stack={rootContexts}>{children}</ContextStack>;
};

export default ModulesContextProvider;
