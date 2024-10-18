import { IPlugin } from '@seada.io/core/interface';
import productsList from '@seada.io.source/catalog/ports/catalog/data-providers/products-list';
import findComponent from '@seada.io/core/spi/seada-pages/manipulation/find-component';
import adapterDataProvider from '@seada.io/core/spi/data-providers/adapter-data-provider';
import searchPortClass from '@seada.io/search/spi/search-port-class';

/**
 * Add products list for search port class
 * @param callback
 * @param component
 * @param pageData
 * @param variables
 */
const addProductsList: IPlugin<typeof productsList, 100> = (callback, component, pageData, variables) => {
    const sourceComponent = component.props.componentReference
        ? findComponent(pageData, component.props.componentReference)
        : component;

    if (pageData.pageType === 'search') {
        return adapterDataProvider(sourceComponent, pageData, variables, searchPortClass, 'products-list');
    }

    return callback(sourceComponent, pageData, variables);
};

export default addProductsList;
