import { IPageComponentDefinition } from '@seada.io/core/spi/seada-pages/interface';
import { IPageData } from '@seada.io/core/spi/components/interface';
import applyComponentPropMiddleware from '@seada.io/core/spi/seada-pages/manipulation/apply-component-prop-middleware';

const recursivelyApplyMiddleware = (components: IPageComponentDefinition[], pageData: IPageData) => {
    if (!components) return;

    for (const component of components) {
        component.providedProps = applyComponentPropMiddleware(component, component.props, pageData);

        if (component.children?.length) {
            recursivelyApplyMiddleware(component.children, pageData);
        }
    }
};

/**
 * Apply components middleware
 * @param page
 */
const applyPageComponentPropsMiddlewares = (page: IPageData): IPageData => {
    const res = JSON.parse(JSON.stringify(page));
    recursivelyApplyMiddleware(res.pageLayout.components, page);
    recursivelyApplyMiddleware(res.pageTemplate.components, page);

    return res;
};

export default applyPageComponentPropsMiddlewares;
