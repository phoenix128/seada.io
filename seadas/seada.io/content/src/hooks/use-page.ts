import useDataContext from '@seada.io/core/hooks/use-data-context';
import { IContentPageData } from '@seada.io/content/interface/page';

const usePage = (): IContentPageData => {
    const { page } = useDataContext();
    return page;
};

export default usePage;
