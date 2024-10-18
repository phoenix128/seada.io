import usePageData from '@seada.io/core/hooks/use-page-data';

const useCartSourceId = () => {
    const { sourceIds } = usePageData();
    return sourceIds['cart'];
};

export default useCartSourceId;
