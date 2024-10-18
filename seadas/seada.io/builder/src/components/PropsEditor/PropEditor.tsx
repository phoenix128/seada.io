import styles from '@seada.io/builder/components/PropsEditor/PropsEditor.module.css';
import { twMerge } from 'tailwind-merge';
import React, { useMemo } from 'react';
import { ISchemaField } from '@seada.io/core-schema/spi/components/interface';
import { IPageComponentDefinition } from '@seada.io/core/spi/seada-pages/interface';
import TwBreakpointWrapper from '@seada.io/core-schema/components/TwBreakpointWrapper';
import usePropEditorModel from '@seada.io/builder/components/PropsEditor/PropEditor.model';
import { useTranslation } from 'react-i18next';
import LocalesWrapper from '@seada.io/core-schema/components/LocalesWrapper';

export interface IPropEditorProps {
    fieldName: string;
    fieldSchema: ISchemaField;
    component: IPageComponentDefinition;
    handleChange: (fieldName: string, value: any) => void;
}

const PropEditor: React.FC<IPropEditorProps> = (props) => {
    const { fieldName, fieldSchema } = props;
    const {
        data: { advancedClass, buttons, schemaComponentProps },
        components: { BasicSchemaComponent },
    } = usePropEditorModel(props);
    const { t } = useTranslation();

    const buttonsTab = useMemo(() => {
        return Object.keys(buttons)
            .sort()
            .map((buttonKey, idx) => {
                const ButtonComponent = buttons[buttonKey];
                return <ButtonComponent key={idx} />;
            });
    }, [buttons]);

    return (
        <div key={fieldName} className={twMerge(advancedClass)}>
            <div className={styles.Field}>
                <div className={styles.FieldHeader}>
                    <div className={styles.FieldTitle}>{t(fieldSchema.label)}</div>
                    <div className={styles.FieldHeaderButtons}>{buttonsTab}</div>
                </div>
                <div className={styles.FieldEditor}>
                    {!fieldSchema.localizable && fieldSchema.responsive && (
                        <TwBreakpointWrapper {...schemaComponentProps} SchemaComponent={BasicSchemaComponent} />
                    )}
                    {fieldSchema.localizable && (
                        <LocalesWrapper {...schemaComponentProps} SchemaComponent={BasicSchemaComponent} />
                    )}
                    {!fieldSchema.responsive && !fieldSchema.localizable && (
                        <BasicSchemaComponent {...schemaComponentProps} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default PropEditor;
