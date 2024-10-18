import React from 'react';
import useTwTextAppearance from '@seada.io/basic-ui/hooks/tw/use-tw-text-appearance';
import { twMerge } from 'tailwind-merge';
import Box from '@seada.io/basic-ui/page-components/Box';
import { ITextSchema } from '@seada.io/basic-ui/page-components/Text/schema';
import { IPageComponentSchemaProps } from '@seada.io/core-schema/spi/components/interface';

const Text: React.FC<IPageComponentSchemaProps<ITextSchema>> = (props) => {
    const { text, hasHtml } = props;
    const textClasses = useTwTextAppearance(props);

    return (
        <Box {...props} className={'flex flex-row items-center'}>
            {hasHtml && (
                <div className={twMerge(textClasses, 'w-full')} dangerouslySetInnerHTML={{ __html: text ?? '' }}></div>
            )}
            {!hasHtml && <div className={twMerge(textClasses, 'w-full')}>{text ?? ''}</div>}
        </Box>
    );
};

export default Text;
