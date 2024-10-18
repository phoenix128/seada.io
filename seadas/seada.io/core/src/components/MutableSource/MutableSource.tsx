import React, { PropsWithChildren, useEffect, useState } from 'react';

export interface IMutableSourceProps {
    source: string;
}

/**
 * This is  a utility wrapper to force components to re-mount when the source is modified.
 * Source modification changes the hooks sequence, so we need to force the props components to re-mount.
 * @param source
 * @param children
 */
const MutableSource: React.FC<PropsWithChildren<IMutableSourceProps>> = ({ source, children }) => {
    const [lastSource, setLastSource] = useState<string>(source);

    useEffect(() => {
        if (source !== lastSource) {
            setLastSource(source);
        }
    }, [lastSource, source]);

    if (source !== lastSource) return;

    return <>{children}</>;
};

export default MutableSource;
