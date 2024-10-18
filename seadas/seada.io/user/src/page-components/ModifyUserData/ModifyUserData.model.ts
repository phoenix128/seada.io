import useUserData from '@seada.io/user/hooks/use-user-data';
import useUpdatePersonalData from '@seada.io/user/hooks/use-update-personal-data';
import useAsyncActionResult from '@seada.io/core/hooks/use-async-action-result';
import { FormEvent, useCallback, useMemo } from 'react';
import { IModifyUserDataSchema } from '@seada.io/user/page-components/ModifyUserData/schema';
import { IPageComponentSchemaProps } from '@seada.io/core-schema/spi/components/interface';

const useModifyUserDataModel = (props: IPageComponentSchemaProps<IModifyUserDataSchema>) => {
    const { userData } = useUserData();
    const updatePersonalData = useUpdatePersonalData();
    const { action: update, loading } = updatePersonalData;

    useAsyncActionResult(
        updatePersonalData,
        'userUi.modifyUserData.updateSuccess',
        'userUi.modifyUserData.updateFailed'
    );

    const handleSubmit = useCallback(
        (event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();

            const formData = new FormData(event.currentTarget);
            update({
                firstName: formData.get('firstName') as string,
                lastName: formData.get('lastName') as string,
            });
        },
        [update]
    );

    return useMemo(
        () => ({
            data: {
                userData,
                loading,
            },
            handlers: {
                handleSubmit,
            },
        }),
        [handleSubmit, loading, userData]
    );
};

export default useModifyUserDataModel;
