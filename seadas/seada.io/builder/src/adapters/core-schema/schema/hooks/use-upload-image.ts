import { IUseUploadImageAdapter } from '@seada.io/core-schema/ports/schema/hooks/use-upload-image-port';
import { useCallback } from 'react';
import useAsyncAction from '@seada.io/core/hooks/use-async-action';

const useUploadImage: IUseUploadImageAdapter = () => {
    const uploadAction = useCallback(async (files: File[]) => {
        const formData = new FormData();
        for (const file of files) formData.append('image', file);

        await fetch('/builder/images', {
            method: 'POST',
            body: formData,
        });
    }, []);

    return useAsyncAction(uploadAction);
};

export default useUploadImage;
