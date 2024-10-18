import React, { useCallback } from 'react';
import { Input, Spinner } from '@nextui-org/react';
import { useTranslation } from 'react-i18next';
import useCopilot from '@seada.io/builder-copilot/hooks/use-copilot';

const CopilotInput: React.FC = () => {
    const { t } = useTranslation();
    const copilot = useCopilot();

    const handleKeyDown = useCallback(
        (evt: React.KeyboardEvent<HTMLInputElement>) => {
            if (evt.key === 'Enter') {
                copilot.action(evt.currentTarget.value);
            }
        },
        [copilot]
    );

    return (
        <div className={'w-full max-w-96'}>
            <Input
                disabled={copilot.loading}
                className={'w-full'}
                onKeyDown={handleKeyDown}
                size={'sm'}
                variant={'faded'}
                label={t('builder.copilot')}
                placeholder={t('builder.placeholder')}
                endContent={copilot.loading && <Spinner size="sm" />}
            />
        </div>
    );
};

export default CopilotInput;
