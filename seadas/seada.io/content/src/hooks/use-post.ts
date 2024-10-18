import useDataContext from '@seada.io/core/hooks/use-data-context';
import { IContentPostData } from '@seada.io/content/interface/post';

const usePost = (): IContentPostData => {
    const { post } = useDataContext();
    return post;
};

export default usePost;
