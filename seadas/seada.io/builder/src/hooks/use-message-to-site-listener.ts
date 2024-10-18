import { useEventListener } from 'usehooks-ts';
import { IMessageToSite } from '@seada.io/builder/libs/messages';

interface IMessageEvent<TMessage extends IMessageToSite> {
    data?: Pick<TMessage, 'payload' | 'type'>;
}

const useMessageToSiteListener = <TMessage extends IMessageToSite>(
    messageType: TMessage['type'],
    callback: (payload: TMessage['payload']) => void
) => {
    useEventListener('message', (event: IMessageEvent<TMessage>) => {
        if (event.data && event.data.type === messageType) {
            callback(event.data.payload);
        }
    });
};

export default useMessageToSiteListener;
