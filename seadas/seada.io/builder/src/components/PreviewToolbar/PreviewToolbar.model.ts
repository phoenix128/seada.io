import { IPreviewSizeProps } from '@seada.io/builder/components/PreviewToolbar/PreviewToolbar';
import React, { ChangeEvent, useCallback, useContext, useEffect, useState } from 'react';
import BuilderContext from '@seada.io/builder/contexts/BuilderContext';
import { useTranslation } from 'react-i18next';

const usePreviewToolbarModel = (props: IPreviewSizeProps) => {
    const { previewFrameRef } = props;
    const { pageSize, pagePath: currentPagePath, builderTarget } = useContext(BuilderContext);
    const size = pageSize ? pageSize?.width + 'x' + pageSize?.height : '...';
    const [pagePath, setPagePath] = useState(currentPagePath);

    useEffect(() => {
        setPagePath(currentPagePath);
    }, [currentPagePath]);

    const handlePagePathChange = useCallback((evt: ChangeEvent<HTMLInputElement>) => {
        setPagePath(evt.target.value);
    }, []);

    const handlePagePathKeyDown = useCallback(
        (evt: React.KeyboardEvent<HTMLInputElement>) => {
            if (evt.key === 'Enter') {
                previewFrameRef.current.src = builderTarget + '/' + pagePath;
            }
        },
        [builderTarget, pagePath, previewFrameRef]
    );

    const handleGoToPage = useCallback(() => {
        previewFrameRef.current.src = builderTarget + '/' + pagePath;
    }, [builderTarget, pagePath, previewFrameRef]);

    return {
        data: {
            size,
            pagePath,
        },
        handlers: {
            handlePagePathChange,
            handlePagePathKeyDown,
            handleGoToPage,
        },
    };
};

export default usePreviewToolbarModel;
