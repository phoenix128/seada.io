import React, { ChangeEvent, useCallback, useContext, useMemo } from 'react';
import { Input } from '@nextui-org/react';
import { useTranslation } from 'react-i18next';
import BuilderContext from '@seada.io/builder/contexts/BuilderContext';
import getPageComponentSchema from '@seada.io/core-schema/spi/components/get-page-component-schema';
import findComponent from '@seada.io/core/spi/seada-pages/manipulation/find-component';

export interface IComponentTitleProps {}

const ComponentTitle: React.FC<IComponentTitleProps> = () => {
    const { selectedItem, pageData, setPageData } = useContext(BuilderContext);

    const pageTemplate = pageData?.pageTemplate;
    const { t } = useTranslation();
    const component = useMemo(() => findComponent(pageData, selectedItem.id), [pageData, selectedItem.id]);

    const handleChange = useCallback(
        (evt: ChangeEvent<HTMLInputElement>) => {
            const { value } = evt.target;
            if (!component) return;

            component.label = value;
            setPageData({ ...pageData, pageTemplate });
        },
        [pageData, pageTemplate, component, setPageData]
    );

    if (!selectedItem || !component) return null;

    const schema = getPageComponentSchema(component.type);

    return (
        <Input
            onChange={handleChange}
            value={component.label || schema.title}
            label={t('schema.component-title')}
            size={'sm'}
        />
    );
};

export default ComponentTitle;
