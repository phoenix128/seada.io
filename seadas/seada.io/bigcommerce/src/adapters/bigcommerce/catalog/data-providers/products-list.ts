import { IDataProvider, IPageData, IVariables } from '@seada.io/core/spi/components/interface';
import { IProductsListDataProviderResult } from '@seada.io/catalog/ports/catalog/data-providers/products-list';
import { IPageComponentDefinition } from '@seada.io/core/spi/seada-pages/interface';
import multiClassProductsList, {
    IProductsListDataProviderInputProps,
} from '@seada.io/bigcommerce/service/data-providers/multi-class-products-list';
import catalogPortClass from '@seada.io/catalog/spi/catalog-port-class';

const productsList: IDataProvider<IProductsListDataProviderResult> = (
    component: IPageComponentDefinition<IProductsListDataProviderInputProps>,
    pageData: IPageData,
    variables: IVariables
) => {
    return multiClassProductsList(component, pageData, catalogPortClass, variables);
};

export default productsList;
