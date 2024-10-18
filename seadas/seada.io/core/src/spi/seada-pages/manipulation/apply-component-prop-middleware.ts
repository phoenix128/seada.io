import { IPageComponentDefinition } from '@seada.io/core/spi/seada-pages/interface';
import { IPageComponentPropsMiddleware, IPageData } from '@seada.io/core/spi/components/interface';

const applyComponentPropMiddleware = <TProps extends Record<string, any> = Record<string, any>>(
    component: IPageComponentDefinition<TProps>,
    props: TProps,
    pageData: IPageData,
    middlewares?: IPageComponentPropsMiddleware[]
): TProps => {
    if (!middlewares) {
        return component.providedProps;
    }

    component.providedProps = JSON.parse(JSON.stringify(props)) as TProps;
    for (const middleware of middlewares) {
        component.providedProps = middleware(component, component.providedProps, pageData) as TProps;
    }

    return component.providedProps;
};

export default applyComponentPropMiddleware;
