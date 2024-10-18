import { ICategoryData } from '@seada.io/catalog/interface//category';
import { Category, CategoryTreeItem } from '@seada.io/bigcommerce/gql/schema/graphql';

const convertBigcommerceCategory = (category: Category | CategoryTreeItem): ICategoryData => {
    if (!category || !category.entityId) {
        return null;
    }

    return {
        id: category.entityId.toString(),
        key: category.entityId.toString(),
        name: category.name,
        path: category.path,
    };
};

export default convertBigcommerceCategory;
