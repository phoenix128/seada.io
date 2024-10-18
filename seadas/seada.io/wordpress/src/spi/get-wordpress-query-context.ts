import { ICorePageRouterAreaDefinition } from '@seada.io/core/spi/page-router/interface';
import { IWordpressQueryContext } from '@seada.io/wordpress/spi/wordpress-query-context';

const getWordpressQueryContext = (
    sourceId: string,
    pageData: ICorePageRouterAreaDefinition
): IWordpressQueryContext => {
    return {
        sourceId,
    };
};

export default getWordpressQueryContext;
