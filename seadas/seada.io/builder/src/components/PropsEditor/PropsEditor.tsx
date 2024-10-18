import React from 'react';
import styles from '@seada.io/builder/components/PropsEditor/PropsEditor.module.css';
import { Accordion, AccordionItem, Divider, Input, Spinner } from '@nextui-org/react';
import ComponentTitle from '@seada.io/builder/components/ComponentTitle';
import { useTranslation } from 'react-i18next';
import AdvancedModeSwitch from '@seada.io/builder/components/AdvancedModeSwitch';
import PropEditor from '@seada.io/builder/components/PropsEditor/PropEditor';
import { CgSearch } from 'react-icons/cg';
import usePropsEditorModel from '@seada.io/builder/components/PropsEditor/PropsEditor.model';

export interface IPropsEditorProps {}

const shouldDisplayField = (search: string, text: string): boolean => {
    if (!search.length) return true;
    return text.toLowerCase().includes(search.toLowerCase());
};

const PropsEditor: React.FC<IPropsEditorProps> = (props) => {
    const { t } = useTranslation();
    const {
        data: { search, selectedKeys, hasSchema, selectedItem, schema, component, advancedMode, pageIsLoading },
        handlers: { handleChange, handleSearchChange, handleClear },
        refs: { inputRef },
    } = usePropsEditorModel(props);

    if (!selectedItem || !selectedItem.component || !component) return null;

    return (
        <div className={styles.PropsEditor}>
            {pageIsLoading && (
                <div className={styles.Loading}>
                    <Spinner className={styles.LoadingSpinner} size={'lg'} />
                    <div className={styles.LoadingText}>{t('builder.props.loading')}</div>
                </div>
            )}
            <ComponentTitle />
            {hasSchema && <AdvancedModeSwitch className={styles.AdvancedModeSwitch} />}
            <Input
                ref={inputRef}
                startContent={<CgSearch size={24} />}
                autoFocus={true}
                variant={'faded'}
                placeholder={t('builder.props.search')}
                size={'sm'}
                onChange={handleSearchChange}
                value={search}
                className={styles.Search}
                isClearable={true}
                onClear={handleClear}
            />
            <Accordion
                selectedKeys={selectedKeys}
                isCompact={false}
                variant={'light'}
                selectionMode={'multiple'}
                className={'px-0'}
            >
                {hasSchema &&
                    Object.entries(schema.fields)
                        .sort((a, b) => ((a[1].sort ?? 100) > (b[1].sort ?? 100) ? 1 : -1))
                        .map(([groupId, group]) => {
                            const properties = Object.entries(group.fields)
                                .map(([fieldName, fieldSchema], idx) => {
                                    if (!advancedMode && fieldSchema.advanced) {
                                        return null;
                                    }

                                    if (!shouldDisplayField(search, t(fieldSchema.label))) {
                                        return null;
                                    }

                                    return (
                                        <div key={selectedItem.id + ':' + fieldName}>
                                            <PropEditor
                                                fieldName={fieldName}
                                                fieldSchema={fieldSchema}
                                                component={component}
                                                handleChange={handleChange}
                                            />
                                            {idx !== Object.keys(group.fields).length - 1 && <Divider />}
                                        </div>
                                    );
                                })
                                .filter(Boolean);

                            if (properties.length === 0) return null;

                            return (
                                <AccordionItem
                                    isCompact={true}
                                    key={groupId}
                                    aria-label={t(group.title)}
                                    startContent={group.icon && <group.icon size={24} className={styles.GroupIcon} />}
                                    title={<div className={styles.GroupTitle}>{t(group.title)}</div>}
                                >
                                    <div className={styles.Content}>{properties}</div>
                                </AccordionItem>
                            );
                        })}
            </Accordion>
        </div>
    );
};

export default PropsEditor;
