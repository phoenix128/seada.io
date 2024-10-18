import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@nextui-org/react';
import PageLoaderOverlay from '@seada.io/core/components/PageLoaderOverlay/PageLoaderOverlay';
import useSavePageModel from '@seada.io/builder/components/SavePage/SavePage.model';

export interface ISavePageProps {
    className?: string;
}

const SavePage: React.FC<ISavePageProps> = (props) => {
    const { className } = props;
    const { t } = useTranslation();
    const {
        data: { pageToBeSaved, loading },
        handlers: { handleSavePage },
    } = useSavePageModel(props);

    return (
        <div className={className}>
            <Button
                disabled={!pageToBeSaved}
                className={'h-12 w-28 font-semibold'}
                color={pageToBeSaved ? 'danger' : 'success'}
                onClick={handleSavePage}
                isLoading={loading}
            >
                {pageToBeSaved ? t('builder.page.save') : t('builder.page.saved')}
            </Button>
            {loading && <PageLoaderOverlay />}
        </div>
    );
};

export default SavePage;
