'use client';

import React from 'react';
import Box from '@seada.io/basic-ui/page-components/Box';
import { IModifyUserDataSchema } from '@seada.io/user/page-components/ModifyUserData/schema';
import styles from '@seada.io/user/page-components/ModifyUserData/ModifyUserData.styles';
import { CgPen } from 'react-icons/cg';
import useModifyUserDataModel from '@seada.io/user/page-components/ModifyUserData/ModifyUserData.model';
import { useTranslation } from 'react-i18next';
import { IPageComponentSchemaProps } from '@seada.io/core-schema/spi/components/interface';
import SeadaInput from '@seada.io/foundation-ui/components/SeadaInput';
import SeadaButton from '@seada.io/foundation-ui/components/SeadaButton';

const ModifyUserData: React.FC<IPageComponentSchemaProps<IModifyUserDataSchema>> = (props) => {
    const {
        data: {
            userData,
            userData: { firstName, lastName },
            loading,
        },
        handlers: { handleSubmit },
    } = useModifyUserDataModel(props);
    const { t } = useTranslation();

    if (!userData) {
        return null;
    }

    return (
        <Box {...props}>
            <form className={styles.Form} onSubmit={handleSubmit}>
                <SeadaInput
                    defaultValue={firstName}
                    type="text"
                    name="firstName"
                    label={t('userUi.modifyUserData.form.firstName')}
                />
                <SeadaInput
                    defaultValue={lastName}
                    type="text"
                    name="lastName"
                    label={t('userUi.modifyUserData.form.lastName')}
                />

                <SeadaButton type={'submit'} isLoading={loading} color={'primary'} startContent={<CgPen size={24} />}>
                    {loading ? t('userUi.modifyUserData.form.loading') : t('userUi.modifyUserData.form.update')}
                </SeadaButton>
            </form>
        </Box>
    );
};

export default ModifyUserData;
