import React, { createContext, PropsWithChildren, useContext } from 'react';
import { IPageComponentPropsWithDataProvider } from '@seada.io/core/interface';

export type INestableContext = Record<string, any>;

export const NestableDataContext = createContext<INestableContext>({});

export type INestableDataContextProps = PropsWithChildren<
    Pick<IPageComponentPropsWithDataProvider<INestableContext>, 'providersData'>
>;

const NestableDataContextProvider: React.FC<INestableDataContextProps> = (props) => {
    const parentContext = useContext(NestableDataContext);

    return (
        <NestableDataContext.Provider value={{ ...parentContext, ...props.providersData, parent: parentContext }}>
            {props.children}
        </NestableDataContext.Provider>
    );
};

export default NestableDataContextProvider;
