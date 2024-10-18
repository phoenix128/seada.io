'use client';

import React, { ReactElement, Suspense, useContext, useMemo, useRef } from 'react';
import { IPageComponentDefinition } from '@seada.io/core/spi/seada-pages/interface';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorComponent from '@seada.io/core/components/ErrorComponent';
// Reimporting self under a different symbol to allow plugins to work in recursive calls
import RecursiveComponentRenderer from '@seada.io/core/components/ComponentRenderer/ComponentRenderer';
import PageDataContext from '@seada.io/core/contexts/PageDataContext';
import getPageComponent from '@seada.io/core/spi/components/get-page-component';
import { Spinner } from '@nextui-org/react';
import LazyComponentsContext from '@seada.io/core/contexts/LazyComponentsContext';
import useResolvedVariables from '@seada.io/core/hooks/use-resolved-variables';
import useLocalizedVariables from '@seada.io/core/hooks/use-localized-props';

export interface IComponentRendererProps {
    component: IPageComponentDefinition;
}

const ComponentRenderer: React.FC<IComponentRendererProps> = ({ component }): ReactElement => {
    const { domRefs } = useContext(PageDataContext);
    const { setLazyComponents, lazyComponents } = useContext(LazyComponentsContext);
    const { children } = component;
    const { type: componentType, props: originalProps, providedProps: inProps, providersData } = component || {};
    domRefs[component.id] = useRef(null);

    // Apply variables conversion to the props
    const localizedProps = useLocalizedVariables(inProps);
    const props = useResolvedVariables(localizedProps);

    const ReactPageComponent = useMemo(() => {
        if (lazyComponents.hasOwnProperty(componentType)) {
            return lazyComponents[componentType];
        }

        const c = componentType ? getPageComponent(componentType) : null;
        const isLazy = typeof c === 'object' && (c as any)?.['$$typeof'] === Symbol.for('react.lazy');
        if (isLazy) {
            // Need to set the lazy component in the next tick to avoid rendering update issues with LazyComponentsContext
            setTimeout(() => setLazyComponents(componentType, c), 200);
        }

        return c;
    }, [componentType, lazyComponents, setLazyComponents]);

    // Check if the component is disabled for the current breakpoint
    // const visibility = useTwResponsiveValue(originalProps?.visibility);
    // if (visibility === 'disabled') {
    //     return null;
    // }

    return (
        <ErrorBoundary FallbackComponent={(props) => <ErrorComponent component={component} {...props} />}>
            <Suspense fallback={<Spinner color={'primary'} size={'md'} />}>
                <ReactPageComponent
                    {...props}
                    domRef={domRefs[component.id]}
                    componentId={component.id}
                    componentType={componentType}
                    providersData={providersData}
                >
                    {children?.map((childComponent) => (
                        <RecursiveComponentRenderer
                            key={childComponent.id}
                            component={childComponent as IPageComponentDefinition}
                        />
                    ))}
                </ReactPageComponent>
            </Suspense>
        </ErrorBoundary>
    );
};

export default ComponentRenderer;
