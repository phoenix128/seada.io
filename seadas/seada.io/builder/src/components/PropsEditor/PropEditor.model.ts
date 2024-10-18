import { IPropEditorProps } from '@seada.io/builder/components/PropsEditor/PropEditor';
import React, { useCallback, useContext, useMemo, useState } from 'react';
import BuilderContext from '@seada.io/builder/contexts/BuilderContext';
import styles from '@seada.io/builder/components/PropsEditor/PropsEditor.module.css';
import getSchemaComponent from '@seada.io/core-schema/spi/components/get-schema-component';

const usePropEditorModel = (props: IPropEditorProps) => {
    const { component, fieldName, fieldSchema, handleChange } = props;

    const [buttons, setButtons] = useState<Record<string, React.FC>>({});
    const { pageData } = useContext(BuilderContext);

    const addButton = useCallback((key: string, component: React.FC) => {
        setButtons((prev) => ({ ...prev, [key]: component }));
    }, []);

    const removeButton = useCallback((key: string) => {
        setButtons((prev) => {
            const newButtons = { ...prev };
            delete newButtons[key];
            return newButtons;
        });
    }, []);

    const handleFieldChange = useCallback(
        (value: any) => {
            handleChange(fieldName, value);
        },
        [fieldName, handleChange]
    );

    const advancedClass = fieldSchema.advanced ? styles.Advanced : '';

    const schemaComponentProps = useMemo(
        () => ({
            allProps: component.props || {},
            fieldSchema: fieldSchema,
            onChange: handleFieldChange,
            data: component.props?.[fieldName],
            addButton: addButton,
            removeButton: removeButton,
            pageData: pageData,
            component: component,
        }),
        [component, fieldSchema, handleFieldChange, pageData, fieldName, addButton, removeButton]
    );

    const BasicSchemaComponent = getSchemaComponent(fieldSchema.type);

    return {
        data: {
            advancedClass,
            buttons,
            schemaComponentProps,
        },
        components: {
            BasicSchemaComponent,
        },
    };
};

export default usePropEditorModel;
