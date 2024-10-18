import usePageData from '@seada.io/core/hooks/use-page-data';

const useMetaValue = (key: string, defaultValue: any = null) => {
    const pageContext = usePageData();
    const res = pageContext?.variables?.[key];
    return res ?? defaultValue;
};

export default useMetaValue;
