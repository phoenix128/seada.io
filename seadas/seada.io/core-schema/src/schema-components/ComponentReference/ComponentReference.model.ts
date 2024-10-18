import { IComponentReferenceProps } from '@seada.io/core-schema/schema-components/ComponentReference/ComponentReference';
import { useMemo } from 'react';
import useFlatComponentsList from '@seada.io/core/hooks/use-flat-components-list';
import getPageComponentSchema from '@seada.io/core-schema/spi/components/get-page-component-schema';
import usePageDataPort from '@seada.io/core-schema/ports/schema/hooks/use-page-data-port';

const useComponentReferenceModel = (props: IComponentReferenceProps) => {
    const pageData = usePageDataPort();
    const {
        fieldSchema: { options },
    } = props;
    const allPageComponents = useFlatComponentsList(pageData, [props.component.id]);
    const pageComponents = useMemo(() => {
        return allPageComponents.filter((component) => {
            if (options.requiredProps && options.requiredProps.length) {
                const schema = getPageComponentSchema(component.type);
                return options.requiredProps.every((prop) =>
                    Object.values(schema.fields).some((group) => group.fields[prop])
                );
            }

            return true;
        });
    }, [allPageComponents, options.requiredProps]);

    const selectedComponent = useMemo(
        () => pageComponents.find((val) => val.id === props.data),
        [pageComponents, props.data]
    );

    const selectedComponentSchema = useMemo(() => {
        return selectedComponent?.type ? getPageComponentSchema(selectedComponent?.type) : null;
    }, [selectedComponent?.type]);

    return {
        data: {
            pageComponents,
            selectedComponent,
            selectedComponentSchema,
        },
    };
};

export default useComponentReferenceModel;
