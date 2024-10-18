import { IAsyncActionCall } from '@seada.io/core/hooks/use-async-action';
import useAsyncActionResult from '@seada.io/core/hooks/use-async-action-result';
import useGoToUrl from '@seada.io/core/hooks/use-go-to-url';

export type IAsyncRouterPush = Omit<IAsyncActionCall, 'action'> & { goTo: () => void };

/**
 * Utility hook to redirect to a specific page after an async action is completed returning the destination URL
 * @param asyncAction
 */
const useAsyncRouterPush = (asyncAction: IAsyncActionCall<() => Promise<string>>): IAsyncRouterPush => {
    const gotoUrl = useGoToUrl();

    useAsyncActionResult(asyncAction, (url) => {
        gotoUrl(url);
    });

    return {
        ...asyncAction,
        goTo: () => {
            asyncAction.action();
        },
    };
};

export default useAsyncRouterPush;
