'use client';

import React, { PropsWithChildren, useCallback } from 'react';
import Link from 'next/link';
import useAreaPath from '@seada.io/core/hooks/use-area-path';
import usePageLoading from '@seada.io/core/hooks/use-page-loading';

interface ISeadaLinkProps {
    path: string;
    areaMapping?: boolean;
    className?: string;
}

const SeadaLink: React.FC<PropsWithChildren<ISeadaLinkProps>> = (props) => {
    const { className, path, children, areaMapping = true, ...otherProps } = props;
    const areaPath = useAreaPath(path);
    const href = (areaMapping ? areaPath : path).replace(/^\//, '');
    const pageLoading = usePageLoading();

    const handleClick = useCallback(() => {
        pageLoading(`/${href}`);
    }, [href, pageLoading]);

    return (
        <Link onClick={handleClick} className={className} href={`/${href}`} {...otherProps}>
            {children}
        </Link>
    );
};

export default SeadaLink;
