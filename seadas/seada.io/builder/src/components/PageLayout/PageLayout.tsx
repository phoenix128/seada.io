import React, { ChangeEvent, useCallback, useContext, useMemo } from 'react';
import { Select, SelectItem } from '@nextui-org/react';
import { useTranslation } from 'react-i18next';
import BuilderContext from '@seada.io/builder/contexts/BuilderContext';
import useListPageLayouts from '@seada.io/builder/hooks/use-list-page-layouts';

export interface IPageLayoutProps {
    className?: string;
}

const PageLayout: React.FC<IPageLayoutProps> = ({ className }) => {
    const { t } = useTranslation();
    const { pageData, setPageData, setPageToBeSaved } = useContext(BuilderContext);
    const { layouts } = useListPageLayouts(pageData?.areaCode);
    const pageTemplate = pageData?.pageTemplate;

    const handleChange = useCallback(
        (evt: ChangeEvent<HTMLSelectElement>) => {
            if (!pageTemplate?.areaCode || !pageTemplate?.layout) return;

            setPageToBeSaved(true);
            setPageData({
                ...pageData,
                pageTemplate: {
                    ...pageTemplate,
                    layout: evt.target.value,
                },
            });
        },
        [pageData, pageTemplate, setPageData, setPageToBeSaved]
    );

    const options = useMemo(() => {
        const res = (layouts || [])
            ?.filter((v) => v !== 'default')
            .map((layoutName) => ({
                label: layoutName,
                value: layoutName,
            }));

        res.unshift({
            label: t('builder.page.layout.default'),
            value: 'default',
        });

        return res;
    }, [t, layouts]);

    return (
        <div className={className}>
            <Select
                variant={'faded'}
                color={pageTemplate?.layout === 'default' ? 'default' : 'warning'}
                onChange={handleChange}
                value={pageTemplate?.layout}
                size={'sm'}
                isLoading={!pageTemplate || !layouts?.length}
                label={t('builder.page.layout.select')}
                className={'w-full mb-4'}
                selectedKeys={pageTemplate?.layout ? [pageTemplate?.layout] : []}
            >
                {options?.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                        {option.label}
                    </SelectItem>
                ))}
            </Select>
        </div>
    );
};

export default PageLayout;
