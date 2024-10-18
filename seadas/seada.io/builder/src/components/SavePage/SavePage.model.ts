import { useCallback, useContext } from 'react';
import BuilderContext from '@seada.io/builder/contexts/BuilderContext';
import useAsyncAction from '@seada.io/core/hooks/use-async-action';
import savePage from '@seada.io/builder/server-actions/save-page';
import removeComponentsDynamicData from '@seada.io/core/spi/seada-pages/manipulation/remove-components-dynamic-data';
import { ISavePageProps } from '@seada.io/builder/components/SavePage/SavePage';

const useSavePageModel = (props: ISavePageProps) => {
    const { pageData, pagePath, setPageToBeSaved, pageToBeSaved, reloadPreview } = useContext(BuilderContext);
    const { loading, action: savePageAction } = useAsyncAction(savePage, reloadPreview);

    const handleSavePage = useCallback(() => {
        savePageAction(pagePath, {
            ...pageData,
            pageTemplate: {
                ...pageData.pageTemplate,
                components: removeComponentsDynamicData(pageData.pageTemplate.components),
            },
            pageLayout: {
                ...pageData.pageLayout,
                components: removeComponentsDynamicData(pageData.pageLayout.components),
            },
        });
        setPageToBeSaved(false);
    }, [savePageAction, pagePath, pageData, setPageToBeSaved]);

    return {
        handlers: {
            handleSavePage,
        },
        data: {
            pageToBeSaved,
            loading,
        },
    };
};

export default useSavePageModel;
