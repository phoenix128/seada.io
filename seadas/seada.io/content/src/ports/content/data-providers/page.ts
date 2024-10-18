import { IDataProvider } from '@seada.io/core/spi/components/interface';
import adapterDataProvider from '@seada.io/core/spi/data-providers/adapter-data-provider';
import { IContentPageData } from '@seada.io/content/interface/page';
import contentPortClass from '@seada.io/content/spi/content-port-class';

export interface IPageDataProviderResult {
    page: IContentPageData;
}

const dataProvider: IDataProvider<IPageDataProviderResult> = (component, pageData, variables) =>
    adapterDataProvider(component, pageData, variables, contentPortClass, 'page');

export default dataProvider;
