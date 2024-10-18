import { useContext } from 'react';
import 'nprogress/nprogress.css';
import LoadingContext from '@seada.io/core/contexts/LoadingContext/LoadingContext';

const usePageLoading = () => {
    const { startLoading } = useContext(LoadingContext);
    return startLoading;
};

export default usePageLoading;
