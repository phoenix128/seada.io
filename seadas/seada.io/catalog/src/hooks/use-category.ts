import { ICategoryData } from '@seada.io/catalog/interface/category';
import useDataContext from '@seada.io/core/hooks/use-data-context';

const useCategory = (): ICategoryData | undefined => {
    const { category } = useDataContext();
    return category;
};

export default useCategory;
