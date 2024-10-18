import { useCallback } from 'react';
import { toast } from 'react-toastify';
import { ToastOptions } from 'react-toastify/dist/types';

const useToast = () =>
    useCallback((message: string, options: ToastOptions) => {
        const finalOptions: ToastOptions = {
            position: 'top-center',
            theme: 'colored',
            ...options,
        };

        toast(message, finalOptions);
    }, []);

export default useToast;
