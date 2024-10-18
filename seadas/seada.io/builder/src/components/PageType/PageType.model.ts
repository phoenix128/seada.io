import { IPageTypeProps } from '@seada.io/builder/components/PageType/PageType';
import { useTranslation } from 'react-i18next';
import { ChangeEvent, useCallback, useContext, useEffect, useMemo, useRef } from 'react';
import BuilderContext from '@seada.io/builder/contexts/BuilderContext';
import useListPageVariants from '@seada.io/builder/hooks/use-list-page-variants';
import { INewTemplateNameModalRef } from '@seada.io/builder/components/NewTemplateNameModal/NewTemplateNameModal';

const usePageTypeModel = (props: IPageTypeProps) => {
    const { t } = useTranslation();
    const { pageData, setPageData, pageToBeSaved, setPageToBeSaved } = useContext(BuilderContext);
    const pageTemplate = pageData?.pageTemplate;
    const { variants, reload: reloadVariants } = useListPageVariants(pageData?.areaCode, pageData?.pageType);
    const newTemplateModalRef = useRef<INewTemplateNameModalRef>();

    const handleCreateNewVariant = useCallback(
        (templateName: string) => {
            setPageData((prevPageData) => ({
                ...prevPageData,
                pageTemplate: {
                    ...pageTemplate,
                    pageVariant: templateName,
                },
            }));
            setPageToBeSaved(true);
        },
        [pageTemplate, setPageData, setPageToBeSaved]
    );

    useEffect(() => {
        if (!pageToBeSaved) {
            reloadVariants(pageData?.pageType);
        }
    }, [pageData?.pageType, pageToBeSaved, reloadVariants]);

    const handleChange = useCallback(
        (evt: ChangeEvent<HTMLSelectElement>) => {
            if (!pageTemplate?.areaCode || !pageTemplate?.pageType) return;

            setPageToBeSaved(true);
            if (evt.target.value === 'new') {
                newTemplateModalRef.current?.open();
                return;
            }

            setPageData((prevPageData) => ({
                ...prevPageData,
                pageTemplate: {
                    ...prevPageData.pageTemplate,
                    pageVariant: evt.target.value,
                },
            }));
        },
        [pageTemplate?.areaCode, pageTemplate?.pageType, setPageData, setPageToBeSaved]
    );

    const options = useMemo(() => {
        if (variants === undefined) return [];

        const res = (variants || [])
            ?.filter((v) => v !== 'default')
            .map((v) => ({
                label: `${pageTemplate.pageType} / ${v}`,
                value: v,
            }));

        res.unshift({
            label: t('builder.page.type.default', {
                type: pageTemplate?.pageType,
            }),
            value: 'default',
        });

        if (!variants?.includes(pageTemplate?.pageVariant)) {
            res.push({
                label: `${pageTemplate?.pageType} / ${pageTemplate?.pageVariant}`,
                value: pageTemplate?.pageVariant,
            });
        }

        res?.push({ label: t('builder.page.type.new'), value: 'new' });
        return res;
    }, [pageTemplate?.pageType, pageTemplate?.pageVariant, t, variants]);

    return {
        data: {
            pageTemplate,
            options,
            variants,
        },
        handlers: {
            handleChange,
            handleCreateNewVariant,
        },
        refs: {
            newTemplateModalRef,
        },
    };
};

export default usePageTypeModel;
