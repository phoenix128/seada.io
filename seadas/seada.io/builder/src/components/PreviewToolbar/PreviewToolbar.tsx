import React, { ChangeEvent, PropsWithChildren, useCallback, useContext, useEffect, useState } from 'react';
import BuilderContext from '@seada.io/builder/contexts/BuilderContext';
import { useTranslation } from 'react-i18next';
import { twMerge } from 'tailwind-merge';
import { Button, Input } from '@nextui-org/react';
import usePreviewToolbarModel from '@seada.io/builder/components/PreviewToolbar/PreviewToolbar.model';

export interface IPreviewSizeProps {
    previewFrameRef: React.MutableRefObject<HTMLIFrameElement>;
    className?: string;
}

const PreviewToolbar: React.FC<PropsWithChildren<IPreviewSizeProps>> = (props) => {
    const { className } = props;
    const { t } = useTranslation();
    const {
        data: { size, pagePath },
        handlers: { handlePagePathChange, handlePagePathKeyDown, handleGoToPage },
    } = usePreviewToolbarModel(props);

    return (
        <div
            className={twMerge(
                className,
                'w-full bg-background text-xs flex gap-4 flex-row items-center justify-center'
            )}
        >
            <div>
                <Input
                    size={'sm'}
                    label={t('builder.page.size')}
                    labelPlacement={'outside-left'}
                    value={size || undefined}
                    disabled={true}
                />
            </div>
            <div className={'flex flex-row items-center'}>
                <span>{t('builder.page.path')}</span>&nbsp;
                <Input
                    size={'sm'}
                    aria-label={t('builder.page.path')}
                    labelPlacement={'outside'}
                    className={'rounded-r-none w-96'}
                    onKeyDown={handlePagePathKeyDown}
                    value={pagePath || undefined}
                    onChange={handlePagePathChange}
                />
                <Button size={'sm'} color={'primary'} className={'rounded-l-none -ml-2'} onClick={handleGoToPage}>
                    {t('builder.page.go')}
                </Button>
            </div>
        </div>
    );
};

export default PreviewToolbar;
