import React from 'react';
import { Select, SelectItem } from '@nextui-org/react';
import { twMerge } from 'tailwind-merge';
import { useTranslation } from 'react-i18next';
import NewTemplateNameModal from '@seada.io/builder/components/NewTemplateNameModal';
import usePageTypeModel from '@seada.io/builder/components/PageType/PageType.model';

export interface IPageTypeProps {
    className?: string;
}

const PageType: React.FC<IPageTypeProps> = (props) => {
    const { className } = props;
    const { t } = useTranslation();
    const {
        data: { pageTemplate, variants, options },
        handlers: { handleChange, handleCreateNewVariant },
        refs: { newTemplateModalRef },
    } = usePageTypeModel(props);

    return (
        <>
            <Select
                color={pageTemplate?.pageVariant === 'default' ? 'default' : 'warning'}
                onChange={handleChange}
                value={pageTemplate?.pageVariant}
                size={'sm'}
                variant={'faded'}
                isLoading={!pageTemplate || !variants?.length}
                label={t('builder.page.type.select')}
                className={twMerge(className, 'w-full mb-4')}
                selectedKeys={pageTemplate?.pageVariant ? [pageTemplate.pageVariant] : []}
            >
                {options?.map((option, index) => (
                    <SelectItem key={option.value} value={option.value}>
                        {option.label}
                    </SelectItem>
                ))}
            </Select>

            <NewTemplateNameModal
                ref={newTemplateModalRef}
                initialValue={pageTemplate?.pageVariant}
                onConfirm={handleCreateNewVariant}
            />
        </>
    );
};

export default PageType;
