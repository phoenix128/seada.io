import React, { useMemo } from 'react';
import { IResponsiveSchemaComponentProps } from '@seada.io/core-schema/spi/components/interface';
import { Autocomplete, AutocompleteItem } from '@nextui-org/react';
import useCategoriesList from '@seada.io/catalog/hooks/builder/use-categories-list';
import { useTranslation } from 'react-i18next';
import VariableWrapper from '@seada.io/core-schema/components/VariableWrapper';
import { ICatalogCategorySchemaType } from '@seada.io/catalog/schema-components/Category/schema';

export interface ICategoryOptions {}

export interface ICategoryProps extends IResponsiveSchemaComponentProps<ICatalogCategorySchemaType, ICategoryOptions> {
    className?: string;
}

const Category: React.FC<ICategoryProps> = (props) => {
    const { pageData, data, onChange } = props;
    const { t } = useTranslation();
    const { categories } = useCategoriesList(pageData);
    const categoryItems = categories.map((category) => (
        <AutocompleteItem
            key={category.id}
            value={category.id}
            startContent={<div className={'text-gray-400'}>{category.path}</div>}
        >
            {category.name}
        </AutocompleteItem>
    ));

    const selectedCategory = useMemo(
        () => categories.find((category) => category.id.toString() === data),
        [categories, data]
    );

    return (
        <VariableWrapper {...props} isArray={false} maxItems={1}>
            <Autocomplete
                label={t('schema.commerce.categoryPicker.selectCategory')}
                onClear={() => onChange('')}
                isClearable={true}
                selectedKey={data}
                onSelectionChange={onChange}
                startContent={<div className={'text-gray-400 text-xs text-nowrap'}>{selectedCategory?.path}</div>}
                placeholder={t('schema.commerce.categoryPicker.noCategory')}
            >
                {categoryItems}
            </Autocomplete>
        </VariableWrapper>
    );
};

export default Category;
