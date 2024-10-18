import { IDataProvider } from '@seada.io/core/spi/components/interface';
import adapterDataProvider from '@seada.io/core/spi/data-providers/adapter-data-provider';
import { IContentPostData } from '@seada.io/content/interface/post';
import contentPortClass from '@seada.io/content/spi/content-port-class';

export interface IPostDataProviderResult {
    post: IContentPostData;
}

const dataProvider: IDataProvider<IPostDataProviderResult> = (component, pageData, variables) =>
    adapterDataProvider(component, pageData, variables, contentPortClass, 'post');

export default dataProvider;
