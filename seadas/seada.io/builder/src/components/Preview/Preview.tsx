import React from 'react';
import useBuilderContext from '@seada.io/builder/hooks/use-builder-context';
import useTwBreakpointsWidth from '@seada.io/core/hooks/tw/use-tw-breakpoints-width';
import { twMerge } from 'tailwind-merge';

interface IPreviewProps {
    previewFrameRef: React.MutableRefObject<HTMLIFrameElement>;
    className?: string;
}

const Preview: React.FC<IPreviewProps> = ({ previewFrameRef, className }) => {
    const { builderTarget, currentTwBreakpoint } = useBuilderContext();
    const maxWidth = useTwBreakpointsWidth()?.[currentTwBreakpoint] - 1;

    return (
        <div
            className={twMerge(
                className,
                'w-full h-full p-2 bg-gray-100 rounded-t-md shadow-[inset_0px_0px_16px_rgba(50,50,50,0.5)]'
            )}
        >
            <iframe
                style={{ maxWidth: maxWidth !== Infinity && !isNaN(maxWidth) ? maxWidth : '100%' }}
                ref={previewFrameRef}
                src={builderTarget}
                className={
                    'w-full h-full bg-white m-auto transition-all duration-300 ease-in-out shadow-xl shadow-gray-600'
                }
            ></iframe>
        </div>
    );
};

export default Preview;
