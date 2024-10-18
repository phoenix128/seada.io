import { IPropsEditorProps } from '@seada.io/builder/components/PropsEditor/PropsEditor';
import { ChangeEvent, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import BuilderContext from '@seada.io/builder/contexts/BuilderContext';
import useComponentSchema from '@seada.io/builder/hooks/use-component-schema';
import findComponent from '@seada.io/core/spi/seada-pages/manipulation/find-component';
import applyComponentPropMiddleware from '@seada.io/core/spi/seada-pages/manipulation/apply-component-prop-middleware';

const usePropsEditorModel = (props: IPropsEditorProps) => {
    const { selectedItem, pageData, pageIsLoading, setPageData, setPageToBeSaved, advancedMode } =
        useContext(BuilderContext);
    const schema = useComponentSchema(selectedItem);

    const [sourceModified, setSourceModified] = useState<boolean>(false);
    const [search, setSearch] = useState<string>('');
    const inputRef = useRef<HTMLInputElement>();

    const component = findComponent(pageData, selectedItem?.component?.id);
    const handleChange = useCallback(
        (fieldName: string, value: any) => {
            const newPageData = JSON.parse(JSON.stringify(pageData));
            const component = findComponent(newPageData, selectedItem.id);

            if (!component.props) {
                component.props = {};
            }

            if (!component || JSON.stringify(component.props[fieldName]) === JSON.stringify(value)) return;

            component.props[fieldName] = value;
            component.providedProps = applyComponentPropMiddleware(component, component.props, pageData);

            setPageData({ ...newPageData });
            setPageToBeSaved(true);
        },
        [pageData, selectedItem?.id, setPageData, setPageToBeSaved]
    );

    const handleSearchChange = useCallback(
        (evt: ChangeEvent<HTMLInputElement>) => {
            setSearch(evt.target.value);
        },
        [setSearch]
    );

    const handleClear = useCallback(() => {
        setSearch('');
    }, [setSearch]);

    const selectedKeys = useMemo(() => {
        if (!search || !selectedItem) return undefined;
        return Object.keys(schema.fields);
    }, [search, selectedItem, schema?.fields]);

    useEffect(() => {
        if (sourceModified) setSourceModified(false);
    }, [sourceModified]);

    const focusInput = useCallback((e: KeyboardEvent) => {
        if (!inputRef.current) return;

        if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
            e.preventDefault();
            inputRef.current.focus();
            inputRef.current.select();
        }
    }, []);

    useEffect(() => {
        window.addEventListener('keydown', focusInput);
        return () => {
            window.removeEventListener('keydown', focusInput);
        };
    }, [focusInput]);

    const hasSchema = component && schema.fields;

    return {
        data: {
            pageIsLoading,
            search,
            sourceModified,
            hasSchema,
            selectedItem,
            schema,
            component,
            selectedKeys,
            advancedMode,
        },
        handlers: {
            handleSearchChange,
            handleClear,
            handleChange,
        },
        refs: {
            inputRef,
        },
    };
};

export default usePropsEditorModel;
