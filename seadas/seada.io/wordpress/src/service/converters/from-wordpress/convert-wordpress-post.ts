import { Post } from '@seada.io/wordpress/gql/schema/graphql';
import { IContentPostData } from '@seada.io/content/interface/post';

const convertWordpressPost = (post: Post): IContentPostData => {
    if (!post || !post.id) {
        return null;
    }

    return {
        id: post.id.toString(),
        key: post.slug,
        title: post.title,
        path: post.uri,
        content: post.content,
        mainImage: post.featuredImage?.node?.mediaItemUrl || null,
    };
};

export default convertWordpressPost;
