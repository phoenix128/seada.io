import { Page } from '@seada.io/wordpress/gql/schema/graphql';
import { IContentPageData } from '@seada.io/content/interface/page';

const convertWordpressPage = (page: Page): IContentPageData => {
    if (!page || !page.id) {
        return null;
    }

    return {
        id: page.id.toString(),
        key: page.slug,
        title: page.title,
        path: page.uri,
        content: page.content,
        mainImage: page.featuredImage?.node?.mediaItemUrl || null,
    };
};

export default convertWordpressPage;
