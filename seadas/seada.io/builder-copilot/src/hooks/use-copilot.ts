import useAsyncAction, { IAsyncActionCall } from '@seada.io/core/hooks/use-async-action';
import copilotEdit from '@seada.io/builder-copilot/server-actions/copilot-run';
import { useContext, useMemo } from 'react';
import BuilderContext from '@seada.io/builder/contexts/BuilderContext';
import removePageDynamicData from '@seada.io/core/spi/seada-pages/manipulation/remove-page-dynamic-data';
import useAsyncActionResult from '@seada.io/core/hooks/use-async-action-result';
import copyProvidersData from '@seada.io/core/service/data-providers/copy-providers-data';
import applyPageComponentPropsMiddlewares from '@seada.io/core/service/components/apply-page-component-props-middlewares';
import useToast from '@seada.io/core/hooks/use-toast';

const useCopilot = (): IAsyncActionCall => {
    const copilot = useAsyncAction(copilotEdit);
    const { pageData, setPageData } = useContext(BuilderContext);
    const toast = useToast();

    const action = useMemo(
        () => (prompt: string) => {
            const noDynamicPageData = removePageDynamicData(pageData);
            copilot.action(noDynamicPageData.pageTemplate.components, prompt);
        },
        [copilot, pageData]
    );

    useAsyncActionResult(copilot, (result) => {
        toast(result.message, { type: 'success' });

        const newPageData = copyProvidersData(
            applyPageComponentPropsMiddlewares({
                ...pageData,
                pageTemplate: {
                    ...pageData.pageTemplate,
                    components: result.components,
                },
            }),
            pageData
        );

        setPageData(newPageData);
    });

    return {
        ...copilot,
        action,
    };
};

export default useCopilot;
