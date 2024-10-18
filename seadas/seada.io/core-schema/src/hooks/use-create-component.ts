import { v4 as uuidv4 } from 'uuid';
import getPageComponentSchema from '@seada.io/core-schema/spi/components/get-page-component-schema';
import { useTranslation } from 'react-i18next';
import { IPageComponentSchema } from '@seada.io/core-schema/spi/components/interface';
import { IPageComponentDefinition } from '@seada.io/core/spi/seada-pages/interface';
import applyComponentPropMiddleware from '@seada.io/core/spi/seada-pages/manipulation/apply-component-prop-middleware';
import { useContext } from 'react';
import BuilderContext from '@seada.io/builder/contexts/BuilderContext';

export interface IUserCreateComponent {
    (componentCode: string, props?: Record<string, any>): IPageComponentDefinition;
}

/**
 * Get default values for a component
 * @param schema
 */
const getDefaultValues = (schema: IPageComponentSchema): Record<string, any> => {
    const defaultValues: Record<string, any> = {};

    if (schema.fields) {
        for (const group of Object.values(schema.fields)) {
            for (const [fieldName, fieldValue] of Object.entries(group.fields)) {
                defaultValues[fieldName] = fieldValue.defaultValue;
            }
        }
    }

    return defaultValues;
};

const useCreateComponent = (): IUserCreateComponent => {
    const { t } = useTranslation();
    const { pageData } = useContext(BuilderContext);

    return (componentCode: string, props?: Record<string, any>): IPageComponentDefinition => {
        const id = uuidv4();
        const schema = getPageComponentSchema(componentCode);
        const defaultValues = getDefaultValues(schema);

        const initProps = props ? { ...defaultValues, ...props } : defaultValues;

        const component: IPageComponentDefinition = {
            id,
            label: t(schema.title),
            type: componentCode,
            props: initProps,
            providersData: undefined, // Keep it undefined, otherwise it will not be provided
        };

        component.providedProps = applyComponentPropMiddleware(component, component.props, pageData);

        return component;
    };
};

export default useCreateComponent;
