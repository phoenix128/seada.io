import { useEventListener } from 'usehooks-ts';
import { IMessageToBuilder } from '@seada.io/builder/libs/messages';

interface IMessageEvent<TMessage extends IMessageToBuilder> {
    data?: Pick<TMessage, 'payload' | 'type'>;
}

const useMessageToBuilderListener = <TMessage extends IMessageToBuilder>(
    messageType: TMessage['type'],
    callback: (payload: TMessage['payload']) => void
) => {
    useEventListener('message', (event: IMessageEvent<TMessage>) => {
        if (event.data && event.data.type === messageType) {
            callback(event.data.payload);
        }
    });
};

export default useMessageToBuilderListener;
